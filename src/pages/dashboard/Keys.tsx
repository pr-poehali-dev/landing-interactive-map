import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

type KeyStatus = "active" | "frozen" | "expired";
type FilterTab = "all" | KeyStatus;

interface VpnKey {
  id: number;
  name: string;
  plan: string;
  status: KeyStatus;
  server: string;
  serverName: string;
  flag: string;
  expires: string;
  autoRenew: boolean;
  accessUrl: string;
}

const KEYS: VpnKey[] = [
  {
    id: 1,
    name: "\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u043A\u043B\u044E\u0447",
    plan: "\u0422\u0443\u0440\u0431\u043E",
    status: "active",
    server: "NL-01",
    serverName: "Amsterdam",
    flag: "\u{1F1F3}\u{1F1F1}",
    expires: "28 \u0430\u043F\u0440 2025",
    autoRenew: true,
    accessUrl: "vless://a1b2c3d4-e5f6-7890-abcd-ef1234567890@nl-01.vpnservice.io:443",
  },
  {
    id: 2,
    name: "\u0420\u0430\u0431\u043E\u0447\u0438\u0439",
    plan: "\u0422\u0443\u0440\u0431\u043E",
    status: "active",
    server: "DE-02",
    serverName: "Frankfurt",
    flag: "\u{1F1E9}\u{1F1EA}",
    expires: "28 \u0430\u043F\u0440 2025",
    autoRenew: false,
    accessUrl: "vless://f9e8d7c6-b5a4-3210-fedc-ba0987654321@de-02.vpnservice.io:443",
  },
  {
    id: 3,
    name: "\u0421\u0442\u0430\u0440\u044B\u0439 \u043A\u043B\u044E\u0447",
    plan: "\u0411\u0430\u0437\u043E\u0432\u044B\u0439",
    status: "expired",
    server: "US-03",
    serverName: "New York",
    flag: "\u{1F1FA}\u{1F1F8}",
    expires: "15 \u044F\u043D\u0432 2025",
    autoRenew: false,
    accessUrl: "",
  },
];

const FILTER_TABS: { value: FilterTab; label: string }[] = [
  { value: "all", label: "\u0412\u0441\u0435" },
  { value: "active", label: "\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0435" },
  { value: "frozen", label: "\u0417\u0430\u043C\u043E\u0440\u043E\u0436\u0435\u043D\u043D\u044B\u0435" },
  { value: "expired", label: "\u0418\u0441\u0442\u0451\u043A\u0448\u0438\u0435" },
];

