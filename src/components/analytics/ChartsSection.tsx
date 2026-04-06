import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";
import { LiveBadge } from "@/components/analytics/SpeedAndMetrics";
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

const PRIMARY = "#22956A";
const SECONDARY = "#A7F3D0";

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

/* ───── component ───── */

export default function ChartsSection() {
  const [channelData, setChannelData] = useState(generateChannelData);
  const [trafficData] = useState(generateTrafficData);
  const [lastUpdate, setLastUpdate] = useState(new Date());

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
    </>
  );
}
