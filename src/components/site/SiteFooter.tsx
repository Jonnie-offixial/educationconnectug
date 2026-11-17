import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import logo from "@/assets/ecu-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { org } from "@/lib/ecu";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo.url} alt="Education Connect Uganda logo" className="h-20 w-auto" />
            <span className="font-display text-xl font-semibold">{org.name}</span>
          </div>
          <p className="mt-4 text-sm text-primary-foreground/75">Transforming communities through education in West Nile since {org.founded}.</p>
          <div className="mt-4 flex gap-3">{[Facebook, Twitter, Instagram, Linkedin].map((I, i) => <a key={i} href="#" aria-label="Social link" className="rounded-full bg-primary-foreground/10 p-2 hover:bg-accent"><I className="h-4 w-4" /></a>)}</div>
        </div>
        <div>
          <h4 className="font-display text-lg">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/about">About</Link></li><li><Link to="/programs">Programs</Link></li><li><Link to="/projects">Projects & Reports</Link></li><li><Link to="/blog">Blog & Stories</Link></li><li><Link to="/volunteer">Volunteer</Link></li><li><Link to="/donate">Donate</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-primary-foreground/80">
            <li className="flex gap-2"><MapPin className="h-4 w-4" />{org.address}</li>
            <li className="flex gap-2"><Mail className="h-4 w-4" />{org.email}</li>
            <li className="flex gap-2"><Phone className="h-4 w-4" />{org.phone}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg">Newsletter</h4>
          <p className="mt-3 text-sm text-primary-foreground/80">Get impact updates in your inbox.</p>
          <form className="mt-3 flex gap-2" onSubmit={(e) => { e.preventDefault(); toast.success("Thanks for subscribing!"); setEmail(""); }}>
            <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="bg-primary-foreground text-foreground" />
            <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">Join</Button>
          </form>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-5 text-center text-xs text-primary-foreground/60">© {new Date().getFullYear()} {org.name}. All rights reserved.</div>
    </footer>
  );
}
