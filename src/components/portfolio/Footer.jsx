export default function Footer() {
  return (
    <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t border-border bg-background">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
        <p className="text-sm font-cormorant font-bold text-foreground">
          Faire un Pont<span className="text-xs align-super">®</span>
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Éric Guedj · 17, rue Dupont d'Urville, Paris 16 · Eric@faireunpont.fr · +33 6 24 47 77 77
        </p>
        <p className="text-xs text-muted-foreground">© 2026</p>
      </div>
    </footer>
  );
}