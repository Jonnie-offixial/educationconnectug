import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, FileText, Search } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { images } from "@/lib/ecu";
import { projectsQuery, fallbackImg } from "@/lib/content";
import { pageHead } from "@/lib/head";

export const Route = createFileRoute("/projects")({
  head: () => pageHead("Projects & Reports", "Current ECU projects in West Nile with progress tracking and downloadable reports."),
  component: Projects,
});

function Projects() {
  const [q, setQ] = useState("");
  const { data: projects = [] } = useQuery(projectsQuery);
  const list = projects.filter((p) => (p.title + p.subtitle + p.summary + p.reports.map((r) => r.title).join(" ")).toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <PageHero title="Current Projects" subtitle="Targeted interventions making a real difference in the communities we serve across West Nile, Uganda." img={images.girls} />
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="relative mb-10 max-w-md"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects and reports" className="pl-9" /></div>
        <div className="grid gap-8 md:grid-cols-2">
          {list.map((p, i) => (
            <article key={p.id} className="overflow-hidden rounded-2xl border bg-card">
              <img src={p.image_url || fallbackImg(i)} alt={p.title} loading="lazy" className="h-56 w-full object-cover" />
              <div className="p-6">
                <h2 className="font-display text-2xl font-semibold">{p.title}</h2><p className="text-sm font-medium text-primary">{p.subtitle}</p>
                <p className="mt-3 text-muted-foreground">{p.summary}</p>
                <div className="mt-5"><div className="mb-1 flex justify-between text-sm"><span>Progress</span><span className="font-semibold">{p.progress}%</span></div><Progress value={p.progress} /></div>
                <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Reports & Publications</h3>
                <ul className="mt-2 divide-y">{p.reports.length === 0 && <li className="py-2 text-sm text-muted-foreground">No reports yet.</li>}{p.reports.map((r) => <li key={r.id} className="flex items-center justify-between py-2"><span className="flex items-center gap-2 text-sm"><FileText className="h-4 w-4 text-primary" />{r.title}</span>{r.file_url ? <Button asChild size="sm" variant="ghost"><a href={r.file_url} target="_blank" rel="noreferrer" aria-label="Download"><Download className="h-4 w-4" /></a></Button> : <span className="text-xs text-muted-foreground">Coming soon</span>}</li>)}</ul>
              </div>
            </article>
          ))}
          {list.length === 0 && <p className="text-muted-foreground">No projects match your search.</p>}
        </div>
      </section>
    </>
  );
}
