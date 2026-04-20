import { useState, useRef } from "react";
import { Compass, TrendingDown, Lightbulb, Heart, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const offres = [
  {
    num: "01",
    icon: Compass,
    title: "Coaching de transformation",
    subtitle: "Tu prends un nouveau poste ou évolues",
    description: "Construire un pont entre l'identité profonde du dirigeant et son rôle stratégique. Un travail structuré sur la posture de leadership, la cohérence stratégique et l'alignement personnel — pour des décisions plus rapides et une autorité plus stable.",
    action: "Aligner · Transformer · Incarner",
    detail: "8 séances d'1h30 espacées sur 6 mois",
    subs: [
      {
        icon: Lightbulb,
        title: "Coaching existentiel",
        subtitle: "Ta motivation fléchit, le sens s'érode",
        description: "Le dirigeant continue à agir, mais l'élan intérieur s'érode. Le coaching existentiel permet de revisiter les valeurs, la liberté réelle et la trajectoire personnelle. L'objectif : retrouver un moteur intérieur solide.",
        action: "Questionner · Reconnecter · Rebondir",
        detail: "Intégré au coaching de transformation ou abordé de manière spécifique notamment en cas de bore-out ou de brown-out.",
      },
    ],
  },
  {
    num: "02",
    icon: TrendingDown,
    title: "Coaching de crise",
    subtitle: "Ton entreprise traverse une tempête",
    description: "En période de crise, la première ressource de l'entreprise n'est pas financière, elle est psychique. Un dirigeant submergé transmet son instabilité au système : les équipes se crispent, les décisions deviennent impulsives ou paralysées.",
    action: "Stabiliser · Clarifier · Décider",
    detail: "Rythme dépendant de l'intensité et de la longueur de la situation de crise · Intervention immédiate",
    subs: [
      {
        icon: TrendingDown,
        title: "Crise financière",
        subtitle: "Négociations, restructuration, LBO sous tension",
        description: "En période de crise, la première ressource de l'entreprise n'est pas financière, elle est psychique. Un dirigeant submergé transmet son instabilité au système : les équipes se crispent, les décisions deviennent impulsives ou paralysées.",
        action: "Stabiliser · Clarifier · Décider",
        detail: "Rythme dépendant de l'intensité et de la longueur de la situation de crise · Intervention immédiate",
      },
      {
        icon: Heart,
        title: "Soutien émotionnel",
        subtitle: "Le dirigeant est à bout",
        description: "La solitude du dirigeant est réelle. Quand le corps dit stop, quand les ruminations s'enchaînent, quand la fatigue décisionnelle l'emporte, il faut un espace pour souffler, déposer et retrouver de la clarté. Ces séances de « dépressurisation » permettent de stabiliser l'état émotionnel, de restaurer la capacité à décider et d'éviter que l'épuisement ne devienne rupture. Un filet de sécurité humain, discret et efficace.",
        action: "Dépressuriser · Stabiliser · Tenir",
        detail: "Séances ponctuelles ou régulières, rythme adapté à la situation · Possibilité de relais psychothérapeutique",
      },
    ],
  },
];

function SubItem({ sub, isOpen, onToggle }) {
  const Icon = sub.icon;
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-secondary/30 transition-colors bg-card"
        onClick={onToggle}
      >
        <div className="w-7 h-7 rounded-md bg-primary/8 flex items-center justify-center shrink-0">
          <Icon className="w-3.5 h-3.5 text-primary/70" />
        </div>
        <p className="flex-1 font-medium text-foreground text-sm">{sub.title}</p>
        <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="px-4 pb-4 pt-3 bg-secondary/10 border-t border-border">
          <p className="text-primary text-xs italic mb-2">{sub.subtitle}</p>
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3">{sub.description}</p>
          <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-1">{sub.action}</p>
          <p className="text-xs text-muted-foreground">{sub.detail}</p>
        </div>
      )}
    </div>
  );
}

export default function PiliersSection() {
  const [open, setOpen] = useState(null);
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);
  const toggle = (key) => setOpen(open === key ? null : key);

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) setCurrent(1);
    else if (diff < -40) setCurrent(0);
    touchStartX.current = null;
  };

  return (
    <section id="piliers" className="py-12 sm:py-16 px-4 sm:px-6 bg-secondary/20">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 sm:mb-12 text-center">
          <span className="text-primary text-xs sm:text-sm font-medium tracking-widest uppercase">Mon offre</span>
          <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-2 leading-tight">
            Deux approches, une même exigence
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl leading-relaxed mx-auto">
            Faire un Pont® demande architecture, stabilité, et capacité à supporter la charge.
          </p>
        </div>

        {/* Desktop: côte à côte */}
        <div className="hidden sm:grid sm:grid-cols-2 gap-6 items-start">
          {offres.map((offre, oi) => {
            const Icon = offre.icon;
            return (
              <div key={offre.title} className="bg-card border border-border rounded-2xl p-6 sm:p-8 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary/70" />
                  </div>
                  <span className="text-muted-foreground font-light text-base tracking-widest">{offre.num}</span>
                </div>
                <div className="border-b border-border pb-5">
                  <h3 className="font-cormorant text-xl sm:text-2xl font-bold text-foreground mb-1">{offre.title}</h3>
                  <p className="text-primary text-sm italic">{offre.subtitle}</p>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed border-b border-border pb-5">{offre.description}</p>
                <div className="border-b border-border pb-5">
                  <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-1">{offre.action}</p>
                  <p className="text-xs text-muted-foreground">{offre.detail}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-1">Prolongement possible</p>
                  {offre.subs.map((sub, si) => (
                    <SubItem key={si} sub={sub} isOpen={open === `${oi}-${si}`} onToggle={() => toggle(`${oi}-${si}`)} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile: carrousel swipeable */}
        <div className="sm:hidden">
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {offres.map((offre, oi) => {
                const Icon = offre.icon;
                return (
                  <div key={offre.title} className="w-full shrink-0 bg-card border border-border rounded-2xl p-6 flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-primary/70" />
                      </div>
                      <span className="text-muted-foreground font-light text-base tracking-widest">{offre.num}</span>
                    </div>
                    <div className="border-b border-border pb-5">
                      <h3 className="font-cormorant text-xl font-bold text-foreground mb-1">{offre.title}</h3>
                      <p className="text-primary text-sm italic">{offre.subtitle}</p>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed border-b border-border pb-5">{offre.description}</p>
                    <div className="border-b border-border pb-5">
                      <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-1">{offre.action}</p>
                      <p className="text-xs text-muted-foreground">{offre.detail}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-1">Prolongement possible</p>
                      {offre.subs.map((sub, si) => (
                        <SubItem key={si} sub={sub} isOpen={open === `${oi}-${si}`} onToggle={() => toggle(`${oi}-${si}`)} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots + navigation */}
          <div className="flex items-center justify-between mt-4">
            <button onClick={() => setCurrent(0)} className="w-9 h-9 rounded-full border border-border bg-card flex items-center justify-center hover:border-primary/40 transition-all">
              <ChevronLeft className="w-4 h-4 text-foreground" />
            </button>
            <div className="flex gap-1.5">
              {offres.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`h-1.5 rounded-full transition-all ${i === current ? "bg-primary w-4" : "bg-border w-1.5"}`} />
              ))}
            </div>
            <button onClick={() => setCurrent(1)} className="w-9 h-9 rounded-full border border-border bg-card flex items-center justify-center hover:border-primary/40 transition-all">
              <ChevronRight className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}