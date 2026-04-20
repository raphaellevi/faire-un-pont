import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const temoignages = [
  {
    text: "Eric est l'une des personnes qui m'ait le plus marqué dans notre profession depuis 30 ans pour son intelligence, sa finesse intellectuelle, son sens de l'humain et son sens de l'humour, presque british…",
    role: "Polytechnicien, fondateur d'un fonds d'investissement"
  },
  {
    text: "Tes précieux conseils vont bien me manquer, mais quelque chose me dit que ton accompagnement bienveillant ne fait que commencer.",
    role: "HEC, Managing Partner d'un fonds d'investissement"
  },
  {
    text: "Ta vision et ton approche parfois originales mais toujours justes m'ont beaucoup apporté ! Au plaisir de se revoir.",
    role: "Managing Partner, fonds d'investissement"
  },
  {
    text: "Tu as sauvé notre société avec Maître B. Je t'en serai éternellement reconnaissant.",
    role: "CEO (3ème génération) d'une entreprise familiale"
  },
  {
    text: "Eric et ses équipes m'ont accompagné pendant une période où les difficultés s'additionnaient. Il a su me soutenir à titre personnel ainsi que dans l'interaction avec mon environnement. Il a su m'aider à tenir bon.",
    role: "Accompagnement de crise"
  },
  {
    text: "Je recommande la sagesse qui imprègne ses interventions.",
    role: "Mission d'Application HEC"
  },
];

export default function TestimonialsSection() {
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i - 1 + temoignages.length) % temoignages.length);
  const next = () => setIdx((i) => (i + 1) % temoignages.length);
  const t = temoignages[idx];

  return (
    <section id="temoignages" className="py-12 sm:py-16 px-4 sm:px-6 bg-secondary/20">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 sm:mb-12 text-center">
          <span className="text-primary text-xs sm:text-sm font-medium tracking-widest uppercase">Témoignages</span>
          <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-foreground mt-2 leading-tight">
            Ce qu'ils disent
          </h2>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-10 min-h-[180px] flex flex-col justify-between">
          <Quote className="w-6 h-6 text-primary/40 mb-4 shrink-0" />
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed italic flex-1">
            "{t.text}"
          </p>
          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">{t.role}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-5">
          <button onClick={prev} className="w-9 h-9 rounded-full border border-border bg-card flex items-center justify-center hover:border-primary/40 hover:bg-primary/5 transition-all">
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>

          {/* Dots */}
          <div className="flex gap-1.5">
            {temoignages.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === idx ? "bg-primary w-4" : "bg-border"}`}
              />
            ))}
          </div>

          <button onClick={next} className="w-9 h-9 rounded-full border border-border bg-card flex items-center justify-center hover:border-primary/40 hover:bg-primary/5 transition-all">
            <ChevronRight className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
}