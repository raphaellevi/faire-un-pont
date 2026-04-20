import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Refonte E-Commerce",
    category: "Design & Développement",
    description: "Refonte complète d'une boutique en ligne avec une expérience utilisateur repensée de A à Z.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    year: "2024",
  },
  {
    title: "Application Mobile",
    category: "UI/UX Design",
    description: "Conception d'une application de gestion du bien-être, de la recherche utilisateur aux prototypes finaux.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    year: "2024",
  },
  {
    title: "Identité de Marque",
    category: "Branding",
    description: "Création d'une identité visuelle forte pour une startup tech parisienne en pleine croissance.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    year: "2023",
  },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projets" ref={ref} className="py-32 px-6 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase">Projets</span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mt-3 leading-tight">
            Sélection de travaux
          </h2>
        </motion.div>

        <div className="space-y-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group grid md:grid-cols-[1fr_2fr] gap-0 overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 cursor-pointer"
            >
              {/* Image */}
              <div className="h-52 md:h-auto overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Content */}
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-primary font-medium tracking-widest uppercase">{project.category}</span>
                    <span className="text-xs text-muted-foreground">{project.year}</span>
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-foreground mb-3">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all duration-300">
                  Voir le projet
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}