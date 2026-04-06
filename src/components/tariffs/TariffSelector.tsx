import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

type Tariff = {
  id: string;
  name: string;
  price: string;
  unit: string;
  badge?: string;
  description: string;
  features: { text: string; included: boolean }[];
  icon: string;
  color: { bg: string; bgLight: string; text: string; gradient: string; border: string; btnBg: string; btnHover: string; badgeBg: string };
};

const C = {
  green:  { bg: "bg-v-500",      bgLight: "bg-v-50",        text: "text-v-600",      gradient: "from-v-500 to-emerald-600",         border: "border-v-200",      btnBg: "bg-v-500",      btnHover: "hover:bg-v-600",      badgeBg: "bg-v-500" },
  navy:   { bg: "bg-navy-500",   bgLight: "bg-navy-50",     text: "text-indigo-600",  gradient: "from-navy-500 to-indigo-700",       border: "border-indigo-200", btnBg: "bg-navy-500",   btnHover: "hover:bg-navy-600",   badgeBg: "bg-indigo-500" },
  coral:  { bg: "bg-coral-500",  bgLight: "bg-coral-50",    text: "text-coral-600",   gradient: "from-coral-500 to-amber-500",       border: "border-coral-200",  btnBg: "bg-coral-500",  btnHover: "hover:bg-coral-600",  badgeBg: "bg-coral-500" },
  sky:    { bg: "bg-sky-500",    bgLight: "bg-sky-50",      text: "text-sky-600",     gradient: "from-sky-500 to-cyan-500",          border: "border-sky-200",    btnBg: "bg-sky-500",    btnHover: "hover:bg-sky-600",    badgeBg: "bg-sky-500" },
  purple: { bg: "bg-purple-600", bgLight: "bg-purple-50",   text: "text-purple-600",  gradient: "from-purple-600 to-violet-600",     border: "border-purple-200", btnBg: "bg-purple-600", btnHover: "hover:bg-purple-700", badgeBg: "bg-purple-600" },
  rose:   { bg: "bg-rose-500",   bgLight: "bg-rose-50",     text: "text-rose-600",    gradient: "from-rose-500 to-pink-500",         border: "border-rose-200",   btnBg: "bg-rose-500",   btnHover: "hover:bg-rose-600",   badgeBg: "bg-rose-500" },
  teal:   { bg: "bg-teal-500",   bgLight: "bg-teal-50",     text: "text-teal-600",    gradient: "from-teal-500 to-emerald-400",      border: "border-teal-200",   btnBg: "bg-teal-500",   btnHover: "hover:bg-teal-600",   badgeBg: "bg-teal-500" },
};

