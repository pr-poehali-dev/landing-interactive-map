import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";

/* ───── article data ───── */

type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  catLabel: string;
  icon: string;
  placeholderBg: string;
  likes: number;
  comments: number;
};

const ARTICLES: Article[] = [
  {
    slug: "swiss-servers",
    title: "Новые серверы в Швейцарии",
    excerpt:
      "Запущены 3 новых сервера в Цюрихе с поддержкой VLESS и Trojan. Средний пинг из Москвы -- 28 мс, нагрузка не превышает 15%. Идеальный выбор для пользователей, которым важна максимальная приватность.",
    date: "28 мар 2025",
    readTime: "3 мин",
    category: "updates",
    catLabel: "Обновления",
    icon: "Server",
    placeholderBg: "bg-v-50",
    likes: 84,
    comments: 12,
  },
  {
    slug: "clash-converter-update",
    title: "Обновление Clash-конвертера",
    excerpt:
      "Добавлена поддержка правил маршрутизации и split-tunneling. Теперь можно гибко настраивать, какой трафик идёт через VPN, а какой напрямую. Работает со всеми версиями Clash.",
    date: "15 мар 2025",
    readTime: "4 мин",
    category: "updates",
    catLabel: "Обновления",
    icon: "Repeat",
    placeholderBg: "bg-emerald-50",
    likes: 67,
    comments: 8,
  },
  {
    slug: "family-plan",
    title: "Семейный тариф -- что нового?",
    excerpt:
      "Новый тариф для семьи: DNS-фильтрация рекламы, родительский контроль, до 8 устройств. Каждый член семьи получает индивидуальный профиль с собственными настройками безопасности.",
    date: "2 мар 2025",
    readTime: "5 мин",
    category: "news",
    catLabel: "Новости",
    icon: "Users",
    placeholderBg: "bg-teal-50",
    likes: 112,
    comments: 23,
  },
  {
    slug: "vless-vs-trojan",
    title: "Как выбрать VPN-протокол: VLESS vs Trojan",
    excerpt:
      "Подробное сравнение двух самых популярных протоколов. Разбираем скорость, стабильность, обфускацию и совместимость с DPI-системами. Рекомендации для разных сценариев использования.",
    date: "20 фев 2025",
    readTime: "8 мин",
    category: "guides",
    catLabel: "Гайды",
    icon: "Code2",
    placeholderBg: "bg-v-100",
    likes: 156,
    comments: 31,
  },
  {
    slug: "5-reasons-vpn-2025",
    title: "5 причин использовать VPN в 2025 году",
    excerpt:
      "Защита на публичных Wi-Fi, обход региональных ограничений, приватность от провайдера, безопасный удалённый доступ и защита от DPI -- пять ключевых сценариев, когда VPN необходим.",
    date: "10 фев 2025",
    readTime: "6 мин",
    category: "security",
    catLabel: "Безопасность",
    icon: "Shield",
    placeholderBg: "bg-emerald-50",
    likes: 203,
    comments: 18,
  },
  {
    slug: "router-setup-guide",
    title: "Настройка VPN на роутере -- полный гайд",
    excerpt:
      "Пошаговая инструкция по настройке VORTEX VPN на роутерах OpenWrt и Keenetic. Покрываем весь дом одним подключением без установки приложений на каждое устройство.",
    date: "1 фев 2025",
    readTime: "12 мин",
    category: "guides",
    catLabel: "Гайды",
    icon: "Wifi",
    placeholderBg: "bg-teal-50",
    likes: 178,
    comments: 42,
  },
  {
    slug: "zero-log-policy",
    title: "Zero-log политика: что это значит?",
    excerpt:
      "Объясняем, что стоит за нашей политикой нулевых логов. RAM-only серверы, отсутствие записей об активности, независимый аудит. Почему это важно для вашей приватности.",
    date: "25 янв 2025",
    readTime: "7 мин",
    category: "security",
    catLabel: "Безопасность",
    icon: "Lock",
    placeholderBg: "bg-v-50",
    likes: 134,
    comments: 15,
  },
  {
    slug: "ai-assistant-update",
    title: "Обновление AI-ассистента",
    excerpt:
      "Telegram-бот стал умнее: понимает контекст подписки, помогает с диагностикой подключения, рекомендует оптимальный сервер. Время ответа сократилось до 2 секунд.",
    date: "15 янв 2025",
    readTime: "4 мин",
    category: "updates",
    catLabel: "Обновления",
    icon: "Bot",
    placeholderBg: "bg-emerald-50",
    likes: 91,
    comments: 7,
  },
  {
    slug: "2024-results",
    title: "Итоги 2024: цифры и достижения",
    excerpt:
      "94 200+ пользователей, 80 серверов в 15 странах, 99.97% uptime. Запуск семейного тарифа, Clash-конвертера и AI-ассистента. Планы на 2025 год и ближайшие обновления.",
    date: "30 дек 2024",
    readTime: "10 мин",
    category: "news",
    catLabel: "Новости",
    icon: "BarChart3",
    placeholderBg: "bg-v-100",
    likes: 247,
    comments: 56,
  },
];

