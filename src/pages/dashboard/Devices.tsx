import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface Device {
  id: number;
  name: string;
  os: string;
  icon: string;
  online: boolean;
  lastSeen: string;
  hwid: string;
  server?: string;
  serverFlag?: string;
  ip?: string;
}

const INITIAL_DEVICES: Device[] = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    os: "iOS 17.4",
    icon: "Smartphone",
    online: true,
    lastSeen: "Сейчас",
    hwid: "A3F8...B2D1",
    server: "NL-01",
    serverFlag: "\u{1F1F3}\u{1F1F1}",
    ip: "185.243.114.87",
  },
  {
    id: 2,
    name: "MacBook Air",
    os: "macOS Sonoma 14.3",
    icon: "Laptop",
    online: true,
    lastSeen: "5 мин назад",
    hwid: "7C01...E4A9",
    server: "DE-02",
    serverFlag: "\u{1F1E9}\u{1F1EA}",
    ip: "194.135.22.41",
  },
  {
    id: 3,
    name: "Windows PC",
    os: "Windows 11",
    icon: "Monitor",
    online: false,
    lastSeen: "2 дня назад",
    hwid: "D9B2...F730",
  },
];

const MAX_DEVICES = 5;

export default function Devices() {
  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES);
  const [removingId, setRemovingId] = useState<number | null>(null);

  const onlineCount = devices.filter((d) => d.online).length;

  const handleRemove = useCallback((id: number) => {
    setRemovingId(id);
    setTimeout(() => {
      setDevices((prev) => prev.filter((d) => d.id !== id));
      setRemovingId(null);
    }, 600);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight mb-1">
              Мои устройства
            </h1>
            <p className="text-sm text-gray-400">
              Управляйте привязанными устройствами и слотами
            </p>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div
        className="animate-fade-up grid grid-cols-2 md:grid-cols-3 gap-4"
        style={{ animationDelay: "80ms" }}
      >
        <div className="bg-white border border-v-100 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
              Онлайн
            </span>
            <div className="w-8 h-8 rounded-lg bg-v-50 flex items-center justify-center">
              <Icon name="Wifi" size={16} className="text-v-500" />
            </div>
          </div>
          <div className="text-2xl font-bold text-v-500">
            {onlineCount}/{MAX_DEVICES}
          </div>
          <div className="text-xs text-gray-400 mt-0.5">устройств онлайн</div>
        </div>
        <div className="bg-white border border-v-100 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
              Привязано
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <Icon name="Link2" size={16} className="text-blue-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {devices.length}/{MAX_DEVICES}
          </div>
          <div className="text-xs text-gray-400 mt-0.5">слотов занято</div>
        </div>
        <div className="bg-white border border-v-100 rounded-xl p-5 col-span-2 md:col-span-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
              Свободно
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <Icon name="Plus" size={16} className="text-amber-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-600">
            {MAX_DEVICES - devices.length}
          </div>
          <div className="text-xs text-gray-400 mt-0.5">свободных слотов</div>
        </div>
      </div>

      {/* Device cards */}
      <div className="space-y-4">
        {devices.map((device, i) => (
          <div
            key={device.id}
            className={`animate-fade-up bg-white border border-v-100 rounded-2xl p-6 hover:shadow-md transition-all ${
              removingId === device.id ? "opacity-30 scale-95" : ""
            }`}
            style={{ animationDelay: `${(i + 3) * 80}ms` }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              {/* Left: device info */}
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    device.online ? "bg-v-50" : "bg-gray-100"
                  }`}
                >
                  <Icon
                    name={device.icon}
                    size={22}
                    className={device.online ? "text-v-500" : "text-gray-400"}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <span className="font-semibold text-foreground text-base">
                      {device.name}
                    </span>
                    <span
                      className={`flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full border ${
                        device.online
                          ? "text-emerald-600 bg-emerald-50 border-emerald-200"
                          : "text-gray-500 bg-gray-50 border-gray-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          device.online
                            ? "bg-emerald-500 animate-pulse"
                            : "bg-gray-400"
                        }`}
                      />
                      {device.online ? "Онлайн" : "Офлайн"}
                    </span>
                  </div>

                  <div className="text-xs text-gray-400 mb-3">{device.os}</div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Icon name="Clock" size={13} className="text-gray-400" />
                      {device.lastSeen}
                    </span>
                    {device.server && (
                      <span className="flex items-center gap-1.5">
                        <Icon name="Server" size={13} className="text-gray-400" />
                        {device.serverFlag} {device.server}
                      </span>
                    )}
                    {device.ip && (
                      <span className="flex items-center gap-1.5">
                        <Icon name="Globe" size={13} className="text-gray-400" />
                        {device.ip}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Icon name="Fingerprint" size={13} className="text-gray-400" />
                      <span className="font-mono text-xs text-gray-400">
                        HWID: {device.hwid}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: actions */}
              <button
                onClick={() => handleRemove(device.id)}
                disabled={removingId === device.id}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 disabled:opacity-50 px-3.5 py-2 rounded-lg transition-colors self-start flex-shrink-0"
              >
                <Icon name="Trash2" size={14} />
                Удалить устройство
              </button>
            </div>
          </div>
        ))}

        {/* Empty slots */}
        {devices.length < MAX_DEVICES && (
          <div
            className="animate-fade-up bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-6 flex items-center justify-center"
            style={{ animationDelay: `${(devices.length + 3) * 80}ms` }}
          >
            <div className="text-center">
              <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center mx-auto mb-3">
                <Icon name="Plus" size={18} className="text-gray-400" />
              </div>
              <p className="text-sm text-gray-400">
                {MAX_DEVICES - devices.length} свободных слотов
              </p>
              <p className="text-xs text-gray-300 mt-1">
                Подключите новое устройство для автоматической привязки
              </p>
            </div>
          </div>
        )}
      </div>

      {/* HWID instructions */}
      <div
        className="animate-fade-up"
        style={{ animationDelay: "600ms" }}
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Как работает привязка по HWID
        </h2>
        <div className="bg-white border border-v-100 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {[
              {
                step: "1",
                icon: "Download",
                title: "Установите приложение",
                text: "Скачайте клиент VORTEX VPN на ваше устройство. При первом запуске генерируется уникальный HWID.",
              },
              {
                step: "2",
                icon: "Fingerprint",
                title: "Автоматическая привязка",
                text: "HWID автоматически привязывается к вашему аккаунту при первом подключении. Один HWID = одно устройство.",
              },
              {
                step: "3",
                icon: "ShieldCheck",
                title: "Защита аккаунта",
                text: "HWID предотвращает несанкционированное использование ключа. Удалите устройство для освобождения слота.",
              },
            ].map((item) => (
              <div key={item.step} className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-v-50 flex items-center justify-center">
                    <span className="text-sm font-bold text-v-500">
                      {item.step}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-v-50 flex items-center justify-center">
                    <Icon name={item.icon} size={15} className="text-v-500" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {item.title}
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Note */}
      <div
        className="animate-fade-up bg-v-50 border border-v-200 rounded-xl p-5"
        style={{ animationDelay: "700ms" }}
      >
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-v-100 flex items-center justify-center flex-shrink-0">
            <Icon name="Info" size={18} className="text-v-500" />
          </div>
          <div>
            <div className="text-sm font-semibold text-v-700 mb-1">
              Лимит устройств
            </div>
            <p className="text-sm text-v-600 leading-relaxed">
              Ваш тариф поддерживает до {MAX_DEVICES} одновременных устройств. Чтобы
              подключить новое устройство при заполненных слотах, сначала удалите
              одно из существующих. Обновите тариф для увеличения лимита.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
