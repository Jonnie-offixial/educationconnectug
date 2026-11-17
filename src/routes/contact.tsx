import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { images, org } from "@/lib/ecu";
import { pageHead } from "@/lib/head";

export const Route = createFileRoute("/contact")({
  head: () => pageHead("Contact Us", "Reach out to Education Connect Uganda to partner, donate, or learn more."),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero title="Contact Us" subtitle="We would love to hear from you. Reach out to partner, donate, or learn more." img={images.community} />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-5">
        <div className="space-y-5 md:col-span-2">
          <h2 className="font-display text-3xl font-semibold">Get in Touch</h2>
          {[[MapPin, "Address", org.address], [Mail, "Email", org.email], [Phone, "Phone", org.phone]].map(([I, t, v]) => { const Icon = I as typeof Mail; return <div key={t as string} className="flex gap-4"><span className="grid h-11 w-11 place-items-center rounded-full bg-secondary"><Icon className="h-5 w-5 text-primary" /></span><div><p className="font-semibold">{t as string}</p><p className="text-muted-foreground">{v as string}</p></div></div>; })}
          <div><p className="font-semibold">Follow Us</p><div className="mt-2 flex gap-2">{[Facebook, Twitter, Instagram, Linkedin].map((I, k) => <a key={k} href="#" aria-label="Social link" className="rounded-full bg-primary p-2 text-primary-foreground"><I className="h-4 w-4" /></a>)}</div></div>
        </div>
        <form className="space-y-4 rounded-2xl border bg-card p-8 md:col-span-3" onSubmit={(e) => { e.preventDefault(); toast.success("Message sent! We'll reply soon."); (e.target as HTMLFormElement).reset(); }}>
          <div className="grid gap-4 sm:grid-cols-2"><div><Label>Name</Label><Input required /></div><div><Label>Email</Label><Input type="email" required /></div></div>
          <div><Label>Subject</Label><Input required /></div>
          <div><Label>Message</Label><Textarea required maxLength={500} rows={5} /><p className="mt-1 text-xs text-muted-foreground">Max 500 characters</p></div>
          <Button type="submit" size="lg">Send Message</Button>
        </form>
      </section>
    </>
  );
}
