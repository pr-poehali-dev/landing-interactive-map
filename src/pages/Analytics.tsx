import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ANALYTICS_IMG =
  "https://cdn.poehali.dev/projects/873a5974-24fa-404f-a1ef-56c0a5af27b5/files/eaf956dc-e250-416d-9a19-3fbf1c4fcb3c.jpg";

const PRIMARY = "#22956A";
const SECONDARY = "#A7F3D0";

/* ───── key metrics ───── */

const METRICS = [
  {
    icon: "Zap",
    label: "Пропускная способность",
    value: "847",
    unit: "Мбит/с",
    change: "+3.2%",
    up: true,
  },
  {
    icon: "Activity",
    label: "Средний пинг",
    value: "28",
    unit: "мс",
    change: "-1.4%",
    up: true,
  },
  {
    icon: "ShieldCheck",
    label: "Packet Loss",
    value: "0.02",
    unit: "%",
    change: "-0.01%",
    up: true,
  },
  {
    icon: "Users",
    label: "Активных подключений",
    value: "12 480",
    unit: "",
    change: "+128",
    up: true,
  },
];

/* ───── mock data generators ───── */

function generateChannelData() {
  const channels = ["NL-01", "DE-01", "US-01", "JP-01", "SG-01", "FR-01"];
  return channels.map((name) => ({
    name,
    load: Math.floor(Math.random() * 60) + 20,
    capacity: 100,
  }));
}

function generateTrafficData() {
  return Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0") + ":00";
    const base = i >= 8 && i <= 22 ? 400 : 150;
    const peak = i >= 19 && i <= 22 ? 200 : 0;
    return {
      hour,
      download: base + Math.floor(Math.random() * 150) + peak,
      upload: Math.floor((base + Math.random() * 80) * 0.45),
    };
  });
}

const WEEKLY_DATA = [
  { day: "Пн", connections: 10200, peak: 12800 },
  { day: "Вт", connections: 11400, peak: 13200 },
  { day: "Ср", connections: 12100, peak: 14500 },
  { day: "Чт", connections: 11800, peak: 13900 },
  { day: "Пт", connections: 13500, peak: 16200 },
  { day: "Сб", connections: 14800, peak: 17100 },
  { day: "Вс", connections: 12480, peak: 15300 },
];

/* ───── speed gauge component ───── */

function SpeedGauge({
  value,
  max,
  label,
  unit,
  animated,
}: {
  value: number;
  max: number;
  label: string;
  unit: string;
  animated: boolean;
}) {
  const radius = 58;
  const stroke = 8;
  const circumference = 2 * Math.PI * radius;
  const halfCirc = circumference * 0.75;
  const progress = animated ? (value / max) * halfCirc : 0;

  return (
    <div className="flex flex-col items-center">
      <svg width="140" height="120" viewBox="0 0 140 130" className="overflow-visible">
        {/* Background track */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#F3F4F6"
          strokeWidth={stroke}
          strokeDasharray={`${halfCirc} ${circumference}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          transform="rotate(135 70 70)"
        />
        {/* Progress arc */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={PRIMARY}
          strokeWidth={stroke}
          strokeDasharray={`${progress} ${circumference}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          transform="rotate(135 70 70)"
          style={{
            transition: "stroke-dasharray 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        {/* Value text */}
        <text
          x="70"
          y="64"
          textAnchor="middle"
          className="fill-foreground"
          style={{ fontSize: "26px", fontWeight: 800 }}
        >
          {animated ? value : 0}
        </text>
        <text
          x="70"
          y="84"
          textAnchor="middle"
          className="fill-gray-400"
          style={{ fontSize: "11px", fontWeight: 500 }}
        >
          {unit}
        </text>
      </svg>
      <span className="text-xs font-semibold text-gray-500 mt-1">{label}</span>
    </div>
  );
}

/* ───── custom tooltip ───── */

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-4 py-3 text-xs">
      <p className="font-semibold text-foreground mb-1.5">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: p.color }}
          />
          <span className="text-gray-500">{p.name}:</span>
          <span className="font-bold text-foreground">{p.value.toLocaleString("ru")}</span>
        </div>
      ))}
    </div>
  );
}

