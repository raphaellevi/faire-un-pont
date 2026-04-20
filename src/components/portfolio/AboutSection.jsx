import { useSiteContent } from "./useSiteContent";

const parcours = [
  {
    period: "Années 80",
    title: "Expertise financière",
    desc: "Expertise Comptable et Commissariat aux comptes, Direction Financière dans la branche crédit à la consommation du Crédit Lyonnais et rapprochement avec Sofinco, Secrétariat Général de Groupama Private Equity."
  },
  {
    period: "21 ans",
    title: "Exelmans Audit et Conseil",
    desc: "Co-création et développement de ce cabinet d'audit qui s'est fait une place de premier rang dans l'accompagnement en Transaction Services des opérations de LBO en France ainsi que dans l'univers du Restructuring et de l'expertise financière de justice."
  },
  {
    period: "2026",
    title: "Faire un Pont®",
    desc: "Certification HEC Executive Coaching en 2026, Certification Efrate (Ecole Française d'Analyse et de Thérapie Existentielle) en 2023, Certification en Thérapie Cognitive, Comportementale et émotionnelle en 2025. La double compétence économique et psychologique au service des dirigeants."
  },
];

export default function AboutSection() {
  const { get } = useSiteContent();

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-background">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10 sm:mb-16 text-center">
          <span className="text-primary text-xs sm:text-sm font-medium tracking-widest uppercase">Qui suis-je</span>
          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-2 sm:mt-3 leading-tight">
            Éric Guedj
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-start">
          {/* Left: Photo + Text */}
          <div>
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b2d8936e8da0b8716017cf/7eda87a4c_IMG-20201105-WA0011.jpg"
              alt="Éric Guedj"
              className="w-32 h-40 sm:w-40 sm:h-48 object-cover object-center rounded-2xl shadow-lg mb-6"
            />
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
              <p>Je suis né à Constantine — ville de ponts suspendus au-dessus de gorges vertigineuses. Très tôt, j'ai été rapatrié avec ma famille à Limoges, transplanté dans un monde aux couleurs très différentes, et aux ponts plus modestes bien que charmants. Cette expérience du déplacement, de la perte et de la reconstruction m'a forgé une sensibilité particulière à la fragilité des êtres.</p>
              <p>{get("about", "intro_p2", "Pendant des années, j'ai participé à des négociations financières tendues, j'ai vu des dirigeants craquer — à la veille d'une audience, sous le poids d'une décision impossible, ou simplement parce que la solitude était devenue insupportable. J'ai appris à les soutenir de manière instinctive.")}</p>
              <p>{get("about", "intro_p3", "J'ai aussi travaillé avec des dirigeants solaires, visionnaires, capables d'embarquer des équipes fidèles à leurs côtés. De véritables créateurs de valeur avec de belles valeurs. J'ai moi-même cherché à leur ressembler à la tête d'Exelmans.")}</p>
              <p>{get("about", "intro_p4", "À 60 ans, j'ai choisi d'enrichir mes grilles de lecture de l'humain — non pas par rupture, mais par cohérence profonde. Aujourd'hui je veux partager cette double compétence avec ceux qui sont confrontés à des dilemmes ou veulent simplement approfondir leur propre questionnement pour une meilleure trajectoire professionnelle.")}</p>
              <p className="font-medium text-foreground italic font-cormorant text-base sm:text-lg">
                « {get("about", "citation", "J'aide les dirigeants à retrouver leur centre décisionnel.")} »
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10 pt-6 sm:pt-10 border-t border-border">
              {[
                { value: "200+", label: "Dirigeants accompagnés" },
                { value: "21 ans", label: "D'expérience en crise" },
                { value: "HEC", label: "Executive Coaching" },
              ].map((stat) => (
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

        {/* Double compétence */}
        <div className="mt-12 sm:mt-20 grid sm:grid-cols-2 gap-4 sm:gap-8">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-8">
            <h3 className="font-cormorant text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">Expérience économique — 30 ans</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary shrink-0">·</span> Pratique du monde de la finance et de la gouvernance</li>
              <li className="flex gap-2"><span className="text-primary shrink-0">·</span> Création et gestion d'entreprise (cabinet Exelmans)</li>
              <li className="flex gap-2"><span className="text-primary shrink-0">·</span> Compréhension concrète des situations de tension économique</li>
              <li className="flex gap-2"><span className="text-primary shrink-0">·</span> Plus de 200 dirigeants accompagnés</li>
            </ul>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-8">
            <h3 className="font-cormorant text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">Formation à l'accompagnement</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary shrink-0">·</span><span>Certification HEC Executive Coaching — Promotion COA61</span></li>
              <li className="flex gap-2"><span className="text-primary shrink-0">·</span><span>Formation en analyse existentielle (Yalom, Frankl)</span></li>
              <li className="flex gap-2"><span className="text-primary shrink-0">·</span><span>Thérapies cognitives, comportementales et émotionnelles</span></li>
              <li className="flex gap-2"><span className="text-primary shrink-0">·</span><span>Interprétation clinique des rêves</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}