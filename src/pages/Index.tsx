import { useState, useEffect, useRef, useCallback } from "react";
import Icon from "@/components/ui/icon";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const SERVERS = [
  { id: 1, name: "Amsterdam NL-01", flag: "🇳🇱", ping: 12, load: 23, online: true, users: 1204 },
  { id: 2, name: "Frankfurt DE-02", flag: "🇩🇪", ping: 18, load: 41, online: true, users: 2891 },
  { id: 3, name: "Tokyo JP-01", flag: "🇯🇵", ping: 87, load: 67, online: true, users: 934 },
  { id: 4, name: "New York US-03", flag: "🇺🇸", ping: 95, load: 55, online: true, users: 3201 },
  { id: 5, name: "Singapore SG-01", flag: "🇸🇬", ping: 142, load: 38, online: true, users: 677 },
  { id: 6, name: "London UK-02", flag: "🇬🇧", ping: 24, load: 82, online: false, users: 0 },
  { id: 7, name: "Paris FR-01", flag: "🇫🇷", ping: 31, load: 29, online: true, users: 445 },
  { id: 8, name: "Zurich CH-01", flag: "🇨🇭", ping: 28, load: 15, online: true, users: 312 },
];

const PLANS = [
  {
    id: "starter",
    name: "STARTER",
    price: 199,
    color: "#00f5ff",
    shadow: "rgba(0,245,255,0.4)",
    devices: 1,
    speed: "100 Мбит/с",
    servers: 8,
    features: ["Xray/VLESS", "1 устройство", "Базовая поддержка", "8 серверов"],
    popular: false,
  },
  {
    id: "pro",
    name: "PRO",
    price: 399,
    color: "#bf00ff",
    shadow: "rgba(191,0,255,0.4)",
    devices: 5,
    speed: "500 Мбит/с",
    servers: 30,
    features: ["Xray/VLESS + Clash", "5 устройств", "Приоритетная поддержка", "30 серверов", "Telegram-бот", "IP-чекер"],
    popular: true,
  },
  {
    id: "ultra",
    name: "ULTRA",
    price: 799,
    color: "#ff006e",
    shadow: "rgba(255,0,110,0.4)",
    devices: 10,
    speed: "1 Гбит/с",
    servers: 80,
    features: ["Все протоколы", "10 устройств", "24/7 поддержка", "80+ серверов", "Telegram-бот", "Speed-test", "API-доступ", "Выделенный IP"],
    popular: false,
  },
];

const CHAT_INIT = [
  { role: "bot", text: "Привет! Я AI-ассистент NEXVPN. Ваша подписка: PRO до 15.06.2025. Активные устройства: 3/5. Чем могу помочь?" },
];

const BOT_REPLIES: Record<string, string> = {
  default: "Обрабатываю запрос... Уточните детали или выберите тему: статус серверов, настройка, тарифы.",
  сервер: "Сейчас онлайн 7/8 серверов. Лондон UK-02 на тех. обслуживании. Рекомендую Amsterdam NL-01 — пинг 12мс, нагрузка 23%.",
  пинг: "Ваш текущий пинг до ближайшего сервера: 18мс (Frankfurt DE-02). Отличное соединение!",
  подписка: "Ваша подписка PRO активна до 15.06.2025. Осталось 72 дня. Хотите продлить со скидкой 20%?",
  скорость: "Ваша текущая скорость: ↓ 487 Мбит/с / ↑ 312 Мбит/с. Это 97% от максимума тарифа PRO.",
  устройства: "Активные устройства: iPhone 15 Pro, MacBook Pro M3, iPad Air. Слот 4 и 5 свободны.",
  конфиг: "Ваш Xray/VLESS конфиг обновлён 2 часа назад. Clash-конфиг актуален. Нужна пересылка на почту?",
};

