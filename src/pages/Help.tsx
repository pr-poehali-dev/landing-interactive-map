import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";

/* ───── setup guides ───── */

const GUIDES = [
  {
    icon: "Smartphone",
    title: "Настройка Happ",
    steps: "5 шагов",
    desc: "Установите приложение Happ на iOS или Android, импортируйте конфигурацию по ссылке и подключитесь к VPN за 2 минуты.",
    tags: ["iOS", "Android"],
  },
  {
    icon: "Wifi",
    title: "Настройка OpenWrt",
    steps: "10 шагов",
    desc: "Пошаговая инструкция по настройке VPN-подключения на роутерах с прошивкой OpenWrt. Поддержка Xray и Shadowsocks.",
    tags: ["Router", "OpenWrt"],
  },
  {
    icon: "Router",
    title: "Настройка Keenetic",
    steps: "8 шагов",
    desc: "Подключение VORTEX VPN на роутерах Keenetic через встроенный VPN-клиент. Не требует сторонних прошивок.",
    tags: ["Router", "Keenetic"],
  },
  {
    icon: "Code2",
    title: "Настройка VLESS",
    steps: "6 шагов",
    desc: "Импорт VLESS-конфигурации в популярные клиенты: v2rayN, v2rayNG, Nekoray, Shadowrocket и Clash.",
    tags: ["Desktop", "Mobile"],
  },
];

/* ───── faq data ───── */

const FAQ_ITEMS = [
  {
    q: "Как начать пользоваться VORTEX VPN?",
    a: "Выберите тариф на странице «Тарифы», оплатите удобным способом (карта, СБП, криптовалюта). После оплаты вы мгновенно получите ссылку на конфигурацию. Импортируйте её в приложение Happ или любой совместимый клиент. Весь процесс занимает не более 2 минут.",
    cat: "start",
  },
  {
    q: "Какие протоколы поддерживаются?",
    a: "VORTEX VPN поддерживает Xray/VLESS, VMess, Trojan и Shadowsocks. Все протоколы используют обфускацию трафика и не определяются DPI-системами большинства провайдеров. Рекомендуем VLESS как наиболее быстрый и стабильный протокол.",
    cat: "tech",
  },
  {
    q: "Какие способы оплаты доступны?",
    a: "Принимаем банковские карты Visa, Mastercard, МИР, систему быстрых платежей (СБП), а также криптовалюты (BTC, USDT, ETH). Все платежи защищены SSL-шифрованием. Чек автоматически отправляется на email.",
    cat: "pay",
  },
  {
    q: "Можно ли использовать VPN на роутере?",
    a: "Да, мы поддерживаем OpenWrt и Keenetic. В разделе гайдов есть пошаговые инструкции по настройке. Тариф «Роутер» (300 руб/мес) оптимизирован специально для этого сценария и покрывает все устройства в вашей домашней сети.",
    cat: "tech",
  },
  {
    q: "Сколько устройств можно подключить одновременно?",
    a: "Зависит от тарифа: Персональный — 3 устройства, Турбо — 5, Семейный — 8, Бизнес — 20. На тарифе «Роутер» ограничение по устройствам отсутствует, так как VPN работает на уровне маршрутизатора.",
    cat: "sub",
  },
  {
    q: "Что такое заморозка подписки?",
    a: "Вы можете приостановить подписку на срок до 30 дней без потери оставшегося периода. В это время деньги не списываются, а ключ становится неактивным. Разморозить подписку можно в любой момент через личный кабинет или Telegram-бота.",
    cat: "sub",
  },
  {
    q: "Как работает семейный тариф?",
    a: "Семейный тариф (800 руб/мес) включает до 8 устройств, DNS-фильтрацию рекламы и родительский контроль. Каждый член семьи получает индивидуальный профиль с собственными настройками фильтрации. Управление доступно через панель администратора.",
    cat: "sub",
  },
  {
    q: "Как работает реферальная программа?",
    a: "Вы получаете 5% с каждого платежа приглашённого друга (1 уровень), 3% со второго уровня и 1% с третьего. Средства автоматически зачисляются на ваш баланс и могут быть использованы для оплаты подписки или выведены на карту.",
    cat: "pay",
  },
  {
    q: "Что делать, если VPN не подключается?",
    a: "Проверьте подключение к интернету. Попробуйте сменить сервер — выберите ближайший с низким пингом на странице «Локации». Если проблема сохраняется, воспользуйтесь Clash-конвертером для смены протокола. Также можно обратиться в поддержку через Telegram-бота.",
    cat: "tech",
  },
  {
    q: "Хранит ли VORTEX VPN логи активности?",
    a: "Нет. Мы придерживаемся строгой Zero-log политики. Серверы работают в RAM-only режиме — при перезагрузке все данные полностью уничтожаются. Мы не фиксируем, какие сайты вы посещаете, какие файлы скачиваете и когда подключаетесь.",
    cat: "tech",
  },
  {
    q: "Можно ли получить выделенный IP-адрес?",
    a: "Да, выделенный IP доступен на тарифе «Бизнес» (1 500 руб/мес). Вы получаете персональный статический IP, который не используется другими пользователями. Это удобно для доступа к корпоративным ресурсам и сервисам с IP-фильтрацией.",
    cat: "sub",
  },
  {
    q: "Как обновить или сменить тариф?",
    a: "Перейдите в личный кабинет или напишите Telegram-боту. Смена тарифа происходит мгновенно. При переходе на более дорогой тариф оплата пересчитывается пропорционально оставшемуся периоду. При понижении разница зачисляется на баланс.",
    cat: "pay",
  },
];

