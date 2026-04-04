import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/873a5974-24fa-404f-a1ef-56c0a5af27b5/files/d029c4dc-4ec6-411f-88e8-19208b2cc32f.jpg";
const SERVERS_IMG = "https://cdn.poehali.dev/projects/873a5974-24fa-404f-a1ef-56c0a5af27b5/files/a7097b2a-8168-41c4-a04a-5674b087279e.jpg";
const SECURITY_IMG = "https://cdn.poehali.dev/projects/873a5974-24fa-404f-a1ef-56c0a5af27b5/files/224e161f-f261-4ae4-a9ec-71c210f26c1b.jpg";

const NAV_LINKS = [
  { label: "Продукты", href: "#products" },
  { label: "Серверы", href: "#servers" },
  { label: "Тарифы", href: "#pricing" },
  { label: "Безопасность", href: "#security" },
  { label: "Поддержка", href: "#support" },
];

const STATS = [
  { value: 94200, label: "Пользователей", suffix: "+" },
  { value: 80, label: "Серверов", suffix: "+" },
  { value: 15, label: "Стран", suffix: "" },
  { value: 99, label: "Uptime %", suffix: ".9" },
];

const PRODUCTS = [
  { icon: "Shield", title: "VPN для бизнеса", desc: "Защищённый туннель для всей команды с единой панелью управления, выделенными IP и мониторингом." },
  { icon: "Zap", title: "Высокоскоростной VPN", desc: "До 1 Гбит/с без ограничений трафика. Xray/VLESS, VMess, Trojan — выбирайте протокол под задачу." },
  { icon: "Globe", title: "Глобальная сеть", desc: "80+ серверов в 15 странах. Автоматический выбор оптимальной точки с минимальным пингом." },
  { icon: "Code2", title: "Xray / VLESS", desc: "Современные протоколы с обфускацией трафика. Не определяется DPI-системами большинства провайдеров." },
  { icon: "Repeat", title: "Clash конвертер", desc: "Мгновенная конвертация конфигов в Clash-формат для всех устройств одной кнопкой." },
  { icon: "Bot", title: "AI-ассистент 24/7", desc: "Умный бот знает контекст вашей подписки и помогает с настройкой и диагностикой." },
];

const SERVERS_DATA = [
  { flag: "🇳🇱", name: "Нидерланды", city: "Amsterdam", ping: 12, load: 23 },
  { flag: "🇩🇪", name: "Германия", city: "Frankfurt", ping: 18, load: 41 },
  { flag: "🇯🇵", name: "Япония", city: "Tokyo", ping: 87, load: 67 },
  { flag: "🇺🇸", name: "США", city: "New York", ping: 95, load: 55 },
  { flag: "🇸🇬", name: "Сингапур", city: "Singapore", ping: 142, load: 38 },
  { flag: "🇫🇷", name: "Франция", city: "Paris", ping: 31, load: 29 },
  { flag: "🇨🇭", name: "Швейцария", city: "Zurich", ping: 28, load: 15 },
  { flag: "🇬🇧", name: "Великобритания", city: "London", ping: 24, load: 82 },
];

const PLANS = [
  {
    name: "Starter", price: 199, desc: "Для личного использования",
    features: ["1 устройство", "8 серверов", "Xray/VLESS", "100 Мбит/с", "Базовая поддержка"],
    popular: false,
  },
  {
    name: "Pro", price: 399, desc: "Для команд и фрилансеров",
    features: ["5 устройств", "30 серверов", "Все протоколы", "500 Мбит/с", "Telegram-бот", "Clash-конвертер", "Приоритетная поддержка"],
    popular: true,
  },
  {
    name: "Ultra", price: 799, desc: "Максимум для бизнеса",
    features: ["10 устройств", "80+ серверов", "Все протоколы", "1 Гбит/с", "Выделенный IP", "API-доступ", "24/7 поддержка", "SLA 99.9%"],
    popular: false,
  },
];

const SECURITY_FEATURES = [
  { icon: "Lock", title: "AES-256 шифрование", desc: "Стандарт шифрования, используемый правительствами и военными ведомствами по всему миру." },
  { icon: "EyeOff", title: "Zero-log политика", desc: "Мы не храним логи подключений, DNS-запросов или истории посещений. Никогда." },
  { icon: "ShieldCheck", title: "Kill Switch", desc: "Автоматическое отключение интернета при разрыве VPN-соединения — ни один пакет не утечёт." },
  { icon: "KeyRound", title: "Perfect Forward Secrecy", desc: "Уникальные ключи для каждой сессии. Даже при компрометации одного — остальные в безопасности." },
];

