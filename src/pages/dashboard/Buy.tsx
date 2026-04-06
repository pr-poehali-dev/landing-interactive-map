import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const PLANS = [
  { name: "Турбо", price: "500", period: "мес", devices: 5, desc: "Безлимит, Clash, 40 серверов", popular: true },
  { name: "Семейный", price: "800", period: "мес", devices: 8, desc: "DNS-фильтрация, родительский контроль", popular: false },
  { name: "Роутер", price: "300", period: "мес", devices: 1, desc: "Весь дом, OpenWrt/Keenetic", popular: false },
  { name: "Пробный", price: "0", period: "3 дня", devices: 1, desc: "5 ГБ, бесплатно", popular: false },
];

export default function Buy() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Купить подписку</h1>
        <p className="text-sm text-gray-500">Выберите тариф и срок подключения</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PLANS.map((plan, i) => (
          <div
            key={plan.name}
            className={`relative bg-white rounded-2xl border p-6 transition-all hover:shadow-md animate-fade-up ${
              plan.popular ? "border-v-200 ring-1 ring-v-100" : "border-gray-200"
            }`}
            style={{ opacity: 0, animationDelay: `${i * 0.08}s` }}
          >
            {plan.popular && (
              <span className="absolute -top-2.5 right-4 text-[10px] font-semibold text-white bg-v-500 px-3 py-0.5 rounded-full">
                Популярный
              </span>
            )}
            <div className="flex items-baseline gap-1.5 mb-2">
              <span className="text-2xl font-extrabold text-foreground">{plan.price}</span>
              <span className="text-sm text-gray-400">₽/{plan.period}</span>
            </div>
            <h3 className="text-base font-bold text-foreground mb-1">{plan.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{plan.desc}</p>
            <div className="flex items-center gap-4 text-xs text-gray-400 mb-5">
              <span className="flex items-center gap-1"><Icon name="Smartphone" size={12} /> {plan.devices} устр.</span>
            </div>
            <button className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              plan.popular ? "bg-v-500 text-white hover:bg-v-600" : "bg-gray-100 text-foreground hover:bg-gray-200"
            }`}>
              Подключить
            </button>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link to="/tariffs" className="text-sm font-medium text-v-500 hover:text-v-600 inline-flex items-center gap-1">
          Все тарифы и сравнение <Icon name="ArrowRight" size={14} />
        </Link>
      </div>
    </div>
  );
}
