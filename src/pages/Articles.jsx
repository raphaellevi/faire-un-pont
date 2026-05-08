import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStoryblokApi } from "@storyblok/react";
import { ArrowRight, Calendar } from "lucide-react";
import Navbar from "@/components/portfolio/Navbar";

export default function Articles() {
  const storyblokApi = useStoryblokApi();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!storyblokApi?.get) { setLoading(false); return; }
    storyblokApi
      .get("cdn/stories", {
        starts_with: "articles/",
        version: import.meta.env.DEV ? "draft" : "published",
        sort_by: "first_published_at:desc",
      })
      .then(({ data }) => setArticles(data.stories))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, [storyblokApi]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Header */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-12">
        <span className="text-primary text-xs font-medium tracking-widest uppercase">Publications</span>
        <h1 className="font-cormorant text-4xl sm:text-5xl font-bold text-foreground mt-2 leading-tight">
          Blog & Articles
        </h1>
        <p className="text-muted-foreground mt-4 text-base leading-relaxed max-w-xl">
          Des textes sur le dirigeant, la crise, la transformation, et l'humain derrière le rôle.
        </p>
      </div>

      {/* Articles */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-24">
        {loading && (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-secondary/30 rounded-2xl animate-pulse" />
            ))}
          </div>
        )}

        {!loading && articles.length === 0 && (
          <p className="text-muted-foreground text-center py-16">Aucun article publié pour le moment.</p>
        )}

        {!loading && articles.length > 0 && (
          <div className="space-y-4">
            {articles.map((article) => (
              <Link
                key={article.uuid}
                to={`/blog/${article.slug}`}
                className="group block bg-card border border-border rounded-2xl p-6 sm:p-8 hover:border-primary/30 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {article.content.categorie && (
                      <span className="text-primary text-xs font-semibold tracking-widest uppercase mb-2 block">
                        {article.content.categorie}
                      </span>
                    )}
                    <h2 className="font-cormorant text-xl sm:text-2xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                      {article.content.titre || article.name}
                    </h2>
                    {article.content.resume && (
                      <p className="text-muted-foreground text-sm mt-2 leading-relaxed line-clamp-2">
                        {article.content.resume}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(article.first_published_at || article.created_at).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