/* ─────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────── */
function HeroSection({ onNav }: { onNav: (s: string) => void }) {
  const [counter, setCounter] = useState({ users: 0, servers: 0, uptime: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const targets = { users: 94200, servers: 80, uptime: 99 };
    const duration = 2000;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCounter({
        users: Math.floor(targets.users * ease),
        servers: Math.floor(targets.servers * ease),
        uptime: Math.floor(targets.uptime * ease),
      });
      if (p < 1) requestAnimationFrame(tick);
    };
    const t = setTimeout(() => requestAnimationFrame(tick), 400);
    return () => clearTimeout(t);
  }, []);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    const particles: { x: number; y: number; vx: number; vy: number; r: number; hue: number; life: number }[] = [];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.3,
        hue: Math.random() > 0.5 ? 183 : 280,
        life: Math.random(),
      });
    }

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.life += 0.004;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        const alpha = Math.sin(p.life * Math.PI) * 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,60%,${alpha})`;
        ctx.fill();
        if (p.life > 1) p.life = 0;
      });

      // Connection lines
      particles.forEach((a, i) => {
        particles.slice(i + 1, i + 6).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0,245,255,${(1 - dist / 100) * 0.12})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const resize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section className="relative min-h-screen cyber-grid-bg flex flex-col overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none animate-bg-pulse"
        style={{ background: "radial-gradient(circle, rgba(0,245,255,0.08) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none animate-bg-pulse delay-400"
        style={{ background: "radial-gradient(circle, rgba(191,0,255,0.08) 0%, transparent 70%)" }} />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-20 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-8 animate-fade-in">
          <span className="status-dot status-online" />
          <span className="tag-cyber" style={{ color: "#00ff88" }}>Все серверы работают</span>
          <span className="text-xs font-mono" style={{ color: "rgba(0,245,255,0.5)" }}>94 200 пользователей онлайн</span>
        </div>

        {/* Title */}
        <h1 className="animate-fade-in delay-100 mb-4"
          style={{ fontSize: "clamp(3rem, 9vw, 7rem)", fontFamily: "Orbitron,sans-serif", fontWeight: 900, lineHeight: 1, opacity: 0 }}>
          <span className="gradient-text">NEX</span>
          <span style={{ color: "rgba(255,255,255,0.9)" }}>VPN</span>
        </h1>

        <p className="animate-fade-in delay-200 mb-4 animate-neon-flicker"
          style={{ fontFamily: "Orbitron,sans-serif", fontSize: "clamp(0.65rem,1.8vw,0.85rem)", letterSpacing: "0.35em", color: "#00f5ff", opacity: 0 }}>
          СЛЕДУЮЩИЙ УРОВЕНЬ ЦИФРОВОЙ СВОБОДЫ
        </p>

        <p className="animate-fade-in delay-300 mb-12 max-w-2xl"
          style={{ color: "rgba(180,220,255,0.6)", fontSize: "clamp(0.85rem,2vw,1.05rem)", lineHeight: 1.7, opacity: 0 }}>
          Xray/VLESS + Clash-конвертор. Военное шифрование. AI-ассистент. Карта серверов в реальном времени.
        </p>

        {/* CTA */}
        <div className="flex flex-wrap gap-4 justify-center mb-16 animate-fade-in delay-400" style={{ opacity: 0 }}>
          <button className="btn-neon-solid" onClick={() => onNav("plans")}>
            <span>Начать сейчас</span>
            <Icon name="ArrowRight" size={14} />
          </button>
          <button className="btn-neon" onClick={() => onNav("tools")}>
            <span>Проверить IP</span>
            <Icon name="Search" size={14} />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 animate-fade-in delay-500" style={{ opacity: 0 }}>
          {[
            { val: counter.users.toLocaleString("ru"), label: "Пользователей", color: "#00f5ff" },
            { val: `${counter.servers}+`, label: "Серверов", color: "#bf00ff" },
            { val: `${counter.uptime}%`, label: "Uptime", color: "#00ff88" },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-lg px-6 py-4 text-center">
              <div className="text-2xl font-mono font-bold mb-1" style={{ color: s.color, fontFamily: "Orbitron,sans-serif", textShadow: `0 0 20px ${s.color}` }}>
                {s.val}
              </div>
              <div className="text-xs tracking-widest" style={{ color: "rgba(0,245,255,0.4)", fontFamily: "Orbitron,sans-serif", fontSize: "0.55rem" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex justify-center pb-8">
        <button onClick={() => onNav("plans")} className="flex flex-col items-center gap-2" style={{ color: "rgba(0,245,255,0.3)" }}>
          <span style={{ fontFamily: "Orbitron,sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em" }}>SCROLL</span>
          <Icon name="ChevronDown" size={16} className="animate-bounce" />
        </button>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PLANS SECTION
───────────────────────────────────────────── */
function PlansSection() {
  const [months, setMonths] = useState(1);
  const [selected, setSelected] = useState("pro");

  const discount = months >= 12 ? 0.4 : months >= 6 ? 0.2 : months >= 3 ? 0.1 : 0;
  const discountLabel = months >= 12 ? "−40%" : months >= 6 ? "−20%" : months >= 3 ? "−10%" : "";

  return (
    <section id="plans" className="relative py-24 px-6 cyber-grid-bg">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <div className="tag-cyber glass-card inline-block rounded mb-4" style={{ color: "#bf00ff", borderColor: "rgba(191,0,255,0.3)" }}>
            ТАРИФЫ И ПОДПИСКИ
          </div>
          <h2 className="section-title gradient-text mb-4" style={{ fontFamily: "Orbitron,sans-serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900 }}>
            ВЫБЕРИТЕ СВОЙ УРОВЕНЬ
          </h2>
          <p style={{ color: "rgba(180,220,255,0.5)", fontSize: "0.9rem" }}>Все тарифы включают шифрование военного класса</p>
        </div>

        {/* Period slider */}
        <div className="glass-card rounded-xl p-6 mb-12 max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontFamily: "Orbitron,sans-serif", fontSize: "0.65rem", color: "#00f5ff", letterSpacing: "0.15em" }}>
              ПЕРИОД: {months} МЕС.
            </span>
            {discountLabel && (
              <span className="tag-cyber rounded" style={{ background: "rgba(0,255,136,0.15)", color: "#00ff88", border: "1px solid rgba(0,255,136,0.3)" }}>
                СКИДКА {discountLabel}
              </span>
            )}
          </div>
          <input
            type="range" min={1} max={12} value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full" style={{ accentColor: "#00f5ff", cursor: "pointer" }}
          />
          <div className="flex justify-between mt-2">
            {[1, 3, 6, 12].map((m) => (
              <button key={m} onClick={() => setMonths(m)}
                className="tag-cyber rounded transition-all"
                style={{
                  color: months === m ? "#050510" : "rgba(0,245,255,0.5)",
                  background: months === m ? "#00f5ff" : "transparent",
                  border: `1px solid ${months === m ? "#00f5ff" : "rgba(0,245,255,0.2)"}`,
                  fontSize: "0.6rem",
                }}>
                {m}М
              </button>
            ))}
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PLANS.map((plan) => {
            const finalPrice = Math.round(plan.price * months * (1 - discount));
            const isSelected = selected === plan.id;
            return (
              <div key={plan.id} onClick={() => setSelected(plan.id)}
                className="glass-card rounded-xl p-6 cursor-pointer relative overflow-hidden transition-all duration-300"
                style={{
                  borderColor: isSelected ? plan.color : "rgba(0,245,255,0.12)",
                  boxShadow: isSelected ? `0 0 40px ${plan.shadow}, 0 16px 48px rgba(0,0,0,0.5)` : undefined,
                  transform: isSelected ? "translateY(-6px)" : undefined,
                }}>

                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="tag-cyber rounded-bl-lg" style={{ background: plan.color, color: "#050510", padding: "0.3rem 0.8rem" }}>
                      POPULAR
                    </div>
                  </div>
                )}

                {/* Glow */}
                {isSelected && (
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at center top, ${plan.shadow.replace("0.4", "0.06")} 0%, transparent 70%)` }} />
                )}

                <div className="relative z-10">
                  <div className="tag-cyber mb-4 inline-block rounded"
                    style={{ color: plan.color, border: `1px solid ${plan.color}40`, background: `${plan.color}10` }}>
                    {plan.name}
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span style={{ fontFamily: "Orbitron,sans-serif", fontSize: "2.5rem", fontWeight: 900, color: plan.color, textShadow: `0 0 20px ${plan.shadow}` }}>
                        {finalPrice.toLocaleString("ru")}
                      </span>
                      <span style={{ color: "rgba(180,220,255,0.4)", fontSize: "0.8rem" }}>₽</span>
                    </div>
                    <div style={{ fontFamily: "Orbitron,sans-serif", fontSize: "0.55rem", color: "rgba(180,220,255,0.4)", letterSpacing: "0.1em" }}>
                      за {months} мес. {discount > 0 && `(было ${(plan.price * months).toLocaleString("ru")}₽)`}
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2" style={{ fontSize: "0.8rem", color: "rgba(180,220,255,0.7)" }}>
                        <Icon name="Check" size={12} style={{ color: plan.color, flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button className="w-full btn-neon"
                    style={{ borderColor: plan.color, color: plan.color }}>
                    <span>{isSelected ? "Выбрано" : "Выбрать"}</span>
                    {isSelected && <Icon name="Check" size={12} />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison table */}
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b" style={{ borderColor: "rgba(0,245,255,0.1)" }}>
            <h3 style={{ fontFamily: "Orbitron,sans-serif", fontSize: "0.75rem", color: "#00f5ff", letterSpacing: "0.15em" }}>
              ДЕТАЛЬНОЕ СРАВНЕНИЕ
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(0,245,255,0.08)" }}>
                  <th className="text-left px-6 py-3" style={{ fontFamily: "Orbitron,sans-serif", fontSize: "0.6rem", color: "rgba(0,245,255,0.4)", letterSpacing: "0.15em" }}>
                    ПАРАМЕТР
                  </th>
                  {PLANS.map((p) => (
                    <th key={p.id} className="text-center px-4 py-3" style={{ fontFamily: "Orbitron,sans-serif", fontSize: "0.6rem", color: p.color, letterSpacing: "0.15em" }}>
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Скорость", vals: ["100 Мбит/с", "500 Мбит/с", "1 Гбит/с"] },
                  { label: "Устройства", vals: ["1", "5", "10"] },
                  { label: "Серверов", vals: ["8", "30", "80+"] },
                  { label: "Xray/VLESS", vals: [true, true, true] },
                  { label: "Clash конфиг", vals: [false, true, true] },
                  { label: "Выделенный IP", vals: [false, false, true] },
                  { label: "API доступ", vals: [false, false, true] },
                ].map((row, ri) => (
                  <tr key={ri} style={{ borderBottom: "1px solid rgba(0,245,255,0.05)" }}>
                    <td className="px-6 py-3" style={{ fontSize: "0.8rem", color: "rgba(180,220,255,0.6)" }}>{row.label}</td>
                    {row.vals.map((v, vi) => (
                      <td key={vi} className="text-center px-4 py-3">
                        {typeof v === "boolean"
                          ? <Icon name={v ? "Check" : "X"} size={14} style={{ color: v ? "#00ff88" : "rgba(255,0,110,0.5)", margin: "auto" }} />
                          : <span style={{ fontFamily: "IBM Plex Mono,monospace", fontSize: "0.78rem", color: PLANS[vi].color }}>{v}</span>
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   TOOLS SECTION
───────────────────────────────────────────── */
function ToolsSection() {
  const [activeTab, setActiveTab] = useState<"ip" | "speed" | "xray" | "clash">("ip");

  // IP Checker state
  const [ipResult, setIpResult] = useState<null | { ip: string; country: string; city: string; isp: string; vpn: boolean }>(null);
  const [ipLoading, setIpLoading] = useState(false);

  // Speed test state
  const [speedState, setSpeedState] = useState<"idle" | "running" | "done">("idle");
  const [download, setDownload] = useState(0);
  const [upload, setUpload] = useState(0);
  const [ping, setPing] = useState(0);

  // Xray state
  const [xrayServer, setXrayServer] = useState(SERVERS[0].id.toString());
  const [xrayProto, setXrayProto] = useState("vless");
  const [xrayResult, setXrayResult] = useState("");

  // Clash state
  const [clashInput, setClashInput] = useState("");
  const [clashOutput, setClashOutput] = useState("");

  const checkIp = () => {
    setIpLoading(true);
    setIpResult(null);
    setTimeout(() => {
      setIpResult({
        ip: "185.220.101.47",
        country: "Нидерланды 🇳🇱",
        city: "Amsterdam",
        isp: "NEXVPN NL-01 (Protected)",
        vpn: true,
      });
      setIpLoading(false);
    }, 1800);
  };

  const runSpeedTest = () => {
    setSpeedState("running");
    setDownload(0); setUpload(0); setPing(0);
    let dl = 0, ul = 0, pi = 0;
    const interval = setInterval(() => {
      pi = Math.min(pi + Math.random() * 3, 18);
      dl = Math.min(dl + Math.random() * 20, 487);
      ul = Math.min(ul + Math.random() * 15, 312);
      setPing(Math.round(pi));
      setDownload(Math.round(dl));
      setUpload(Math.round(ul));
      if (dl >= 487) { clearInterval(interval); setSpeedState("done"); }
    }, 120);
  };

  const generateXray = () => {
    const srv = SERVERS.find((s) => s.id.toString() === xrayServer)!;
    const uuid = "7b4e9f2a-c3d1-4e8b-a0f5-" + Math.random().toString(36).slice(2, 14);
    setXrayResult(
      `${xrayProto}://${uuid}@vpn-${srv.name.toLowerCase().replace(/\s/g, "-")}.nexvpn.io:443?type=tcp&security=tls&sni=nexvpn.io#NEXVPN-${srv.flag}${srv.name.split(" ")[0]}`
    );
  };

  const convertClash = () => {
    if (!clashInput.trim()) return;
    setClashOutput(`proxies:
  - name: NEXVPN-AUTO
    type: vless
    server: vpn-amsterdam-nl01.nexvpn.io
    port: 443
    uuid: ${clashInput.split("@")[0]?.split("://")[1] || "auto-generated-uuid"}
    network: tcp
    tls: true
    sni: nexvpn.io
    udp: true

proxy-groups:
  - name: NEXVPN
    type: select
    proxies: [NEXVPN-AUTO, DIRECT]

rules:
  - GEOIP,RU,DIRECT
  - MATCH,NEXVPN`);
  };

  const tabs = [
    { id: "ip", label: "IP ЧЕКЕР", icon: "Globe" },
    { id: "speed", label: "SPEED TEST", icon: "Zap" },
    { id: "xray", label: "XRAY ГЕН.", icon: "Code2" },
    { id: "clash", label: "CLASH КОНВ.", icon: "Repeat" },
  ] as const;

  return (
    <section id="tools" className="relative py-24 px-6" style={{ background: "linear-gradient(180deg, #050510 0%, #080818 50%, #050510 100%)" }}>
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-12">
          <div className="tag-cyber glass-card inline-block rounded mb-4" style={{ color: "#00f5ff" }}>ИНСТРУМЕНТЫ</div>
          <h2 style={{ fontFamily: "Orbitron,sans-serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: "white" }}>
            ПАНЕЛЬ УПРАВЛЕНИЯ
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 glass-card rounded-xl p-2">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all flex-1 justify-center"
              style={{
                fontFamily: "Orbitron,sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em",
                background: activeTab === t.id ? "rgba(0,245,255,0.12)" : "transparent",
                color: activeTab === t.id ? "#00f5ff" : "rgba(0,245,255,0.4)",
                border: activeTab === t.id ? "1px solid rgba(0,245,255,0.3)" : "1px solid transparent",
                boxShadow: activeTab === t.id ? "0 0 20px rgba(0,245,255,0.15)" : "none",
              }}>
              <Icon name={t.icon} size={13} />
              <span className="hidden sm:block">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="glass-card rounded-xl p-8 min-h-64">

          {/* IP Checker */}
          {activeTab === "ip" && (
            <div>
              <h3 className="mb-6" style={{ fontFamily: "Orbitron,sans-serif", fontSize: "0.85rem", color: "#00f5ff", letterSpacing: "0.15em" }}>
                ПРОВЕРКА IP-АДРЕСА
              </h3>
              <div className="flex gap-4 mb-8">
                <div className="flex-1 input-neon rounded flex items-center gap-2" style={{ padding: "0.75rem 1rem" }}>
                  <Icon name="Search" size={14} style={{ color: "rgba(0,245,255,0.4)" }} />
                  <span style={{ color: "rgba(0,245,255,0.5)", fontFamily: "IBM Plex Mono,monospace", fontSize: "0.85rem" }}>
                    Ваш IP определится автоматически
                  </span>
                </div>
                <button className="btn-neon-solid" onClick={checkIp} disabled={ipLoading}
                  style={{ opacity: ipLoading ? 0.7 : 1 }}>
                  {ipLoading ? <><Icon name="Loader2" size={14} className="animate-spin" /><span>Сканирую</span></> : <span>Проверить</span>}
                </button>
              </div>

              {ipResult && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
                  {[
                    { label: "IP АДРЕС", val: ipResult.ip, color: "#00f5ff" },
                    { label: "СТРАНА", val: ipResult.country, color: "#bf00ff" },
                    { label: "ГОРОД", val: ipResult.city, color: "#00ff88" },
                    { label: "ПРОВАЙДЕР", val: ipResult.isp, color: "#ffcc00" },
                  ].map((item) => (
                    <div key={item.label} className="glass-card rounded-lg p-4">
                      <div style={{ fontFamily: "Orbitron,sans-serif", fontSize: "0.5rem", color: "rgba(0,245,255,0.4)", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>
                        {item.label}
                      </div>
                      <div style={{ fontFamily: "IBM Plex Mono,monospace", fontSize: "0.8rem", color: item.color, wordBreak: "break-all" }}>
                        {item.val}
                      </div>
                    </div>
                  ))}
                  <div className="col-span-2 md:col-span-4 glass-card rounded-lg p-4 flex items-center gap-3">
                    <span className={`status-dot ${ipResult.vpn ? "status-online" : "status-offline"}`} />
                    <span style={{ fontFamily: "Orbitron,sans-serif", fontSize: "0.7rem", color: ipResult.vpn ? "#00ff88" : "#ff006e", letterSpacing: "0.1em" }}>
                      {ipResult.vpn ? "VPN ЗАЩИТА АКТИВНА — Ваш реальный IP скрыт" : "VPN НЕ ОБНАРУЖЕН — Ваш IP открыт"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Speed Test */}
          {activeTab === "speed" && (
            <div>
              <h3 className="mb-8" style={{ fontFamily: "Orbitron,sans-serif", fontSize: "0.85rem", color: "#00f5ff", letterSpacing: "0.15em" }}>
                ТЕСТ СКОРОСТИ СОЕДИНЕНИЯ
              </h3>
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[
                  { label: "ПИНГ", val: ping, unit: "мс", color: "#00ff88", max: 20 },
                  { label: "ЗАГРУЗКА", val: download, unit: "Мбит/с", color: "#00f5ff", max: 500 },
                  { label: "ОТДАЧА", val: upload, unit: "Мбит/с", color: "#bf00ff", max: 350 },
                ].map((m) => (
                  <div key={m.label} className="glass-card rounded-xl p-6 text-center">
                    <div style={{ fontFamily: "Orbitron,sans-serif", fontSize: "0.55rem", color: "rgba(0,245,255,0.4)", letterSpacing: "0.15em", marginBottom: "1rem" }}>
                      {m.label}
                    </div>
                    <div style={{ fontFamily: "Orbitron,sans-serif", fontSize: "2rem", fontWeight: 900, color: m.color, textShadow: `0 0 20px ${m.color}` }}>
                      {m.val}
                    </div>
                    <div style={{ color: "rgba(180,220,255,0.4)", fontSize: "0.75rem", marginTop: "0.25rem" }}>{m.unit}</div>
                    <div className="progress-neon mt-4 rounded">
                      <div className="progress-neon-fill rounded" style={{ width: `${Math.min(100, (m.val / m.max) * 100)}%`, background: `linear-gradient(90deg, ${m.color}, ${m.color}88)` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <button className="btn-neon-solid" onClick={runSpeedTest} disabled={speedState === "running"}
                  style={{ opacity: speedState === "running" ? 0.7 : 1 }}>
                  {speedState === "running"
                    ? <><Icon name="Loader2" size={14} className="animate-spin" /><span>Тестирование...</span></>
                    : speedState === "done"
                    ? <><Icon name="RefreshCw" size={14} /><span>Повторить тест</span></>
                    : <><Icon name="Zap" size={14} /><span>Запустить тест</span></>
                  }
                </button>
              </div>
            </div>
          )}

          {/* Xray Generator */}
          {activeTab === "xray" && (
            <div>
              <h3 className="mb-6" style={{ fontFamily: "Orbitron,sans-serif", fontSize: "0.85rem", color: "#00f5ff", letterSpacing: "0.15em" }}>
                ГЕНЕРАТОР XRAY КОНФИГА
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label style={{ fontFamily: "Orbitron,sans-serif", fontSize: "0.55rem", color: "rgba(0,245,255,0.4)", letterSpacing: "0.15em", display: "block", marginBottom: "0.5rem" }}>
                    СЕРВЕР
                  </label>
                  <select value={xrayServer} onChange={(e) => setXrayServer(e.target.value)} className="input-neon rounded" style={{ cursor: "pointer" }}>
                    {SERVERS.filter((s) => s.online).map((s) => (
                      <option key={s.id} value={s.id} style={{ background: "#0a0a1a" }}>
                        {s.flag} {s.name} — {s.ping}мс
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontFamily: "Orbitron,sans-serif", fontSize: "0.55rem", color: "rgba(0,245,255,0.4)", letterSpacing: "0.15em", display: "block", marginBottom: "0.5rem" }}>
                    ПРОТОКОЛ
                  </label>
                  <select value={xrayProto} onChange={(e) => setXrayProto(e.target.value)} className="input-neon rounded" style={{ cursor: "pointer" }}>
                    <option value="vless" style={{ background: "#0a0a1a" }}>VLESS + TLS</option>
                    <option value="vmess" style={{ background: "#0a0a1a" }}>VMess + WS</option>
                    <option value="trojan" style={{ background: "#0a0a1a" }}>Trojan</option>
                    <option value="shadowsocks" style={{ background: "#0a0a1a" }}>Shadowsocks</option>
                  </select>
                </div>
              </div>
              <button className="btn-neon-solid mb-6" onClick={generateXray}>
                <Icon name="Code2" size={14} />
                <span>Генерировать конфиг</span>
              </button>
              {xrayResult && (
                <div className="glass-card rounded-lg p-4 animate-fade-in">
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ fontFamily: "Orbitron,sans-serif", fontSize: "0.55rem", color: "rgba(0,245,255,0.4)", letterSpacing: "0.15em" }}>ССЫЛКА КОНФИГА</span>
                    <button onClick={() => navigator.clipboard.writeText(xrayResult)}
                      className="flex items-center gap-1 btn-neon" style={{ padding: "0.3rem 0.75rem", fontSize: "0.55rem" }}>
                      <Icon name="Copy" size={10} />
                      <span>Копировать</span>
                    </button>
                  </div>
                  <div style={{ fontFamily: "IBM Plex Mono,monospace", fontSize: "0.72rem", color: "#00ff88", wordBreak: "break-all", lineHeight: 1.6 }}>
                    {xrayResult}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Clash Converter */}
          {activeTab === "clash" && (
            <div>
              <h3 className="mb-6" style={{ fontFamily: "Orbitron,sans-serif", fontSize: "0.85rem", color: "#00f5ff", letterSpacing: "0.15em" }}>
                КОНВЕРТЕР В CLASH ФОРМАТ
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label style={{ fontFamily: "Orbitron,sans-serif", fontSize: "0.55rem", color: "rgba(0,245,255,0.4)", letterSpacing: "0.15em", display: "block", marginBottom: "0.5rem" }}>
                    ВСТАВЬТЕ ССЫЛКУ / КОНФИГ
                  </label>
                  <textarea value={clashInput} onChange={(e) => setClashInput(e.target.value)}
                    rows={8} className="input-neon rounded resize-none"
                    placeholder="vless://uuid@server:443?type=tcp..." />
                  <button className="btn-neon-solid mt-4 w-full" onClick={convertClash}>
                    <Icon name="Repeat" size={14} />
                    <span>Конвертировать</span>
                  </button>
                </div>
                <div>
                  <label style={{ fontFamily: "Orbitron,sans-serif", fontSize: "0.55rem", color: "rgba(0,245,255,0.4)", letterSpacing: "0.15em", display: "block", marginBottom: "0.5rem" }}>
                    CLASH YAML КОНФИГ
                  </label>
                  <textarea value={clashOutput} readOnly rows={8}
                    className="input-neon rounded resize-none"
                    style={{ color: clashOutput ? "#00ff88" : undefined }}
                    placeholder="Результат появится здесь..." />
                  {clashOutput && (
                    <button onClick={() => navigator.clipboard.writeText(clashOutput)}
                      className="btn-neon mt-4 w-full" style={{ justifyContent: "center" }}>
                      <Icon name="Download" size={14} />
                      <span>Скачать YAML</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   AI BOT SECTION
───────────────────────────────────────────── */
function BotSection() {
  const [messages, setMessages] = useState(CHAT_INIT);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const send = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    const key = Object.keys(BOT_REPLIES).find((k) => text.toLowerCase().includes(k)) || "default";
    setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: BOT_REPLIES[key] }]);
      setTyping(false);
    }, 1200 + Math.random() * 800);
  }, [input]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  return (
    <section id="bot" className="py-24 px-6 cyber-grid-bg">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="tag-cyber glass-card inline-block rounded mb-4" style={{ color: "#bf00ff" }}>AI АССИСТЕНТ</div>
          <h2 style={{ fontFamily: "Orbitron,sans-serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: "white" }}>
            NEXVPN <span className="neon-purple">AI.BOT</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Server status sidebar */}
          <div className="space-y-3">
            <div style={{ fontFamily: "Orbitron,sans-serif", fontSize: "0.6rem", color: "rgba(0,245,255,0.4)", letterSpacing: "0.15em", marginBottom: "1rem" }}>
              СТАТУС СЕРВЕРОВ
            </div>
            {SERVERS.slice(0, 6).map((s) => (
              <div key={s.id} className="glass-card rounded-lg px-3 py-2.5 flex items-center gap-3">
                <span className={`status-dot ${s.online ? "status-online" : "status-offline"}`} />
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: "0.75rem", color: "rgba(180,220,255,0.8)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {s.flag} {s.name}
                  </div>
                  {s.online && (
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="progress-neon flex-1 rounded" style={{ height: "2px" }}>
                        <div className="progress-neon-fill rounded" style={{ width: `${s.load}%`, height: "2px", background: s.load > 70 ? "#ff006e" : s.load > 50 ? "#ffcc00" : "#00ff88" }} />
                      </div>
                      <span style={{ fontFamily: "IBM Plex Mono,monospace", fontSize: "0.6rem", color: "rgba(0,245,255,0.4)" }}>{s.ping}мс</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Chat */}
          <div className="lg:col-span-2 glass-card rounded-xl overflow-hidden flex flex-col" style={{ height: "480px" }}>
            {/* Chat header */}
            <div className="px-5 py-4 flex items-center gap-3 border-b" style={{ borderColor: "rgba(0,245,255,0.1)" }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #00f5ff, #bf00ff)" }}>
                <Icon name="Bot" size={16} style={{ color: "#050510" }} />
              </div>
              <div>
                <div style={{ fontFamily: "Orbitron,sans-serif", fontSize: "0.7rem", color: "#00f5ff", letterSpacing: "0.1em" }}>NEXVPN AI ASSISTANT</div>
                <div className="flex items-center gap-1.5">
                  <span className="status-dot status-online" style={{ width: 6, height: 6 }} />
                  <span style={{ fontSize: "0.65rem", color: "rgba(0,255,136,0.7)" }}>Онлайн — GPT-4 на основе контекста подписки</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
                  {m.role === "bot" && (
                    <div className="w-7 h-7 rounded-full flex-shrink-0 mr-2 flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, rgba(0,245,255,0.2), rgba(191,0,255,0.2))", border: "1px solid rgba(0,245,255,0.3)" }}>
                      <Icon name="Bot" size={12} style={{ color: "#00f5ff" }} />
                    </div>
                  )}
                  <div style={{
                    maxWidth: "75%",
                    padding: "0.625rem 0.875rem",
                    borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "2px 12px 12px 12px",
                    background: m.role === "user"
                      ? "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(191,0,255,0.15))"
                      : "rgba(255,255,255,0.04)",
                    border: m.role === "user" ? "1px solid rgba(0,245,255,0.3)" : "1px solid rgba(255,255,255,0.07)",
                    fontSize: "0.82rem",
                    color: "rgba(200,230,255,0.9)",
                    lineHeight: 1.55,
                  }}>
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex items-center gap-2 animate-fade-in">
                  <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ background: "rgba(0,245,255,0.1)", border: "1px solid rgba(0,245,255,0.2)" }}>
                    <Icon name="Bot" size={12} style={{ color: "#00f5ff" }} />
                  </div>
                  <div className="glass-card rounded-xl px-4 py-2.5 flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce"
                        style={{ background: "#00f5ff", animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            <div className="px-4 py-2 flex flex-wrap gap-1.5 border-t" style={{ borderColor: "rgba(0,245,255,0.08)" }}>
              {["Статус серверов", "Моя подписка", "Помощь с конфигом"].map((q) => (
                <button key={q} onClick={() => { setInput(q); }}
                  className="tag-cyber rounded-full transition-all"
                  style={{ color: "rgba(0,245,255,0.6)", border: "1px solid rgba(0,245,255,0.15)", padding: "0.2rem 0.65rem", cursor: "pointer" }}
                  onMouseOver={(e) => (e.currentTarget.style.borderColor = "rgba(0,245,255,0.4)")}
                  onMouseOut={(e) => (e.currentTarget.style.borderColor = "rgba(0,245,255,0.15)")}>
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 flex gap-3 border-t" style={{ borderColor: "rgba(0,245,255,0.1)" }}>
              <input value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                className="input-neon rounded-lg flex-1"
                placeholder="Спросите об VPN, серверах, тарифах..." />
              <button className="btn-neon-solid" onClick={send} style={{ padding: "0.75rem 1.25rem" }}>
                <Icon name="Send" size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   DASHBOARD SECTION
───────────────────────────────────────────── */
function DashboardSection() {
  const [activeDevice, setActiveDevice] = useState<number | null>(null);

  const devices = [
    { id: 1, name: "iPhone 15 Pro", icon: "Smartphone", server: "Amsterdam NL-01", flag: "🇳🇱", ip: "185.220.101.47", connected: true, speed: "487 Мбит/с" },
    { id: 2, name: "MacBook Pro M3", icon: "Monitor", server: "Frankfurt DE-02", flag: "🇩🇪", ip: "94.140.8.23", connected: true, speed: "312 Мбит/с" },
    { id: 3, name: "iPad Air", icon: "Tablet", server: "Amsterdam NL-01", flag: "🇳🇱", ip: "185.220.101.47", connected: true, speed: "201 Мбит/с" },
    { id: 4, name: "Слот свободен", icon: "Plus", server: "—", flag: "", ip: "—", connected: false, speed: "—" },
    { id: 5, name: "Слот свободен", icon: "Plus", server: "—", flag: "", ip: "—", connected: false, speed: "—" },
  ];

  return (
    <section id="dashboard" className="py-24 px-6" style={{ background: "linear-gradient(180deg, #050510 0%, #060614 100%)" }}>
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">
          <div className="tag-cyber glass-card inline-block rounded mb-4" style={{ color: "#00ff88" }}>ЛИЧНЫЙ КАБИНЕТ</div>
          <h2 style={{ fontFamily: "Orbitron,sans-serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: "white" }}>
            МОЯ <span className="neon-green">ПАНЕЛЬ</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* Subscription card */}
          <div className="glass-card rounded-xl p-6 hex-border">
            <div className="flex items-center justify-between mb-6">
              <div style={{ fontFamily: "Orbitron,sans-serif", fontSize: "0.6rem", color: "rgba(0,245,255,0.4)", letterSpacing: "0.15em" }}>МОЯ ПОДПИСКА</div>
              <span className="tag-cyber rounded" style={{ background: "rgba(191,0,255,0.15)", color: "#bf00ff", border: "1px solid rgba(191,0,255,0.3)" }}>PRO</span>
            </div>
            <div style={{ fontFamily: "Orbitron,sans-serif", fontSize: "2rem", fontWeight: 900, color: "#bf00ff", textShadow: "0 0 20px rgba(191,0,255,0.5)", marginBottom: "0.5rem" }}>
              399 ₽/мес
            </div>
            <div style={{ fontSize: "0.78rem", color: "rgba(180,220,255,0.5)", marginBottom: "1.5rem" }}>
              Активна до <span style={{ color: "#ffcc00" }}>15 июня 2025</span>
            </div>

            <div className="space-y-3 mb-6">
              {[
                { label: "Устройства", val: "3 / 5", pct: 60 },
                { label: "Трафик", val: "147 / 500 ГБ", pct: 29 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between mb-1">
                    <span style={{ fontSize: "0.72rem", color: "rgba(0,245,255,0.5)" }}>{item.label}</span>
                    <span style={{ fontFamily: "IBM Plex Mono,monospace", fontSize: "0.72rem", color: "#00f5ff" }}>{item.val}</span>
                  </div>
                  <div className="progress-neon rounded">
                    <div className="progress-neon-fill rounded" style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <button className="btn-neon-solid w-full" style={{ justifyContent: "center" }}>
              <Icon name="RefreshCw" size={13} />
              <span>Продлить подписку</span>
            </button>
          </div>

          {/* Server map (ASCII style) */}
          <div className="lg:col-span-2 glass-card rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(0,245,255,0.1)" }}>
              <span style={{ fontFamily: "Orbitron,sans-serif", fontSize: "0.6rem", color: "rgba(0,245,255,0.4)", letterSpacing: "0.15em" }}>
                КАРТА СЕРВЕРОВ
              </span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="status-dot status-online" style={{ width: 6, height: 6 }} />
                  <span style={{ fontSize: "0.6rem", color: "rgba(0,255,136,0.6)" }}>Онлайн: 7</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="status-dot status-offline" style={{ width: 6, height: 6 }} />
                  <span style={{ fontSize: "0.6rem", color: "rgba(255,0,110,0.6)" }}>Офлайн: 1</span>
                </div>
              </div>
            </div>
            <div className="p-4 relative" style={{ minHeight: "220px", background: "rgba(0,245,255,0.02)" }}>
              {/* World map SVG simplified */}
              <svg viewBox="0 0 800 360" className="w-full opacity-20 absolute inset-0 pointer-events-none" style={{ height: "100%" }}>
                <g fill="none" stroke="rgba(0,245,255,0.4)" strokeWidth="0.5">
                  {/* Simplified continent outlines */}
                  <path d="M 80 120 Q 140 100 180 130 Q 200 160 160 200 Q 120 220 80 180 Z" />
                  <path d="M 220 80 Q 320 60 380 90 Q 420 110 400 160 Q 360 200 300 210 Q 240 200 220 160 Q 200 120 220 80 Z" />
                  <path d="M 380 100 Q 460 80 520 110 Q 560 140 540 200 Q 500 240 440 230 Q 390 200 380 150 Z" />
                  <path d="M 560 80 Q 660 70 720 120 Q 750 160 720 220 Q 680 260 620 250 Q 560 240 540 190 Q 520 140 560 80 Z" />
                  <path d="M 100 240 Q 160 230 200 270 Q 220 300 180 330 Q 140 340 110 310 Q 80 280 100 240 Z" />
                  <path d="M 250 260 Q 340 250 380 290 Q 400 320 360 350 Q 300 360 260 330 Q 230 300 250 260 Z" />
                </g>
                {/* Grid lines */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <line key={i} x1={i * 160} y1={0} x2={i * 160} y2={360} stroke="rgba(0,245,255,0.05)" strokeWidth="1" />
                ))}
                {[0, 1, 2, 3].map((i) => (
                  <line key={i} x1={0} y1={i * 90} x2={800} y2={i * 90} stroke="rgba(0,245,255,0.05)" strokeWidth="1" />
                ))}
              </svg>

              {/* Server dots on map */}
              {[
                { name: "🇳🇱 NL", x: "42%", y: "28%", online: true },
                { name: "🇩🇪 DE", x: "46%", y: "30%", online: true },
                { name: "🇬🇧 UK", x: "40%", y: "26%", online: false },
                { name: "🇫🇷 FR", x: "43%", y: "33%", online: true },
                { name: "🇨🇭 CH", x: "45%", y: "32%", online: true },
                { name: "🇺🇸 US", x: "20%", y: "38%", online: true },
                { name: "🇯🇵 JP", x: "77%", y: "35%", online: true },
                { name: "🇸🇬 SG", x: "72%", y: "58%", online: true },
              ].map((dot) => (
                <div key={dot.name} className="absolute flex flex-col items-center" style={{ left: dot.x, top: dot.y, transform: "translate(-50%,-50%)" }}>
                  <div className={`w-2.5 h-2.5 rounded-full ${dot.online ? "status-online" : "status-offline"}`}
                    style={{ width: 10, height: 10, borderRadius: "50%", background: dot.online ? "#00ff88" : "#ff006e", boxShadow: `0 0 10px ${dot.online ? "#00ff88" : "#ff006e"}` }} />
                  <span style={{ fontFamily: "Orbitron,sans-serif", fontSize: "0.45rem", color: "rgba(0,245,255,0.6)", marginTop: 2, whiteSpace: "nowrap" }}>
                    {dot.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Devices */}
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b" style={{ borderColor: "rgba(0,245,255,0.1)" }}>
            <span style={{ fontFamily: "Orbitron,sans-serif", fontSize: "0.6rem", color: "rgba(0,245,255,0.4)", letterSpacing: "0.15em" }}>
              МОИ УСТРОЙСТВА
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x"
            style={{ divideColor: "rgba(0,245,255,0.08)" }}>
            {devices.map((d) => (
              <div key={d.id} onClick={() => setActiveDevice(activeDevice === d.id ? null : d.id)}
                className="p-5 cursor-pointer transition-all"
                style={{
                  background: activeDevice === d.id ? "rgba(0,245,255,0.06)" : "transparent",
                  borderBottom: "1px solid rgba(0,245,255,0.05)",
                }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: d.connected ? "rgba(0,245,255,0.1)" : "rgba(255,255,255,0.04)", border: `1px solid ${d.connected ? "rgba(0,245,255,0.2)" : "rgba(255,255,255,0.07)"}` }}>
                    <Icon name={d.icon} size={15} style={{ color: d.connected ? "#00f5ff" : "rgba(255,255,255,0.2)" }} />
                  </div>
                  {d.connected && <span className="status-dot status-online" style={{ width: 6, height: 6 }} />}
                </div>
                <div style={{ fontSize: "0.78rem", color: d.connected ? "rgba(200,230,255,0.85)" : "rgba(255,255,255,0.2)", marginBottom: "0.25rem" }}>
                  {d.name}
                </div>
                {d.connected && (
                  <>
                    <div style={{ fontFamily: "IBM Plex Mono,monospace", fontSize: "0.65rem", color: "rgba(0,245,255,0.5)" }}>
                      {d.flag} {d.server}
                    </div>
                    <div style={{ fontFamily: "IBM Plex Mono,monospace", fontSize: "0.6rem", color: "#00ff88", marginTop: "0.25rem" }}>
                      ↓ {d.speed}
                    </div>
                  </>
                )}
                {!d.connected && (
                  <div style={{ fontSize: "0.65rem", color: "rgba(0,245,255,0.3)" }}>Нажмите для добавления</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   NAV
───────────────────────────────────────────── */
function Nav({ active, onNav }: { active: string; onNav: (s: string) => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(5,5,16,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,245,255,0.1)" : "none",
      }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div style={{ fontFamily: "Orbitron,sans-serif", fontWeight: 900, fontSize: "1.1rem" }}
          className="gradient-text cursor-pointer" onClick={() => onNav("hero")}>
          NEXVPN
        </div>
        <div className="hidden md:flex items-center gap-8">
          {[
            { id: "hero", label: "Главная" },
            { id: "plans", label: "Тарифы" },
            { id: "tools", label: "Инструменты" },
            { id: "bot", label: "AI бот" },
            { id: "dashboard", label: "Кабинет" },
          ].map((item) => (
            <button key={item.id} onClick={() => onNav(item.id)}
              className={`nav-link ${active === item.id ? "active" : ""}`}>
              {item.label}
            </button>
          ))}
        </div>
        <button className="btn-neon" style={{ padding: "0.5rem 1.25rem" }} onClick={() => onNav("plans")}>
          <span>Подключить</span>
          <Icon name="ArrowRight" size={12} />
        </button>
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="py-12 px-6 border-t" style={{ borderColor: "rgba(0,245,255,0.08)", background: "#040410" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div style={{ fontFamily: "Orbitron,sans-serif", fontWeight: 900, fontSize: "1.1rem" }} className="gradient-text">
            NEXVPN
          </div>
          <div style={{ fontFamily: "Orbitron,sans-serif", fontSize: "0.55rem", color: "rgba(0,245,255,0.25)", letterSpacing: "0.15em" }}>
            © 2025 NEXVPN. ВОЕННОЕ ШИФРОВАНИЕ. НУЛЕВЫЕ ЛОГИ.
          </div>
          <div className="flex items-center gap-4">
            {["Shield", "Lock", "Wifi"].map((ic) => (
              <Icon key={ic} name={ic} size={16} style={{ color: "rgba(0,245,255,0.25)" }} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   ROOT
───────────────────────────────────────────── */
export default function Index() {
  const [activeSection, setActiveSection] = useState("hero");

  const scrollTo = useCallback((id: string) => {
    setActiveSection(id);
    const el = id === "hero" ? document.body : document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const sections = ["hero", "plans", "tools", "bot", "dashboard"];
    const handler = () => {
      const scrollY = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (!el && sections[i] === "hero") { if (scrollY < 400) { setActiveSection("hero"); break; } }
        else if (el && el.offsetTop <= scrollY) { setActiveSection(sections[i]); break; }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#050510" }}>
      <div className="scanlines" />
      <Nav active={activeSection} onNav={scrollTo} />
      <HeroSection onNav={scrollTo} />
      <PlansSection />
      <ToolsSection />
      <BotSection />
      <DashboardSection />
      <Footer />
    </div>
  );
}
