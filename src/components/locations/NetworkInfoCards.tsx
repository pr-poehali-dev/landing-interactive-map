import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function NetworkInfoCards() {
  return (
    <>
      {/* Info cards */}
      <section className="px-5 pb-24">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-3 animate-fade-up"
          >
            Почему наша сеть быстрая
          </h2>
          <p
            className="text-sm text-gray-500 text-center mb-10 animate-fade-up"
            style={{ animationDelay: ".1s", opacity: 0 }}
          >
            Инфраструктура, построенная для максимальной производительности
          </p>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-up"
            style={{ animationDelay: ".15s", opacity: 0 }}
          >
            {[
              {
                icon: "Zap",
                title: "Премиум каналы",
                desc: "Прямые каналы до 10 Гбит/с в каждом дата-центре. Без перепродажи и промежуточных узлов.",
              },
              {
                icon: "Shield",
                title: "Tier-3 дата-центры",
                desc: "Все серверы размещены в сертифицированных дата-центрах с резервным питанием и охлаждением.",
              },
              {
                icon: "RefreshCw",
                title: "Автоматический failover",
                desc: "При сбое сервера трафик мгновенно перенаправляется на ближайшую доступную точку.",
              },
              {
                icon: "Lock",
                title: "Zero-log политика",
                desc: "Серверы работают в RAM-only режиме. При перезагрузке все данные уничтожаются.",
              },
              {
                icon: "Globe",
                title: "Anycast DNS",
                desc: "Собственная DNS-инфраструктура для мгновенного разрешения имён без утечек.",
              },
              {
                icon: "BarChart3",
                title: "Мониторинг 24/7",
                desc: "Автоматический мониторинг нагрузки, пинга и доступности каждого сервера каждые 30 секунд.",
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
      <section className="px-5 pb-24">
        <div className="max-w-3xl mx-auto">
          <div
            className="relative rounded-2xl bg-gradient-to-br from-v-500 to-v-700 p-10 md:p-14 text-center overflow-hidden animate-fade-up"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_60%)]" />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
                Подключитесь к ближайшему серверу
              </h2>
              <p className="text-sm text-white/70 mb-8 max-w-md mx-auto leading-relaxed">
                Выберите тариф и получите доступ ко всей сети серверов VORTEX VPN.
                Настройка занимает не более 2 минут.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/tariffs"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-v-700 bg-white hover:bg-gray-50 px-7 py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md"
                >
                  Выбрать тариф
                  <Icon name="ArrowRight" size={16} />
                </Link>
                <Link
                  to="/help"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white border border-white/20 hover:border-white/40 px-7 py-3.5 rounded-xl transition-all"
                >
                  Помощь с настройкой
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
