import { useSiteContent } from "./useSiteContent";

const CTA_FALLBACK = [
  { label: "Découvrir mon approche", lien: "#piliers", type: "primaire" },
  { label: "Me contacter", lien: "#contact", type: "secondaire" },
];

const CTA_STYLES = {
  primaire: "bg-primary text-white hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20",
  secondaire: "border border-primary/30 text-primary hover:bg-primary/5",
};

export default function HeroSection() {
  const { get, getList } = useSiteContent();
  const heroBlocks = getList("hero", []);
  // item with component="hero" holds the text content
  const heroContent = heroBlocks.find(b => b.component === "hero") ?? null;
  // remaining items with a "lien" are buttons (component="Bouton")
  // type is stored as string "true"/"false" by the client
  const ctasFromStoryblok = heroBlocks
    .filter(b => b.lien)
    .map(b => ({
      _uid: b._uid,
      label: b.titre ?? b.label,
      lien: b.lien,
      type: String(b.type) === "true" ? "secondaire" : "primaire",
    }));
  const ctas = ctasFromStoryblok.length > 0 ? ctasFromStoryblok : CTA_FALLBACK;
  // Text: prefer hero[0] fields, fall back to legacy flat fields
  const sousTitle = heroContent?.sous_titre || get("hero", "sous_titre", "L'accompagnement des dirigeants en crise comme en transformation");
  const auteur    = heroContent?.auteur     || get("hero", "auteur",     "Éric Guedj");
  const desc      = heroContent?.description|| get("hero", "description","Personne ne se lève le matin en cherchant un coach, mais… parfois le terrain devient instable et il faut créer un passage solide.");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b2d8936e8da0b8716017cf/f9bbb0b07_IMG-20260302-WA0042.jpg"
          alt="Pont de Constantine"
          className="w-full h-full object-cover object-top opacity-10"
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-8 pt-20 sm:pt-24 text-center">
        {/* Title */}
        <h1 className="font-cormorant text-4xl sm:text-6xl md:text-8xl font-bold text-primary mb-4 sm:mb-6 leading-tight">
          Faire un Pont<span className="text-primary/60 text-xl sm:text-3xl md:text-5xl align-super">®</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 font-light max-w-2xl mx-auto mb-3 sm:mb-4 px-2">
          {sousTitle}
        </p>

        <p className="text-base sm:text-lg text-primary/70 font-cormorant italic mb-5 sm:mb-6">
          {auteur}
        </p>

        {/* Description */}
        <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2">
          {desc}
        </p>

        {/* CTAs */}
        {ctas.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            {ctas.map((cta) => (
              <a
                key={cta._uid || cta.label}
                href={cta.lien}
                className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-sm sm:text-base transition-all text-center ${CTA_STYLES[cta.type] ?? CTA_STYLES.primaire}`}
              >
                {cta.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}