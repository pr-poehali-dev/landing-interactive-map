import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const STATS = [
  {
    label: "Активных ключей",
    value: "2",
    icon: "KeyRound",
    bg: "bg-v-50",
    color: "text-v-500",
  },
  {
    label: "Устройств онлайн",
    value: "3/5",
    icon: "Smartphone",
    bg: "bg-blue-50",
    color: "text-blue-600",
  },
  {
    label: "Баланс",
    value: "2 450 \u20BD",
    icon: "Wallet",
    bg: "bg-amber-50",
    color: "text-amber-600",
  },
  {
    label: "Реферальный доход",
    value: "340 \u20BD",
    icon: "Gift",
    bg: "bg-purple-50",
    color: "text-purple-600",
  },
];

const VPN_KEYS = [
  {
    id: 1,
    name: "Основной ключ",
    plan: "Турбо",
    active: true,
    server: "NL-01",
    flag: "🇳🇱",
    expires: "28 апр 2025",
    showActions: true,
  },
  {
    id: 2,
    name: "Рабочий",
    plan: "Турбо",
    active: true,
    server: "DE-02",
    flag: "🇩🇪",
    expires: "28 апр 2025",
    showActions: false,
  },
];

const QUICK_ACTIONS = [
  {
    label: "Купить подписку",
    icon: "ShoppingCart",
    to: "/tariffs",
    accent: true,
  },
  {
    label: "Пополнить баланс",
    icon: "CreditCard",
    to: "/dashboard/balance",
    accent: false,
  },
  {
    label: "IP чекер",
    icon: "Search",
    to: "/tools",
    accent: false,
  },
  {
    label: "Speed Test",
    icon: "Gauge",
    to: "/tools",
    accent: false,
  },
];

const PAYMENTS = [
  {
    date: "02 апр 2025",
    amount: "-890 \u20BD",
    description: "Продление подписки \u00ABТурбо\u00BB",
    type: "expense",
  },
  {
    date: "28 мар 2025",
    amount: "+340 \u20BD",
    description: "Реферальное начисление",
    type: "income",
  },
  {
    date: "15 мар 2025",
    amount: "-1 560 \u20BD",
    description: "Пополнение баланса",
    type: "expense",
  },
];

/* Theme maps for stat cards */
const STAT_THEMES = [
  { border: "border-l-v-500", iconBg: "bg-v-50", iconColor: "text-v-500", valueColor: "text-v-600" },
  { border: "border-l-sky-500", iconBg: "bg-sky-50", iconColor: "text-sky-600", valueColor: "text-sky-600" },
  { border: "border-l-amber-500", iconBg: "bg-amber-50", iconColor: "text-amber-600", valueColor: "text-amber-600" },
  { border: "border-l-purple-500", iconBg: "bg-purple-50", iconColor: "text-purple-600", valueColor: "text-purple-600" },
];

/* Theme maps for quick action cards */
const ACTION_THEMES = [
  { gradient: "from-navy-500 to-navy-700", iconBg: "bg-white/20", textColor: "text-white", hoverBg: "hover:shadow-navy-500/20" },
  { gradient: "from-coral-500 to-amber-500", iconBg: "bg-white/20", textColor: "text-white", hoverBg: "hover:shadow-coral-500/20" },
  { gradient: "from-sky-500 to-sky-600", iconBg: "bg-white/20", textColor: "text-white", hoverBg: "hover:shadow-sky-500/20" },
  { gradient: "from-v-500 to-v-600", iconBg: "bg-white/20", textColor: "text-white", hoverBg: "hover:shadow-v-500/20" },
];

