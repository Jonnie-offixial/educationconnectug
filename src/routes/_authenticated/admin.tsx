import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Pencil, Plus, Trash2, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { programsQuery, projectsQuery, reportsQuery, postsQuery, uploadFile } from "@/lib/content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard | Education Connect Uganda" }, { name: "robots", content: "noindex" }] }),
  component: Admin,
});

type Field = { key: string; label: string; type: "text" | "textarea" | "number" | "image" | "file" | "select" | "checkbox"; options?: { value: string; label: string }[] };
type Table = "programs" | "projects" | "reports" | "posts";
type Row = Record<string, unknown> & { id?: string };

const postCats = ["Latest News", "Field Reports", "Impact Stories"].map((v) => ({ value: v, label: v }));
const reportCats = ["Annual", "Project", "Research", "Evaluation"].map((v) => ({ value: v, label: v }));

function Admin() {
  const nav = useNavigate();
  const qc = useQueryClient();
  const role = useQuery({
    queryKey: ["is-admin"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      const { data } = await supabase.rpc("has_role", { _user_id: u.user!.id, _role: "admin" });
      return { isAdmin: !!data, email: u.user?.email };
    },
  });
  const programs = useQuery(programsQuery);
  const projects = useQuery(projectsQuery);
  const reports = useQuery(reportsQuery);
  const posts = useQuery({ ...postsQuery, queryKey: ["posts", "all"] });

  async function signOut() { await qc.cancelQueries(); qc.clear(); await supabase.auth.signOut(); nav({ to: "/auth", replace: true }); }

  if (role.isLoading) return <div className="pt-32 text-center">Loading…</div>;
  if (!role.data?.isAdmin) return (
    <div className="mx-auto max-w-md px-4 pt-36 pb-20 text-center">
      <h1 className="font-display text-2xl font-semibold">No admin access</h1>
      <p className="mt-2 text-muted-foreground">You're signed in as {role.data?.email}, but this account isn't an admin.</p>
      <Button className="mt-6" variant="outline" onClick={signOut}>Sign out</Button>
    </div>
  );

  const projectOpts = [{ value: "", label: "— None —" }, ...(projects.data ?? []).map((p) => ({ value: p.id, label: p.title }))];

  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-20">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="font-display text-3xl font-semibold">Admin Dashboard</h1><p className="text-sm text-muted-foreground">Signed in as {role.data.email}</p></div>
        <Button variant="outline" onClick={signOut}><LogOut className="mr-2 h-4 w-4" />Sign out</Button>
      </div>
      <Tabs defaultValue="programs">
        <TabsList className="flex-wrap"><TabsTrigger value="programs">Programs</TabsTrigger><TabsTrigger value="projects">Projects</TabsTrigger><TabsTrigger value="reports">Reports</TabsTrigger><TabsTrigger value="posts">Blog & Stories</TabsTrigger></TabsList>
        <TabsContent value="programs"><Manager table="programs" rows={programs.data ?? []} cols={["title"]} fields={[{ key: "title", label: "Title", type: "text" }, { key: "summary", label: "Summary", type: "textarea" }, { key: "image_url", label: "Image", type: "image" }, { key: "sort_order", label: "Display order", type: "number" }]} /></TabsContent>
        <TabsContent value="projects"><Manager table="projects" rows={projects.data ?? []} cols={["title", "progress"]} fields={[{ key: "title", label: "Title", type: "text" }, { key: "subtitle", label: "Full name / subtitle", type: "text" }, { key: "summary", label: "Summary", type: "textarea" }, { key: "image_url", label: "Image", type: "image" }, { key: "progress", label: "Progress (%)", type: "number" }, { key: "sort_order", label: "Display order", type: "number" }]} /></TabsContent>
        <TabsContent value="reports"><Manager table="reports" rows={reports.data ?? []} cols={["title", "category", "report_date"]} fields={[{ key: "title", label: "Title", type: "text" }, { key: "category", label: "Category", type: "select", options: reportCats }, { key: "report_date", label: "Date (e.g. December 2024)", type: "text" }, { key: "project_id", label: "Linked project", type: "select", options: projectOpts }, { key: "file_url", label: "PDF document", type: "file" }]} /></TabsContent>
        <TabsContent value="posts"><Manager table="posts" rows={posts.data ?? []} cols={["title", "category"]} fields={[{ key: "title", label: "Title", type: "text" }, { key: "category", label: "Category", type: "select", options: postCats }, { key: "author", label: "Author", type: "text" }, { key: "excerpt", label: "Short summary", type: "textarea" }, { key: "content", label: "Full story", type: "textarea" }, { key: "image_url", label: "Image", type: "image" }, { key: "published", label: "Published", type: "checkbox" }]} /></TabsContent>
      </Tabs>
    </div>
  );
}

