import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

export default function ContactSection() {
  const [form, setForm] = useState({ nom: "", email: "", type: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
    try {
      await fetch(scriptUrl, {
        method: "POST",
        body: JSON.stringify({
          date: new Date().toLocaleString("fr-FR"),
          nom: form.nom,
          email: form.email,
          type: form.type,
        }),
      });
      toast.success("Message envoyé !");
      setForm({ nom: "", email: "", type: "" });
    } catch {
      toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-secondary/20">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 sm:mb-12 text-center">
          <span className="text-primary text-xs sm:text-sm font-medium tracking-widest uppercase">Contact</span>
          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-2 sm:mt-3 leading-tight">
            Construisons ce pont ensemble
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-3 max-w-xl mx-auto leading-relaxed">
            Vous traversez une crise, une transition ou cherchez un espace confidentiel pour asseoir vos décisions ?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left: Contact info */}
          <div className="space-y-6">
            <div>
              <h3 className="font-cormorant text-xl sm:text-2xl font-bold text-foreground mb-4">Informations de contact</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Je suis disponible pour un premier échange. N'hésitez pas à me contacter directement ou à remplir le formulaire.
              </p>
            </div>

            <div className="space-y-4">
              <a href="mailto:Eric@faireunpont.fr" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium text-foreground">Eric@faireunpont.fr</p>
                </div>
              </a>

              <a href="tel:+33624477777" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Téléphone</p>
                  <p className="text-sm font-medium text-foreground">+33 6 24 47 77 77</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Adresse</p>
                  <p className="text-sm font-medium text-foreground">17, rue Dupont d'Urville — Paris 16</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-5">
            <div>
              <label className="text-xs font-semibold text-primary tracking-widest uppercase mb-2 block">Nom et prénom</label>
              <input
                type="text"
                required
                value={form.nom}
                onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
                placeholder="Jean Dupont"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-primary tracking-widest uppercase mb-2 block">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="jean@exemple.fr"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-primary tracking-widest uppercase mb-2 block">Type de coaching</label>
              <div className="space-y-2">
                {["Coaching de transformation", "Coaching de crise"].map((option) => (
                  <label key={option} className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${form.type === option ? "border-primary/40 bg-primary/5" : "border-border bg-background hover:border-primary/20"}`}>
                    <input
                      type="radio"
                      name="type"
                      value={option}
                      checked={form.type === option}
                      onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                      className="accent-primary"
                      required
                    />
                    <span className="text-sm text-foreground">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-medium text-sm hover:bg-primary/90 transition-all disabled:opacity-60"
            >
              <Send className="w-4 h-4" />
              {sending ? "Envoi en cours…" : "Envoyer le message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}