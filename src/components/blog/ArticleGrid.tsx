import Icon from "@/components/ui/icon";
import type { Article } from "@/components/blog/FeaturedArticle";

/* ───── categories ───── */

const CATEGORIES = [
  { key: null, label: "Все", icon: "LayoutGrid" },
  { key: "updates", label: "Обновления", icon: "RefreshCw" },
  { key: "security", label: "Безопасность", icon: "Shield" },
  { key: "guides", label: "Гайды", icon: "BookOpen" },
  { key: "news", label: "Новости", icon: "Newspaper" },
];

/* ───── props ───── */

interface ArticleGridProps {
  articles: Article[];
  activeCategory: string | null;
  setActiveCategory: (value: string | null) => void;
}

/* ───── component ───── */

export default function ArticleGrid({
  articles,
  activeCategory,
  setActiveCategory,
}: ArticleGridProps) {
  return (
    <>
      {/* Category filter */}
      <section className="px-5 pb-6">
        <div className="max-w-7xl mx-auto">
          <div
            className="flex flex-wrap gap-2 animate-fade-up"
            style={{ animationDelay: ".3s", opacity: 0 }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key ?? "all"}
                onClick={() => setActiveCategory(cat.key)}
                className={`inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-xl transition-all ${
                  activeCategory === cat.key
                    ? "bg-v-500 text-white shadow-sm"
                    : "bg-white text-gray-400 border border-gray-200 hover:border-v-200 hover:text-v-600 hover:bg-v-50"
                }`}
              >
                <Icon name={cat.icon} size={15} />
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Article grid */}
      <section className="px-5 pb-20">
        <div className="max-w-7xl mx-auto">
          {articles.length === 0 ? (
            <div
              className="text-center py-20 animate-fade-up"
              style={{ animationDelay: ".35s", opacity: 0 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
                <Icon name="FileX" size={24} className="text-gray-300" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">
                Статей в этой категории пока нет
              </p>
              <p className="text-sm text-gray-400">
                Попробуйте выбрать другую категорию
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {articles.map((article, i) => (
                <article
                  key={article.slug}
                  className="group rounded-2xl border border-gray-100 bg-white overflow-hidden hover:border-v-200 hover:shadow-lg transition-all animate-fade-up"
                  style={{
                    animationDelay: `${0.35 + i * 0.06}s`,
                    opacity: 0,
                  }}
                >
                  {/* Image placeholder */}
                  <div
                    className={`${article.placeholderBg} flex items-center justify-center h-44`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <Icon
                        name={article.icon}
                        size={22}
                        className="text-v-500"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="text-[10px] font-bold text-v-600 bg-v-50 rounded-full px-2.5 py-0.5">
                        {article.catLabel}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-foreground mb-2 leading-snug group-hover:text-v-600 transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Icon name="Calendar" size={12} />
                        {article.date}
                      </div>
                      <div className="flex items-center gap-3.5">
                        <span className="flex items-center gap-1 text-xs text-gray-400 hover:text-v-500 transition-colors cursor-pointer">
                          <Icon name="ThumbsUp" size={12} />
                          {article.likes}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-400 hover:text-v-500 transition-colors cursor-pointer">
                          <Icon name="MessageCircle" size={12} />
                          {article.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}