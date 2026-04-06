import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const SERVERS_IMG = "https://cdn.poehali.dev/projects/873a5974-24fa-404f-a1ef-56c0a5af27b5/files/661a801c-b2a9-4a99-b77c-0bd4d70d6d82.jpg";
const ANALYTICS_IMG = "https://cdn.poehali.dev/projects/873a5974-24fa-404f-a1ef-56c0a5af27b5/files/eaf956dc-e250-416d-9a19-3fbf1c4fcb3c.jpg";

const ADVANTAGES = [
  { icon: "Zap", title: "До 1 Гбит/с", desc: "Без ограничений трафика и скорости. Премиум-каналы в каждом дата-центре." },
  { icon: "Shield", title: "AES-256", desc: "Шифрование военного класса. Zero-log политика — мы не храним данные." },
  { icon: "Globe", title: "15 стран", desc: "Серверы в Европе, Азии и Америке. Автоматический выбор ближайшей точки." },
  { icon: "Code2", title: "Xray / VLESS", desc: "Современные протоколы с обфускацией. Не определяется DPI-системами." },
  { icon: "Repeat", title: "Clash конвертер", desc: "Мгновенная конвертация конфигов для любого клиента одной кнопкой." },
  { icon: "Bot", title: "AI-поддержка", desc: "Умный бот знает контекст подписки. Помогает с настройкой 24/7." },
];

const PLANS_PREVIEW = [
  { name: "Турбо", price: "500", period: "мес", desc: "До 5 устройств, безлимит", popular: false },
  { name: "Семейный", price: "800", period: "мес", desc: "До 8 устройств, DNS-фильтрация", popular: true },
  { name: "Бизнес", price: "1 500", period: "мес", desc: "До 20 устройств, выделенный IP", popular: false },
];

const SERVERS_PREVIEW = [
  { flag: "🇳🇱", name: "Нидерланды", city: "Amsterdam", ping: 12, load: 23 },
  { flag: "🇩🇪", name: "Германия", city: "Frankfurt", ping: 18, load: 41 },
  { flag: "🇯🇵", name: "Япония", city: "Tokyo", ping: 87, load: 67 },
  { flag: "🇺🇸", name: "США", city: "New York", ping: 95, load: 55 },
  { flag: "🇸🇬", name: "Сингапур", city: "Singapore", ping: 142, load: 38 },
  { flag: "🇫🇷", name: "Франция", city: "Paris", ping: 31, load: 29 },
];

const PARTNERS = [
  { icon: "Monitor", label: "Windows" },
  { icon: "Smartphone", label: "Android" },
  { icon: "Laptop", label: "macOS" },
  { icon: "Tablet", label: "iOS" },
  { icon: "Wifi", label: "Router" },
  { icon: "Terminal", label: "Linux" },
];

