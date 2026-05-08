import { renderRichText } from "@storyblok/react";
import { useSiteContent } from "./useSiteContent";

const PHOTO_FALLBACK = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b2d8936e8da0b8716017cf/7eda87a4c_IMG-20201105-WA0011.jpg";

const PARCOURS_FALLBACK = [
  { period: "Années 80",  title: "Expertise financière",       desc: "Expertise Comptable et Commissariat aux comptes, Direction Financière dans la branche crédit à la consommation du Crédit Lyonnais et rapprochement avec Sofinco, Secrétariat Général de Groupama Private Equity." },
  { period: "21 ans",     title: "Exelmans Audit et Conseil",  desc: "Co-création et développement de ce cabinet d'audit qui s'est fait une place de premier rang dans l'accompagnement en Transaction Services des opérations de LBO en France ainsi que dans l'univers du Restructuring et de l'expertise financière de justice." },
  { period: "2026",       title: "Faire un Pont®",             desc: "Certification HEC Executive Coaching en 2026, Certification Efrate en 2023, Certification en Thérapie Cognitive, Comportementale et émotionnelle en 2025. La double compétence économique et psychologique au service des dirigeants." },
];

const STATS_FALLBACK = [
  { value: "200+",  label: "Dirigeants accompagnés" },
  { value: "21 ans",label: "D'expérience en crise" },
  { value: "HEC",   label: "Executive Coaching" },
];

const CARTES_FALLBACK = [
  { titre: "Expérience économique — 30 ans", items: ["Pratique du monde de la finance et de la gouvernance", "Création et gestion d'entreprise (cabinet Exelmans)", "Compréhension concrète des situations de tension économique", "Plus de 200 dirigeants accompagnés"] },
  { titre: "Formation à l'accompagnement",   items: ["Certification HEC Executive Coaching — Promotion COA61", "Formation en analyse existentielle (Yalom, Frankl)", "Thérapies cognitives, comportementales et émotionnelles", "Interprétation clinique des rêves"] },
];

export default function AboutSection() {
  const { get, getList } = useSiteContent();
  const aboutBlocks = getList("about", []);

  // Bio block
  const bioBlock   = aboutBlocks.find(b => b.component === "about") ?? null;
  const photoUrl   = bioBlock?.image?.filename || PHOTO_FALLBACK;
  const bioRaw     = bioBlock?.description || get("about", "intro_p2", "");
  const bioParagraphs = bioRaw
    ? bioRaw.split(/\n{2,}/).map(s => s.trim()).filter(Boolean)
    : null;

  // Citation
  const citationRaw = get("about", "citation", "J'aide les dirigeants à retrouver leur centre décisionnel.");
  const citation = citationRaw.replace(/^[«\s"]+|[»\s"]+$/g, "").trim()
    || "J'aide les dirigeants à retrouver leur centre décisionnel.";

  // Parcours — inside about[] or legacy separate array
  const parcoursBlocks = aboutBlocks.filter(b => b.component === "parcours");
  const rawParcours = parcoursBlocks.length > 0 ? parcoursBlocks : getList("parcours", null);
  const parcours = rawParcours
    ? rawParcours.map(p => ({ title: p.titre ?? p.title, period: p.periode ?? p.period, desc: p.description ?? p.desc }))
    : PARCOURS_FALLBACK;

  // Stats — inside about[] or legacy separate array
  const statBlocks = aboutBlocks.filter(b => b.component === "stat");
  const rawStats = statBlocks.length > 0 ? statBlocks : getList("stat", null);
  const stats = rawStats
    ? rawStats.map(s => ({ value: s.valeur ?? s.value, label: s.label }))
    : STATS_FALLBACK;

  // Compétence cards — rich text description
  const carteBlocks = aboutBlocks.filter(b => b.component === "carte");

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-background">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10 sm:mb-16 text-center">
          <span className="text-primary text-xs sm:text-sm font-medium tracking-widest uppercase">Qui suis-je</span>
          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-2 sm:mt-3 leading-tight">
            {bioBlock?.titre || "Éric Guedj"}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-start">
          {/* Left: Photo + Text */}
          <div>
            <img
              src={photoUrl}
              alt={bioBlock?.titre || "Éric Guedj"}
              className="w-32 h-40 sm:w-40 sm:h-48 object-cover object-center rounded-2xl shadow-lg mb-6"
            />
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
              {bioParagraphs
                ? bioParagraphs.map((p, i) => <p key={i}>{p}</p>)
                : <>
                    <p>Je suis né à Constantine — ville de ponts suspendus au-dessus de gorges vertigineuses. Très tôt, j'ai été rapatrié avec ma famille à Limoges, transplanté dans un monde aux couleurs très différentes, et aux ponts plus modestes bien que charmants.</p>
                    <p>Pendant des années, j'ai participé à des négociations financières tendues, j'ai vu des dirigeants craquer — à la veille d'une audience, sous le poids d'une décision impossible. J'ai appris à les soutenir de manière instinctive.</p>
                    <p>À 60 ans, j'ai choisi d'enrichir mes grilles de lecture de l'humain — non pas par rupture, mais par cohérence profonde.</p>
                  </>
              }
              <p className="font-medium text-foreground italic font-cormorant text-base sm:text-lg">
                « {citation} »
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10 pt-6 sm:pt-10 border-t border-border">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl sm:text-2xl font-bold text-foreground font-cormorant">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Timeline */}
          <div className="space-y-4 sm:space-y-6">
            {parcours.map((item, i) => (
              <div key={i} className="flex gap-3 sm:gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  {i < parcours.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
                </div>
                <div className="pb-4 sm:pb-6">
                  <span className="text-xs font-semibold text-primary tracking-widest uppercase">{item.period}</span>
                  <h3 className="font-medium text-foreground mt-1 mb-1 sm:mb-2 text-sm sm:text-base">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compétence cards */}
        <div className="mt-12 sm:mt-20 grid sm:grid-cols-2 gap-4 sm:gap-8">
          {carteBlocks.length > 0
            ? carteBlocks.map((carte, i) => (
                <div key={i} className="bg-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-8">
                  <h3 className="font-cormorant text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">{carte.titre}</h3>
                  <div
                    className="space-y-2 text-xs sm:text-sm text-muted-foreground [&_ul]:space-y-2 [&_li]:flex [&_li]:gap-2 [&_li]:before:content-['·'] [&_li]:before:text-primary [&_li]:before:shrink-0"
                    dangerouslySetInnerHTML={{ __html: renderRichText(carte.description) }}
                  />
                </div>
              ))
            : CARTES_FALLBACK.map((carte, i) => (
                <div key={i} className="bg-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-8">
                  <h3 className="font-cormorant text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">{carte.titre}</h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                    {carte.items.map((item, j) => (
                      <li key={j} className="flex gap-2"><span className="text-primary shrink-0">·</span><span>{item}</span></li>
                    ))}
                  </ul>
                </div>
              ))
          }
        </div>
      </div>
    </section>
  );
}