function Manager({ table, rows, cols, fields }: { table: Table; rows: Row[]; cols: string[]; fields: Field[] }) {
  const qc = useQueryClient();
  const [edit, setEdit] = useState<Row | null>(null);
  const refresh = () => qc.invalidateQueries();
  async function remove(id: string) {
    if (!confirm("Delete this item?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) return void toast.error(error.message);
    toast.success("Deleted"); refresh();
  }
  const blank: Row = Object.fromEntries(fields.map((f) => [f.key, f.type === "number" ? 0 : f.type === "checkbox" ? true : f.type === "select" ? f.options?.[0]?.value ?? "" : ""]));
  return (
    <div className="mt-4 rounded-2xl border bg-card">
      <div className="flex items-center justify-between border-b p-4"><p className="text-sm text-muted-foreground">{rows.length} items</p><Button size="sm" onClick={() => setEdit(blank)}><Plus className="mr-1 h-4 w-4" />Add new</Button></div>
      <ul className="divide-y">
        {rows.map((r) => (
          <li key={r.id} className="flex items-center gap-4 p-4">
            {typeof r.image_url === "string" && r.image_url ? <img src={r.image_url} alt="" className="h-12 w-16 rounded object-cover" /> : null}
            <div className="min-w-0 flex-1">{cols.map((c, i) => <p key={c} className={i ? "text-sm text-muted-foreground" : "truncate font-medium"}>{String(r[c] ?? "")}{c === "progress" ? "%" : ""}</p>)}</div>
            {typeof r.file_url === "string" && r.file_url ? <a href={r.file_url} target="_blank" rel="noreferrer" className="text-sm text-primary underline">PDF</a> : null}
            <Button size="icon" variant="ghost" aria-label="Edit" onClick={() => setEdit(r)}><Pencil className="h-4 w-4" /></Button>
            <Button size="icon" variant="ghost" aria-label="Delete" onClick={() => remove(r.id!)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
          </li>
        ))}
      </ul>
      <Dialog open={!!edit} onOpenChange={(o) => !o && setEdit(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{edit?.id ? "Edit" : "Add new"}</DialogTitle></DialogHeader>
          {edit && <Editor table={table} row={edit} fields={fields} onDone={() => { setEdit(null); refresh(); }} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Editor({ table, row, fields, onDone }: { table: Table; row: Row; fields: Field[]; onDone: () => void }) {
  const [v, setV] = useState<Row>(row);
  const [busy, setBusy] = useState(false);
  const set = (k: string, val: unknown) => setV((x) => ({ ...x, [k]: val }));
  async function upload(k: string, file?: File) {
    if (!file) return;
    setBusy(true);
    try { set(k, await uploadFile(file, table)); toast.success("Uploaded"); } catch (e) { toast.error((e as Error).message); }
    setBusy(false);
  }
  async function save(e: React.FormEvent) {
    e.preventDefault(); setBusy(true);
    const payload: Row = {};
    for (const f of fields) { const val = v[f.key]; payload[f.key] = f.key === "project_id" && !val ? null : f.type === "number" ? Number(val) || 0 : val === "" && (f.type === "image" || f.type === "file") ? null : val; }
    const q = row.id ? supabase.from(table).update(payload as never).eq("id", row.id) : supabase.from(table).insert(payload as never);
    const { error } = await q;
    setBusy(false);
    if (error) return void toast.error(error.message);
    toast.success("Saved"); onDone();
  }
  return (
    <form onSubmit={save} className="space-y-4">
      {fields.map((f) => (
        <div key={f.key}>
          <Label>{f.label}</Label>
          {f.type === "text" && <Input required={f.key === "title"} value={String(v[f.key] ?? "")} onChange={(e) => set(f.key, e.target.value)} />}
          {f.type === "number" && <Input type="number" value={String(v[f.key] ?? 0)} onChange={(e) => set(f.key, e.target.value)} />}
          {f.type === "textarea" && <Textarea rows={f.key === "content" ? 8 : 3} value={String(v[f.key] ?? "")} onChange={(e) => set(f.key, e.target.value)} />}
          {f.type === "select" && <select className="mt-1 h-10 w-full rounded-md border bg-background px-3 text-sm" value={String(v[f.key] ?? "")} onChange={(e) => set(f.key, e.target.value)}>{f.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>}
          {f.type === "checkbox" && <div className="mt-1"><input type="checkbox" checked={!!v[f.key]} onChange={(e) => set(f.key, e.target.checked)} /> <span className="text-sm">Show on website</span></div>}
          {(f.type === "image" || f.type === "file") && (
            <div className="mt-1 space-y-2">
              {f.type === "image" && v[f.key] ? <img src={String(v[f.key])} alt="" className="h-28 rounded object-cover" /> : null}
              {f.type === "file" && v[f.key] ? <a href={String(v[f.key])} target="_blank" rel="noreferrer" className="text-sm text-primary underline">Current file</a> : null}
              <Input type="file" accept={f.type === "image" ? "image/*" : "application/pdf"} onChange={(e) => upload(f.key, e.target.files?.[0])} />
            </div>
          )}
        </div>
      ))}
      <Button type="submit" className="w-full" disabled={busy}>{busy ? "Please wait…" : "Save"}</Button>
    </form>
  );
}