const STATUS_CONFIG: Record<KeyStatus, { label: string; dot: string; text: string; bg: string; border: string }> = {
  active: {
    label: "\u0410\u043A\u0442\u0438\u0432\u0435\u043D",
    dot: "bg-emerald-500 animate-pulse",
    text: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  frozen: {
    label: "\u0417\u0430\u043C\u043E\u0440\u043E\u0436\u0435\u043D",
    dot: "bg-blue-500",
    text: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  expired: {
    label: "\u0418\u0441\u0442\u0451\u043A",
    dot: "bg-gray-400",
    text: "text-gray-500",
    bg: "bg-gray-50",
    border: "border-gray-200",
  },
};

export default function Keys() {
  const [filter, setFilter] = useState<FilterTab>("all");
  const [search, setSearch] = useState("");
  const [autoRenewState, setAutoRenewState] = useState<Record<number, boolean>>(
    () => Object.fromEntries(KEYS.map((k) => [k.id, k.autoRenew]))
  );
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const filtered = KEYS.filter((k) => {
    if (filter !== "all" && k.status !== filter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        k.name.toLowerCase().includes(q) ||
        k.server.toLowerCase().includes(q) ||
        k.serverName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCopy = useCallback((key: VpnKey) => {
    if (!key.accessUrl) return;
    navigator.clipboard.writeText(key.accessUrl).then(() => {
      setCopiedId(key.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }, []);

  const toggleAutoRenew = useCallback((id: number) => {
    setAutoRenewState((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight mb-1">
              Мои VPN-ключи
            </h1>
            <p className="text-sm text-gray-400">
              Управляйте ключами доступа к VPN-серверам
            </p>
          </div>
          <Link
            to="/tariffs"
            className="inline-flex items-center gap-2 bg-v-500 hover:bg-v-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors self-start"
          >
            <Icon name="Plus" size={16} />
            Новый ключ
          </Link>
        </div>
      </div>

      {/* Filter bar */}
      <div
        className="animate-fade-up flex flex-col sm:flex-row gap-3"
        style={{ animationDelay: "80ms" }}
      >
        <div className="flex gap-2">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                filter === tab.value
                  ? "bg-v-500 text-white shadow-sm"
                  : "bg-white text-gray-600 border border-v-100 hover:bg-v-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs">
          <Icon
            name="Search"
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск ключей..."
            className="w-full bg-white border border-v-100 rounded-xl pl-9 pr-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-v-500/20 focus:border-v-500 transition-colors"
          />
        </div>
      </div>

      {/* Keys list */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <div className="animate-fade-up bg-white border border-v-100 rounded-2xl p-10 text-center">
            <div className="w-14 h-14 rounded-2xl bg-v-50 flex items-center justify-center mx-auto mb-4">
              <Icon name="KeyRound" size={24} className="text-v-300" />
            </div>
            <p className="text-sm text-gray-400">Ключи не найдены</p>
          </div>
        )}

        {filtered.map((key, i) => {
          const status = STATUS_CONFIG[key.status];
          const isActive = key.status === "active";
          const isExpired = key.status === "expired";

          return (
            <div
              key={key.id}
              className={`animate-fade-up bg-white border rounded-2xl p-6 hover:shadow-md transition-all ${
                isExpired ? "border-gray-200 opacity-75" : "border-v-100"
              }`}
              style={{ animationDelay: `${(i + 2) * 80}ms` }}
            >
              {/* Top row: name + status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      isExpired ? "bg-gray-100" : "bg-v-50"
                    }`}
                  >
                    <Icon
                      name="KeyRound"
                      size={20}
                      className={isExpired ? "text-gray-400" : "text-v-500"}
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-base">
                      {key.name}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                          isExpired
                            ? "bg-gray-100 text-gray-500"
                            : "bg-v-50 text-v-500"
                        }`}
                      >
                        {key.plan}
                      </span>
                    </div>
                  </div>
                </div>
                <span
                  className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border self-start ${status.text} ${status.bg} ${status.border}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                  {status.label}
                </span>
              </div>

              {/* Info row */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500 mb-5">
                <span className="flex items-center gap-1.5">
                  <Icon name="Server" size={14} className="text-gray-400" />
                  {key.flag} {key.server} {key.serverName}
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="CalendarDays" size={14} className="text-gray-400" />
                  {isExpired ? "Истёк" : "до"} {key.expires}
                </span>
              </div>

              {/* Actions */}
              {isActive && (
                <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleCopy(key)}
                    className={`inline-flex items-center gap-1.5 text-sm font-medium px-3.5 py-2 rounded-lg transition-colors ${
                      copiedId === key.id
                        ? "bg-v-100 text-v-600"
                        : "bg-v-50 text-v-500 hover:bg-v-100"
                    }`}
                  >
                    <Icon name={copiedId === key.id ? "Check" : "Copy"} size={14} />
                    {copiedId === key.id ? "Скопировано" : "Скопировать"}
                  </button>
                  <button className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 px-3.5 py-2 rounded-lg transition-colors">
                    <Icon name="QrCode" size={14} />
                    QR
                  </button>
                  <button className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 px-3.5 py-2 rounded-lg transition-colors">
                    <Icon name="Pencil" size={14} />
                    Переименовать
                  </button>
                  <button className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-lg transition-colors">
                    <Icon name="Snowflake" size={14} />
                    Заморозить
                  </button>
                  <button className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 px-3.5 py-2 rounded-lg transition-colors">
                    <Icon name="ArrowRightLeft" size={14} />
                    Сменить сервер
                  </button>

                  {/* Auto-renew toggle */}
                  <button
                    onClick={() => toggleAutoRenew(key.id)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 ml-auto"
                  >
                    <span className="text-xs text-gray-400">Автопродление</span>
                    <div
                      className={`relative w-9 h-5 rounded-full transition-colors ${
                        autoRenewState[key.id] ? "bg-v-500" : "bg-gray-200"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                          autoRenewState[key.id] ? "left-[18px]" : "left-0.5"
                        }`}
                      />
                    </div>
                  </button>
                </div>
              )}

              {isExpired && (
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <Link
                    to="/tariffs"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-v-500 hover:bg-v-600 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Icon name="RefreshCw" size={14} />
                    Продлить
                  </Link>
                  <button className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 px-3.5 py-2 rounded-lg transition-colors">
                    <Icon name="Trash2" size={14} />
                    Удалить
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
