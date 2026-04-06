import Icon from "@/components/ui/icon";

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

export default function ComparisonTable() {
  return (
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
  );
}
