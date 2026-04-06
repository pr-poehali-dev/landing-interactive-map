import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/873a5974-24fa-404f-a1ef-56c0a5af27b5/files/ead7355f-ddfd-4823-bdc0-8fff2bec42e0.jpg";
const SERVERS_IMG = "https://cdn.poehali.dev/projects/873a5974-24fa-404f-a1ef-56c0a5af27b5/files/661a801c-b2a9-4a99-b77c-0bd4d70d6d82.jpg";
const ANALYTICS_IMG = "https://cdn.poehali.dev/projects/873a5974-24fa-404f-a1ef-56c0a5af27b5/files/eaf956dc-e250-416d-9a19-3fbf1c4fcb3c.jpg";

const STATS = [
  { value: 94200, label: "Пользователей", suffix: "+" },
  { value: 80, label: "Серверов", suffix: "+" },
  { value: 15, label: "Стран", suffix: "" },
  { value: 99, label: "Uptime", suffix: ".9%" },
];

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

const FAQ_ITEMS = [
  { q: "Как начать пользоваться?", a: "Выберите тариф, оплатите удобным способом, получите конфиг и подключитесь через приложение Happ или любой совместимый клиент. Весь процесс занимает 2 минуты." },
  { q: "Какие протоколы поддерживаются?", a: "Xray/VLESS, VMess, Trojan, Shadowsocks. Все протоколы поддерживают обфускацию трафика и не определяются DPI-системами большинства провайдеров." },
  { q: "Можно ли использовать на роутере?", a: "Да. Мы поддерживаем OpenWrt и Keenetic. В разделе помощи есть пошаговые гайды по настройке. Тариф «Роутер» оптимизирован для этого сценария." },
  { q: "Что такое заморозка подписки?", a: "Вы можете приостановить подписку на срок до 30 дней. В это время деньги не списываются, а ключ становится неактивным. Разморозить можно в любой момент." },
  { q: "Как работает реферальная программа?", a: "Вы получаете 5% с платежей приглашённых друзей (1 уровень), 3% со второго уровня и 1% с третьего. Средства зачисляются на баланс автоматически." },
];

const NEWS = [
  { date: "28 мар", title: "Новые серверы в Швейцарии", desc: "Запущены 3 новых сервера в Цюрихе с поддержкой VLESS и Trojan." },
  { date: "15 мар", title: "Обновление Clash-конвертера", desc: "Добавлена поддержка правил маршрутизации и split-tunneling." },
  { date: "2 мар", title: "Семейный тариф", desc: "Новый тариф для семьи: DNS-фильтрация, родительский контроль, до 8 устройств." },
];

function useCounter(target: number, dur = 2000) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const t0 = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - t0) / dur, 1);
      setV(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    const id = setTimeout(() => requestAnimationFrame(tick), 300);
    return () => clearTimeout(id);
  }, [target, dur]);
  return v;
}

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const v = useCounter(value);
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-extrabold text-foreground">
        {v.toLocaleString("ru")}{suffix}
      </div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="text-sm font-semibold text-foreground">{q}</span>
        <Icon name={open ? "ChevronUp" : "ChevronDown"} size={18} className="text-gray-400 shrink-0" />
      </button>
      {open && <p className="text-sm text-gray-500 leading-relaxed pb-5 -mt-1">{a}</p>}
    </div>
  );
}

