import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Qui suis-je", href: "#about" },
  { label: "Mon offre", href: "#piliers" },
  { label: "Témoignages", href: "#temoignages" },
  { label: "Partenaires", href: "#partenaires" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur border-b border-border shadow-sm" : "bg-transparent"}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="font-cormorant font-bold text-primary text-base sm:text-lg leading-tight">
            Faire un Pont<span className="text-xs align-super">®</span>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            {links.map((l) => (
              <a key={l.label} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a href="#contact" className="hidden lg:inline-flex px-4 py-2 rounded-full text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-all">
            Me contacter
          </a>

          {/* Mobile hamburger */}
          <button className="lg:hidden p-2 text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-40 bg-white pt-14 sm:pt-16 flex flex-col lg:hidden">
          <div className="flex flex-col p-6 gap-1">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-foreground font-medium py-3 px-2 border-b border-border text-lg"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-6 text-center px-6 py-3 rounded-full bg-primary text-white font-medium text-base"
            >
              Prendre contact
            </a>
          </div>
        </div>
      )}
    </>
  );
}