/* ───── contact cards ───── */

const CONTACTS = [
  {
    icon: "Send",
    title: "Telegram-бот",
    desc: "Мгновенный ответ на любой вопрос. Бот знает контекст вашей подписки и помогает с настройкой.",
    badge: "24/7",
    action: "Открыть бот",
    href: "#",
  },
  {
    icon: "Mail",
    title: "Email поддержка",
    desc: "Напишите на support@vortexvpn.com для сложных вопросов. Среднее время ответа — менее часа.",
    badge: "< 1 час",
    action: "Написать",
    href: "mailto:support@vortexvpn.com",
  },
  {
    icon: "BookOpen",
    title: "База знаний",
    desc: "Более 100 статей с инструкциями, скриншотами и видео. Ответы на 95% вопросов уже здесь.",
    badge: "100+ статей",
    action: "Перейти",
    href: "#",
  },
];

/* ───── popular articles ───── */

const ARTICLES = [
  { icon: "Download", title: "Как скачать и установить Happ на Android" },
  { icon: "Key", title: "Импорт VLESS-ключа в Shadowrocket (iOS)" },
  { icon: "Repeat", title: "Конвертация конфигурации через Clash" },
  { icon: "Gauge", title: "Как проверить скорость VPN-соединения" },
  { icon: "ShieldOff", title: "VPN не подключается — пошаговая диагностика" },
  { icon: "Users", title: "Настройка родительского контроля в семейном тарифе" },
];

/* ───── FAQ accordion item ───── */

function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="text-sm font-semibold text-foreground">{q}</span>
        <Icon
          name={open ? "ChevronUp" : "ChevronDown"}
          size={18}
          className="text-gray-400 shrink-0"
        />
      </button>
      <div
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm text-gray-500 leading-relaxed pb-5">{a}</p>
        </div>
      </div>
    </div>
  );
}

/* ───── main component ───── */

