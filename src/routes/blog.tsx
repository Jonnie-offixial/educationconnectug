import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Quote } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { images, posts, stories } from "@/lib/ecu";
import { pageHead } from "@/lib/head";

export const Route = createFileRoute("/blog")({
  head: () => pageHead("News & Stories", "In-depth reports, impact stories, and the latest updates from our work across West Nile, Uganda."),
  component: Blog,
});
const cats = ["All Posts", "Latest News", "Field Reports", "Impact Stories"];

function Blog() {
  const [c, setC] = useState("All Posts");
  const list = posts.filter((p) => c === "All Posts" || p.category === c);
  return (
    <>
      <PageHero title="News & Stories" subtitle="In-depth reports, impact stories, and the latest updates from our work across West Nile, Uganda." img={images.sports} />
      <div className="sticky top-20 z-30 border-b bg-background/95 backdrop-blur"><div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3">{cats.map((x) => <button key={x} onClick={() => setC(x)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${c === x ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>{x}</button>)}</div></div>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => <article key={p.slug} className="overflow-hidden rounded-2xl border bg-card"><img src={p.img} alt={p.title} loading="lazy" className="h-52 w-full object-cover" /><div className="p-6"><span className="text-xs font-semibold uppercase tracking-wide text-primary">{p.category} · {p.date}</span><h2 className="mt-2 font-display text-xl font-semibold">{p.title}</h2><p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p></div></article>)}
      </section>
      {(c === "All Posts" || c === "Impact Stories") && (
        <section className="bg-muted py-16"><div className="mx-auto max-w-7xl px-4"><h2 className="mb-8 font-display text-3xl font-semibold">Impact Stories</h2><div className="grid gap-6 md:grid-cols-3">{stories.map((s) => <figure key={s.name} className="rounded-2xl bg-card p-6"><Quote className="h-7 w-7 text-accent" /><blockquote className="mt-3">“{s.quote}”</blockquote><figcaption className="mt-4 font-semibold">{s.name} <span className="block text-sm font-normal text-muted-foreground">{s.role}</span></figcaption></figure>)}</div></div></section>
      )}
    </>
  );
}
