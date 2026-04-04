import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const SERVERS = [
  { flag: "🇳🇱", name: "Amsterdam NL-01", ping: 12, load: 23, online: true, users: 1204 },
  { flag: "🇩🇪", name: "Frankfurt DE-02", ping: 18, load: 41, online: true, users: 2891 },
  { flag: "🇯🇵", name: "Tokyo JP-01", ping: 87, load: 67, online: true, users: 934 },
  { flag: "🇺🇸", name: "New York US-03", ping: 95, load: 55, online: true, users: 3201 },
  { flag: "🇸🇬", name: "Singapore SG-01", ping: 142, load: 38, online: true, users: 677 },
  { flag: "🇬🇧", name: "London UK-02", ping: 0, load: 0, online: false, users: 0 },
  { flag: "🇫🇷", name: "Paris FR-01", ping: 31, load: 29, online: true, users: 445 },
  { flag: "🇨🇭", name: "Zurich CH-01", ping: 28, load: 15, online: true, users: 312 },
];

const DEVICES = [
  { id: 1, name: "iPhone 15 Pro", icon: "Smartphone", server: "Amsterdam NL-01", flag: "🇳🇱", connected: true, speed: "487 Мбит/с" },
  { id: 2, name: "MacBook Pro M3", icon: "Monitor", server: "Frankfurt DE-02", flag: "🇩🇪", connected: true, speed: "312 Мбит/с" },
  { id: 3, name: "iPad Air", icon: "Tablet", server: "Amsterdam NL-01", flag: "🇳🇱", connected: true, speed: "201 Мбит/с" },
  { id: 4, name: "Слот свободен", icon: "Plus", server: "", flag: "", connected: false, speed: "" },
  { id: 5, name: "Слот свободен", icon: "Plus", server: "", flag: "", connected: false, speed: "" },
];

const ACTIVITY = [
  { time: "14:32", event: "Подключение к Amsterdam NL-01", device: "iPhone 15 Pro", type: "connect" },
  { time: "13:15", event: "Смена сервера: DE → NL", device: "MacBook Pro M3", type: "switch" },
  { time: "12:00", event: "Обновление конфига", device: "iPad Air", type: "config" },
  { time: "09:45", event: "Подключение к Frankfurt DE-02", device: "MacBook Pro M3", type: "connect" },
  { time: "08:30", event: "Авторизация в системе", device: "iPhone 15 Pro", type: "auth" },
];