export default function Help() {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = [
    { key: null, label: "Все" },
    { key: "start", label: "Начало работы" },
    { key: "tech", label: "Технические" },
    { key: "sub", label: "Подписка" },
    { key: "pay", label: "Оплата" },
  ];

  const filteredFaq = useMemo(() => {
    const q = search.toLowerCase().trim();
    return FAQ_ITEMS.filter((item) => {
      const matchSearch =
        !q ||
        item.q.toLowerCase().includes(q) ||
        item.a.toLowerCase().includes(q);
      const matchCat = !activeCategory || item.cat === activeCategory;
      return matchSearch && matchCat;
    });
  }, [search, activeCategory]);

  const filteredGuides = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return GUIDES;
    return GUIDES.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.desc.toLowerCase().includes(q) ||
        g.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [search]);

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-v-50 via-white to-emerald-50/30" />
        <div className="relative max-w-7xl mx-auto px-5 text-center">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-v-600 bg-v-50 border border-v-100 rounded-full px-4 py-1.5 mb-6 animate-fade-up">
            <Icon name="LifeBuoy" size={14} />
            Поддержка 24/7
          </div>

          <h1
            className="text-4xl md:text-[3.25rem] font-extrabold text-foreground leading-[1.12] tracking-tight mb-5 animate-fade-up"
            style={{ animationDelay: ".1s", opacity: 0 }}
          >
            Центр <span className="text-v-500">помощи</span>
          </h1>

          <p
            className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-up"
            style={{ animationDelay: ".2s", opacity: 0 }}
          >
            Гайды по настройке, ответы на частые вопросы и прямая связь с
            поддержкой. Найдите решение за минуту.
          </p>

          {/* Search bar */}
          <div
            className="max-w-xl mx-auto animate-fade-up"
            style={{ animationDelay: ".3s", opacity: 0 }}
          >
            <div className="relative">
              <Icon
                name="Search"
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Поиск по вопросам, гайдам, статьям..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-12 py-4 text-sm rounded-2xl border border-gray-200 bg-white shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-v-300 focus:ring-2 focus:ring-v-100 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Icon name="X" size={16} />
                </button>
              )}
            </div>
            {search && (
              <p className="text-xs text-gray-400 mt-3">
                Найдено: {filteredGuides.length} гайдов, {filteredFaq.length}{" "}
                вопросов
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Quick setup guides */}
      <section className="px-5 pb-20">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-3 animate-fade-up"
          >
            Быстрая настройка
          </h2>
          <p
            className="text-sm text-gray-500 text-center mb-10 animate-fade-up"
            style={{ animationDelay: ".05s", opacity: 0 }}
          >
            Пошаговые гайды для каждой платформы
          </p>

          {filteredGuides.length === 0 ? (
            <div className="text-center py-12 animate-fade-up">
              <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
                <Icon name="SearchX" size={24} className="text-gray-300" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">
                Гайды не найдены
              </p>
              <p className="text-sm text-gray-400">
                Попробуйте изменить поисковый запрос
              </p>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-up"
              style={{ animationDelay: ".1s", opacity: 0 }}
            >
              {filteredGuides.map((guide) => (
                <div
                  key={guide.title}
                  className="group relative rounded-2xl border border-gray-100 bg-white p-7 hover:border-v-200 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-v-50 group-hover:bg-v-500 flex items-center justify-center shrink-0 transition-colors">
                      <Icon
                        name={guide.icon}
                        size={22}
                        className="text-v-500 group-hover:text-white transition-colors"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5 mb-2">
                        <h3 className="text-base font-bold text-foreground">
                          {guide.title}
                        </h3>
                        <span className="text-[11px] font-semibold text-v-600 bg-v-50 rounded-full px-2.5 py-0.5 shrink-0">
                          {guide.steps}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed mb-4">
                        {guide.desc}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {guide.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-semibold text-gray-500 bg-gray-50 rounded px-2 py-0.5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-v-500 group-hover:text-v-600 transition-colors">
                          Открыть гайд
                          <Icon name="ArrowRight" size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 pb-20 pt-20 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-3 animate-fade-up"
          >
            Частые вопросы
          </h2>
          <p
            className="text-sm text-gray-500 text-center mb-8 animate-fade-up"
            style={{ animationDelay: ".05s", opacity: 0 }}
          >
            Ответы на самые популярные вопросы наших пользователей
          </p>

          {/* Category filter */}
          <div
            className="flex flex-wrap justify-center gap-2 mb-8 animate-fade-up"
            style={{ animationDelay: ".1s", opacity: 0 }}
          >
            {categories.map((cat) => (
              <button
                key={cat.key ?? "all"}
                onClick={() => setActiveCategory(cat.key)}
                className={`text-sm font-medium px-4 py-2 rounded-xl transition-all ${
                  activeCategory === cat.key
                    ? "bg-v-500 text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-v-200 hover:text-v-600"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div
            className="rounded-2xl border border-gray-200 bg-white shadow-sm px-6 animate-fade-up"
            style={{ animationDelay: ".15s", opacity: 0 }}
          >
            {filteredFaq.length === 0 ? (
              <div className="text-center py-12">
                <Icon
                  name="HelpCircle"
                  size={28}
                  className="text-gray-300 mx-auto mb-3"
                />
                <p className="text-sm font-semibold text-foreground mb-1">
                  Вопросы не найдены
                </p>
                <p className="text-sm text-gray-400">
                  Попробуйте изменить запрос или категорию
                </p>
              </div>
            ) : (
              filteredFaq.map((item, i) => (
                <FaqItem
                  key={item.q}
                  q={item.q}
                  a={item.a}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="px-5 py-20">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-3 animate-fade-up"
          >
            Свяжитесь с нами
          </h2>
          <p
            className="text-sm text-gray-500 text-center mb-10 animate-fade-up"
            style={{ animationDelay: ".05s", opacity: 0 }}
          >
            Выберите удобный способ связи с командой поддержки
          </p>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-up"
            style={{ animationDelay: ".1s", opacity: 0 }}
          >
            {CONTACTS.map((c) => (
              <a
                key={c.title}
                href={c.href}
                className="group rounded-2xl border border-gray-100 bg-white p-7 hover:border-v-200 hover:shadow-lg transition-all text-left block"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-v-50 group-hover:bg-v-500 flex items-center justify-center transition-colors">
                    <Icon
                      name={c.icon}
                      size={22}
                      className="text-v-500 group-hover:text-white transition-colors"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-v-600 bg-v-50 rounded-full px-3 py-1">
                    {c.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">
                  {c.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">
                  {c.desc}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-v-500 group-hover:text-v-600 transition-colors">
                  {c.action}
                  <Icon name="ArrowRight" size={14} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Popular articles */}
      <section className="px-5 pb-20">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-3 animate-fade-up"
          >
            Популярные статьи
          </h2>
          <p
            className="text-sm text-gray-500 text-center mb-8 animate-fade-up"
            style={{ animationDelay: ".05s", opacity: 0 }}
          >
            Чаще всего читают в этом месяце
          </p>

          <div
            className="rounded-2xl border border-gray-100 bg-white shadow-sm divide-y divide-gray-50 animate-fade-up"
            style={{ animationDelay: ".1s", opacity: 0 }}
          >
            {ARTICLES.map((article, i) => (
              <a
                key={article.title}
                href="#"
                className="flex items-center gap-4 px-6 py-4 hover:bg-v-50/40 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-gray-50 group-hover:bg-v-50 flex items-center justify-center shrink-0 transition-colors">
                  <Icon
                    name={article.icon}
                    size={16}
                    className="text-gray-400 group-hover:text-v-500 transition-colors"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold text-foreground group-hover:text-v-600 transition-colors">
                    {article.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-semibold text-gray-400">
                    #{i + 1}
                  </span>
                  <Icon
                    name="ChevronRight"
                    size={14}
                    className="text-gray-300 group-hover:text-v-400 transition-colors"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-20">
        <div className="max-w-3xl mx-auto">
          <div
            className="relative rounded-2xl bg-gradient-to-br from-v-500 to-v-700 p-10 md:p-14 text-center overflow-hidden animate-fade-up"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_60%)]" />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
                Не нашли ответ?
              </h2>
              <p className="text-sm text-white/70 mb-8 max-w-md mx-auto leading-relaxed">
                Наш Telegram-бот с AI-ассистентом знает всё о VORTEX VPN и вашей
                подписке. Ответ за секунды, 24 часа в сутки.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-v-700 bg-white hover:bg-gray-50 px-7 py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md"
                >
                  <Icon name="Send" size={16} />
                  Написать в Telegram
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
