import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";
import FeaturedArticle, { ARTICLES } from "@/components/blog/FeaturedArticle";
import ArticleGrid from "@/components/blog/ArticleGrid";
import BlogCta from "@/components/blog/BlogCta";

/* ───── component ───── */

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const featured = ARTICLES[0];
  const rest = ARTICLES.slice(1);

  const filteredArticles = useMemo(() => {
    if (!activeCategory) return rest;
    return rest.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-5 text-center">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-emerald-300 bg-emerald-500/15 border border-emerald-500/25 rounded-full px-4 py-1.5 mb-6 animate-fade-up">
            <Icon name="PenLine" size={14} />
            Статьи и обновления
          </div>

          <h1
            className="text-4xl md:text-[3.25rem] font-extrabold text-foreground leading-[1.12] tracking-tight mb-5 animate-fade-up"
            style={{ animationDelay: ".1s", opacity: 0 }}
          >
            Блог <span className="text-v-500">VORTEX VPN</span>
          </h1>

          <p
            className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto animate-fade-up"
            style={{ animationDelay: ".2s", opacity: 0 }}
          >
            Новости сервиса, гайды по настройке, статьи о безопасности и
            обновления инфраструктуры. Всё, что нужно знать о VORTEX VPN.
          </p>
        </div>
      </section>

      <FeaturedArticle article={featured} />
      <ArticleGrid
        articles={filteredArticles}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <BlogCta />

      <Footer />
    </>
  );
}