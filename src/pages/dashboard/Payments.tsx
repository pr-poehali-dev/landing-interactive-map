import Icon from "@/components/ui/icon";

const PAYMENTS = [
  { id: 1, date: "5 апр 2025", desc: "Пополнение баланса", amount: "+1 000 ₽", type: "income" },
  { id: 2, date: "1 апр 2025", desc: "Продление «Турбо» — 1 мес", amount: "-500 ₽", type: "expense" },
  { id: 3, date: "28 мар 2025", desc: "Реферальный бонус (уровень 1)", amount: "+75 ₽", type: "income" },
  { id: 4, date: "15 мар 2025", desc: "Пополнение баланса", amount: "+2 000 ₽", type: "income" },
  { id: 5, date: "1 мар 2025", desc: "Продление «Турбо» — 1 мес", amount: "-500 ₽", type: "expense" },
  { id: 6, date: "20 фев 2025", desc: "Активация промокода WELCOME", amount: "+200 ₽", type: "income" },
  { id: 7, date: "1 фев 2025", desc: "Продление «Турбо» — 1 мес", amount: "-500 ₽", type: "expense" },
  { id: 8, date: "15 янв 2025", desc: "Пополнение баланса", amount: "+3 000 ₽", type: "income" },
];

export default function Payments() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">История платежей</h1>
        <p className="text-sm text-gray-500">Все транзакции по вашему аккаунту</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-fade-up">
        <div className="divide-y divide-gray-50">
          {PAYMENTS.map((p, i) => (
            <div
              key={p.id}
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors animate-fade-up"
              style={{ opacity: 0, animationDelay: `${i * 0.04}s` }}
            >
              <div className="flex items-center gap-4">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  p.type === "income" ? "bg-emerald-50" : "bg-red-50"
                }`}>
                  <Icon
                    name={p.type === "income" ? "ArrowDownLeft" : "ArrowUpRight"}
                    size={16}
                    className={p.type === "income" ? "text-emerald-500" : "text-red-400"}
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{p.desc}</div>
                  <div className="text-xs text-gray-400">{p.date}</div>
                </div>
              </div>
              <span className={`text-sm font-semibold ${
                p.type === "income" ? "text-v-500" : "text-foreground"
              }`}>
                {p.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
