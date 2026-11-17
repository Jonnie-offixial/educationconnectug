import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Target, MapPin, ShieldCheck, Quote } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { images } from "@/lib/ecu";
import { pageHead } from "@/lib/head";

export const Route = createFileRoute("/donate")({
  head: () => pageHead("Support Our Work", "Your donation directly supports education, health, and empowerment programs in Uganda."),
  component: Donate,
});
const options = [
  { t: "One-Time Donation", d: "Make a single contribution to support our programs.", a: ["$25", "$50", "$100", "$250"] },
  { t: "Monthly Giving", d: "Join our sustaining donors and provide reliable support.", a: ["$10/mo", "$25/mo", "$50/mo"] },
  { t: "Sponsor a Child", d: "Provide school fees, supplies, and mentorship for one child.", a: ["$30/month"] },
  { t: "Refugee Education Fund", d: "Directly support education for refugee children and youth.", a: ["$50", "$100", "$200"] },
];

function Donate() {
  const [pick, setPick] = useState<{ t: string; a: string } | null>(null);
  return (
    <>
      <PageHero title="Support Our Work" subtitle="Your donation directly supports education, health, and empowerment programs in Uganda." img={images.hero} />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 md:grid-cols-2">
        {options.map((o) => <div key={o.t} className="rounded-2xl border bg-card p-7"><h2 className="font-display text-2xl font-semibold">{o.t}</h2><p className="mt-1 text-muted-foreground">{o.d}</p><div className="mt-5 flex flex-wrap gap-3">{o.a.map((a) => <Button key={a} variant="outline" onClick={() => setPick({ t: o.t, a })} className="hover:border-primary hover:bg-primary hover:text-primary-foreground">{a}</Button>)}</div></div>)}
      </section>
      <section className="bg-muted py-16"><div className="mx-auto max-w-7xl px-4"><h2 className="mb-8 text-center font-display text-3xl font-semibold">Why Donate to ECU?</h2><div className="grid gap-6 md:grid-cols-3">{[[Target, "Direct Impact", "90% of funds go directly to program delivery."], [MapPin, "Local Expertise", "Our team lives and works in the communities we serve."], [ShieldCheck, "Transparency", "Regular reports and financial audits ensure accountability."]].map(([I, t, d]) => { const Icon = I as typeof Target; return <div key={t as string} className="rounded-2xl bg-card p-6 text-center"><Icon className="mx-auto h-9 w-9 text-primary" /><h3 className="mt-3 font-semibold">{t as string}</h3><p className="text-sm text-muted-foreground">{d as string}</p></div>; })}</div></div></section>
      <section className="mx-auto max-w-5xl px-4 py-16"><h2 className="mb-8 text-center font-display text-3xl font-semibold">Donor Testimonials</h2><div className="grid gap-6 md:grid-cols-2">{[["I have supported ECU for three years. The regular updates and photos show exactly how my donations are helping children access education.", "Dr. Sarah Williams", "United Kingdom"], ["Sponsoring a child through ECU has been one of the most rewarding experiences. I receive letters and progress reports that make the connection real.", "Mark Johnson", "United States"]].map(([q, n, c]) => <figure key={n} className="rounded-2xl border bg-card p-7"><Quote className="h-7 w-7 text-accent" /><blockquote className="mt-3">“{q}”</blockquote><figcaption className="mt-4 font-semibold">{n} <span className="block text-sm font-normal text-muted-foreground">{c}</span></figcaption></figure>)}</div></section>
      <Dialog open={!!pick} onOpenChange={(o) => !o && setPick(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{pick?.t} — {pick?.a}</DialogTitle></DialogHeader>
          <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setPick(null); toast.success("Thank you for your generosity! We'll contact you to complete your gift."); }}>
            <Input required placeholder="Full name" /><Input required type="email" placeholder="Email" /><Textarea placeholder="Message (optional)" />
            <Button type="submit" className="w-full">Continue</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
