import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const PLATFORMS = [
  { icon: "Monitor", label: "Windows", desc: "10, 11" },
  { icon: "Laptop", label: "macOS", desc: "12+" },
  { icon: "Smartphone", label: "iOS", desc: "15+" },
  { icon: "Smartphone", label: "Android", desc: "10+" },
  { icon: "Terminal", label: "Linux", desc: "Ubuntu, Fedora" },
  { icon: "Wifi", label: "Router", desc: "OpenWrt, Keenetic" },
];

interface PlatformsAndCtaProps {
  setActiveTab: (tab: string) => void;
}

export default function PlatformsAndCta({ setActiveTab }: PlatformsAndCtaProps) {
  return (
    <>
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
    </>
  );
}
