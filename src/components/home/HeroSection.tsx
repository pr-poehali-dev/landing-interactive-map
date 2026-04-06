import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/873a5974-24fa-404f-a1ef-56c0a5af27b5/files/ead7355f-ddfd-4823-bdc0-8fff2bec42e0.jpg";

const STATS = [
  { value: 94200, label: "Пользователей", suffix: "+" },
  { value: 80, label: "Серверов", suffix: "+" },
  { value: 15, label: "Стран", suffix: "" },
  { value: 99, label: "Uptime", suffix: ".9%" },
];

function useCounter(target: number, dur = 2000) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const t0 = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - t0) / dur, 1);
      setV(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    const id = setTimeout(() => requestAnimationFrame(tick), 300);
    return () => clearTimeout(id);
  }, [target, dur]);
  return v;
}

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const v = useCounter(value);
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-extrabold text-foreground">
        {v.toLocaleString("ru")}{suffix}
      </div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="absolute inset-0 bg-gradient-to-br from-v-50 via-white to-emerald-50/30" />
      <div className="relative max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-v-600 bg-v-50 border border-v-100 rounded-full px-4 py-1.5 mb-6 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Все серверы онлайн
            </div>

            <h1
              className="text-4xl md:text-[3.25rem] font-extrabold text-foreground leading-[1.12] tracking-tight mb-6 animate-fade-up"
              style={{ animationDelay: ".1s", opacity: 0 }}
            >
              Быстрый и надёжный VPN
              <span className="text-v-500"> для всех устройств</span>
            </h1>

            <p
              className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg animate-fade-up"
              style={{ animationDelay: ".2s", opacity: 0 }}
            >
              80+ серверов в 15 странах. Xray/VLESS, Clash, AI-поддержка, семейный контроль — всё из коробки. Подключение за 2 минуты.
            </p>

            <div
              className="flex flex-wrap gap-3 mb-12 animate-fade-up"
              style={{ animationDelay: ".3s", opacity: 0 }}
            >
              <Link
                to="/tariffs"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-v-500 hover:bg-v-600 px-6 py-3 rounded-lg transition-all shadow-sm hover:shadow-md"
              >
                Выбрать тариф <Icon name="ArrowRight" size={16} />
              </Link>
              <a
                href="#advantages"
                className="inline-flex items-center gap-2 text-sm font-semibold text-foreground bg-white hover:bg-gray-50 px-6 py-3 rounded-lg border border-gray-200 transition-all"
              >
                Подробнее
              </a>
            </div>

            <div
              className="grid grid-cols-4 gap-4 animate-fade-up"
              style={{ animationDelay: ".4s", opacity: 0 }}
            >
              {STATS.map((s) => (
                <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
              ))}
            </div>
          </div>

          <div className="hidden lg:block animate-fade-up" style={{ animationDelay: ".3s", opacity: 0 }}>
            <div className="relative">
              <div className="absolute -inset-4 bg-v-100/60 rounded-3xl blur-2xl" />
              <img src={HERO_IMG} alt="Vortex VPN" className="relative w-full rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
