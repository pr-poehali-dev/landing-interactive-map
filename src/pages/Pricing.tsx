import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const PLANS = [
  {
    id: "starter", name: "Starter", price: 199,
    desc: "Для персонального использования",
    color: "brand", devices: 1, speed: "100 Мбит/с", servers: 8,
    features: ["Xray/VLESS", "1 устройство", "8 серверов", "Базовая поддержка"],
    popular: false,
  },
  {
    id: "pro", name: "Pro", price: 399,
    desc: "Оптимально для команд и фрилансеров",
    color: "brand", devices: 5, speed: "500 Мбит/с", servers: 30,
    features: ["Xray/VLESS + Clash", "5 устройств", "30 серверов", "Приоритетная поддержка", "Telegram-бот", "IP-чекер"],
    popular: true,
  },
  {
    id: "ultra", name: "Ultra", price: 799,
    desc: "Для бизнеса с максимальными требованиями",
    color: "brand", devices: 10, speed: "1 Гбит/с", servers: 80,
    features: ["Все протоколы", "10 устройств", "80+ серверов", "24/7 поддержка", "Telegram-бот", "Speed-test", "API-доступ", "Выделенный IP"],
    popular: false,
  },
];

const COMPARE = [
  { label: "Скорость", vals: ["100 Мбит/с", "500 Мбит/с", "1 Гбит/с"] },
  { label: "Устройства", vals: ["1", "5", "10"] },
  { label: "Серверов", vals: ["8", "30", "80+"] },
  { label: "Xray/VLESS", vals: [true, true, true] },
  { label: "Clash конфиг", vals: [false, true, true] },
  { label: "AI-ассистент", vals: [false, true, true] },
  { label: "Выделенный IP", vals: [false, false, true] },
  { label: "API доступ", vals: [false, false, true] },
  { label: "SLA", vals: ["99%", "99.5%", "99.9%"] },
];

const FAQ = [
  { q: "Какие протоколы поддерживаются?", a: "Xray/VLESS, VMess, Trojan, Shadowsocks. На тарифе Pro и выше доступен Clash-конвертер для автоматической генерации конфигов." },
  { q: "Как быстро активируется подписка?", a: "Моментально после оплаты. Вы получите конфиг-ссылку и QR-код для подключения в течение 30 секунд." },
  { q: "Можно ли сменить тариф?", a: "Да, вы можете повысить или понизить тариф в любой момент через личный кабинет. Разница будет пересчитана пропорционально." },
  { q: "Есть ли ограничения по трафику?", a: "Нет. Все тарифы включают безлимитный трафик без ограничений по объёму данных." },
];

export default function Pricing() {
  const [months, setMonths] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const discount = months >= 12 ? 0.4 : months >= 6 ? 0.2 : months >= 3 ? 0.1 : 0;

  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-b from-brand-50 to-white pt-16 pb-20 px-6">
        <div className="max-w-[1280px] mx-auto text-center">
          <div className="text-sm font-semibold text-brand mb-3">Тарифы</div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Простые и прозрачные цены
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10">
            Выберите подходящий тариф. Все включают шифрование AES-256 и безлимитный трафик.
          </p>

          {/* Period selector */}
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-1.5 shadow-sm mb-4">
            {[
              { m: 1, label: "1 мес." },
              { m: 3, label: "3 мес.", badge: "−10%" },
              { m: 6, label: "6 мес.", badge: "−20%" },
              { m: 12, label: "12 мес.", badge: "−40%" },
            ].map((opt) => (
              <button key={opt.m} onClick={() => setMonths(opt.m)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  months === opt.m
                    ? "bg-brand text-white shadow-sm"
                    : "text-gray-600 hover:text-foreground hover:bg-gray-50"
                }`}>
                {opt.label}
                {opt.badge && months !== opt.m && (
                  <span className="absolute -top-2 -right-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-1.5">
                    {opt.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section className="px-6 -mt-4 pb-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {PLANS.map((plan, i) => {
              const total = Math.round(plan.price * months * (1 - discount));
              const perMonth = Math.round(plan.price * (1 - discount));
              return (
                <div key={plan.id}
                  className={`relative bg-white rounded-2xl border p-8 transition-all hover:shadow-lg animate-slide-up ${
                    plan.popular ? "border-brand shadow-md ring-1 ring-brand/20" : "border-gray-200"
                  }`}
                  style={{ opacity: 0, animationDelay: `${i * 0.1}s` }}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="text-xs font-semibold text-white bg-brand px-3 py-1 rounded-full shadow-sm">
                        Популярный
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                    <p className="text-sm text-gray-500">{plan.desc}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-foreground">{total.toLocaleString("ru")}</span>
                      <span className="text-gray-400">₽</span>
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      {months > 1 ? `${perMonth.toLocaleString("ru")} ₽/мес за ${months} мес.` : "в месяц"}
                      {discount > 0 && (
                        <span className="ml-2 text-emerald-600 font-medium">
                          экономия {((plan.price * months) - total).toLocaleString("ru")} ₽
                        </span>
                      )}
                    </div>
                  </div>

                  <button className={`w-full py-3 rounded-lg text-sm font-semibold transition-all mb-6 ${
                    plan.popular
                      ? "bg-brand text-white hover:bg-brand-600 shadow-sm"
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
              );
            })}
          </div>

          {/* COMPARISON TABLE */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">Сравнение тарифов</h2>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Параметр</th>
                    {PLANS.map((p) => (
                      <th key={p.id} className="text-center px-4 py-4">
                        <span className={`text-sm font-semibold ${p.popular ? "text-brand" : "text-foreground"}`}>
                          {p.name}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((row, ri) => (
                    <tr key={ri} className="border-b border-gray-50 last:border-0">
                      <td className="px-6 py-3.5 text-sm text-gray-600">{row.label}</td>
                      {row.vals.map((v, vi) => (
                        <td key={vi} className="text-center px-4 py-3.5">
                          {typeof v === "boolean"
                            ? v
                              ? <Icon name="Check" size={16} className="text-emerald-500 mx-auto" />
                              : <Icon name="X" size={16} className="text-gray-300 mx-auto" />
                            : <span className="text-sm font-medium text-foreground">{v}</span>
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">Частые вопросы</h2>
            <div className="space-y-3">
              {FAQ.map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left">
                    <span className="text-sm font-semibold text-foreground">{item.q}</span>
                    <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={16} className="text-gray-400 flex-shrink-0 ml-4" />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-4 animate-fade-in">
                      <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
