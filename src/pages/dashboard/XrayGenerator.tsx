import { useState, useCallback } from "react";
import Icon from "@/components/ui/icon";

const PROTOCOLS = ["VLESS", "VMess", "Trojan"] as const;
type Protocol = (typeof PROTOCOLS)[number];

const SERVERS = [
  { value: "nl-01", label: "\u{1F1F3}\u{1F1F1} Amsterdam NL-01", host: "nl-01.vpnservice.io" },
  { value: "de-02", label: "\u{1F1E9}\u{1F1EA} Frankfurt DE-02", host: "de-02.vpnservice.io" },
  { value: "us-03", label: "\u{1F1FA}\u{1F1F8} New York US-03", host: "us-03.vpnservice.io" },
  { value: "jp-01", label: "\u{1F1EF}\u{1F1F5} Tokyo JP-01", host: "jp-01.vpnservice.io" },
  { value: "sg-01", label: "\u{1F1F8}\u{1F1EC} Singapore SG-01", host: "sg-01.vpnservice.io" },
];

const SECURITY_OPTIONS = ["tls", "reality"] as const;
type Security = (typeof SECURITY_OPTIONS)[number];

const PROTOCOL_TIPS: Record<Protocol, { title: string; description: string }> = {
  VLESS: {
    title: "VLESS",
    description:
      "Легковесный протокол без шифрования на уровне транспорта. Быстрый и подходит для связки с TLS/Reality. Рекомендуется для большинства задач.",
  },
  VMess: {
    title: "VMess",
    description:
      "Зашифрованный протокол с аутентификацией. Более тяжёлый, чем VLESS, но лучше обфусцирует трафик. Подходит для обхода DPI.",
  },
  Trojan: {
    title: "Trojan",
    description:
      "Имитирует обычный HTTPS-трафик. Хорошо маскируется под легитимные соединения. Рекомендуется при жёстких ограничениях сети.",
  },
};

function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function buildConfig(
  protocol: Protocol,
  serverObj: (typeof SERVERS)[number],
  port: string,
  uuid: string,
  security: Security
) {
  const base = {
    log: { loglevel: "warning" },
    inbounds: [
      {
        tag: "socks",
        port: 10808,
        listen: "127.0.0.1",
        protocol: "socks",
        settings: { udp: true },
      },
    ],
    outbounds: [
      {
        tag: "proxy",
        protocol: protocol.toLowerCase(),
        settings: {
          vnext: [
            {
              address: serverObj.host,
              port: parseInt(port) || 443,
              users: [
                {
                  id: uuid,
                  encryption: protocol === "VLESS" ? "none" : undefined,
                  security: protocol === "VMess" ? "auto" : undefined,
                },
              ],
            },
          ],
        },
        streamSettings: {
          network: "tcp",
          security: security,
          ...(security === "tls"
            ? { tlsSettings: { serverName: serverObj.host, fingerprint: "chrome" } }
            : {
                realitySettings: {
                  serverName: serverObj.host,
                  fingerprint: "chrome",
                  publicKey: "aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789ABCDEFG",
                  shortId: "abcdef01",
                },
              }),
        },
      },
      { tag: "direct", protocol: "freedom" },
    ],
    routing: {
      rules: [
        { type: "field", outboundTag: "direct", domain: ["geosite:private"] },
      ],
    },
  };
  return JSON.stringify(base, null, 2);
}