const TARIFFS: Record<string, Tariff> = {
  personal: {
    id: "personal", name: "Персональный", price: "299", unit: "руб / мес",
    description: "Базовый тариф для повседневного использования", icon: "User", color: C.green,
    features: [
      { text: "До 3 устройств", included: true },
      { text: "300 Мбит/с", included: true },
      { text: "15 серверов", included: true },
      { text: "Xray / VLESS", included: true },
      { text: "AES-256", included: true },
      { text: "Поддержка 24/7", included: true },
      { text: "Clash конвертер", included: false },
      { text: "Выделенный IP", included: false },
    ],
  },
  turbo: {
    id: "turbo", name: "Турбо", price: "500", unit: "руб / мес", badge: "Популярный",
    description: "Максимальная скорость и полный набор инструментов", icon: "Zap", color: C.navy,
    features: [
      { text: "До 5 устройств", included: true },
      { text: "Безлимит скорость", included: true },
      { text: "40 серверов", included: true },
      { text: "Xray / VLESS", included: true },
      { text: "AES-256", included: true },
      { text: "Clash конвертер", included: true },
      { text: "Приоритетная поддержка", included: true },
      { text: "Выделенный IP", included: false },
    ],
  },
  potok: {
    id: "potok", name: "Поток", price: "1.5", unit: "руб / ГБ",
    description: "Оплата по факту — платите только за реальный трафик", icon: "Activity", color: C.coral,
    features: [
      { text: "Оплата по факту", included: true },
      { text: "2 устройства", included: true },
      { text: "Без абонентской платы", included: true },
      { text: "Xray / VLESS", included: true },
      { text: "AES-256", included: true },
      { text: "Поддержка 24/7", included: true },
      { text: "Clash конвертер", included: false },
      { text: "Приоритетная поддержка", included: false },
    ],
  },
  family: {
    id: "family", name: "Семейный", price: "800", unit: "руб / мес", badge: "Для семьи",
    description: "Защита всей семьи с DNS-фильтрацией и контролем", icon: "Users", color: C.sky,
    features: [
      { text: "До 8 устройств", included: true },
      { text: "Безлимит скорость", included: true },
      { text: "40 серверов", included: true },
      { text: "DNS-фильтрация", included: true },
      { text: "Родительский контроль", included: true },
      { text: "Clash конвертер", included: true },
      { text: "Инд. профили", included: true },
      { text: "Приоритетная поддержка", included: true },
    ],
  },
  router: {
    id: "router", name: "Роутер", price: "300", unit: "руб / мес",
    description: "Один роутер — весь дом под защитой", icon: "Wifi", color: C.teal,
    features: [
      { text: "Все устройства дома", included: true },
      { text: "Покрытие всего дома", included: true },
      { text: "Инструкции настройки", included: true },
      { text: "OpenWrt / Keenetic", included: true },
      { text: "Xray / VLESS", included: true },
      { text: "AES-256", included: true },
      { text: "Поддержка 24/7", included: true },
      { text: "Clash конвертер", included: false },
    ],
  },
  business: {
    id: "business", name: "Бизнес", price: "1 500", unit: "руб / мес", badge: "Для команд",
    description: "Корпоративное решение с выделенным IP и SLA", icon: "Building2", color: C.purple,
    features: [
      { text: "До 20 устройств", included: true },
      { text: "Безлимит скорость", included: true },
      { text: "Выделенный IP", included: true },
      { text: "SLA 99.9%", included: true },
      { text: "Доступ к API", included: true },
      { text: "Clash конвертер", included: true },
      { text: "Персональный менеджер", included: true },
      { text: "Приоритетная поддержка", included: true },
    ],
  },
  trial: {
    id: "trial", name: "Пробный", price: "0", unit: "руб", badge: "Бесплатно",
    description: "3 дня полного доступа без оплаты", icon: "Gift", color: C.rose,
    features: [
      { text: "3 дня бесплатно", included: true },
      { text: "5 ГБ трафика", included: true },
      { text: "1 устройство", included: true },
      { text: "Xray / VLESS", included: true },
      { text: "AES-256", included: true },
      { text: "Поддержка 24/7", included: true },
      { text: "Clash конвертер", included: false },
      { text: "Приоритетная поддержка", included: false },
    ],
  },
};

const TABS = [
  { key: "personal", label: "Персональный", icon: "User" },
  { key: "turbo", label: "Турбо", icon: "Zap" },
  { key: "potok", label: "Поток", icon: "Activity" },
  { key: "family", label: "Семейный", icon: "Users" },
  { key: "router", label: "Роутер", icon: "Wifi" },
  { key: "business", label: "Бизнес", icon: "Building2" },
  { key: "trial", label: "Пробный", icon: "Gift" },
];

const OVERVIEW = [
  { name: "Персональный", price: "299₽/мес", devices: "3 устройства", speed: "300 Мбит/с", icon: "User", tab: "personal", color: C.green },
  { name: "Турбо", price: "500₽/мес", devices: "5 устройств", speed: "Безлимит", icon: "Zap", tab: "turbo", color: C.navy, popular: true },
  { name: "Поток", price: "1.5₽/ГБ", devices: "2 устройства", speed: "По трафику", icon: "Activity", tab: "potok", color: C.coral },
  { name: "Семейный", price: "800₽/мес", devices: "8 устройств", speed: "Безлимит", icon: "Users", tab: "family", color: C.sky },
  { name: "Роутер", price: "300₽/мес", devices: "1 роутер", speed: "Весь дом", icon: "Wifi", tab: "router", color: C.teal },
  { name: "Бизнес", price: "1 500₽/мес", devices: "20 устройств", speed: "Безлимит", icon: "Building2", tab: "business", color: C.purple },
  { name: "Пробный", price: "0₽", devices: "1 устройство", speed: "3 дня / 5 ГБ", icon: "Gift", tab: "trial", color: C.rose },
];

interface TariffSelectorProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TariffSelector({ activeTab, setActiveTab }: TariffSelectorProps) {
  const plan = TARIFFS[activeTab];
  const c = plan.color;

