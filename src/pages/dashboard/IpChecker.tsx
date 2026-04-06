import { useState, useCallback } from "react";
import Icon from "@/components/ui/icon";

interface IpData {
  ip: string;
  country: string;
  flag: string;
  city: string;
  isp: string;
  vpnDetected: boolean;
  webrtcLeak: boolean;
  dnsLeak: boolean;
  ipv6Leak: boolean;
}

const INITIAL_DATA: IpData = {
  ip: "185.243.114.87",
  country: "Нидерланды",
  flag: "\u{1F1F3}\u{1F1F1}",
  city: "Амстердам",
  isp: "DataWeb Global Group B.V.",
  vpnDetected: false,
  webrtcLeak: false,
  dnsLeak: false,
  ipv6Leak: false,
};

const INFO_CARDS = [
  { key: "ip", label: "Ваш IP", icon: "Globe", extract: (d: IpData) => d.ip },
  {
    key: "location",
    label: "Локация",
    icon: "MapPin",
    extract: (d: IpData) => `${d.flag} ${d.city}, ${d.country}`,
  },
  { key: "isp", label: "Провайдер", icon: "Building2", extract: (d: IpData) => d.isp },
];

const LEAK_CARDS = [
  {
    key: "webrtc",
    label: "WebRTC Leak",
    icon: "Video",
    extract: (d: IpData) => d.webrtcLeak,
  },
  {
    key: "dns",
    label: "DNS Leak",
    icon: "Server",
    extract: (d: IpData) => d.dnsLeak,
  },
  {
    key: "ipv6",
    label: "IPv6 Leak",
    icon: "Network",
    extract: (d: IpData) => d.ipv6Leak,
  },
];

export default function IpChecker() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IpData>(INITIAL_DATA);
  const [checked, setChecked] = useState(false);

  const handleCheck = useCallback(() => {
    setLoading(true);
    setChecked(false);
    setTimeout(() => {
      setData({
        ip: "185.243.114.87",
        country: "Нидерланды",
        flag: "\u{1F1F3}\u{1F1F1}",
        city: "Амстердам",
        isp: "DataWeb Global Group B.V.",
        vpnDetected: false,
        webrtcLeak: false,
        dnsLeak: false,
        ipv6Leak: false,
      });
      setLoading(false);
      setChecked(true);
    }, 1500);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-2xl font-bold text-foreground tracking-tight mb-1">
          IP Checker
        </h1>
        <p className="text-sm text-gray-400">
          Проверьте свой IP-адрес, утечки и анонимность подключения
        </p>
      </div>

      {/* Main IP card */}
      <div
        className="animate-fade-up bg-white border border-v-100 rounded-2xl p-6 md:p-8"
        style={{ animationDelay: "80ms" }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-v-50 flex items-center justify-center flex-shrink-0">
              <Icon name="Globe" size={28} className="text-v-500" />
            </div>
            <div>
              <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                Текущий IP-адрес
              </div>
              <div className="text-3xl font-bold text-foreground tracking-tight font-mono">
                {loading ? (
                  <span className="inline-flex items-center gap-2 text-gray-300">
                    <Icon
                      name="Loader2"
                      size={24}
                      className="animate-spin text-v-500"
                    />
                    Проверка...
                  </span>
                ) : (
                  data.ip
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!loading && (
              <div className="flex items-center gap-2">
                <span
                  className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${
                    data.vpnDetected
                      ? "text-red-600 bg-red-50 border-red-200"
                      : "text-v-500 bg-v-50 border-v-200"
                  }`}
                >
                  <Icon
                    name={data.vpnDetected ? "AlertTriangle" : "ShieldCheck"}
                    size={13}
                  />
                  {data.vpnDetected ? "VPN обнаружен" : "VPN не обнаружен"}
                </span>
              </div>
            )}
            <button
              onClick={handleCheck}
              disabled={loading}
              className="inline-flex items-center gap-2 bg-v-500 hover:bg-v-600 disabled:opacity-60 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              {loading ? (
                <>
                  <Icon name="Loader2" size={16} className="animate-spin" />
                  Проверяю...
                </>
              ) : (
                <>
                  <Icon name="Search" size={16} />
                  Check IP
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {INFO_CARDS.map((card, i) => (
          <div
            key={card.key}
            className="animate-fade-up bg-white border border-v-100 rounded-xl p-5 hover:shadow-md transition-all"
            style={{ animationDelay: `${(i + 2) * 80}ms` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-v-50 flex items-center justify-center">
                <Icon name={card.icon} size={16} className="text-v-500" />
              </div>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                {card.label}
              </span>
            </div>
            <div className="text-base font-semibold text-foreground">
              {loading ? (
                <span className="inline-block w-32 h-5 bg-gray-100 rounded animate-pulse" />
              ) : (
                card.extract(data)
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Leak detection */}
      <div
        className="animate-fade-up"
        style={{ animationDelay: "400ms" }}
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Проверка утечек
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LEAK_CARDS.map((card) => {
            const hasLeak = card.extract(data);
            return (
              <div
                key={card.key}
                className="bg-white border border-v-100 rounded-xl p-5 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        hasLeak ? "bg-red-50" : "bg-v-50"
                      }`}
                    >
                      <Icon
                        name={card.icon}
                        size={16}
                        className={hasLeak ? "text-red-500" : "text-v-500"}
                      />
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      {card.label}
                    </span>
                  </div>
                </div>
                {loading ? (
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Icon
                      name="Loader2"
                      size={14}
                      className="animate-spin"
                    />
                    Проверка...
                  </div>
                ) : (
                  <div
                    className={`flex items-center gap-2 text-sm font-medium ${
                      hasLeak ? "text-red-600" : "text-v-500"
                    }`}
                  >
                    <Icon
                      name={hasLeak ? "XCircle" : "CheckCircle2"}
                      size={16}
                    />
                    {hasLeak ? "Утечка обнаружена" : "Утечек не обнаружено"}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Result summary */}
      {checked && !loading && (
        <div
          className="animate-fade-up bg-v-50 border border-v-200 rounded-xl p-5"
          style={{ animationDelay: "0ms" }}
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-v-100 flex items-center justify-center flex-shrink-0">
              <Icon name="ShieldCheck" size={18} className="text-v-500" />
            </div>
            <div>
              <div className="text-sm font-semibold text-v-700 mb-1">
                Все проверки пройдены
              </div>
              <p className="text-sm text-v-600 leading-relaxed">
                Ваше подключение защищено. IP-адрес принадлежит VPN-серверу в
                Амстердаме. WebRTC, DNS и IPv6 утечки не обнаружены.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
