import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Save, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

const DEFAULT_CONTENT = [
  // Hero
  { section: "hero", key: "titre", value: "Faire un Pont®" },
  { section: "hero", key: "sous_titre", value: "L'accompagnement des dirigeants en crise comme en transformation" },
  { section: "hero", key: "auteur", value: "Éric Guedj" },
  { section: "hero", key: "description", value: "Personne ne se lève le matin en cherchant un coach, mais… parfois le terrain devient instable et il faut créer un passage solide." },
  // About
  { section: "about", key: "intro_p1", value: "Originaire de Constantine — la « ville des ponts suspendus » — Éric Guedj a construit une double expertise rare : 20 ans à la tête d'Exelmans, cabinet d'audit et de transaction services, aux côtés de plus de 200 dirigeants en situation de crise ou de transition." },
  { section: "about", key: "intro_p2", value: "Cette expérience opérationnelle, alliée à une formation approfondie en coaching et en psychologie, lui permet d'intervenir là où la technique seule ne suffit plus — au croisement de la décision, de la posture et du sens." },
  { section: "about", key: "citation", value: "Aider les dirigeants à retrouver leur centre décisionnel." },
  // Piliers
  { section: "piliers", key: "transformation_description", value: "Construire un pont entre l'identité profonde du dirigeant et son rôle stratégique. Un travail structuré sur la posture de leadership, la cohérence stratégique et l'alignement personnel — pour des décisions plus rapides et une autorité plus stable." },
  { section: "piliers", key: "crise_description", value: "En période de crise, la première ressource de l'entreprise n'est pas financière, elle est psychique. Un dirigeant submergé transmet son instabilité au système : les équipes se crispent, les décisions deviennent impulsives ou paralysées." },
  { section: "piliers", key: "existentiel_description", value: "Le dirigeant continue à agir, mais l'élan intérieur s'érode. Le coaching existentiel permet de revisiter les valeurs, la liberté réelle et la trajectoire personnelle. L'objectif : retrouver un moteur intérieur solide." },
  { section: "piliers", key: "emotionnel_description", value: "À bout de force, éreintés par les ruminations et la fatigue décisionnelle, le dirigeant n'a plus de recul. Des séances de « dépressurisation » pour restaurer rapidement la clarté mentale et la préserver dans la durée." },
  // Contact
  { section: "contact", key: "email", value: "eric.guedj@faireuneont.fr" },
  { section: "contact", key: "telephone", value: "+33 6 00 00 00 00" },
  { section: "contact", key: "adresse", value: "Paris, France" },
];

const SECTION_LABELS = {
  hero: "Héro (Accueil)",
  about: "Qui suis-je",
  piliers: "Les 4 Piliers",
  contact: "Contact",
};

const KEY_LABELS = {
  titre: "Titre principal", sous_titre: "Sous-titre",
  auteur: "Nom de l'auteur", description: "Description",
  intro_p1: "Paragraphe 1", intro_p2: "Paragraphe 2", citation: "Citation",
  transformation_description: "Coaching de transformation", crise_description: "Crise financière",
  existentiel_description: "Coaching existentiel", emotionnel_description: "Soutien émotionnel",
  email: "Email", telephone: "Téléphone", adresse: "Adresse",
};

export default function Admin() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({});
  const [openSections, setOpenSections] = useState({ hero: true, about: false, piliers: false, contact: false });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    const existing = await base44.entities.SiteContent.list();
    if (existing.length === 0) {
      // Initialiser avec les contenus par défaut
      const created = await base44.entities.SiteContent.bulkCreate(DEFAULT_CONTENT);
      setContents(created);
    } else {
      setContents(existing);
    }
    setLoading(false);
  };

  const handleChange = (id, newValue) => {
    setContents(prev => prev.map(c => c.id === id ? { ...c, value: newValue } : c));
  };

  const handleSave = async (item) => {
    setSaving(prev => ({ ...prev, [item.id]: true }));
    await base44.entities.SiteContent.update(item.id, { value: item.value });
    setSaving(prev => ({ ...prev, [item.id]: false }));
    toast.success("Sauvegardé !");
  };

  const grouped = contents.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <h1 className="font-cormorant text-3xl font-bold text-foreground mb-2">Éditeur de contenu</h1>
          <p className="text-muted-foreground text-sm">Modifiez les textes du site, puis cliquez sur "Sauvegarder" pour chaque bloc.</p>
        </div>

        <div className="space-y-4">
          {Object.entries(SECTION_LABELS).map(([section, label]) => (
            <div key={section} className="border border-border rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleSection(section)}
                className="w-full flex items-center justify-between px-6 py-4 bg-card hover:bg-secondary/30 transition-colors"
              >
                <span className="font-semibold text-foreground">{label}</span>
                {openSections[section] ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
              </button>

              {openSections[section] && (
                <div className="p-6 space-y-6 bg-card border-t border-border">
                  {(grouped[section] || []).map(item => (
                    <div key={item.id}>
                      <label className="text-xs font-semibold text-primary tracking-widest uppercase mb-2 block">
                        {KEY_LABELS[item.key] || item.key}
                      </label>
                      {item.value.length > 80 ? (
                        <Textarea
                          value={item.value}
                          onChange={e => handleChange(item.id, e.target.value)}
                          className="resize-none min-h-[100px] text-sm"
                        />
                      ) : (
                        <Input
                          value={item.value}
                          onChange={e => handleChange(item.id, e.target.value)}
                          className="text-sm"
                        />
                      )}
                      <div className="flex justify-end mt-2">
                        <Button
                          size="sm"
                          onClick={() => handleSave(item)}
                          disabled={saving[item.id]}
                          className="gap-2"
                        >
                          <Save className="w-3 h-3" />
                          {saving[item.id] ? "Sauvegarde…" : "Sauvegarder"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}