  return (
    <section className="pb-20 px-5">
      <div className="max-w-7xl mx-auto">
        {/* Tabs */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-14 animate-fade-up"
          style={{ animationDelay: ".3s", opacity: 0 }}
        >
          {TABS.map((tab) => {
            const tc = TARIFFS[tab.key].color;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all ${
                  activeTab === tab.key
                    ? `${tc.btnBg} text-white shadow-lg shadow-${tab.key === "turbo" ? "navy" : tab.key === "personal" ? "v" : tab.key}-500/20`
                    : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50 hover:text-gray-700"
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main tariff card — 3-zone layout */}
        <div className="flex justify-center">
          <div
            key={plan.id + activeTab}
            className="relative w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl animate-fade-up"
          >
            {/* ZONE 1: Colored header with gradient + shine */}
            <div className={`relative bg-gradient-to-br ${c.gradient} px-8 pt-8 pb-10 card-shine`}>
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/4" />
              <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 translate-y-1/3 -translate-x-1/4" />

              {plan.badge && (
                <span className="relative inline-flex items-center text-[11px] font-bold text-white/90 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 mb-5">
                  {plan.badge}
                </span>
              )}

              <div className="relative flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Icon name={plan.icon} size={22} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-white">{plan.name}</h3>
                  </div>
                  <p className="text-sm text-white/70 max-w-sm">{plan.description}</p>
                </div>
                <div className="text-right hidden sm:block">
                  <div className="text-4xl font-black text-white leading-none">{plan.price}</div>
                  <div className="text-sm text-white/60 mt-1">{plan.unit}</div>
                </div>
              </div>

              {/* Price for mobile */}
              <div className="sm:hidden mt-4 flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-white">{plan.price}</span>
                <span className="text-sm text-white/60">{plan.unit}</span>
              </div>

              {/* Diagonal cut */}
              <div className="absolute bottom-0 left-0 right-0 h-5 bg-white" style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }} />
            </div>

            {/* ZONE 2: Features on white */}
            <div className="bg-white px-8 py-7">
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {plan.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      f.included ? c.bgLight : "bg-gray-100"
                    }`}>
                      <Icon
                        name={f.included ? "Check" : "Minus"}
                        size={11}
                        className={f.included ? c.text : "text-gray-300"}
                      />
                    </div>
                    <span className={`text-sm ${f.included ? "text-gray-700 font-medium" : "text-gray-400"}`}>
                      {f.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ZONE 3: Colored footer — CTA */}
            <div className={`${c.bgLight} px-8 py-6 border-t ${c.border}`}>
              <div className="flex items-center justify-between gap-4">
                <div className="text-sm text-gray-500">
                  {plan.features.filter(f => f.included).length} из {plan.features.length} возможностей
                </div>
                <Link
                  to="#"
                  className={`inline-flex items-center gap-2 text-sm font-bold text-white ${c.btnBg} ${c.btnHover} px-7 py-3 rounded-xl transition-all shadow-md hover:shadow-lg`}
                >
                  Подключить <Icon name="ArrowRight" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* All plans overview — colored mini-cards */}
        <div className="mt-20">
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-3 animate-fade-up">
            Все тарифы в одном взгляде
          </h2>
          <p className="text-sm text-gray-500 text-center mb-10 animate-fade-up" style={{ animationDelay: ".1s", opacity: 0 }}>
            Нажмите на карточку, чтобы увидеть подробности
          </p>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up"
            style={{ animationDelay: ".15s", opacity: 0 }}
          >
            {OVERVIEW.map((p) => {
              const isActive = activeTab === p.tab;
              return (
                <button
                  key={p.tab}
                  onClick={() => { setActiveTab(p.tab); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={`text-left rounded-2xl overflow-hidden transition-all hover:shadow-lg group ${
                    isActive ? "ring-2 ring-offset-2 shadow-md" : "shadow-sm hover:scale-[1.02]"
                  }`}
                  style={{ ["--tw-ring-color" as string]: isActive ? undefined : "transparent" }}
                >
                  {/* Mini colored header */}
                  <div className={`bg-gradient-to-br ${p.color.gradient} px-5 py-4 relative card-shine`}>
                    <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-white/10 -translate-y-1/3 translate-x-1/3" />
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                          <Icon name={p.icon} size={15} className="text-white" />
                        </div>
                        <h4 className="text-sm font-bold text-white">{p.name}</h4>
                      </div>
                      {p.popular && (
                        <span className="text-[9px] font-bold text-white/80 bg-white/20 px-2 py-0.5 rounded-full">ТОП</span>
                      )}
                    </div>
                  </div>

                  {/* Mini white body */}
                  <div className="bg-white px-5 py-4 border-x border-gray-100">
                    <div className="text-xl font-extrabold text-foreground mb-1">{p.price}</div>
                    <div className="flex flex-col gap-0.5 text-xs text-gray-500">
                      <span>{p.devices}</span>
                      <span>{p.speed}</span>
                    </div>
                  </div>

                  {/* Mini colored footer */}
                  <div className={`${p.color.bgLight} px-5 py-3 border ${p.color.border} border-t-0 text-xs font-semibold ${p.color.text} flex items-center justify-between`}>
                    <span>Подробнее</span>
                    <Icon name="ChevronRight" size={12} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
