import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { images, programs } from "@/lib/ecu";
import { pageHead } from "@/lib/head";

export const Route = createFileRoute("/programs")({
  head: () => pageHead("Our Programs", "Education, health, gender, disability inclusion, peace building, advocacy, WASH and youth programs across West Nile."),
  component: Programs,
});

function Programs() {
  return (
    <>
      <PageHero title="Our Programs" subtitle="Comprehensive initiatives addressing education, health, rights, and community wellbeing across West Nile, Uganda." img={images.hero} />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-20 sm:grid-cols-2 lg:grid-cols-4">
        {programs.map((p) => (
          <div key={p.slug} className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition hover:-translate-y-1 hover:shadow-lg">
            <img src={p.img} alt={p.title} loading="lazy" className="h-44 w-full object-cover" />
            <div className="flex flex-1 flex-col p-5"><h3 className="font-display text-lg font-semibold">{p.title}</h3><p className="mt-2 flex-1 text-sm text-muted-foreground">{p.summary}</p><Button asChild variant="outline" size="sm" className="mt-4 self-start"><Link to="/projects">Learn more</Link></Button></div>
          </div>
        ))}
      </section>
    </>
  );
}
