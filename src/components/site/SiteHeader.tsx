import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog & Stories" },
  { to: "/volunteer", label: "Volunteer" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const linkCls = "text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground";
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-primary-foreground/10 bg-primary/70 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/images/Education%20Connect%20Uganda%20Emblem.png"
            alt="Education Connect Uganda"
            className="h-14 w-auto max-w-[70vw] object-contain"
          />
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          <Link to="/" className={linkCls}>Home</Link>
          <Link to="/about" className={linkCls}>About</Link>
          <div className="group relative">
            <button className={`${linkCls} flex items-center gap-1`}>What We Do <ChevronDown className="h-4 w-4" /></button>
            <div className="invisible absolute left-0 top-full w-48 rounded-lg bg-card p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
              <Link to="/programs" className="block rounded px-3 py-2 text-sm text-card-foreground hover:bg-muted">Programs</Link>
              <Link to="/projects" className="block rounded px-3 py-2 text-sm text-card-foreground hover:bg-muted">Projects & Reports</Link>
            </div>
          </div>
          {links.slice(2).map((l) => <Link key={l.to} to={l.to} className={linkCls}>{l.label}</Link>)}
          <Button asChild variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90"><Link to="/donate">Donate</Link></Button>
        </nav>
        <button className="text-primary-foreground lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 bg-primary px-4 pb-4 lg:hidden">
          {[...links.slice(0, 2), { to: "/programs", label: "Programs" }, { to: "/projects", label: "Projects & Reports" }, ...links.slice(2), { to: "/donate", label: "Donate" }].map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-2 text-primary-foreground">{l.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
