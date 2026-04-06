import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function InfrastructureAndCta() {
  return (
    <>
      {/* Infrastructure details */}
      <section className="px-5 pb-20 bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-3 animate-fade-up">
            Инфраструктура мониторинга
          </h2>
          <p
            className="text-sm text-gray-500 text-center mb-10 animate-fade-up"
            style={{ animationDelay: ".1s", opacity: 0 }}
          >
            Как мы обеспечиваем прозрачность и стабильность сети
          </p>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-up"
            style={{ animationDelay: ".15s", opacity: 0 }}
          >
            {[
              {
                icon: "Radio",
                title: "Проверка каждые 30 сек",
                desc: "Каждый сервер опрашивается каждые 30 секунд по нескольким метрикам: пинг, скорость, потери пакетов.",
              },
              {
                icon: "Bell",
                title: "Мгновенные алерты",
                desc: "При превышении порогов нагрузки или увеличении пинга инженеры получают уведомления в Telegram за секунды.",
              },
              {
                icon: "BarChart3",
                title: "Публичные дашборды",
                desc: "Вся статистика доступна пользователям. Мы не скрываем данные о нагрузке и доступности серверов.",
              },
              {
                icon: "RefreshCw",
                title: "Auto-failover",
                desc: "При падении сервера трафик автоматически перенаправляется на ближайший доступный узел за 3 секунды.",
              },
              {
                icon: "Database",
                title: "RAM-only серверы",
                desc: "Все серверы работают в режиме оперативной памяти. При перезагрузке данные полностью уничтожаются.",
              },
              {
                icon: "FileText",
                title: "SLA 99.9%",
                desc: "Гарантия доступности закреплена в SLA. За последние 12 месяцев фактический uptime составил 99.97%.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-gray-100 bg-white p-6 hover:border-v-200 hover:shadow-md transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-v-50 group-hover:bg-v-500 flex items-center justify-center mb-4 transition-colors">
                  <Icon
                    name={card.icon}
                    size={20}
                    className="text-v-500 group-hover:text-white transition-colors"
                  />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1.5">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-20">
        <div className="max-w-3xl mx-auto">
          <div
            className="relative rounded-2xl bg-gradient-to-br from-v-500 to-v-700 p-10 md:p-14 text-center overflow-hidden animate-fade-up"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_60%)]" />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
                Убедитесь в качестве сами
              </h2>
              <p className="text-sm text-white/70 mb-8 max-w-md mx-auto leading-relaxed">
                Попробуйте VORTEX VPN бесплатно -- 3 дня полного доступа ко всем серверам.
                Проверьте скорость и стабильность на своих задачах.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/tariffs"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-v-700 bg-white hover:bg-gray-50 px-7 py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md"
                >
                  Начать бесплатно
                  <Icon name="ArrowRight" size={16} />
                </Link>
                <Link
                  to="/locations"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white border border-white/20 hover:border-white/40 px-7 py-3.5 rounded-xl transition-all"
                >
                  Все серверы
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
