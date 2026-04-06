import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const REFERRAL_LINK = "https://vortex-vpn.io/ref/ALEX2025";

const STATS = [
  {
    label: "Приглашённых",
    value: "12",
    icon: "Users",
    bg: "bg-v-50",
    color: "text-v-500",
  },
  {
    label: "Заработано",
    value: "340 \u20BD",
    icon: "Wallet",
    bg: "bg-amber-50",
    color: "text-amber-600",
  },
  {
    label: "Уровней",
    value: "3",
    icon: "Layers",
    bg: "bg-purple-50",
    color: "text-purple-600",
  },
];

interface Level {
  level: number;
  percent: string;
  description: string;
  referrals: number;
  earned: string;
}

const LEVELS: Level[] = [
  {
    level: 1,
    percent: "5%",
    description: "Прямые приглашения",
    referrals: 8,
    earned: "220 \u20BD",
  },
  {
    level: 2,
    percent: "3%",
    description: "Приглашения ваших рефералов",
    referrals: 3,
    earned: "90 \u20BD",
  },
  {
    level: 3,
    percent: "1%",
    description: "Третий уровень глубины",
    referrals: 1,
    earned: "30 \u20BD",
  },
];

interface Referral {
  id: number;
  name: string;
  date: string;
  level: number;
  earnings: string;
  active: boolean;
}

const REFERRALS: Referral[] = [
  { id: 1, name: "Дмитрий К.", date: "02 апр 2025", level: 1, earnings: "45 \u20BD", active: true },
  { id: 2, name: "Анна М.", date: "28 мар 2025", level: 1, earnings: "38 \u20BD", active: true },
  { id: 3, name: "Сергей П.", date: "15 мар 2025", level: 1, earnings: "52 \u20BD", active: true },
  { id: 4, name: "Мария В.", date: "01 мар 2025", level: 2, earnings: "30 \u20BD", active: true },
  { id: 5, name: "Олег Т.", date: "14 фев 2025", level: 2, earnings: "22 \u20BD", active: false },
];

export default function Referrals() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(REFERRAL_LINK).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-2xl font-bold text-foreground tracking-tight mb-1">
          Реферальная программа
        </h1>
        <p className="text-sm text-gray-400">
          Приглашайте друзей и зарабатывайте с каждого их платежа
        </p>
      </div>

      {/* Referral link card */}
      <div
        className="animate-fade-up bg-gradient-to-r from-v-500 to-v-600 rounded-2xl p-6 md:p-8 text-white"
        style={{ animationDelay: "80ms" }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Link2" size={18} className="text-white/70" />
              <span className="text-sm font-medium text-white/70">
                Ваша реферальная ссылка
              </span>
            </div>
            <div className="font-mono text-base md:text-lg font-semibold bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 inline-block">
              {REFERRAL_LINK}
            </div>
          </div>
          <button
            onClick={handleCopyLink}
            className={`inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all self-start ${
              copied
                ? "bg-white text-v-600"
                : "bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
            }`}
          >
            <Icon name={copied ? "Check" : "Copy"} size={16} />
            {copied ? "Скопировано!" : "Скопировать"}
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="animate-fade-up bg-white border border-v-100 rounded-xl p-5 hover:shadow-md transition-all"
            style={{ animationDelay: `${(i + 2) * 80}ms` }}
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

      {/* Level breakdown */}
      <div
        className="animate-fade-up"
        style={{ animationDelay: "400ms" }}
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Уровни вознаграждений
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LEVELS.map((lvl) => (
            <div
              key={lvl.level}
              className="bg-white border border-v-100 rounded-xl p-5 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-v-50 flex items-center justify-center">
                  <span className="text-base font-bold text-v-500">
                    {lvl.level}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    Уровень {lvl.level}
                  </div>
                  <div className="text-xs text-gray-400">{lvl.description}</div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div>
                  <div className="text-2xl font-bold text-v-500">
                    {lvl.percent}
                  </div>
                  <div className="text-[11px] text-gray-400">от платежей</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-foreground">
                    {lvl.referrals} реф.
                  </div>
                  <div className="text-xs text-v-500 font-medium">
                    {lvl.earned}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Referrals table */}
      <div
        className="animate-fade-up"
        style={{ animationDelay: "500ms" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Ваши рефералы
          </h2>
          <span className="text-xs font-medium text-gray-400">
            Всего: {REFERRALS.length}
          </span>
        </div>
        <div className="bg-white border border-v-100 rounded-xl overflow-hidden">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-5 gap-4 px-5 py-3 bg-gray-50 text-xs font-medium text-gray-400 uppercase tracking-wide">
            <span>Пользователь</span>
            <span>Дата</span>
            <span className="text-center">Уровень</span>
            <span className="text-center">Статус</span>
            <span className="text-right">Доход</span>
          </div>
          {REFERRALS.map((ref, i) => (
            <div
              key={ref.id}
              className={`grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 px-5 py-4 items-center ${
                i < REFERRALS.length - 1 ? "border-b border-gray-100" : ""
              } hover:bg-v-50/40 transition-colors`}
            >
              {/* Name */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-v-50 flex items-center justify-center flex-shrink-0">
                  <Icon name="User" size={14} className="text-v-500" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {ref.name}
                </span>
              </div>
              {/* Date */}
              <div className="text-sm text-gray-500 text-right md:text-left">
                {ref.date}
              </div>
              {/* Level */}
              <div className="flex justify-start md:justify-center">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-v-500 bg-v-50 px-2 py-0.5 rounded-full">
                  <Icon name="Layers" size={11} />
                  Ур. {ref.level}
                </span>
              </div>
              {/* Status */}
              <div className="flex justify-end md:justify-center">
                <span
                  className={`flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full border ${
                    ref.active
                      ? "text-emerald-600 bg-emerald-50 border-emerald-200"
                      : "text-gray-500 bg-gray-50 border-gray-200"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      ref.active ? "bg-emerald-500" : "bg-gray-400"
                    }`}
                  />
                  {ref.active ? "Активен" : "Неактивен"}
                </span>
              </div>
              {/* Earnings */}
              <div className="text-sm font-semibold text-v-500 md:text-right col-span-2 md:col-span-1">
                <span className="md:hidden text-xs text-gray-400 font-normal mr-1">
                  Доход:
                </span>
                {ref.earnings}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div
        className="animate-fade-up bg-v-50 border border-v-200 rounded-xl p-5"
        style={{ animationDelay: "600ms" }}
      >
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-v-100 flex items-center justify-center flex-shrink-0">
            <Icon name="HelpCircle" size={18} className="text-v-500" />
          </div>
          <div>
            <div className="text-sm font-semibold text-v-700 mb-1">
              Как это работает?
            </div>
            <p className="text-sm text-v-600 leading-relaxed">
              Поделитесь ссылкой с друзьями. Когда они зарегистрируются и оплатят
              подписку, вы получите процент от каждого их платежа. Вознаграждение
              начисляется автоматически на ваш баланс. Программа работает на 3
              уровня глубины: 5% с прямых приглашений, 3% со второго уровня и 1%
              с третьего.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
