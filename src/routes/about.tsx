import { createFileRoute } from "@tanstack/react-router";
import { HandHeart, Users, Rocket, Scale, Target } from "lucide-react";
import { PageHero, SectionTitle } from "@/components/site/PageHero";
import { images, values, goals, structure, timeline, leaders } from "@/lib/ecu";
import { pageHead } from "@/lib/head";

export const Route = createFileRoute("/about")({
  head: () => pageHead("About Us", "Our story since 2016, vision, mission, values, strategic goals and leadership of Education Connect Uganda."),
  component: About,
});
const icons = [HandHeart, Users, Rocket, Scale];

function About() {
  return (
    <>
      <PageHero title="About Education Connect Uganda" subtitle="About Us" img={images.community} />
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-3">
        <div className="space-y-4 text-muted-foreground md:col-span-2">
          <h2 className="font-display text-4xl font-semibold text-foreground">Our Story</h2>
          <p>Education Connect Uganda (ECU) was founded in 2016 in the West Nile region of Uganda, born from a collective vision of local educators and community activists who saw an urgent need for coordinated support in education, health, and social welfare. What began as a small volunteer initiative serving a single settlement has grown into a recognized community-based NGO impacting thousands of lives across multiple districts.</p>
          <p>West Nile is home to some of Uganda's most vulnerable populations, including large refugee communities from South Sudan and the DRC, internally displaced families, and host communities facing chronic poverty. ECU was established to bridge the gap between humanitarian aid and sustainable community development, ensuring no child or vulnerable person is left behind.</p>
          <p>Today, we work with vulnerable children, refugees, women, youth, and persons with disabilities. Our programs are designed in close collaboration with the communities we serve, ensuring they are relevant, culturally appropriate, and sustainable for generations to come.</p>
        </div>
        <aside className="h-fit rounded-2xl bg-primary p-7 text-primary-foreground">
          <h3 className="font-display text-2xl">Quick Facts</h3>
          <ul className="mt-4 space-y-3">{["Founded 2016", "West Nile, Uganda", "5,000+ Beneficiaries", "30+ Schools Supported"].map((f) => <li key={f} className="border-b border-primary-foreground/15 pb-3">{f}</li>)}</ul>
        </aside>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-20 md:grid-cols-2">
        <div className="rounded-2xl bg-secondary p-8"><h3 className="font-display text-2xl font-semibold text-secondary-foreground">Vision</h3><p className="mt-3 text-muted-foreground">A society where every individual has access to quality education, health services, and opportunities to reach their full potential regardless of their background, disability, or circumstances.</p></div>
        <div className="rounded-2xl bg-accent/20 p-8"><h3 className="font-display text-2xl font-semibold">Mission</h3><p className="mt-3 text-muted-foreground">To empower vulnerable communities in Uganda through education, advocacy, and sustainable development programs that promote human rights, gender equity, health, and peace.</p></div>
      </section>
      <section className="bg-muted py-20"><div className="mx-auto max-w-7xl px-4">
        <SectionTitle title="Our Core Values" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{values.map((v, k) => { const I = icons[k] ?? HandHeart; return <div key={v.title} className="rounded-2xl bg-card p-6"><I className="h-9 w-9 text-primary" /><h3 className="mt-4 font-display text-xl font-semibold">{v.title}</h3><p className="mt-2 text-sm text-muted-foreground">{v.text}</p></div>; })}</div>
      </div></section>
      <section className="bg-primary py-20 text-primary-foreground"><div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center font-display text-4xl font-semibold">Strategic Goals 2022–2026</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">{goals.map((g) => <div key={g.title} className="flex gap-4 rounded-2xl bg-primary-foreground/10 p-6"><Target className="h-7 w-7 shrink-0 text-accent" /><div><h3 className="font-display text-xl">{g.title}</h3><p className="mt-2 text-primary-foreground/80">{g.text}</p></div></div>)}</div>
      </div></section>
      <section className="mx-auto max-w-5xl px-4 py-20">
        <SectionTitle title="Organization Structure" />
        <div className="flex flex-col items-center gap-3">{structure.map((row, k) => <div key={k} className="flex flex-wrap justify-center gap-3">{row.map((r) => <div key={r} className={`rounded-xl px-5 py-3 text-sm font-semibold ${k < 3 ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>{r}</div>)}</div>)}</div>
      </section>
      <section className="bg-muted py-20"><div className="mx-auto max-w-7xl px-4">
        <SectionTitle title="Leadership" />
        <div className="grid gap-6 md:grid-cols-3">{leaders.map((l) => <div key={l.name} className="rounded-2xl bg-card p-7 text-center"><div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary font-display text-2xl text-primary-foreground">{l.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</div><h3 className="mt-4 font-display text-xl font-semibold">{l.name}</h3><p className="text-sm font-semibold text-accent-foreground/80">{l.role}</p><p className="mt-3 text-sm text-muted-foreground">{l.text}</p></div>)}</div>
      </div></section>
      <section className="mx-auto max-w-3xl px-4 py-20">
        <SectionTitle title="Timeline of Milestones" />
        <ol className="relative border-l-2 border-primary/30 pl-8">{timeline.map((t) => <li key={t.year} className="mb-8"><span className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full bg-accent" /><span className="font-display text-lg font-bold text-primary">{t.year}</span><h3 className="font-semibold">{t.title}</h3><p className="text-muted-foreground">{t.text}</p></li>)}</ol>
      </section>
    </>
  );
}
