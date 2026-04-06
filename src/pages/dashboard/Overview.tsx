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
      {/* Welcome bar */}
      <div
        className="animate-fade-up bg-gradient-to-r from-v-500 to-v-600 rounded-2xl p-6 md:p-8 text-white"
        style={{ animationDelay: "0ms" }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">
              Добро пожаловать!
            </h1>
            <p className="text-white/80 text-sm md:text-base">
              Рады видеть вас снова, Александр
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/70">
            <Icon name="Calendar" size={16} />
            <span>{currentDate}</span>
          </div>
        </div>
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="animate-fade-up bg-white border border-v-100 rounded-xl p-5 hover:shadow-md transition-all group"
            style={{ animationDelay: `${(i + 1) * 80}ms` }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                {stat.label}
              </span>
              <div
                className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}
              >
                <Icon name={stat.icon} size={16} className={stat.color} />
              </div>
            </div>
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
          </div>
        ))}
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
              className="bg-white border border-v-100 rounded-xl p-5 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-v-50 flex items-center justify-center">
                    <Icon name="KeyRound" size={18} className="text-v-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {key.name}
                    </div>
                    <div className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                      <span className="inline-flex items-center gap-1 bg-v-50 text-v-500 px-2 py-0.5 rounded-full text-[11px] font-semibold">
                        {key.plan}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Активен
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1.5">
                  <Icon name="Server" size={14} className="text-gray-400" />
                  {key.flag} {key.server}
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="CalendarDays" size={14} className="text-gray-400" />
                  до {key.expires}
                </span>
              </div>

              {key.showActions && (
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <button className="inline-flex items-center gap-1.5 text-sm font-medium text-v-500 bg-v-50 hover:bg-v-100 px-3.5 py-2 rounded-lg transition-colors">
                    <Icon name="Copy" size={14} />
                    Скопировать
                  </button>
                  <button className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 px-3.5 py-2 rounded-lg transition-colors">
                    <Icon name="QrCode" size={14} />
                    QR
                  </button>
                </div>
              )}
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
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.label}
              to={action.to}
              className={`flex flex-col items-center justify-center gap-2.5 rounded-xl p-5 text-center transition-all hover:shadow-md ${
                action.accent
                  ? "bg-v-500 text-white hover:bg-v-600"
                  : "bg-white border border-v-100 text-foreground hover:border-v-200"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  action.accent
                    ? "bg-white/20"
                    : "bg-v-50"
                }`}
              >
                <Icon
                  name={action.icon}
                  size={20}
                  className={action.accent ? "text-white" : "text-v-500"}
                />
              </div>
              <span className="text-sm font-medium">{action.label}</span>
            </Link>
          ))}
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

        <div className="bg-white border border-v-100 rounded-xl overflow-hidden">
          {PAYMENTS.map((payment, i) => (
            <div
              key={i}
              className={`flex items-center justify-between px-5 py-4 ${
                i < PAYMENTS.length - 1 ? "border-b border-gray-100" : ""
              } hover:bg-v-50/40 transition-colors`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    payment.type === "income"
                      ? "bg-emerald-50"
                      : "bg-gray-50"
                  }`}
                >
                  <Icon
                    name={payment.type === "income" ? "ArrowDownLeft" : "ArrowUpRight"}
                    size={16}
                    className={
                      payment.type === "income"
                        ? "text-emerald-500"
                        : "text-gray-400"
                    }
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
                  payment.type === "income"
                    ? "text-emerald-600"
                    : "text-foreground"
                }`}
              >
                {payment.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
