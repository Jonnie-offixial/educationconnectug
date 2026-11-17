import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Heart, Globe, Users, GraduationCap, MapPin } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { images, opportunities } from "@/lib/ecu";
import { pageHead } from "@/lib/head";

export const Route = createFileRoute("/volunteer")({
  head: () => pageHead("Volunteer With Us", "Join our team of dedicated volunteers making a difference in communities across West Nile, Uganda."),
  component: Volunteer,
});
const why = [
  { I: Heart, t: "Create Impact", d: "Your time and skills directly benefit vulnerable communities in Uganda." },
  { I: Globe, t: "Global Perspective", d: "Gain firsthand experience in international development and grassroots work." },
  { I: Users, t: "Join a Community", d: "Become part of a passionate network of changemakers and local leaders." },
  { I: GraduationCap, t: "Build Skills", d: "Develop professional skills in project management, teaching, and community organizing." },
];
const skills = ["Teaching / Education", "Healthcare / Counseling", "Community Outreach", "Fundraising", "Project Management", "Translation / Interpretation", "IT / Digital Skills", "Agriculture", "Construction", "Other"];

function Volunteer() {
  const [sel, setSel] = useState<string[]>([]);
  return (
    <>
      <PageHero title="Volunteer With Us" subtitle="Join our team of dedicated volunteers making a difference in communities across West Nile, Uganda." img={images.community} />
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-8 text-center font-display text-3xl font-semibold">Why Volunteer?</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{why.map(({ I, t, d }) => <div key={t} className="rounded-2xl bg-secondary p-6"><I className="h-8 w-8 text-primary" /><h3 className="mt-3 font-semibold">{t}</h3><p className="mt-1 text-sm text-muted-foreground">{d}</p></div>)}</div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 lg:grid-cols-3">
        <aside><h2 className="font-display text-2xl font-semibold">Current Opportunities</h2><ul className="mt-4 space-y-3">{opportunities.map((o) => <li key={o.title} className="rounded-xl border bg-card p-4"><p className="font-semibold">{o.title}</p><p className="flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-3 w-3" />{o.place} · {o.time}</p></li>)}</ul></aside>
        <form className="space-y-5 rounded-2xl border bg-card p-8 lg:col-span-2" onSubmit={(e) => { e.preventDefault(); toast.success("Application received! We'll be in touch."); (e.target as HTMLFormElement).reset(); setSel([]); }}>
          <div><h2 className="font-display text-2xl font-semibold">Volunteer Registration</h2><p className="text-sm text-muted-foreground">Fill out the form below and we will match you with a suitable opportunity.</p></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><Label>Full Name *</Label><Input required /></div><div><Label>Email Address *</Label><Input type="email" required /></div>
            <div><Label>Phone Number</Label><Input /></div><div><Label>Location *</Label><Input required /></div>
          </div>
          <div><Label>Skills & Expertise (select all that apply)</Label><div className="mt-2 flex flex-wrap gap-2">{skills.map((s) => <button type="button" key={s} onClick={() => setSel((x) => x.includes(s) ? x.filter((y) => y !== s) : [...x, s])} className={`rounded-full border px-3 py-1.5 text-sm ${sel.includes(s) ? "border-primary bg-primary text-primary-foreground" : "bg-background"}`}>{s}</button>)}</div></div>
          <div><Label>Availability</Label><select required className="mt-1 h-10 w-full rounded-md border bg-background px-3 text-sm"><option value="">Select availability</option>{["Full-time (40+ hrs/week)", "Part-time (20-39 hrs/week)", "Weekends only", "Remote / Online", "Occasional / Events"].map((a) => <option key={a}>{a}</option>)}</select></div>
          <div><Label>Why do you want to volunteer with ECU? (optional)</Label><Textarea maxLength={500} rows={4} /><p className="mt-1 text-xs text-muted-foreground">Max 500 characters</p></div>
          <Button type="submit" size="lg">Submit Application</Button>
        </form>
      </section>
    </>
  );
}