const MAP_POINTS = [
  { name: "🇳🇱 NL", x: "42%", y: "26%", online: true },
  { name: "🇩🇪 DE", x: "46%", y: "28%", online: true },
  { name: "🇬🇧 UK", x: "38%", y: "24%", online: false },
  { name: "🇫🇷 FR", x: "41%", y: "31%", online: true },
  { name: "🇨🇭 CH", x: "44%", y: "30%", online: true },
  { name: "🇺🇸 US", x: "18%", y: "36%", online: true },
  { name: "🇯🇵 JP", x: "78%", y: "32%", online: true },
  { name: "🇸🇬 SG", x: "73%", y: "56%", online: true },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "servers" | "devices">("overview");

  const onlineCount = SERVERS.filter((s) => s.online).length;
  const offlineCount = SERVERS.filter((s) => !s.online).length;

  return (
    <>
      <section className="bg-gradient-to-b from-gray-50 to-white pt-16 pb-6 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-sm font-semibold text-brand mb-2">Панель управления</div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Обзор</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Серверов онлайн: {onlineCount}/{SERVERS.length}
              </span>
              <Link to="/pricing" className="text-sm font-semibold text-white bg-brand px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors">
                Продлить
              </Link>
            </div>
          </div>

          <div className="flex gap-2">
            {([["overview", "Обзор", "LayoutDashboard"], ["servers", "Серверы", "Server"], ["devices", "Устройства", "Smartphone"]] as const).map(([id, label, icon]) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  activeTab === id ? "bg-brand text-white shadow-sm" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}>
                <Icon name={icon} size={15} />{label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[1280px] mx-auto mt-6">

          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Подписка", val: "PRO", sub: "до 15.06.2025", color: "text-brand", bg: "bg-brand-50" },
                  { label: "Устройства", val: "3/5", sub: "активных", color: "text-emerald-600", bg: "bg-emerald-50" },
                  { label: "Трафик", val: "147 ГБ", sub: "безлимит", color: "text-blue-600", bg: "bg-blue-50" },
                  { label: "Uptime", val: "99.8%", sub: "за 30 дней", color: "text-amber-600", bg: "bg-amber-50" },
                ].map((c) => (
                  <div key={c.label} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-all">
                    <div className="text-xs font-medium text-gray-400 mb-3">{c.label}</div>
                    <div className={`text-2xl font-bold ${c.color} mb-0.5`}>{c.val}</div>
                    <div className="text-xs text-gray-400">{c.sub}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Map */}
                <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <span className="text-sm font-semibold text-foreground">Карта серверов</span>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400" />Онлайн: {onlineCount}</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400" />Офлайн: {offlineCount}</span>
                    </div>
                  </div>
                  <div className="relative p-4" style={{ minHeight: "260px", background: "#f9fafb" }}>
                    <svg viewBox="0 0 800 360" className="w-full opacity-15 absolute inset-0 pointer-events-none" style={{ height: "100%" }}>
                      <g fill="none" stroke="#7C3AED" strokeWidth="0.6">
                        <path d="M 80 120 Q 140 100 180 130 Q 200 160 160 200 Q 120 220 80 180 Z" />
                        <path d="M 220 80 Q 320 60 380 90 Q 420 110 400 160 Q 360 200 300 210 Q 240 200 220 160 Q 200 120 220 80 Z" />
                        <path d="M 380 100 Q 460 80 520 110 Q 560 140 540 200 Q 500 240 440 230 Q 390 200 380 150 Z" />
                        <path d="M 560 80 Q 660 70 720 120 Q 750 160 720 220 Q 680 260 620 250 Q 560 240 540 190 Q 520 140 560 80 Z" />
                        <path d="M 100 240 Q 160 230 200 270 Q 220 300 180 330 Q 140 340 110 310 Q 80 280 100 240 Z" />
                        <path d="M 250 260 Q 340 250 380 290 Q 400 320 360 350 Q 300 360 260 330 Q 230 300 250 260 Z" />
                      </g>
                    </svg>
                    {MAP_POINTS.map((p) => (
                      <div key={p.name} className="absolute flex flex-col items-center group" style={{ left: p.x, top: p.y, transform: "translate(-50%,-50%)" }}>
                        <div className={`w-3 h-3 rounded-full border-2 border-white shadow-sm ${p.online ? "bg-emerald-400" : "bg-red-400"}`} />
                        <span className="text-[10px] font-semibold text-gray-500 mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity">{p.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-100">
                    <span className="text-sm font-semibold text-foreground">Последние события</span>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {ACTIVITY.map((a, i) => (
                      <div key={i} className="px-5 py-3 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon name={a.type === "connect" ? "Wifi" : a.type === "switch" ? "ArrowLeftRight" : a.type === "config" ? "Settings" : "LogIn"} size={14} className="text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-foreground truncate">{a.event}</div>
                          <div className="text-xs text-gray-400">{a.device} · {a.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "servers" && (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    {["Сервер", "Статус", "Пинг", "Нагрузка", "Пользователи"].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SERVERS.map((s) => (
                    <tr key={s.name} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{s.flag}</span>
                          <span className="text-sm font-medium text-foreground">{s.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${
                          s.online ? "text-emerald-700 bg-emerald-50" : "text-red-700 bg-red-50"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${s.online ? "bg-emerald-500" : "bg-red-500"}`} />
                          {s.online ? "Онлайн" : "Офлайн"}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-sm font-mono text-foreground">{s.online ? `${s.ping} мс` : "—"}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        {s.online ? (
                          <div className="flex items-center gap-3">
                            <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full rounded-full" style={{
                                width: `${s.load}%`,
                                background: s.load > 70 ? '#ef4444' : s.load > 50 ? '#f59e0b' : '#10b981',
                              }} />
                            </div>
                            <span className="text-xs font-mono text-gray-500">{s.load}%</span>
                          </div>
                        ) : <span className="text-sm text-gray-300">—</span>}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-sm font-mono text-gray-500">{s.online ? s.users.toLocaleString("ru") : "—"}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "devices" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {DEVICES.map((d) => (
                <div key={d.id} className={`bg-white border rounded-xl p-5 transition-all ${
                  d.connected ? "border-gray-200 hover:shadow-md hover:border-brand-100" : "border-dashed border-gray-300 opacity-60"
                }`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      d.connected ? "bg-brand-50" : "bg-gray-50"
                    }`}>
                      <Icon name={d.icon} size={18} className={d.connected ? "text-brand" : "text-gray-300"} />
                    </div>
                    {d.connected && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
                  </div>
                  <div className="text-sm font-semibold text-foreground mb-1">{d.name}</div>
                  {d.connected ? (
                    <>
                      <div className="text-xs text-gray-400 mb-0.5">{d.flag} {d.server}</div>
                      <div className="text-xs font-mono text-emerald-600">↓ {d.speed}</div>
                    </>
                  ) : (
                    <div className="text-xs text-gray-400">Нажмите для добавления устройства</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
