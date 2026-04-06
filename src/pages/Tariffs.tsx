import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";

/* ───── tariff data ───── */

type Tariff = {
  id: string;
  name: string;
  price: string;
  unit: string;
  badge?: string;
  description: string;
  features: { text: string; included: boolean }[];
  icon: string;
  highlight?: boolean;
};

const TARIFFS: Record<string, Tariff[]> = {
  personal: [
    {
      id: "personal",
      name: "Персональный",
      price: "299",
      unit: "руб / мес",
      description: "Базовый тариф для повседневного использования. Идеально подходит для одного пользователя.",
      icon: "User",
      features: [
        { text: "До 3 устройств одновременно", included: true },
        { text: "Скорость до 300 Мбит/с", included: true },
        { text: "15 серверов в 8 странах", included: true },
        { text: "Xray / VLESS протоколы", included: true },
        { text: "Шифрование AES-256", included: true },
        { text: "Поддержка 24/7", included: true },
        { text: "Clash конвертер", included: false },
        { text: "Выделенный IP", included: false },
      ],
    },
  ],
  turbo: [
    {
      id: "turbo",
      name: "Турбо",
      price: "500",
      unit: "руб / мес",
      badge: "Популярный",
      description: "Максимальная скорость и расширенная география серверов. Полный набор инструментов.",
      icon: "Zap",
      highlight: true,
      features: [
        { text: "До 5 устройств одновременно", included: true },
        { text: "Безлимитная скорость", included: true },
        { text: "40 серверов в 15 странах", included: true },
        { text: "Xray / VLESS протоколы", included: true },
        { text: "Шифрование AES-256", included: true },
        { text: "Clash конвертер", included: true },
        { text: "Приоритетная поддержка", included: true },
        { text: "Выделенный IP", included: false },
      ],
    },
  ],
  potok: [
    {
      id: "potok",
      name: "Поток",
      price: "1.5",
      unit: "руб / ГБ",
      description: "Оплата по факту использования. Платите только за реально потреблённый трафик.",
      icon: "Activity",
      features: [
        { text: "Оплата по факту", included: true },
        { text: "До 2 устройств одновременно", included: true },
        { text: "Без абонентской платы", included: true },
        { text: "Xray / VLESS протоколы", included: true },
        { text: "Шифрование AES-256", included: true },
        { text: "Поддержка 24/7", included: true },
        { text: "Clash конвертер", included: false },
        { text: "Приоритетная поддержка", included: false },
      ],
    },
  ],
  family: [
    {
      id: "family",
      name: "Семейный",
      price: "800",
      unit: "руб / мес",
      badge: "Для семьи",
      description: "Защита для всей семьи с DNS-фильтрацией и родительским контролем.",
      icon: "Users",
      highlight: true,
      features: [
        { text: "До 8 устройств одновременно", included: true },
        { text: "Безлимитная скорость", included: true },
        { text: "40 серверов в 15 странах", included: true },
        { text: "DNS-фильтрация рекламы", included: true },
        { text: "Родительский контроль", included: true },
        { text: "Clash конвертер", included: true },
        { text: "Индивидуальные профили", included: true },
        { text: "Приоритетная поддержка", included: true },
      ],
    },
  ],
  router: [
    {
      id: "router",
      name: "Роутер",
      price: "300",
      unit: "руб / мес",
      description: "Один роутер — весь дом под защитой. Подробные инструкции по настройке в комплекте.",
      icon: "Wifi",
      features: [
        { text: "1 роутер (все устройства дома)", included: true },
        { text: "Покрытие всего дома", included: true },
        { text: "Инструкции по настройке", included: true },
        { text: "Поддержка OpenWrt / Keenetic", included: true },
        { text: "Xray / VLESS протоколы", included: true },
        { text: "Шифрование AES-256", included: true },
        { text: "Поддержка 24/7", included: true },
        { text: "Clash конвертер", included: false },
      ],
    },
  ],
  business: [
    {
      id: "business",
      name: "Бизнес",
      price: "1 500",
      unit: "руб / мес",
      badge: "Для команд",
      description: "Корпоративное решение с выделенным IP, SLA и доступом к API.",
      icon: "Building2",
      features: [
        { text: "До 20 устройств одновременно", included: true },
        { text: "Безлимитная скорость", included: true },
        { text: "Выделенный IP-адрес", included: true },
        { text: "SLA 99.9% uptime", included: true },
        { text: "Доступ к API", included: true },
        { text: "Clash конвертер", included: true },
        { text: "Персональный менеджер", included: true },
        { text: "Приоритетная поддержка", included: true },
      ],
    },
  ],
  trial: [
    {
      id: "trial",
      name: "Пробный",
      price: "0",
      unit: "руб",
      badge: "Бесплатно",
      description: "Попробуйте VORTEX VPN без оплаты. 3 дня полного доступа с ограничением трафика.",
      icon: "Gift",
      features: [
        { text: "3 дня бесплатно", included: true },
        { text: "5 ГБ трафика", included: true },
        { text: "1 устройство", included: true },
        { text: "Xray / VLESS протоколы", included: true },
        { text: "Шифрование AES-256", included: true },
        { text: "Поддержка 24/7", included: true },
        { text: "Clash конвертер", included: false },
        { text: "Приоритетная поддержка", included: false },
      ],
    },
  ],
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

/* ───── comparison table data ───── */

const COMPARE_PLANS = ["Персональный", "Турбо", "Поток", "Семейный", "Роутер", "Бизнес", "Пробный"];

const COMPARE_ROWS: { label: string; values: (string | boolean)[] }[] = [
  { label: "Цена", values: ["299₽/мес", "500₽/мес", "1.5₽/ГБ", "800₽/мес", "300₽/мес", "1 500₽/мес", "0₽"] },
  { label: "Устройства", values: ["3", "5", "2", "8", "Весь дом", "20", "1"] },
  { label: "Скорость", values: ["300 Мбит/с", "Безлимит", "300 Мбит/с", "Безлимит", "300 Мбит/с", "Безлимит", "300 Мбит/с"] },
  { label: "Серверы", values: ["15", "40", "15", "40", "15", "80+", "15"] },
  { label: "Xray / VLESS", values: [true, true, true, true, true, true, true] },
  { label: "AES-256", values: [true, true, true, true, true, true, true] },
  { label: "Clash конвертер", values: [false, true, false, true, false, true, false] },
  { label: "DNS-фильтрация", values: [false, false, false, true, false, false, false] },
  { label: "Родительский контроль", values: [false, false, false, true, false, false, false] },
  { label: "Выделенный IP", values: [false, false, false, false, false, true, false] },
  { label: "SLA 99.9%", values: [false, false, false, false, false, true, false] },
  { label: "API доступ", values: [false, false, false, false, false, true, false] },
  { label: "Приоритетная поддержка", values: [false, true, false, true, false, true, false] },
];

/* ───── platforms ───── */

const PLATFORMS = [
  { icon: "Monitor", label: "Windows", desc: "10, 11" },
  { icon: "Laptop", label: "macOS", desc: "12+" },
  { icon: "Smartphone", label: "iOS", desc: "15+" },
  { icon: "Smartphone", label: "Android", desc: "10+" },
  { icon: "Terminal", label: "Linux", desc: "Ubuntu, Fedora" },
  { icon: "Wifi", label: "Router", desc: "OpenWrt, Keenetic" },
];

/* ───── component ───── */

export default function Tariffs() {
  const [activeTab, setActiveTab] = useState("turbo");
  const plans = TARIFFS[activeTab];

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-v-50 via-white to-emerald-50/30" />
        <div className="relative max-w-7xl mx-auto px-5 text-center">
          <div
            className="inline-flex items-center gap-2 text-sm font-medium text-v-600 bg-v-50 border border-v-100 rounded-full px-4 py-1.5 mb-6 animate-fade-up"
          >
            <Icon name="CreditCard" size={14} />
            Гибкие тарифные планы
          </div>

          <h1
            className="text-4xl md:text-[3.25rem] font-extrabold text-foreground leading-[1.12] tracking-tight mb-5 animate-fade-up"
            style={{ animationDelay: ".1s", opacity: 0 }}
          >
            Тарифы <span className="text-v-500">VORTEX VPN</span>
          </h1>

          <p
            className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-up"
            style={{ animationDelay: ".2s", opacity: 0 }}
          >
            Выберите подходящий план -- от бесплатного пробного до корпоративного с выделенным IP и SLA.
            Все тарифы включают шифрование военного класса.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="pb-20 px-5">
        <div className="max-w-7xl mx-auto">
          <div
            className="flex flex-wrap justify-center gap-2 mb-12 animate-fade-up"
            style={{ animationDelay: ".3s", opacity: 0 }}
          >
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg transition-all ${
                  activeTab === tab.key
                    ? "bg-v-500 text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-v-200 hover:text-v-600 hover:bg-v-50"
                }`}
              >
                <Icon name={tab.icon} size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tariff cards */}
          <div className="flex justify-center">
            {plans.map((plan) => (
              <div
                key={plan.id + activeTab}
                className={`relative w-full max-w-lg rounded-2xl border p-8 animate-fade-up ${
                  plan.highlight
                    ? "border-v-200 bg-white shadow-lg shadow-v-100/40 ring-1 ring-v-100"
                    : "border-gray-200 bg-white shadow-sm"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-8 inline-flex items-center text-xs font-semibold text-white bg-v-500 rounded-full px-3 py-1">
                    {plan.badge}
                  </span>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                    plan.highlight ? "bg-v-500" : "bg-v-50"
                  }`}>
                    <Icon
                      name={plan.icon}
                      size={20}
                      className={plan.highlight ? "text-white" : "text-v-500"}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                  </div>
                </div>

                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  {plan.description}
                </p>

                <div className="flex items-baseline gap-1.5 mb-8">
                  <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                  <span className="text-sm text-gray-400 font-medium">{plan.unit}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        f.included ? "bg-v-50" : "bg-gray-50"
                      }`}>
                        <Icon
                          name={f.included ? "Check" : "X"}
                          size={12}
                          className={f.included ? "text-v-500" : "text-gray-300"}
                        />
                      </div>
                      <span className={`text-sm ${f.included ? "text-foreground" : "text-gray-400"}`}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="#"
                  className={`w-full flex items-center justify-center gap-2 text-sm font-semibold py-3.5 rounded-xl transition-all ${
                    plan.highlight
                      ? "text-white bg-v-500 hover:bg-v-600 shadow-sm hover:shadow-md"
                      : "text-v-600 bg-v-50 hover:bg-v-100 border border-v-100"
                  }`}
                >
                  Подключить
                  <Icon name="ArrowRight" size={16} />
                </Link>
              </div>
            ))}
          </div>

          {/* All plans overview mini-cards */}
          <div className="mt-20">
            <h2
              className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-3 animate-fade-up"
            >
              Все тарифы в одном взгляде
            </h2>
            <p className="text-sm text-gray-500 text-center mb-10 animate-fade-up" style={{ animationDelay: ".1s", opacity: 0 }}>
              Краткий обзор каждого плана для быстрого сравнения
            </p>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up"
              style={{ animationDelay: ".15s", opacity: 0 }}
            >
              {[
                { name: "Персональный", price: "299₽/мес", devices: "3 устройства", speed: "300 Мбит/с", icon: "User", tab: "personal" },
                { name: "Турбо", price: "500₽/мес", devices: "5 устройств", speed: "Безлимит", icon: "Zap", tab: "turbo", popular: true },
                { name: "Поток", price: "1.5₽/ГБ", devices: "2 устройства", speed: "По трафику", icon: "Activity", tab: "potok" },
                { name: "Семейный", price: "800₽/мес", devices: "8 устройств", speed: "Безлимит", icon: "Users", tab: "family" },
                { name: "Роутер", price: "300₽/мес", devices: "1 роутер", speed: "Весь дом", icon: "Wifi", tab: "router" },
                { name: "Бизнес", price: "1 500₽/мес", devices: "20 устройств", speed: "Безлимит", icon: "Building2", tab: "business" },
                { name: "Пробный", price: "0₽", devices: "1 устройство", speed: "3 дня / 5 ГБ", icon: "Gift", tab: "trial" },
              ].map((p) => (
                <button
                  key={p.tab}
                  onClick={() => { setActiveTab(p.tab); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={`text-left rounded-xl border p-5 transition-all hover:shadow-md group ${
                    activeTab === p.tab ? "border-v-200 bg-v-50/50 shadow-sm" : "border-gray-100 bg-white hover:border-v-100"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      activeTab === p.tab ? "bg-v-500" : "bg-gray-100 group-hover:bg-v-50"
                    }`}>
                      <Icon name={p.icon} size={16} className={activeTab === p.tab ? "text-white" : "text-gray-500 group-hover:text-v-500"} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{p.name}</h4>
                      {p.popular && (
                        <span className="text-[10px] font-semibold text-v-600 bg-v-100 rounded px-1.5 py-0.5">ТОП</span>
                      )}
                    </div>
                  </div>
                  <div className="text-xl font-extrabold text-foreground mb-2">{p.price}</div>
                  <div className="flex flex-col gap-1 text-xs text-gray-500">
                    <span>{p.devices}</span>
                    <span>{p.speed}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-5 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-3 animate-fade-up"
          >
            Сравнение тарифов
          </h2>
          <p
            className="text-sm text-gray-500 text-center mb-10 animate-fade-up"
            style={{ animationDelay: ".1s", opacity: 0 }}
          >
            Детальное сравнение возможностей каждого тарифного плана
          </p>

          <div
            className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm animate-fade-up"
            style={{ animationDelay: ".15s", opacity: 0 }}
          >
            <table className="w-full min-w-[800px] text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left font-semibold text-foreground py-4 px-6 bg-gray-50/80 sticky left-0 z-10">
                    Функция
                  </th>
                  {COMPARE_PLANS.map((plan) => (
                    <th key={plan} className="text-center font-semibold text-foreground py-4 px-4 bg-gray-50/80">
                      <span className="block text-xs">{plan}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, ri) => (
                  <tr
                    key={row.label}
                    className={`border-b border-gray-50 last:border-0 ${ri % 2 === 0 ? "" : "bg-gray-50/40"}`}
                  >
                    <td className="py-3.5 px-6 font-medium text-foreground sticky left-0 z-10 bg-inherit">
                      {row.label}
                    </td>
                    {row.values.map((val, vi) => (
                      <td key={vi} className="py-3.5 px-4 text-center">
                        {typeof val === "boolean" ? (
                          val ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-v-50">
                              <Icon name="Check" size={14} className="text-v-500" />
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-50">
                              <span className="text-gray-300 text-xs font-bold">&mdash;</span>
                            </span>
                          )
                        ) : (
                          <span className="text-gray-600 font-medium text-xs">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-20 px-5">
        <div className="max-w-7xl mx-auto text-center">
          <h2
            className="text-2xl md:text-3xl font-extrabold text-foreground mb-3 animate-fade-up"
          >
            Поддерживаемые платформы
          </h2>
          <p
            className="text-sm text-gray-500 mb-10 animate-fade-up"
            style={{ animationDelay: ".1s", opacity: 0 }}
          >
            Один аккаунт -- все устройства. Установите за 2 минуты.
          </p>

          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 animate-fade-up"
            style={{ animationDelay: ".15s", opacity: 0 }}
          >
            {PLATFORMS.map((p) => (
              <div
                key={p.label}
                className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white py-8 px-4 hover:border-v-200 hover:shadow-md transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gray-50 group-hover:bg-v-50 flex items-center justify-center transition-colors">
                  <Icon name={p.icon} size={26} className="text-gray-400 group-hover:text-v-500 transition-colors" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">{p.label}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-5">
        <div className="max-w-3xl mx-auto">
          <div
            className="relative rounded-2xl bg-gradient-to-br from-v-500 to-v-700 p-10 md:p-14 text-center overflow-hidden animate-fade-up"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_60%)]" />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
                Попробуйте бесплатно
              </h2>
              <p className="text-sm text-white/70 mb-8 max-w-md mx-auto leading-relaxed">
                3 дня полного доступа, 5 ГБ трафика, без привязки карты. Оцените скорость и качество VORTEX VPN прямо сейчас.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => { setActiveTab("trial"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-v-700 bg-white hover:bg-gray-50 px-7 py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md"
                >
                  Начать бесплатно
                  <Icon name="ArrowRight" size={16} />
                </button>
                <Link
                  to="/help"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white border border-white/20 hover:border-white/40 px-7 py-3.5 rounded-xl transition-all"
                >
                  Задать вопрос
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
