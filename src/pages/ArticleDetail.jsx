import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useStoryblokApi } from "@storyblok/react";
import { renderRichText } from "@storyblok/react";
import { Calendar, ArrowLeft } from "lucide-react";
import Navbar from "@/components/portfolio/Navbar";

export default function ArticleDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const storyblokApi = useStoryblokApi();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    storyblokApi
      .get(`cdn/stories/articles/${slug}`, {
        version: import.meta.env.DEV ? "draft" : "published",
      })
      .then(({ data }) => setArticle(data.story))
      .catch(() => navigate("/blog", { replace: true }))
      .finally(() => setLoading(false));
  }, [slug, storyblokApi, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!article) return null;

  const { content } = article;
  const bodyHtml = content.contenu ? renderRichText(content.contenu) : null;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-24 pb-24">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-primary/70 hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Tous les articles
        </Link>

        {content.categorie && (
          <span className="text-primary text-xs font-semibold tracking-widest uppercase mb-4 block">
            {content.categorie}
          </span>
        )}

        <h1 className="font-cormorant text-3xl sm:text-5xl font-bold text-foreground leading-tight mb-4">
          {content.titre || article.name}
        </h1>

        {content.resume && (
          <p className="text-lg text-muted-foreground font-light leading-relaxed mb-6 border-l-2 border-primary/30 pl-4">
            {content.resume}
          </p>
        )}

        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-10 pb-10 border-b border-border">
          <Calendar className="w-3.5 h-3.5" />
          <span>
            {new Date(article.first_published_at || article.created_at).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          {content.auteur && (
            <>
              <span className="mx-1">·</span>
              <span>{content.auteur}</span>
            </>
          )}
        </div>

        {bodyHtml ? (
          <div
            className="prose prose-neutral max-w-none prose-headings:font-cormorant prose-headings:font-bold prose-a:text-primary prose-blockquote:border-primary/40 prose-blockquote:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
        ) : (
          <p className="text-muted-foreground italic">Contenu à venir.</p>
        )}
      </div>
    </div>
  );
}