export default function Index() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="absolute inset-0 bg-gradient-to-br from-v-50 via-white to-emerald-50/30" />
        <div className="relative max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-medium text-v-600 bg-v-50 border border-v-100 rounded-full px-4 py-1.5 mb-6 animate-fade-up">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Все серверы онлайн
              </div>

              <h1
                className="text-4xl md:text-[3.25rem] font-extrabold text-foreground leading-[1.12] tracking-tight mb-6 animate-fade-up"
                style={{ animationDelay: ".1s", opacity: 0 }}
              >
                Быстрый и надёжный VPN
                <span className="text-v-500"> для всех устройств</span>
              </h1>

              <p
                className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg animate-fade-up"
                style={{ animationDelay: ".2s", opacity: 0 }}
              >
                80+ серверов в 15 странах. Xray/VLESS, Clash, AI-поддержка, семейный контроль — всё из коробки. Подключение за 2 минуты.
              </p>

              <div
                className="flex flex-wrap gap-3 mb-12 animate-fade-up"
                style={{ animationDelay: ".3s", opacity: 0 }}
              >
                <Link
                  to="/tariffs"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-v-500 hover:bg-v-600 px-6 py-3 rounded-lg transition-all shadow-sm hover:shadow-md"
                >
                  Выбрать тариф <Icon name="ArrowRight" size={16} />
                </Link>
                <a
                  href="#advantages"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-foreground bg-white hover:bg-gray-50 px-6 py-3 rounded-lg border border-gray-200 transition-all"
                >
                  Подробнее
                </a>
              </div>

              <div
                className="grid grid-cols-4 gap-4 animate-fade-up"
                style={{ animationDelay: ".4s", opacity: 0 }}
              >
                {STATS.map((s) => (
                  <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
                ))}
              </div>
            </div>

            <div className="hidden lg:block animate-fade-up" style={{ animationDelay: ".3s", opacity: 0 }}>
              <div className="relative">
                <div className="absolute -inset-4 bg-v-100/60 rounded-3xl blur-2xl" />
                <img src={HERO_IMG} alt="Vortex VPN" className="relative w-full rounded-2xl shadow-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

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
            {ADVANTAGES.map((a, i) => (
              <div
                key={a.title}
                className="group bg-white border border-gray-100 rounded-2xl p-7 hover:shadow-lg hover:border-v-100 transition-all animate-fade-up"
                style={{ opacity: 0, animationDelay: `${i * 0.07}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-v-50 text-v-500 flex items-center justify-center mb-5 group-hover:bg-v-500 group-hover:text-white transition-colors">
                  <Icon name={a.icon} size={22} />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{a.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans preview */}
      <section className="py-24 px-5 bg-gray-50">
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
            {PLANS_PREVIEW.map((plan, i) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl border p-8 transition-all hover:shadow-lg animate-fade-up ${
                  plan.popular ? "border-v-500 shadow-md ring-1 ring-v-500/20" : "border-gray-200"
                }`}
                style={{ opacity: 0, animationDelay: `${i * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-xs font-semibold text-white bg-v-500 px-4 py-1 rounded-full">
                      Популярный
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-500 mb-6">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                  <span className="text-gray-400">₽/{plan.period}</span>
                </div>
                <Link
                  to="/tariffs"
                  className={`block w-full py-3 rounded-lg text-sm font-semibold text-center transition-colors ${
                    plan.popular
                      ? "bg-v-500 text-white hover:bg-v-600"
                      : "bg-gray-100 text-foreground hover:bg-gray-200"
                  }`}
                >
                  Подключить
                </Link>
              </div>
            ))}
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
              {SERVERS_PREVIEW.map((s, i) => (
                <div
                  key={s.city}
                  className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between hover:shadow-sm hover:border-v-100 transition-all animate-fade-up"
                  style={{ opacity: 0, animationDelay: `${i * 0.06}s` }}
                >
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
                          className="h-full rounded-full"
                          style={{
                            width: `${s.load}%`,
                            background:
                              s.load > 70 ? "#ef4444" : s.load > 50 ? "#f59e0b" : "#22956A",
                          }}
                        />
                      </div>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
                  </div>
                </div>
              ))}

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
      <section className="py-24 px-5 bg-gray-50">
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
                  { icon: "Activity", title: "Speed Test", desc: "Встроенный тест скорости — измеряйте Download, Upload и Ping" },
                  { icon: "BarChart3", title: "Графики трафика", desc: "Живые графики нагрузки по каналам с обновлением каждые 5 секунд" },
                  { icon: "TrendingUp", title: "Метрики сети", desc: "Ключевые показатели: пропускная способность, latency, packet loss" },
                ].map((f, i) => (
                  <div
                    key={f.title}
                    className="flex gap-4 animate-fade-up"
                    style={{ opacity: 0, animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-v-50 text-v-500 flex items-center justify-center shrink-0">
                      <Icon name={f.icon} size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-1">{f.title}</h4>
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
            {PARTNERS.map((p, i) => (
              <div
                key={p.label}
                className="flex flex-col items-center gap-3 py-6 px-4 bg-white border border-gray-100 rounded-xl hover:shadow-sm hover:border-v-100 transition-all animate-fade-up"
                style={{ opacity: 0, animationDelay: `${i * 0.06}s` }}
              >
                <Icon name={p.icon} size={28} className="text-v-500" />
                <span className="text-xs font-medium text-gray-600">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-24 px-5 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-semibold text-v-500 mb-2">Новости</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                Последние обновления
              </h2>
            </div>
            <Link
              to="/blog"
              className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-v-500 hover:text-v-600 transition-colors"
            >
              Все новости <Icon name="ArrowRight" size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NEWS.map((n, i) => (
              <Link
                key={n.title}
                to="/blog"
                className="bg-white border border-gray-100 rounded-2xl p-7 hover:shadow-lg hover:border-v-100 transition-all animate-fade-up"
                style={{ opacity: 0, animationDelay: `${i * 0.08}s` }}
              >
                <span className="text-xs font-medium text-v-500">{n.date} 2025</span>
                <h3 className="text-base font-semibold text-foreground mt-2 mb-2">{n.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{n.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-v-500 mb-2">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
              Частые вопросы
            </h2>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl px-7">
            {FAQ_ITEMS.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/help"
              className="text-sm font-medium text-v-500 hover:text-v-600 inline-flex items-center gap-1 transition-colors"
            >
              Все вопросы и помощь <Icon name="ArrowRight" size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="bg-v-500 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                Готовы начать?
              </h2>
              <p className="text-emerald-100 text-lg mb-8 max-w-xl mx-auto">
                Выберите тариф, получите конфиг и подключитесь за 2 минуты. Бесплатный пробный период — 3 дня.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/tariffs"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-v-500 bg-white hover:bg-gray-50 px-6 py-3 rounded-lg transition-all"
                >
                  Смотреть тарифы <Icon name="ArrowRight" size={16} />
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