export default function XrayGenerator() {
  const [protocol, setProtocol] = useState<Protocol>("VLESS");
  const [server, setServer] = useState(SERVERS[0].value);
  const [port, setPort] = useState("443");
  const [uuid, setUuid] = useState(generateUUID);
  const [security, setSecurity] = useState<Security>("tls");
  const [config, setConfig] = useState("");
  const [copied, setCopied] = useState(false);

  const selectedServer = SERVERS.find((s) => s.value === server) ?? SERVERS[0];

  const handleGenerate = useCallback(() => {
    const result = buildConfig(protocol, selectedServer, port, uuid, security);
    setConfig(result);
    setCopied(false);
  }, [protocol, selectedServer, port, uuid, security]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(config).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [config]);

  const handleNewUUID = useCallback(() => {
    setUuid(generateUUID());
  }, []);

  const selectClasses =
    "w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-v-500/20 focus:border-v-500 transition-colors appearance-none cursor-pointer";

  const inputClasses =
    "w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-v-500/20 focus:border-v-500 transition-colors font-mono";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-2xl font-bold text-foreground tracking-tight mb-1">
          Xray Config Generator
        </h1>
        <p className="text-sm text-gray-400">
          Сгенерируйте конфигурацию Xray для вашего подключения
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div
          className="animate-fade-up bg-white border border-v-100 rounded-2xl p-6"
          style={{ animationDelay: "80ms" }}
        >
          <h2 className="text-base font-semibold text-foreground mb-5">
            Параметры
          </h2>

          <div className="space-y-4">
            {/* Protocol */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                Протокол
              </label>
              <select
                value={protocol}
                onChange={(e) => setProtocol(e.target.value as Protocol)}
                className={selectClasses}
              >
                {PROTOCOLS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Server */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                Сервер
              </label>
              <select
                value={server}
                onChange={(e) => setServer(e.target.value)}
                className={selectClasses}
              >
                {SERVERS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Port */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                Порт
              </label>
              <input
                type="text"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                className={inputClasses}
                placeholder="443"
              />
            </div>

            {/* UUID */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                UUID
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={uuid}
                  onChange={(e) => setUuid(e.target.value)}
                  className={`${inputClasses} flex-1 text-xs`}
                />
                <button
                  onClick={handleNewUUID}
                  className="flex-shrink-0 inline-flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 text-sm font-medium px-3 py-2.5 rounded-lg transition-colors"
                  title="Сгенерировать новый UUID"
                >
                  <Icon name="RefreshCw" size={14} />
                </button>
              </div>
            </div>

            {/* Security */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                Безопасность
              </label>
              <select
                value={security}
                onChange={(e) => setSecurity(e.target.value as Security)}
                className={selectClasses}
              >
                {SECURITY_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Generate */}
            <button
              onClick={handleGenerate}
              className="w-full inline-flex items-center justify-center gap-2 bg-v-500 hover:bg-v-600 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors mt-2"
            >
              <Icon name="Sparkles" size={16} />
              Сгенерировать
            </button>
          </div>
        </div>

        {/* Result */}
        <div
          className="animate-fade-up bg-white border border-v-100 rounded-2xl p-6 flex flex-col"
          style={{ animationDelay: "160ms" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-foreground">
              Конфигурация
            </h2>
            {config && (
              <button
                onClick={handleCopy}
                className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                  copied
                    ? "bg-v-50 text-v-500"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-600"
                }`}
              >
                <Icon name={copied ? "Check" : "Copy"} size={14} />
                {copied ? "Скопировано" : "Скопировать"}
              </button>
            )}
          </div>

          {config ? (
            <pre className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs text-gray-700 font-mono overflow-auto leading-relaxed whitespace-pre max-h-[480px]">
              {config}
            </pre>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
              <div className="w-14 h-14 rounded-2xl bg-v-50 flex items-center justify-center mb-4">
                <Icon name="FileJson" size={24} className="text-v-300" />
              </div>
              <p className="text-sm text-gray-400 max-w-[220px]">
                Заполните параметры и нажмите
                "Сгенерировать" для создания конфига
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Protocol tips */}
      <div
        className="animate-fade-up"
        style={{ animationDelay: "240ms" }}
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">
          О протоколах
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PROTOCOLS.map((p) => {
            const tip = PROTOCOL_TIPS[p];
            const isActive = p === protocol;
            return (
              <div
                key={p}
                className={`rounded-xl p-5 transition-all ${
                  isActive
                    ? "bg-v-50 border-2 border-v-200"
                    : "bg-white border border-v-100 hover:shadow-md"
                }`}
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isActive ? "bg-v-100" : "bg-gray-50"
                    }`}
                  >
                    <Icon
                      name="Shield"
                      size={15}
                      className={isActive ? "text-v-500" : "text-gray-400"}
                    />
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      isActive ? "text-v-700" : "text-foreground"
                    }`}
                  >
                    {tip.title}
                  </span>
                  {isActive && (
                    <span className="text-[10px] font-semibold text-v-500 bg-v-100 px-2 py-0.5 rounded-full ml-auto">
                      Выбран
                    </span>
                  )}
                </div>
                <p
                  className={`text-sm leading-relaxed ${
                    isActive ? "text-v-600" : "text-gray-500"
                  }`}
                >
                  {tip.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