/* ───── live dot ───── */

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-v-600 bg-v-50 border border-v-100 rounded-full px-3 py-1">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      Live
    </span>
  );
}

/* ───── main component ───── */

export default function Analytics() {
  const [gaugeAnimated, setGaugeAnimated] = useState(false);
  const [channelData, setChannelData] = useState(generateChannelData);
  const [trafficData] = useState(generateTrafficData);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  /* animate gauge on mount */
  useEffect(() => {
    const t = setTimeout(() => setGaugeAnimated(true), 400);
    return () => clearTimeout(t);
  }, []);

  /* live channel data every 5 seconds */
  const refreshChannels = useCallback(() => {
    setChannelData(generateChannelData());
    setLastUpdate(new Date());
  }, []);

  useEffect(() => {
    const id = setInterval(refreshChannels, 5000);
    return () => clearInterval(id);
  }, [refreshChannels]);

  const timeStr = lastUpdate.toLocaleTimeString("ru", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-v-50 via-white to-emerald-50/30" />
        <div className="relative max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-medium text-v-600 bg-v-50 border border-v-100 rounded-full px-4 py-1.5 mb-6 animate-fade-up">
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

      {/* Key metrics */}
      <section className="px-5 pb-16">
        <div className="max-w-7xl mx-auto">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up"
            style={{ animationDelay: ".35s", opacity: 0 }}
          >
            {METRICS.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border border-gray-100 bg-white p-6 hover:border-v-200 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-v-50 group-hover:bg-v-500 flex items-center justify-center transition-colors">
                    <Icon
                      name={m.icon}
                      size={18}
                      className="text-v-500 group-hover:text-white transition-colors"
                    />
                  </div>
                  <span
                    className={`text-xs font-bold ${
                      m.up ? "text-v-500" : "text-red-400"
                    }`}
                  >
                    {m.change}
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-extrabold text-foreground">{m.value}</span>
                  {m.unit && (
                    <span className="text-sm text-gray-400 font-medium">{m.unit}</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Speed Test Gauge */}
      <section className="px-5 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-foreground animate-fade-up">
                Speed Test
              </h2>
              <p
                className="text-sm text-gray-500 mt-1 animate-fade-up"
                style={{ animationDelay: ".05s", opacity: 0 }}
              >
                Текущая производительность ближайшего сервера (Amsterdam NL-01)
              </p>
            </div>
            <LiveBadge />
          </div>

          <div
            className="rounded-2xl border border-gray-100 bg-white p-8 md:p-10 shadow-sm animate-fade-up"
            style={{ animationDelay: ".1s", opacity: 0 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <SpeedGauge
                value={285}
                max={500}
                label="Download"
                unit="Мбит/с"
                animated={gaugeAnimated}
              />
              <SpeedGauge
                value={142}
                max={500}
                label="Upload"
                unit="Мбит/с"
                animated={gaugeAnimated}
              />
              <SpeedGauge
                value={12}
                max={200}
                label="Ping"
                unit="мс"
                animated={gaugeAnimated}
              />
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-8 pt-6 border-t border-gray-50">
              {[
                { icon: "MapPin", text: "Amsterdam, NL" },
                { icon: "Server", text: "NL-01" },
                { icon: "Shield", text: "VLESS" },
                { icon: "Lock", text: "AES-256" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2 text-xs text-gray-500"
                >
                  <Icon name={item.icon} size={13} className="text-gray-400" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Channel Load (live bar chart) */}
      <section className="px-5 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-foreground animate-fade-up">
                Нагрузка по каналам
              </h2>
              <p
                className="text-sm text-gray-500 mt-1 animate-fade-up"
                style={{ animationDelay: ".05s", opacity: 0 }}
              >
                Обновляется каждые 5 секунд
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 font-mono">{timeStr}</span>
              <LiveBadge />
            </div>
          </div>

          <div
            className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm animate-fade-up"
            style={{ animationDelay: ".1s", opacity: 0 }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={channelData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `${v}%`}
                  width={45}
                />
                <Tooltip
                  content={<ChartTooltip />}
                  cursor={{ fill: "rgba(34,149,106,0.04)" }}
                />
                <Bar
                  dataKey="load"
                  name="Нагрузка"
                  fill={PRIMARY}
                  radius={[6, 6, 0, 0]}
                  animationDuration={800}
                />
              </BarChart>
            </ResponsiveContainer>

            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-50">
              {channelData.map((ch) => (
                <div key={ch.name} className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      ch.load <= 40
                        ? "bg-v-400"
                        : ch.load <= 70
                        ? "bg-amber-400"
                        : "bg-red-400"
                    }`}
                  />
                  <span className="text-xs text-gray-500">
                    {ch.name}: <span className="font-bold text-foreground">{ch.load}%</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Traffic Area Chart (24h) */}
      <section className="px-5 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-foreground animate-fade-up">
                График трафика
              </h2>
              <p
                className="text-sm text-gray-500 mt-1 animate-fade-up"
                style={{ animationDelay: ".05s", opacity: 0 }}
              >
                Объём входящего и исходящего трафика за последние 24 часа
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-5">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: PRIMARY }} />
                <span className="text-xs text-gray-500">Download</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: SECONDARY }} />
                <span className="text-xs text-gray-500">Upload</span>
              </div>
            </div>
          </div>

          <div
            className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm animate-fade-up"
            style={{ animationDelay: ".1s", opacity: 0 }}
          >
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="gradDown" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={PRIMARY} stopOpacity={0.2} />
                    <stop offset="100%" stopColor={PRIMARY} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradUp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={SECONDARY} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={SECONDARY} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                <XAxis
                  dataKey="hour"
                  tick={{ fontSize: 11, fill: "#9CA3AF" }}
                  axisLine={false}
                  tickLine={false}
                  interval={2}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#9CA3AF" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `${v}`}
                  width={40}
                />
                <Tooltip
                  content={<ChartTooltip />}
                  cursor={{ stroke: PRIMARY, strokeWidth: 1, strokeDasharray: "4 4" }}
                />
                <Area
                  type="monotone"
                  dataKey="download"
                  name="Download"
                  stroke={PRIMARY}
                  strokeWidth={2}
                  fill="url(#gradDown)"
                  animationDuration={1200}
                />
                <Area
                  type="monotone"
                  dataKey="upload"
                  name="Upload"
                  stroke={SECONDARY}
                  strokeWidth={2}
                  fill="url(#gradUp)"
                  animationDuration={1200}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Weekly activity (Line chart) */}
      <section className="px-5 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-foreground animate-fade-up">
                Пиковая активность
              </h2>
              <p
                className="text-sm text-gray-500 mt-1 animate-fade-up"
                style={{ animationDelay: ".05s", opacity: 0 }}
              >
                Количество активных подключений за последние 7 дней
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-5">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: PRIMARY }} />
                <span className="text-xs text-gray-500">Среднее</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: SECONDARY }}
                />
                <span className="text-xs text-gray-500">Пик</span>
              </div>
            </div>
          </div>

          <div
            className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm animate-fade-up"
            style={{ animationDelay: ".1s", opacity: 0 }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={WEEKLY_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)}
                  width={40}
                />
                <Tooltip
                  content={<ChartTooltip />}
                  cursor={{ stroke: "#E5E7EB", strokeWidth: 1 }}
                />
                <Line
                  type="monotone"
                  dataKey="connections"
                  name="Среднее"
                  stroke={PRIMARY}
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: PRIMARY, stroke: "#fff", strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: PRIMARY, stroke: "#fff", strokeWidth: 2 }}
                  animationDuration={1200}
                />
                <Line
                  type="monotone"
                  dataKey="peak"
                  name="Пик"
                  stroke={SECONDARY}
                  strokeWidth={2}
                  strokeDasharray="6 3"
                  dot={{ r: 3, fill: SECONDARY, stroke: "#fff", strokeWidth: 2 }}
                  activeDot={{ r: 5, fill: SECONDARY, stroke: "#fff", strokeWidth: 2 }}
                  animationDuration={1200}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

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

      <Footer />
    </>
  );
}
