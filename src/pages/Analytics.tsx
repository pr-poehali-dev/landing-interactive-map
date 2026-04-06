import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";
import SpeedAndMetrics from "@/components/analytics/SpeedAndMetrics";
import ChartsSection from "@/components/analytics/ChartsSection";
import InfrastructureAndCta from "@/components/analytics/InfrastructureAndCta";

const ANALYTICS_IMG =
  "https://cdn.poehali.dev/projects/873a5974-24fa-404f-a1ef-56c0a5af27b5/files/eaf956dc-e250-416d-9a19-3fbf1c4fcb3c.jpg";

/* ───── main component ───── */

export default function Analytics() {
  const [gaugeAnimated, setGaugeAnimated] = useState(false);

  /* animate gauge on mount */
  useEffect(() => {
    const t = setTimeout(() => setGaugeAnimated(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-medium text-emerald-300 bg-emerald-500/15 border border-emerald-500/25 rounded-full px-4 py-1.5 mb-6 animate-fade-up">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Мониторинг в реальном времени
              </div>

              <h1
                className="text-4xl md:text-[3.25rem] font-extrabold text-foreground leading-[1.12] tracking-tight mb-6 animate-fade-up"
                style={{ animationDelay: ".1s", opacity: 0 }}
              >
                Аналитика <span className="text-v-500">сети</span>
              </h1>

              <p
                className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg animate-fade-up"
                style={{ animationDelay: ".2s", opacity: 0 }}
              >
                Полная прозрачность инфраструктуры VORTEX VPN. Скорость, пинг,
                нагрузка каналов и статистика подключений -- всё обновляется в реальном времени.
              </p>

              <div
                className="flex flex-wrap gap-3 animate-fade-up"
                style={{ animationDelay: ".3s", opacity: 0 }}
              >
                <Link
                  to="/locations"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-v-500 hover:bg-v-600 px-6 py-3 rounded-lg transition-all shadow-sm hover:shadow-md"
                >
                  Серверы <Icon name="ArrowRight" size={16} />
                </Link>
                <Link
                  to="/tariffs"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-foreground bg-white hover:bg-gray-50 px-6 py-3 rounded-lg border border-gray-200 transition-all"
                >
                  Тарифы
                </Link>
              </div>
            </div>

            <div
              className="hidden lg:block animate-fade-up"
              style={{ animationDelay: ".3s", opacity: 0 }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-v-100/60 rounded-3xl blur-2xl" />
                <img
                  src={ANALYTICS_IMG}
                  alt="VORTEX VPN analytics"
                  className="relative w-full rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SpeedAndMetrics gaugeAnimated={gaugeAnimated} />
      <ChartsSection />
      <InfrastructureAndCta />

      <Footer />
    </>
  );
}