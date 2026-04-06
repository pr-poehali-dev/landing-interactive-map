import Icon from "@/components/ui/icon";

/* ───── article data ───── */

export type Article = {
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

export const ARTICLES: Article[] = [
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

/* ───── props ───── */

interface FeaturedArticleProps {
  article: Article;
}

/* ───── component ───── */

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <section className="px-5 pb-16">
      <div className="max-w-7xl mx-auto">
        <div
          className="group rounded-2xl border border-gray-100 bg-white overflow-hidden hover:border-v-200 hover:shadow-lg transition-all animate-fade-up"
          style={{ animationDelay: ".25s", opacity: 0 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image placeholder */}
            <div
              className={`${article.placeholderBg} flex items-center justify-center min-h-[240px] lg:min-h-[340px]`}
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-white/80 flex items-center justify-center shadow-sm">
                  <Icon name={article.icon} size={28} className="text-v-500" />
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
                  {article.catLabel}
                </span>
                <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 rounded-full px-3 py-1">
                  Рекомендуем
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3 group-hover:text-v-600 transition-colors">
                {article.title}
              </h2>

              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                {article.excerpt}
              </p>

              <div className="flex items-center gap-5 mb-6">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Icon name="Calendar" size={13} />
                  {article.date}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Icon name="Clock" size={13} />
                  {article.readTime}
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
                    {article.likes}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Icon name="MessageCircle" size={13} />
                    {article.comments}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
