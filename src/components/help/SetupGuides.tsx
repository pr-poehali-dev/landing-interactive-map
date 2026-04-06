import Icon from "@/components/ui/icon";

export const GUIDES = [
  {
    icon: "Smartphone",
    title: "Настройка Happ",
    steps: "5 шагов",
    desc: "Установите приложение Happ на iOS или Android, импортируйте конфигурацию по ссылке и подключитесь к VPN за 2 минуты.",
    tags: ["iOS", "Android"],
  },
  {
    icon: "Wifi",
    title: "Настройка OpenWrt",
    steps: "10 шагов",
    desc: "Пошаговая инструкция по настройке VPN-подключения на роутерах с прошивкой OpenWrt. Поддержка Xray и Shadowsocks.",
    tags: ["Router", "OpenWrt"],
  },
  {
    icon: "Router",
    title: "Настройка Keenetic",
    steps: "8 шагов",
    desc: "Подключение VORTEX VPN на роутерах Keenetic через встроенный VPN-клиент. Не требует сторонних прошивок.",
    tags: ["Router", "Keenetic"],
  },
  {
    icon: "Code2",
    title: "Настройка VLESS",
    steps: "6 шагов",
    desc: "Импорт VLESS-конфигурации в популярные клиенты: v2rayN, v2rayNG, Nekoray, Shadowrocket и Clash.",
    tags: ["Desktop", "Mobile"],
  },
];

interface SetupGuidesProps {
  filteredGuides: typeof GUIDES;
}

export default function SetupGuides({ filteredGuides }: SetupGuidesProps) {
  return (
    <section className="px-5 pb-20">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-3 animate-fade-up"
        >
          Быстрая настройка
        </h2>
        <p
          className="text-sm text-gray-500 text-center mb-10 animate-fade-up"
          style={{ animationDelay: ".05s", opacity: 0 }}
        >
          Пошаговые гайды для каждой платформы
        </p>

        {filteredGuides.length === 0 ? (
          <div className="text-center py-12 animate-fade-up">
            <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
              <Icon name="SearchX" size={24} className="text-gray-300" />
            </div>
            <p className="text-sm font-semibold text-foreground mb-1">
              Гайды не найдены
            </p>
            <p className="text-sm text-gray-400">
              Попробуйте изменить поисковый запрос
            </p>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-up"
            style={{ animationDelay: ".1s", opacity: 0 }}
          >
            {filteredGuides.map((guide) => (
              <div
                key={guide.title}
                className="group relative rounded-2xl border border-gray-100 bg-white p-7 hover:border-v-200 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-v-50 group-hover:bg-v-500 flex items-center justify-center shrink-0 transition-colors">
                    <Icon
                      name={guide.icon}
                      size={22}
                      className="text-v-500 group-hover:text-white transition-colors"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-2">
                      <h3 className="text-base font-bold text-foreground">
                        {guide.title}
                      </h3>
                      <span className="text-[11px] font-semibold text-v-600 bg-v-50 rounded-full px-2.5 py-0.5 shrink-0">
                        {guide.steps}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">
                      {guide.desc}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {guide.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-semibold text-gray-500 bg-gray-50 rounded px-2 py-0.5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-v-500 group-hover:text-v-600 transition-colors">
                        Открыть гайд
                        <Icon name="ArrowRight" size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
