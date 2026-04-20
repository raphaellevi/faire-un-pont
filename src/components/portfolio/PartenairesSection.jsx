import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const partenaires = [
  {
    name: "Sandrine Gruda",
    specialite: "Coaching de motivation",
    fondateur: "Sandrine Gruda est fondatrice de Philosophie Gruda",
    description:
      "Coach certifiée HEC Executive Coaching, Sandrine Gruda accompagne les dirigeants et managers dans la reconquête de leur élan intérieur. Ancienne sportive de haut niveau, meilleure marqueuse de l'histoire de la sélection française de Basket Ball pour les Jeux Olympiques, elle a développé une approche unique qui puise dans la psychologie de la performance pour aider ses coachés à retrouver motivation, engagement et plaisir dans leur action professionnelle.",
    initial: "SG",
  },
  {
    name: "Laurent Courbon",
    specialite: "Coaching de santé",
    fondateur: "Laurent Courbon est fondateur de Austral",
    description:
      "Titulaire du Certificat Health Coach du Harvard Medical School et coach certifié HEC Executive Coaching, Laurent Courbon est spécialiste de la santé des dirigeants. Il intervient à l'intersection du bien-être physique, de la gestion du stress et de la performance durable. Son approche intégrative aide les leaders à prendre soin d'eux-mêmes comme une condition sine qua non de leur efficacité et de leur longévité professionnelle.",
    initial: "LC",
  },
  {
    name: "Hervé Charlannes",
    specialite: "Coaching & Intelligence Artificielle",
    fondateur: "Hervé Charlannes est fondateur de Robulience®",
    description:
      "Coach certifié HEC Executive Coaching, Expert-Comptable et Commissaire aux comptes, Hervé Charlannes réalise une veille technologique de premier plan pour la Compagnie Nationale des Commissaires aux Comptes et intègre pleinement l'IA dans sa manière de coacher en conciliant innovation technologique et dimension humaine.",
    initial: "HC",
  },
  {
    name: "Sandrine Lagarde",
    specialite: "Coaching & Relais psychothérapeutique",
    description:
      "Psychothérapeute en exercice, diplômée d'HEC et coach certifiée HEC Executive Coaching, Sandrine Lagarde opère à la frontière du coaching et de la thérapie. Elle assure un accompagnement de profondeur pour les dirigeants dont les blocages dépassent le cadre professionnel et nécessitent un travail plus introspectif. Son rôle de relais garantit une continuité de soin entre le coaching et la thérapie, dans le respect de chaque parcours. Elle est mobilisée dès qu'un potentiel burn-out est identifié.",
    initial: "SL",
  },
];

export default function PartenairesSection() {
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i - 1 + partenaires.length) % partenaires.length);
  const next = () => setIdx((i) => (i + 1) % partenaires.length);
  const p = partenaires[idx];

  return (
    <section id="partenaires" className="py-12 sm:py-16 px-4 sm:px-6 bg-background">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 sm:mb-12 text-center">
          <span className="text-primary text-xs sm:text-sm font-medium tracking-widest uppercase">Réseau</span>
          <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-3 leading-tight">
            Partenaires coachs HEC
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Un réseau de coachs certifiés HEC, chacun expert dans son domaine.
          </p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-10 min-h-[220px]">
          <div className="flex items-center gap-3 sm:gap-4 mb-5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-primary font-bold text-base sm:text-lg font-cormorant">{p.initial}</span>
            </div>
            <div>
              <h3 className="font-cormorant text-lg sm:text-xl font-bold text-foreground leading-tight">{p.name}</h3>
              <p className="text-primary text-xs sm:text-sm font-medium italic">{p.specialite}</p>
            </div>
          </div>
          {p.fondateur && (
            <p className="text-sm font-medium text-foreground mb-3 italic">{p.fondateur}</p>
          )}
          <p className="text-muted-foreground text-sm leading-relaxed">{p.description}</p>
          <div className="mt-5 pt-4 border-t border-border">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">Coach certifié HEC Executive Coaching</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-5">
          <button onClick={prev} className="w-9 h-9 rounded-full border border-border bg-card flex items-center justify-center hover:border-primary/40 hover:bg-primary/5 transition-all">
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>

          <div className="flex gap-1.5">
            {partenaires.map((_, i) => (
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