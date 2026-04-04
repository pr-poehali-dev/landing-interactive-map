import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const STATS = [
  { val: 94200, label: "Пользователей", suffix: "" },
  { val: 80, label: "Серверов", suffix: "+" },
  { val: 99, label: "Uptime", suffix: "%" },
  { val: 15, label: "Стран", suffix: "+" },
];

const FEATURES = [
  { icon: "Shield", title: "Военное шифрование", desc: "AES-256 + TLS 1.3. Ваш трафик невозможно прочитать даже при перехвате.", color: "bg-brand-50 text-brand" },
  { icon: "Zap", title: "До 1 Гбит/с", desc: "Высокоскоростные каналы без ограничений полосы пропускания на всех тарифах.", color: "bg-emerald-50 text-emerald-600" },
  { icon: "Globe", title: "80+ серверов", desc: "Серверы в 15 странах с автоматическим выбором оптимальной точки подключения.", color: "bg-blue-50 text-blue-600" },
  { icon: "Code2", title: "Xray / VLESS", desc: "Поддержка современных протоколов: VLESS, VMess, Trojan, Shadowsocks.", color: "bg-amber-50 text-amber-600" },
  { icon: "Bot", title: "AI-ассистент", desc: "Умный бот с контекстом вашей подписки отвечает на вопросы 24/7.", color: "bg-purple-50 text-purple-600" },
  { icon: "Repeat", title: "Clash конвертер", desc: "Мгновенная конвертация конфигов в формат Clash для всех устройств.", color: "bg-pink-50 text-pink-600" },
];

const SERVERS = [
  { flag: "🇳🇱", name: "Нидерланды", city: "Amsterdam", ping: 12, load: 23 },
  { flag: "🇩🇪", name: "Германия", city: "Frankfurt", ping: 18, load: 41 },
  { flag: "🇯🇵", name: "Япония", city: "Tokyo", ping: 87, load: 67 },
  { flag: "🇺🇸", name: "США", city: "New York", ping: 95, load: 55 },
  { flag: "🇸🇬", name: "Сингапур", city: "Singapore", ping: 142, load: 38 },
  { flag: "🇫🇷", name: "Франция", city: "Paris", ping: 31, load: 29 },
  { flag: "🇨🇭", name: "Швейцария", city: "Zurich", ping: 28, load: 15 },
  { flag: "🇬🇧", name: "Великобритания", city: "London", ping: 24, load: 82 },
];

function useCounter(target: number, duration = 2000) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      setVal(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    const t = setTimeout(() => requestAnimationFrame(tick), 300);
    return () => clearTimeout(t);
  }, [target, duration]);
  return val;
}

function StatCard({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const val = useCounter(target);
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 text-center shadow-sm hover:shadow-md hover:border-brand-200 transition-all">
      <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
        {val.toLocaleString("ru")}{suffix}
      </div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}

function StatsRow() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {STATS.map((s) => (
        <StatCard key={s.label} target={s.val} suffix={s.suffix} label={s.label} />
      ))}
    </div>
  );
}

export default function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-purple-50" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)" }} />

        <div className="relative max-w-[1280px] mx-auto px-6 pt-20 pb-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-brand bg-brand-50 border border-brand-100 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Все серверы работают — 94 200 пользователей онлайн
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight leading-[1.1] mb-6 animate-fade-in delay-100" style={{ opacity: 0 }}>
              VPN-инфраструктура
              <br />
              <span className="text-brand">для бизнеса и разработчиков</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-10 max-w-2xl animate-fade-in delay-200" style={{ opacity: 0 }}>
              Xray/VLESS, Clash-конвертер, AI-ассистент, карта серверов в реальном времени.
              Шифрование военного класса. 80+ точек в 15 странах.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-12 animate-fade-in delay-300" style={{ opacity: 0 }}>
              <Link to="/pricing"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-brand hover:bg-brand-600 px-6 py-3 rounded-lg transition-all shadow-sm hover:shadow-md">
                Выбрать тариф
                <Icon name="ArrowRight" size={16} />
              </Link>
              <Link to="/tools"
                className="inline-flex items-center gap-2 text-sm font-semibold text-foreground bg-white hover:bg-gray-50 px-6 py-3 rounded-lg transition-all border border-gray-200 shadow-sm">
                <Icon name="Search" size={16} />
                Проверить IP
              </Link>
            </div>

            <StatsRow />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-semibold text-brand mb-3">Возможности</div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
              Всё для безопасного подключения
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Полный набор инструментов: от генерации конфигов до мониторинга серверов в реальном времени
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div key={f.title}
                className="group bg-white border border-gray-100 rounded-2xl p-7 hover:shadow-lg hover:border-brand-100 transition-all animate-slide-up"
                style={{ opacity: 0, animationDelay: `${i * 0.08}s` }}>
                <div className={`w-11 h-11 rounded-xl ${f.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon name={f.icon} size={20} />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVERS */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-sm font-semibold text-brand mb-3">Серверы</div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
                Глобальная сеть
              </h2>
              <p className="text-gray-500 max-w-xl">
                80+ серверов в 15 странах с мониторингом нагрузки и пинга в реальном времени
              </p>
            </div>
            <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-600 transition-colors">
              Все серверы <Icon name="ArrowRight" size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVERS.map((s, i) => (
              <div key={s.city}
                className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-brand-100 transition-all animate-slide-up"
                style={{ opacity: 0, animationDelay: `${i * 0.06}s` }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{s.flag}</span>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{s.name}</div>
                      <div className="text-xs text-gray-400">{s.city}</div>
                    </div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm" />
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Пинг</span>
                    <span className="text-xs font-mono font-semibold text-foreground">{s.ping} мс</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400">Нагрузка</span>
                      <span className="text-xs font-mono font-semibold text-foreground">{s.load}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${s.load}%`,
                          background: s.load > 70 ? '#ef4444' : s.load > 50 ? '#f59e0b' : '#10b981',
                        }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="bg-brand rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 50%, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                Начните за 2 минуты
              </h2>
              <p className="text-brand-200 text-lg mb-8 max-w-xl mx-auto">
                Выберите тариф, получите конфиг и подключитесь. Поддержка всех платформ и устройств.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/pricing"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand bg-white hover:bg-gray-50 px-6 py-3 rounded-lg transition-all">
                  Смотреть тарифы
                  <Icon name="ArrowRight" size={16} />
                </Link>
                <Link to="/tools"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white border border-white/30 hover:bg-white/10 px-6 py-3 rounded-lg transition-all">
                  Попробовать инструменты
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}