function formatCurrentDate(): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formatted = now.toLocaleDateString("ru-RU", options);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export default function Overview() {
  const currentDate = formatCurrentDate();

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div
        className="animate-fade-up relative overflow-hidden rounded-2xl"
        style={{ animationDelay: "0ms" }}
      >
        <div className="card-shine bg-gradient-to-r from-v-500 via-v-600 to-v-700 p-6 md:p-8 text-white relative">
          {/* Decorative circles */}
          <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10" />
          <div className="absolute right-24 top-12 w-20 h-20 rounded-full bg-white/5" />
          <div className="absolute -left-6 -bottom-6 w-28 h-28 rounded-full bg-white/5" />
          <div className="absolute left-1/2 bottom-0 w-16 h-16 rounded-full bg-white/10" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">
                Добро пожаловать!
              </h1>
              <p className="text-white/80 text-sm md:text-base">
                Рады видеть вас снова, Александр
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/70 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              <Icon name="Calendar" size={16} />
              <span>{currentDate}</span>
            </div>
          </div>
        </div>

        {/* Diagonal bottom clip overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-v-600 to-v-700" style={{ clipPath: "polygon(0 40%, 100% 0%, 100% 100%, 0% 100%)" }} />
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => {
          const theme = STAT_THEMES[i];
          return (
            <div
              key={stat.label}
              className={`animate-fade-up rounded-xl overflow-hidden border border-gray-100 border-l-4 ${theme.border} bg-white hover:shadow-lg transition-all group`}
              style={{ animationDelay: `${(i + 1) * 80}ms` }}
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                    {stat.label}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-lg ${theme.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <Icon name={stat.icon} size={17} className={theme.iconColor} />
                  </div>
                </div>
                <div className={`text-2xl font-bold ${theme.valueColor}`}>
                  {stat.value}
                </div>
              </div>
              {/* Subtle colored bottom line */}
              <div className={`h-0.5 w-full ${theme.iconBg}`} />
            </div>
          );
        })}
      </div>

      {/* Active VPN keys */}
      <div
        className="animate-fade-up"
        style={{ animationDelay: "400ms" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Активные VPN-ключи
          </h2>
          <Link
            to="/dashboard/keys"
            className="text-sm font-medium text-v-500 hover:text-v-600 transition-colors flex items-center gap-1"
          >
            Все ключи
            <Icon name="ChevronRight" size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {VPN_KEYS.map((key) => (
            <div
              key={key.id}
              className="rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all flex flex-col"
            >
              {/* TOP: Navy gradient header strip */}
              <div className="card-shine bg-gradient-to-r from-navy-500 to-navy-700 px-5 py-3.5 flex items-center justify-between relative">
                {/* Decorative shapes */}
                <div className="absolute right-4 -top-2 w-12 h-12 rounded-full bg-white/5" />

                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                    <Icon name="KeyRound" size={15} className="text-white" />
                  </div>
                  <div>
                    <span className="font-semibold text-white text-sm">{key.name}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 relative z-10">
                  <span className="text-[11px] font-semibold text-white/90 bg-white/15 px-2.5 py-0.5 rounded-full">
                    {key.plan}
                  </span>
                  {key.active && (
                    <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Активен
                    </span>
                  )}
                </div>
              </div>

              {/* MIDDLE: White body */}
              <div className="bg-white px-5 py-4 flex-1">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Icon name="Server" size={14} className="text-gray-400" />
                    {key.flag} {key.server}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon name="CalendarDays" size={14} className="text-gray-400" />
                    до {key.expires}
                  </span>
                </div>
              </div>

              {/* BOTTOM: Light colored footer with actions */}
              <div className="bg-slate-50 border-t border-gray-100 px-5 py-3">
                {key.showActions ? (
                  <div className="flex items-center gap-2">
                    <button className="inline-flex items-center gap-1.5 text-sm font-medium text-v-500 bg-v-50 hover:bg-v-100 px-3.5 py-2 rounded-lg transition-colors">
                      <Icon name="Copy" size={14} />
                      Скопировать
                    </button>
                    <button className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 bg-white hover:bg-gray-100 border border-gray-200 px-3.5 py-2 rounded-lg transition-colors">
                      <Icon name="QrCode" size={14} />
                      QR
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Icon name="Shield" size={13} className="text-gray-300" />
                    <span>Защищенное соединение</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div
        className="animate-fade-up"
        style={{ animationDelay: "500ms" }}
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Быстрые действия
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {QUICK_ACTIONS.map((action, i) => {
            const theme = ACTION_THEMES[i];
            return (
              <Link
                key={action.label}
                to={action.to}
                className={`group relative overflow-hidden rounded-xl transition-all hover:shadow-lg ${theme.hoverBg} flex flex-col`}
              >
                {/* Gradient top zone */}
                <div className={`card-shine bg-gradient-to-br ${theme.gradient} px-4 pt-5 pb-6 flex flex-col items-center relative`}>
                  {/* Decorative circle */}
                  <div className="absolute -right-3 -top-3 w-14 h-14 rounded-full bg-white/10" />
                  <div
                    className={`w-11 h-11 rounded-xl ${theme.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform relative z-10`}
                  >
                    <Icon name={action.icon} size={21} className="text-white" />
                  </div>
                </div>
                {/* White bottom label */}
                <div className="bg-white border border-gray-100 border-t-0 px-3 py-3 text-center rounded-b-xl">
                  <span className="text-sm font-medium text-foreground">{action.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Last payments */}
      <div
        className="animate-fade-up"
        style={{ animationDelay: "600ms" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Последние платежи
          </h2>
          <Link
            to="/dashboard/payments"
            className="text-sm font-medium text-v-500 hover:text-v-600 transition-colors flex items-center gap-1"
          >
            История
            <Icon name="ChevronRight" size={14} />
          </Link>
        </div>

        <div className="rounded-xl overflow-hidden border border-gray-100">
          {/* Table header */}
          <div className="bg-slate-50 px-5 py-3 flex items-center justify-between text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
            <span>Операция</span>
            <span>Сумма</span>
          </div>

          {PAYMENTS.map((payment, i) => {
            const isIncome = payment.type === "income";
            return (
              <div
                key={i}
                className={`flex items-center justify-between px-5 py-4 bg-white border-l-4 ${
                  isIncome ? "border-l-v-500" : "border-l-red-400"
                } ${
                  i < PAYMENTS.length - 1 ? "border-b border-gray-100" : ""
                } hover:bg-gray-50/60 transition-colors`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      isIncome ? "bg-emerald-50" : "bg-red-50"
                    }`}
                  >
                    <Icon
                      name={isIncome ? "ArrowDownLeft" : "ArrowUpRight"}
                      size={16}
                      className={isIncome ? "text-emerald-500" : "text-red-400"}
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      {payment.description}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {payment.date}
                    </div>
                  </div>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    isIncome ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {payment.amount}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