const FOOTER_COLS = [
  { title: "Продукты", links: ["VPN для бизнеса", "Выделенный IP", "Xray / VLESS", "Clash конвертер"] },
  { title: "Компания", links: ["О нас", "Тарифы", "Блог", "Контакты"] },
  { title: "Поддержка", links: ["Документация", "FAQ", "Telegram-бот", "Статус серверов"] },
  { title: "Инструменты", links: ["IP-чекер", "Speed Test", "Xray генератор", "Clash конвертер"] },
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
    const id = setTimeout(() => requestAnimationFrame(tick), 200);
    return () => clearTimeout(id);
  }, [target, dur]);
  return v;
}

function StatCard({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const v = useCounter(target);
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-extrabold text-foreground">{v.toLocaleString("ru")}{suffix}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
    }`}>
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
            <Icon name="Shield" size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold text-foreground tracking-tight">
            NEX<span className="text-brand-500">VPN</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href}
              className="px-3.5 py-2 text-sm font-medium text-gray-600 hover:text-foreground hover:bg-gray-50 rounded-lg transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href="#pricing"
            className="text-sm font-semibold text-white bg-brand-500 hover:bg-brand-600 px-5 py-2.5 rounded-lg transition-colors">
            Подключить
          </a>
        </div>

        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          <Icon name={mobileOpen ? "X" : "Menu"} size={22} className="text-foreground" />
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t px-6 py-4 space-y-1 shadow-lg animate-fade-in">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
              className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">
              {l.label}
            </a>
          ))}
          <a href="#pricing" className="block text-center text-sm font-semibold text-white bg-brand-500 px-4 py-2.5 rounded-lg mt-3">
            Подключить
          </a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-purple-50/40" />
      <div className="relative max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 bg-brand-50 border border-brand-100 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Все серверы онлайн — 94 200 пользователей
            </div>

            <h1 className="text-4xl md:text-[3.5rem] font-extrabold text-foreground leading-[1.1] tracking-tight mb-6 animate-fade-in"
              style={{ animationDelay: "0.1s", opacity: 0 }}>
              VPN-инфраструктура для бизнеса
              <span className="text-brand-500"> и разработчиков</span>
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg animate-fade-in"
              style={{ animationDelay: "0.2s", opacity: 0 }}>
              Шифрование военного класса, 80+ серверов в 15 странах. Xray/VLESS, Clash, AI-поддержка — всё из коробки.
            </p>

            <div className="flex flex-wrap gap-3 mb-12 animate-fade-in"
              style={{ animationDelay: "0.3s", opacity: 0 }}>
              <a href="#pricing"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-brand-500 hover:bg-brand-600 px-6 py-3 rounded-lg transition-all shadow-sm hover:shadow-md">
                Выбрать тариф <Icon name="ArrowRight" size={16} />
              </a>
              <a href="#products"
                className="inline-flex items-center gap-2 text-sm font-semibold text-foreground bg-white hover:bg-gray-50 px-6 py-3 rounded-lg border border-gray-200 transition-all">
                Подробнее
              </a>
            </div>

            <div className="grid grid-cols-4 gap-6 animate-fade-in"
              style={{ animationDelay: "0.4s", opacity: 0 }}>
              {STATS.map((s) => (
                <StatCard key={s.label} target={s.value} suffix={s.suffix} label={s.label} />
              ))}
            </div>
          </div>

          <div className="hidden lg:block animate-fade-in" style={{ animationDelay: "0.3s", opacity: 0 }}>
            <div className="relative">
              <div className="absolute -inset-4 bg-brand-100/50 rounded-3xl blur-2xl" />
              <img src={HERO_IMG} alt="VPN Shield" className="relative w-full rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Products() {
  return (
    <section id="products" className="py-24 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-brand-500 mb-2">Продукты</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">Всё для безопасного подключения</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Полный набор инструментов: от генерации конфигов до мониторинга серверов в реальном времени</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((p, i) => (
            <div key={p.title}
              className="group bg-white border border-gray-100 rounded-2xl p-7 hover:shadow-lg hover:border-brand-100 transition-all animate-slide-up"
              style={{ opacity: 0, animationDelay: `${i * 0.08}s` }}>
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center mb-5 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                <Icon name={p.icon} size={22} />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Servers() {
  return (
    <section id="servers" className="py-24 px-6 bg-gray-50">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm font-semibold text-brand-500 mb-2">Серверы</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">Глобальная сеть серверов</h2>
            <p className="text-gray-500 mb-10 max-w-lg">
              80+ точек присутствия в 15 странах с мониторингом нагрузки и пинга. Автоматический выбор ближайшего сервера.
            </p>
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img src={SERVERS_IMG} alt="Серверная инфраструктура" className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white text-sm font-medium">Tier III дата-центры с резервированием питания и каналов</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {SERVERS_DATA.map((s, i) => (
              <div key={s.city}
                className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between hover:shadow-sm hover:border-brand-100 transition-all animate-slide-up"
                style={{ opacity: 0, animationDelay: `${i * 0.06}s` }}>
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
                      <div className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${s.load}%`,
                          background: s.load > 70 ? '#ef4444' : s.load > 50 ? '#f59e0b' : '#10b981',
                        }} />
                    </div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-brand-500 mb-2">Тарифы</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">Простые и прозрачные цены</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Все тарифы включают AES-256 шифрование, безлимитный трафик и доступ к технической поддержке</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {PLANS.map((plan, i) => (
            <div key={plan.name}
              className={`relative bg-white rounded-2xl border p-8 transition-all hover:shadow-lg animate-slide-up ${
                plan.popular ? "border-brand-500 shadow-md ring-1 ring-brand-500/20" : "border-gray-200"
              }`}
              style={{ opacity: 0, animationDelay: `${i * 0.1}s` }}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-xs font-semibold text-white bg-brand-500 px-4 py-1 rounded-full">Популярный</span>
                </div>
              )}
              <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
              <p className="text-sm text-gray-500 mb-6">{plan.desc}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                <span className="text-gray-400">₽/мес</span>
              </div>
              <button className={`w-full py-3 rounded-lg text-sm font-semibold transition-colors mb-6 ${
                plan.popular
                  ? "bg-brand-500 text-white hover:bg-brand-600"
                  : "bg-gray-100 text-foreground hover:bg-gray-200"
              }`}>
                Подключить {plan.name}
              </button>
              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <Icon name="Check" size={14} className="text-emerald-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Security() {
  return (
    <section id="security" className="py-24 px-6 bg-gray-50">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img src={SECURITY_IMG} alt="Безопасность данных" className="w-full" />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-transparent" />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-sm font-semibold text-brand-500 mb-2">Безопасность</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">Защита без компромиссов</h2>
            <p className="text-gray-500 mb-10 max-w-lg">
              Мы не храним логи, используем шифрование военного класса и обеспечиваем полную приватность каждого соединения.
            </p>
            <div className="space-y-6">
              {SECURITY_FEATURES.map((f, i) => (
                <div key={f.title} className="flex gap-4 animate-slide-up"
                  style={{ opacity: 0, animationDelay: `${i * 0.1}s` }}>
                  <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-500 flex items-center justify-center flex-shrink-0">
                    <Icon name={f.icon} size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">{f.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SupportSection() {
  return (
    <section id="support" className="py-24 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-brand-500 mb-2">Поддержка</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">Помощь на каждом шаге</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "BookOpen", title: "Документация", desc: "Подробные гайды по настройке на всех платформах: iOS, Android, Windows, macOS, Linux, роутеры.", img: HERO_IMG },
            { icon: "Bot", title: "AI-ассистент", desc: "Умный бот знает контекст вашей подписки, помогает с диагностикой и настройкой 24/7.", img: SECURITY_IMG },
            { icon: "MessageCircle", title: "Живая поддержка", desc: "Команда инженеров в Telegram. Среднее время ответа — 15 минут в рабочие часы.", img: SERVERS_IMG },
          ].map((c, i) => (
            <div key={c.title}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-brand-100 transition-all animate-slide-up"
              style={{ opacity: 0, animationDelay: `${i * 0.1}s` }}>
              <img src={c.img} alt={c.title} className="w-full h-48 object-cover" />
              <div className="p-7">
                <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-500 flex items-center justify-center mb-4 -mt-12 relative bg-white border border-brand-100 shadow-sm">
                  <Icon name={c.icon} size={18} />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{c.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="bg-brand-500 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Готовы начать?</h2>
            <p className="text-brand-200 text-lg mb-8 max-w-xl mx-auto">
              Выберите тариф, получите конфиг и подключитесь за 2 минуты. Работает на всех устройствах.
            </p>
            <a href="#pricing"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-500 bg-white hover:bg-gray-50 px-6 py-3 rounded-lg transition-all">
              Смотреть тарифы <Icon name="ArrowRight" size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
                <Icon name="Shield" size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                NEX<span className="text-brand-500">VPN</span>
              </span>
            </a>
            <p className="text-sm text-gray-500 leading-relaxed mb-4 max-w-xs">
              Профессиональный VPN-провайдер с серверами в 15+ странах. Шифрование военного класса.
            </p>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-foreground mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-500 hover:text-brand-500 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">&copy; 2025 NEXVPN. Все права защищены.</p>
          <div className="flex items-center gap-6">
            {["Политика конфиденциальности", "Условия использования", "SLA"].map((t) => (
              <a key={t} href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Index() {
  return (
    <>
      <Header />
      <Hero />
      <Products />
      <Servers />
      <PricingSection />
      <Security />
      <SupportSection />
      <CTA />
      <Footer />
    </>
  );
}
