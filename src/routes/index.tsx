import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Download, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/site/Counter";
import { SectionTitle } from "@/components/site/PageHero";
import { images, stats, programs, stories, partners, latestReports } from "@/lib/ecu";
import { pageHead } from "@/lib/head";

export const Route = createFileRoute("/")({
  head: () => pageHead("Transforming Communities Through Education", "Education Connect Uganda works with vulnerable children, refugees, women, youth, and persons with disabilities across West Nile."),
  component: Home,
});

const slides = [images.hero, images.community, images.girls, images.sports];

function Home() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % slides.length), 5000); return () => clearInterval(t); }, []);
  return (
    <>
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        {slides.map((s, k) => <img key={k} src={s} alt="" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${k === i ? "opacity-100" : "opacity-0"}`} />)}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pt-28 pb-16">
          <div className="max-w-2xl rounded-3xl border border-primary-foreground/20 bg-primary/25 p-8 backdrop-blur-md">
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">Community-Based NGO since 2016</span>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-tight text-primary-foreground md:text-6xl">Transforming Communities <span className="text-accent">Through Education</span></h1>
            <p className="mt-5 text-lg text-primary-foreground/90">Education Connect Uganda works with vulnerable children, refugees, women, youth, and persons with disabilities across West Nile to build a future of dignity, peace, and opportunity.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90"><Link to="/donate">Donate Now</Link></Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/60 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><Link to="/about">Learn More</Link></Button>
            </div>
          </div>
          <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 md:grid-cols-4">
            {[["5,000+", "Beneficiaries"], ["30+", "Schools Supported"], ["10+", "Districts Reached"], ["8", "Core Programs"]].map(([v, l]) => (
              <div key={l} className="rounded-xl bg-card/90 p-3 text-center backdrop-blur"><div className="font-display text-2xl font-bold text-primary">{v}</div><div className="text-xs text-muted-foreground">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Who We Are</p>
          <h2 className="mt-2 font-display text-4xl font-semibold">A Community Force for Change</h2>
          <p className="mt-5 text-muted-foreground">Founded in 2016 in West Nile, Uganda, Education Connect Uganda is a community-based NGO dedicated to creating lasting, meaningful change. We work alongside vulnerable children, refugees, women, youth, and persons with disabilities to build stronger, more inclusive communities.</p>
          <p className="mt-4 text-muted-foreground">Our approach combines education, health services, advocacy, and economic empowerment to address the root causes of poverty and inequality. Every program is designed in collaboration with the communities we serve.</p>
          <Button asChild className="mt-6"><Link to="/about">Discover Our Story</Link></Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {slides.map((s, k) => <img key={k} src={s} alt="ECU community work" loading="lazy" className={`h-48 w-full rounded-2xl object-cover ${k % 2 ? "mt-8" : ""}`} />)}
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle eyebrow="What We Do" title="Our Programs" text="Comprehensive initiatives addressing education, health, rights, and community wellbeing across West Nile, Uganda." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.filter((p) => ["education", "health", "gender", "disability", "peace", "youth"].includes(p.slug)).map((p) => (
              <div key={p.slug} className="group overflow-hidden rounded-2xl bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <img src={p.img} alt={p.title} loading="lazy" className="h-48 w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="p-6"><h3 className="font-display text-xl font-semibold">{p.title}</h3><p className="mt-2 text-sm text-muted-foreground">{p.summary}</p><Link to="/programs" className="mt-4 inline-block text-sm font-semibold text-primary">Learn more →</Link></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="font-display text-4xl font-semibold">Our Impact</h2>
          <p className="mt-3 text-primary-foreground/80">Numbers that represent real lives transformed through education and community development.</p>
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s) => <div key={s.label}><div className="font-display text-5xl font-bold text-accent"><Counter to={s.value} suffix={s.suffix} /></div><div className="mt-2 text-primary-foreground/80">{s.label}</div></div>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionTitle eyebrow="Impact" title="Success Stories" text="Real stories of transformation from the communities we serve across West Nile, Uganda." />
        <div className="grid gap-6 md:grid-cols-3">
          {stories.map((s) => (
            <figure key={s.name} className="rounded-2xl border bg-card p-7">
              <Quote className="h-8 w-8 text-accent" />
              <blockquote className="mt-4 text-foreground">“{s.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full bg-secondary font-bold text-secondary-foreground">{s.name[0]}</span><span><span className="block font-semibold">{s.name}</span><span className="text-sm text-muted-foreground">{s.role}</span></span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle title="Our Partners" text="We collaborate with leading organizations to amplify our impact across education, health, and community development." />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {partners.map((p) => <div key={p.short} title={p.name} className="grid h-24 place-items-center rounded-xl bg-card font-display text-2xl font-bold text-primary/70 transition hover:text-primary">{p.short}</div>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-8 flex items-end justify-between"><div><p className="text-sm font-semibold uppercase tracking-widest text-accent">Transparency</p><h2 className="font-display text-4xl font-semibold">Latest Reports</h2></div><Link to="/projects" className="text-sm font-semibold text-primary">View all projects →</Link></div>
        <div className="grid gap-6 md:grid-cols-3">
          {latestReports.map((r) => (
            <div key={r.title} className="rounded-2xl border bg-card p-6"><span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">{r.type}</span><h3 className="mt-4 font-display text-xl font-semibold">{r.title}</h3><p className="text-sm text-muted-foreground">{r.date}</p><Button variant="outline" size="sm" className="mt-5"><Download className="mr-2 h-4 w-4" />Download</Button></div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <img src={images.community} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-primary/85" />
        <div className="relative mx-auto max-w-3xl px-4 text-center text-primary-foreground">
          <h2 className="font-display text-4xl font-semibold">Get Involved</h2>
          <p className="mt-4 text-primary-foreground/85">Whether you want to donate, partner with us, or learn more about our work in West Nile, we would love to hear from you.</p>
          <div className="mt-8 flex justify-center gap-3"><Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90"><Link to="/donate">Donate Now</Link></Button><Button asChild size="lg" variant="outline" className="border-primary-foreground/60 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><Link to="/contact">Contact Us</Link></Button></div>
        </div>
      </section>
    </>
  );
}