/* ───── categories ───── */

const CATEGORIES = [
  { key: null, label: "Все", icon: "LayoutGrid" },
  { key: "updates", label: "Обновления", icon: "RefreshCw" },
  { key: "security", label: "Безопасность", icon: "Shield" },
  { key: "guides", label: "Гайды", icon: "BookOpen" },
  { key: "news", label: "Новости", icon: "Newspaper" },
];

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
        <div className="absolute inset-0 bg-gradient-to-br from-v-50 via-white to-emerald-50/30" />
        <div className="relative max-w-7xl mx-auto px-5 text-center">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-v-600 bg-v-50 border border-v-100 rounded-full px-4 py-1.5 mb-6 animate-fade-up">
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

      {/* Featured article */}
      <section className="px-5 pb-16">
        <div className="max-w-7xl mx-auto">
          <div
            className="group rounded-2xl border border-gray-100 bg-white overflow-hidden hover:border-v-200 hover:shadow-lg transition-all animate-fade-up"
            style={{ animationDelay: ".25s", opacity: 0 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image placeholder */}
              <div
                className={`${featured.placeholderBg} flex items-center justify-center min-h-[240px] lg:min-h-[340px]`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-white/80 flex items-center justify-center shadow-sm">
                    <Icon name={featured.icon} size={28} className="text-v-500" />
                  </div>
                  <span className="text-xs font-semibold text-v-600/60">
                    VORTEX VPN
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[11px] font-bold text-white bg-v-500 rounded-full px-3 py-1">
                    {featured.catLabel}
                  </span>
                  <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 rounded-full px-3 py-1">
                    Рекомендуем
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3 group-hover:text-v-600 transition-colors">
                  {featured.title}
                </h2>

                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  {featured.excerpt}
                </p>

                <div className="flex items-center gap-5 mb-6">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Icon name="Calendar" size={13} />
                    {featured.date}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Icon name="Clock" size={13} />
                    {featured.readTime}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-v-500 group-hover:text-v-600 transition-colors">
                    Читать статью
                    <Icon name="ArrowRight" size={16} />
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Icon name="ThumbsUp" size={13} />
                      {featured.likes}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Icon name="MessageCircle" size={13} />
                      {featured.comments}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                    : "bg-white text-gray-600 border border-gray-200 hover:border-v-200 hover:text-v-600 hover:bg-v-50"
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
          {filteredArticles.length === 0 ? (
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
              {filteredArticles.map((article, i) => (
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

      {/* Newsletter / Subscribe */}
      <section className="px-5 pb-20">
        <div className="max-w-3xl mx-auto">
          <div
            className="relative rounded-2xl bg-gradient-to-br from-v-500 to-v-700 p-10 md:p-14 text-center overflow-hidden animate-fade-up"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_60%)]" />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
                Не пропустите обновления
              </h2>
              <p className="text-sm text-white/70 mb-8 max-w-md mx-auto leading-relaxed">
                Подпишитесь на Telegram-канал VORTEX VPN, чтобы первым узнавать о
                новых серверах, обновлениях и акциях.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-v-700 bg-white hover:bg-gray-50 px-7 py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md"
                >
                  <Icon name="Send" size={16} />
                  Telegram-канал
                </a>
                <Link
                  to="/tariffs"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white border border-white/20 hover:border-white/40 px-7 py-3.5 rounded-xl transition-all"
                >
                  Выбрать тариф
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
