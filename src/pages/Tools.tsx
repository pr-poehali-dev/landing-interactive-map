import { useState } from "react";
import Icon from "@/components/ui/icon";

const SERVERS = [
  { id: "1", label: "🇳🇱 Amsterdam NL-01 — 12мс" },
  { id: "2", label: "🇩🇪 Frankfurt DE-02 — 18мс" },
  { id: "3", label: "🇯🇵 Tokyo JP-01 — 87мс" },
  { id: "4", label: "🇺🇸 New York US-03 — 95мс" },
  { id: "5", label: "🇸🇬 Singapore SG-01 — 142мс" },
  { id: "6", label: "🇫🇷 Paris FR-01 — 31мс" },
  { id: "7", label: "🇨🇭 Zurich CH-01 — 28мс" },
];

const TABS = [
  { id: "ip", label: "IP-чекер", icon: "Globe" },
  { id: "speed", label: "Speed Test", icon: "Zap" },
  { id: "xray", label: "Xray генератор", icon: "Code2" },
  { id: "clash", label: "Clash конвертер", icon: "Repeat" },
] as const;

type Tab = typeof TABS[number]["id"];

export default function Tools() {
  const [tab, setTab] = useState<Tab>("ip");

  const [ipResult, setIpResult] = useState<null | { ip: string; country: string; city: string; isp: string; vpn: boolean }>(null);
  const [ipLoading, setIpLoading] = useState(false);

  const [speedState, setSpeedState] = useState<"idle" | "running" | "done">("idle");
  const [dl, setDl] = useState(0);
  const [ul, setUl] = useState(0);
  const [ping, setPing] = useState(0);

  const [xrayServer, setXrayServer] = useState("1");
  const [xrayProto, setXrayProto] = useState("vless");
  const [xrayResult, setXrayResult] = useState("");

  const [clashInput, setClashInput] = useState("");
  const [clashOutput, setClashOutput] = useState("");

  const checkIp = () => {
    setIpLoading(true);
    setIpResult(null);
    setTimeout(() => {
      setIpResult({ ip: "185.220.101.47", country: "Нидерланды 🇳🇱", city: "Amsterdam", isp: "NEXVPN NL-01 (Protected)", vpn: true });
      setIpLoading(false);
    }, 1500);
  };

  const runSpeed = () => {
    setSpeedState("running");
    setDl(0); setUl(0); setPing(0);
    let d = 0, u = 0, p = 0;
    const iv = setInterval(() => {
      p = Math.min(p + Math.random() * 3, 18);
      d = Math.min(d + Math.random() * 22, 487);
      u = Math.min(u + Math.random() * 15, 312);
      setPing(Math.round(p)); setDl(Math.round(d)); setUl(Math.round(u));
      if (d >= 487) { clearInterval(iv); setSpeedState("done"); }
    }, 100);
  };

  const genXray = () => {
    const srv = SERVERS.find((s) => s.id === xrayServer)!;
    const uuid = "7b4e9f2a-c3d1-4e8b-a0f5-" + Math.random().toString(36).slice(2, 14);
    const name = srv.label.split(" ")[1]?.toLowerCase() || "server";
    setXrayResult(`${xrayProto}://${uuid}@vpn-${name}.nexvpn.io:443?type=tcp&security=tls&sni=nexvpn.io#NEXVPN-${name}`);
  };

  const convertClash = () => {
    if (!clashInput.trim()) return;
    setClashOutput(`proxies:
  - name: NEXVPN-AUTO
    type: vless
    server: vpn-amsterdam-nl01.nexvpn.io
    port: 443
    uuid: ${clashInput.split("@")[0]?.split("://")[1] || "auto-uuid"}
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

  return (
    <>
      <section className="bg-gradient-to-b from-gray-50 to-white pt-16 pb-6 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-sm font-semibold text-brand mb-3">Инструменты</div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
            Панель инструментов
          </h1>
          <p className="text-gray-500 max-w-2xl mb-8">
            Проверьте свой IP, измерьте скорость, сгенерируйте конфиг или конвертируйте в Clash-формат
          </p>

          <div className="flex flex-wrap gap-2">
            {TABS.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  tab === t.id
                    ? "bg-brand text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-brand-200 hover:bg-brand-50 hover:text-brand"
                }`}>
                <Icon name={t.icon} size={15} />
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[1280px] mx-auto">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm mt-6 min-h-[400px]">

            {/* IP CHECKER */}
            {tab === "ip" && (
              <div>
                <h2 className="text-xl font-bold text-foreground mb-6">Проверка IP-адреса</h2>
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <div className="flex-1 flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-400">
                    <Icon name="Search" size={15} />
                    Ваш IP определится автоматически
                  </div>
                  <button onClick={checkIp} disabled={ipLoading}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-600 transition-all disabled:opacity-60">
                    {ipLoading ? <><Icon name="Loader2" size={15} className="animate-spin" />Сканирую...</> : "Проверить"}
                  </button>
                </div>

                {ipResult && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: "IP адрес", val: ipResult.ip },
                        { label: "Страна", val: ipResult.country },
                        { label: "Город", val: ipResult.city },
                        { label: "Провайдер", val: ipResult.isp },
                      ].map((item) => (
                        <div key={item.label} className="bg-gray-50 rounded-xl p-4">
                          <div className="text-xs font-medium text-gray-400 mb-1.5">{item.label}</div>
                          <div className="text-sm font-semibold text-foreground break-all">{item.val}</div>
                        </div>
                      ))}
                    </div>
                    <div className={`flex items-center gap-3 p-4 rounded-xl ${ipResult.vpn ? "bg-emerald-50 border border-emerald-200" : "bg-red-50 border border-red-200"}`}>
                      <span className={`w-2.5 h-2.5 rounded-full ${ipResult.vpn ? "bg-emerald-500" : "bg-red-500"}`} />
                      <span className={`text-sm font-medium ${ipResult.vpn ? "text-emerald-700" : "text-red-700"}`}>
                        {ipResult.vpn ? "VPN-защита активна — ваш реальный IP скрыт" : "VPN не обнаружен — ваш IP открыт"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SPEED TEST */}
            {tab === "speed" && (
              <div>
                <h2 className="text-xl font-bold text-foreground mb-8">Тест скорости</h2>
                <div className="grid grid-cols-3 gap-6 mb-8">
                  {[
                    { label: "Пинг", val: ping, unit: "мс", max: 20, color: "#10B981" },
                    { label: "Загрузка", val: dl, unit: "Мбит/с", max: 500, color: "#7C3AED" },
                    { label: "Отдача", val: ul, unit: "Мбит/с", max: 350, color: "#3B82F6" },
                  ].map((m) => (
                    <div key={m.label} className="bg-gray-50 rounded-xl p-6 text-center">
                      <div className="text-xs font-medium text-gray-400 mb-3">{m.label}</div>
                      <div className="text-3xl md:text-4xl font-extrabold mb-1" style={{ color: m.color }}>{m.val}</div>
                      <div className="text-xs text-gray-400 mb-3">{m.unit}</div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-200"
                          style={{ width: `${Math.min(100, (m.val / m.max) * 100)}%`, background: m.color }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <button onClick={runSpeed} disabled={speedState === "running"}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-600 transition-all disabled:opacity-60">
                    {speedState === "running"
                      ? <><Icon name="Loader2" size={15} className="animate-spin" />Тестирование...</>
                      : speedState === "done"
                      ? <><Icon name="RefreshCw" size={15} />Повторить</>
                      : <><Icon name="Zap" size={15} />Запустить тест</>
                    }
                  </button>
                </div>
              </div>
            )}

            {/* XRAY GENERATOR */}
            {tab === "xray" && (
              <div>
                <h2 className="text-xl font-bold text-foreground mb-6">Генератор Xray-конфига</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Сервер</label>
                    <select value={xrayServer} onChange={(e) => setXrayServer(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand">
                      {SERVERS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Протокол</label>
                    <select value={xrayProto} onChange={(e) => setXrayProto(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand">
                      <option value="vless">VLESS + TLS</option>
                      <option value="vmess">VMess + WS</option>
                      <option value="trojan">Trojan</option>
                      <option value="shadowsocks">Shadowsocks</option>
                    </select>
                  </div>
                </div>
                <button onClick={genXray}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-600 transition-all mb-6">
                  <Icon name="Code2" size={15} />
                  Генерировать конфиг
                </button>
                {xrayResult && (
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 animate-fade-in">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-gray-400">Ссылка конфига</span>
                      <button onClick={() => navigator.clipboard.writeText(xrayResult)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-brand hover:text-brand-600 transition-colors">
                        <Icon name="Copy" size={12} />Копировать
                      </button>
                    </div>
                    <p className="font-mono text-xs text-foreground break-all leading-relaxed bg-white rounded-lg p-3 border border-gray-100">
                      {xrayResult}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* CLASH CONVERTER */}
            {tab === "clash" && (
              <div>
                <h2 className="text-xl font-bold text-foreground mb-6">Конвертер в Clash-формат</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Вставьте ссылку / конфиг</label>
                    <textarea value={clashInput} onChange={(e) => setClashInput(e.target.value)}
                      rows={10} placeholder="vless://uuid@server:443?type=tcp..."
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand" />
                    <button onClick={convertClash}
                      className="w-full mt-3 inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-600 transition-all">
                      <Icon name="Repeat" size={15} />Конвертировать
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Clash YAML конфиг</label>
                    <textarea value={clashOutput} readOnly rows={10}
                      placeholder="Результат появится здесь..."
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono text-foreground resize-none" />
                    {clashOutput && (
                      <button onClick={() => navigator.clipboard.writeText(clashOutput)}
                        className="w-full mt-3 inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-100 text-foreground text-sm font-semibold rounded-lg hover:bg-gray-200 transition-all">
                        <Icon name="Download" size={15} />Скопировать YAML
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>
    </>
  );
}
