export function PageHero({ title, subtitle, img }: { title: string; subtitle?: string; img: string }) {
  return (
    <section className="relative flex min-h-[420px] items-end overflow-hidden">
      <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/20" />
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-32">
        <div className="max-w-2xl rounded-2xl border border-primary-foreground/15 bg-primary/30 p-6 backdrop-blur-md">
          <h1 className="font-display text-4xl font-semibold text-primary-foreground md:text-5xl">{title}</h1>
          {subtitle && <p className="mt-3 text-lg text-primary-foreground/85">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      {eyebrow && <p className="text-sm font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>}
      <h2 className="mt-2 font-display text-3xl font-semibold text-foreground md:text-4xl">{title}</h2>
      {text && <p className="mt-3 text-muted-foreground">{text}</p>}
    </div>
  );
}