/* Color palettes for cycling through cards */
const ADV_GRADIENTS = [
  { from: "from-v-500", to: "to-v-600", bg: "bg-v-50", text: "text-v-600", border: "border-v-200" },
  { from: "from-navy-500", to: "to-navy-700", bg: "bg-navy-50", text: "text-navy-500", border: "border-navy-200" },
  { from: "from-coral-500", to: "to-coral-600", bg: "bg-coral-50", text: "text-coral-600", border: "border-coral-200" },
  { from: "from-sky-500", to: "to-sky-600", bg: "bg-sky-50", text: "text-sky-600", border: "border-sky-200" },
  { from: "from-purple-500", to: "to-purple-700", bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
  { from: "from-teal-500", to: "to-teal-600", bg: "bg-teal-50", text: "text-teal-600", border: "border-teal-200" },
];

const ADV_FOOTER_LABELS = [
  "Премиум каналы",
  "Zero-log политика",
  "Авто-выбор точки",
  "Обход DPI",
  "Один клик",
  "Доступен 24/7",
];

const PLAN_THEMES = [
  { gradient: "from-navy-500 to-navy-700", light: "bg-slate-50", btn: "bg-navy-500 hover:bg-navy-600", btnText: "text-white", ring: "" },
  { gradient: "from-sky-500 to-sky-600", light: "bg-sky-50", btn: "bg-sky-500 hover:bg-sky-600", btnText: "text-white", ring: "ring-2 ring-sky-400/30 shadow-xl shadow-sky-200/40" },
  { gradient: "from-purple-600 to-purple-800", light: "bg-purple-50", btn: "bg-purple-600 hover:bg-purple-700", btnText: "text-white", ring: "" },
];

const PLAN_ICONS = ["Zap", "Users", "Building2"];

const PLATFORM_STRIPES = [
  "from-v-400 to-v-600",
  "from-navy-500 to-navy-700",
  "from-sky-400 to-sky-600",
  "from-coral-400 to-coral-600",
  "from-teal-400 to-teal-600",
  "from-purple-500 to-purple-700",
];

function getLoadColor(load: number) {
  if (load > 60) return { bar: "#ef4444", bg: "bg-red-50", border: "border-l-red-500" };
  if (load > 40) return { bar: "#f59e0b", bg: "bg-amber-50", border: "border-l-amber-500" };
  return { bar: "#22956A", bg: "bg-emerald-50", border: "border-l-v-500" };
}

export default function FeaturesSection() {
  return (
    <>
      {/* Advantages */}
      <section id="advantages" className="py-24 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-v-500 mb-2">Преимущества</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
              Всё для безопасного подключения
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              От генерации конфигов до мониторинга серверов — полный набор инструментов в одном месте
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADVANTAGES.map((a, i) => {
              const theme = ADV_GRADIENTS[i % ADV_GRADIENTS.length];
              return (
                <div
                  key={a.title}
                  className="group rounded-2xl overflow-hidden border border-white/10 hover:shadow-xl transition-all animate-fade-up flex flex-col"
                  style={{ opacity: 0, animationDelay: `${i * 0.07}s` }}
                >
                  {/* TOP: Colored gradient bar with icon */}
                  <div
                    className={`card-shine bg-gradient-to-r ${theme.from} ${theme.to} px-7 pt-6 pb-8 relative`}
                  >
                    {/* Decorative circle shape */}
                    <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10" />
                    <div className="absolute right-8 bottom-2 w-10 h-10 rounded-full bg-white/5" />
                    <div className="w-12 h-12 rounded-xl bg-white/[0.06] text-gray-800 flex items-center justify-center shadow-sm relative z-10">
                      <Icon name={a.icon} size={22} />
                    </div>
                  </div>

                  {/* MIDDLE: White body */}
                  <div className="bg-white/[0.06] px-7 pt-5 pb-4 flex-1">
                    <h3 className="text-base font-semibold text-foreground mb-2">{a.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{a.desc}</p>
                  </div>

                  {/* BOTTOM: Colored light footer */}
                  <div className={`${theme.bg} px-7 py-3 flex items-center gap-2 border-t ${theme.border}`}>
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${theme.from} ${theme.to}`} />
                    <span className={`text-xs font-medium ${theme.text}`}>
                      {ADV_FOOTER_LABELS[i]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Plans preview */}
      <section className="py-24 px-5 bg-white/[0.03]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-v-500 mb-2">Тарифы</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
              Простые и прозрачные цены
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Все тарифы включают AES-256 шифрование, безлимитный трафик и техподдержку
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {PLANS_PREVIEW.map((plan, i) => {
              const theme = PLAN_THEMES[i];
              return (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl overflow-hidden flex flex-col transition-all hover:shadow-xl animate-fade-up ${
                    plan.popular ? theme.ring : ""
                  }`}
                  style={{ opacity: 0, animationDelay: `${i * 0.1}s` }}
                >
                  {/* TOP: Gradient header */}
                  <div
                    className={`card-shine gradient-animate bg-gradient-to-br ${theme.gradient} px-8 pt-7 pb-8 relative`}
                  >
                    {/* Decorative shapes */}
                    <div className="absolute right-4 top-3 w-16 h-16 rounded-full bg-white/10" />
                    <div className="absolute right-12 bottom-1 w-8 h-8 rounded-full bg-white/5" />

                    {plan.popular && (
                      <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-white/90 bg-white/20 px-3 py-1 rounded-full mb-3">
                        Популярный
                      </span>
                    )}

                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                        <Icon name={PLAN_ICONS[i]} size={20} className="text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    </div>
                  </div>

                  {/* MIDDLE: White body */}
                  <div className="bg-white/[0.06] px-8 pt-6 pb-5 flex-1">
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                      <span className="text-gray-400">₽/{plan.period}</span>
                    </div>
                    <p className="text-sm text-gray-500">{plan.desc}</p>
                  </div>

                  {/* BOTTOM: Colored light footer */}
                  <div className={`${theme.light} px-8 py-5 border-t border-white/10`}>
                    <Link
                      to="/tariffs"
                      className={`block w-full py-3 rounded-lg text-sm font-semibold text-center transition-colors ${theme.btn} ${theme.btnText}`}
                    >
                      Подключить
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/tariffs"
              className="text-sm font-medium text-v-500 hover:text-v-600 inline-flex items-center gap-1 transition-colors"
            >
              Все тарифы <Icon name="ArrowRight" size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Data centers */}
      <section className="py-24 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-v-500 mb-2">Дата-центры</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
                Глобальная сеть серверов
              </h2>
              <p className="text-gray-500 mb-10 max-w-lg">
                80+ точек присутствия в 15 странах. Tier III дата-центры с резервированием каналов и питания. Мониторинг нагрузки в реальном времени.
              </p>

              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img src={SERVERS_IMG} alt="Серверная инфраструктура" className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white text-sm font-medium">
                    Tier III дата-центры с резервированием
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {SERVERS_PREVIEW.map((s, i) => {
                const lc = getLoadColor(s.load);
                return (
                  <div
                    key={s.city}
                    className={`relative rounded-xl overflow-hidden border border-white/10 hover:shadow-md transition-all animate-fade-up border-l-4 ${lc.border}`}
                    style={{ opacity: 0, animationDelay: `${i * 0.06}s` }}
                  >
                    {/* Subtle colored background stripe on left */}
                    <div className={`absolute left-0 top-0 bottom-0 w-12 ${lc.bg} opacity-50`} />

                    <div className="relative bg-white/80 backdrop-blur-sm p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{s.flag}</span>
                        <div>
                          <div className="text-sm font-semibold text-foreground">{s.name}</div>
                          <div className="text-xs text-gray-400">{s.city}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                          <div className="text-xs text-gray-400">Пинг</div>
                          <div className="text-sm font-semibold text-foreground">{s.ping} мс</div>
                        </div>
                        <div className="w-24 hidden sm:block">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-400">Нагрузка</span>
                            <span className="text-xs font-semibold text-foreground">{s.load}%</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${s.load}%`,
                                background: lc.bar,
                              }}
                            />
                          </div>
                        </div>
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: lc.bar }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}

              <Link
                to="/locations"
                className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-v-500 hover:text-v-600 hover:bg-v-50 rounded-xl transition-colors"
              >
                Все 80+ серверов <Icon name="ArrowRight" size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics image block */}
      <section className="py-24 px-5 bg-white/[0.03]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src={ANALYTICS_IMG} alt="Аналитика сети" className="w-full" />
                <div className="absolute inset-0 bg-gradient-to-br from-v-500/5 to-transparent" />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-sm font-semibold text-v-500 mb-2">Аналитика</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
                Полный контроль над сетью
              </h2>
              <p className="text-gray-500 mb-8 max-w-lg">
                Мониторинг скорости, пинга и нагрузки в реальном времени. Графики трафика и спидтест прямо в личном кабинете.
              </p>

              <div className="space-y-4">
                {[
                  { icon: "Activity", title: "Speed Test", desc: "Встроенный тест скорости — измеряйте Download, Upload и Ping", bg: "bg-sky-50", text: "text-sky-600" },
                  { icon: "BarChart3", title: "Графики трафика", desc: "Живые графики нагрузки по каналам с обновлением каждые 5 секунд", bg: "bg-coral-50", text: "text-coral-600" },
                  { icon: "TrendingUp", title: "Метрики сети", desc: "Ключевые показатели: пропускная способность, latency, packet loss", bg: "bg-purple-50", text: "text-purple-600" },
                ].map((f, i) => (
                  <div
                    key={f.title}
                    className="flex gap-4 p-4 rounded-xl bg-white/[0.06] border border-white/10 hover:shadow-md transition-all animate-fade-up"
                    style={{ opacity: 0, animationDelay: `${i * 0.1}s` }}
                  >
                    <div className={`w-11 h-11 rounded-lg ${f.bg} ${f.text} flex items-center justify-center shrink-0`}>
                      <Icon name={f.icon} size={20} />
                    </div>
                    <div>
                      <h4 className={`text-sm font-semibold text-foreground mb-1`}>{f.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/analytics"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-v-500 hover:bg-v-600 px-6 py-3 rounded-lg transition-colors mt-8"
              >
                Открыть аналитику <Icon name="ArrowRight" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-24 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-v-500 mb-2">Платформы</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
              Работает на всех устройствах
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Windows, macOS, iOS, Android, Linux и роутеры. Один аккаунт — все платформы.
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-3xl mx-auto">
            {PARTNERS.map((p, i) => {
              const stripe = PLATFORM_STRIPES[i % PLATFORM_STRIPES.length];
              return (
                <div
                  key={p.label}
                  className="group flex flex-col items-center gap-3 pt-0 pb-6 px-4 bg-white/[0.06] border border-white/10 rounded-xl overflow-hidden hover:shadow-lg hover:border-white/[0.15] transition-all animate-fade-up"
                  style={{ opacity: 0, animationDelay: `${i * 0.06}s` }}
                >
                  {/* Top gradient stripe */}
                  <div className={`w-full h-[3px] bg-gradient-to-r ${stripe} mb-4`} />
                  <div className="w-12 h-12 rounded-xl bg-white/[0.03] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name={p.icon} size={26} className="text-gray-700 group-hover:text-v-500 transition-colors" />
                  </div>
                  <span className="text-xs font-medium text-gray-400">{p.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}