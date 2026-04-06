import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";

const MAP_IMG =
  "https://cdn.poehali.dev/projects/873a5974-24fa-404f-a1ef-56c0a5af27b5/files/661a801c-b2a9-4a99-b77c-0bd4d70d6d82.jpg";

/* ───── server data ───── */

type Server = {
  flag: string;
  country: string;
  city: string;
  ping: number;
  load: number;
  online: boolean;
};

type Region = {
  key: string;
  label: string;
  icon: string;
  servers: Server[];
};

const REGIONS: Region[] = [
  {
    key: "europe",
    label: "Европа",
    icon: "MapPin",
    servers: [
      { flag: "\u{1F1F3}\u{1F1F1}", country: "Нидерланды", city: "Amsterdam", ping: 12, load: 23, online: true },
      { flag: "\u{1F1E9}\u{1F1EA}", country: "Германия", city: "Frankfurt", ping: 18, load: 41, online: true },
      { flag: "\u{1F1EB}\u{1F1F7}", country: "Франция", city: "Paris", ping: 31, load: 29, online: true },
      { flag: "\u{1F1E8}\u{1F1ED}", country: "Швейцария", city: "Zurich", ping: 28, load: 15, online: true },
      { flag: "\u{1F1EC}\u{1F1E7}", country: "Великобритания", city: "London", ping: 24, load: 82, online: true },
      { flag: "\u{1F1EB}\u{1F1EE}", country: "Финляндия", city: "Helsinki", ping: 35, load: 19, online: true },
      { flag: "\u{1F1F5}\u{1F1F1}", country: "Польша", city: "Warsaw", ping: 22, load: 33, online: true },
    ],
  },
  {
    key: "asia",
    label: "Азия",
    icon: "Globe",
    servers: [
      { flag: "\u{1F1EF}\u{1F1F5}", country: "Япония", city: "Tokyo", ping: 87, load: 67, online: true },
      { flag: "\u{1F1F8}\u{1F1EC}", country: "Сингапур", city: "Singapore", ping: 142, load: 38, online: true },
      { flag: "\u{1F1F0}\u{1F1F7}", country: "Южная Корея", city: "Seoul", ping: 95, load: 44, online: true },
      { flag: "\u{1F1EE}\u{1F1F3}", country: "Индия", city: "Mumbai", ping: 168, load: 52, online: true },
    ],
  },
  {
    key: "americas",
    label: "Америка",
    icon: "Globe2",
    servers: [
      { flag: "\u{1F1FA}\u{1F1F8}", country: "США", city: "New York", ping: 95, load: 55, online: true },
      { flag: "\u{1F1FA}\u{1F1F8}", country: "США", city: "Los Angeles", ping: 110, load: 48, online: true },
      { flag: "\u{1F1E8}\u{1F1E6}", country: "Канада", city: "Toronto", ping: 88, load: 31, online: true },
      { flag: "\u{1F1E7}\u{1F1F7}", country: "Бразилия", city: "Sao Paulo", ping: 175, load: 61, online: true },
    ],
  },
];

const TOTAL_SERVERS = REGIONS.reduce((s, r) => s + r.servers.length, 0);
const TOTAL_COUNTRIES = new Set(REGIONS.flatMap((r) => r.servers.map((s) => s.country))).size;

/* ───── helpers ───── */

function pingColor(ping: number): string {
  if (ping <= 30) return "text-v-500";
  if (ping <= 100) return "text-amber-500";
  return "text-red-400";
}

function loadBarColor(load: number): string {
  if (load <= 40) return "bg-v-400";
  if (load <= 70) return "bg-amber-400";
  return "bg-red-400";
}

/* ───── component ───── */

export default function Locations() {
  const [search, setSearch] = useState("");
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return REGIONS.map((region) => ({
      ...region,
      servers: region.servers.filter(
        (s) =>
          s.country.toLowerCase().includes(q) ||
          s.city.toLowerCase().includes(q)
      ),
    })).filter(
      (region) =>
        region.servers.length > 0 &&
        (!activeRegion || region.key === activeRegion)
    );
  }, [search, activeRegion]);

  const filteredTotal = filtered.reduce((s, r) => s + r.servers.length, 0);

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-v-50 via-white to-emerald-50/30" />
        <div className="relative max-w-7xl mx-auto px-5 text-center">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-v-600 bg-v-50 border border-v-100 rounded-full px-4 py-1.5 mb-6 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Все серверы онлайн
          </div>

          <h1
            className="text-4xl md:text-[3.25rem] font-extrabold text-foreground leading-[1.12] tracking-tight mb-5 animate-fade-up"
            style={{ animationDelay: ".1s", opacity: 0 }}
          >
            Локации <span className="text-v-500">серверов</span>
          </h1>

          <p
            className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-up"
            style={{ animationDelay: ".2s", opacity: 0 }}
          >
            Глобальная сеть серверов VORTEX VPN в Европе, Азии и Америке.
            Автоматический выбор ближайшей точки или ручное подключение к любому серверу.
          </p>

          {/* Stats */}
          <div
            className="inline-flex items-center gap-6 md:gap-10 bg-white border border-gray-100 rounded-2xl px-8 py-5 shadow-sm animate-fade-up"
            style={{ animationDelay: ".3s", opacity: 0 }}
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-extrabold text-foreground">80+</div>
              <div className="text-xs text-gray-500 mt-0.5">Серверов</div>
            </div>
            <div className="w-px h-10 bg-gray-100" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-extrabold text-foreground">15</div>
              <div className="text-xs text-gray-500 mt-0.5">Стран</div>
            </div>
            <div className="w-px h-10 bg-gray-100" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-extrabold text-v-500">99.9%</div>
              <div className="text-xs text-gray-500 mt-0.5">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Map section */}
      <section className="px-5 pb-16">
        <div className="max-w-7xl mx-auto">
          <div
            className="relative rounded-2xl overflow-hidden shadow-lg animate-fade-up"
            style={{ animationDelay: ".35s", opacity: 0 }}
          >
            <div className="absolute -inset-1 bg-v-100/40 rounded-3xl blur-2xl -z-10" />
            <img
              src={MAP_IMG}
              alt="VORTEX VPN server map"
              className="w-full h-48 md:h-72 lg:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h3 className="text-white text-lg font-bold mb-1">Глобальная сеть</h3>
                <p className="text-white/70 text-sm">
                  {TOTAL_SERVERS} серверов в {TOTAL_COUNTRIES} странах мира
                </p>
              </div>
              <div className="flex items-center gap-4">
                {REGIONS.map((r) => (
                  <div key={r.key} className="flex items-center gap-1.5 text-white/80 text-xs font-medium">
                    <Icon name={r.icon} size={14} />
                    {r.label} ({r.servers.length})
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters + Server list */}
      <section className="px-5 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Toolbar */}
          <div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8 animate-fade-up"
            style={{ animationDelay: ".4s", opacity: 0 }}
          >
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Icon
                name="Search"
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Поиск по стране или городу..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white placeholder:text-gray-400 focus:outline-none focus:border-v-300 focus:ring-2 focus:ring-v-100 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Icon name="X" size={14} />
                </button>
              )}
            </div>

            {/* Region tabs */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveRegion(null)}
                className={`text-sm font-medium px-4 py-2.5 rounded-xl transition-all ${
                  !activeRegion
                    ? "bg-v-500 text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-v-200 hover:text-v-600"
                }`}
              >
                Все
              </button>
              {REGIONS.map((r) => (
                <button
                  key={r.key}
                  onClick={() => setActiveRegion(activeRegion === r.key ? null : r.key)}
                  className={`inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2.5 rounded-xl transition-all ${
                    activeRegion === r.key
                      ? "bg-v-500 text-white shadow-sm"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-v-200 hover:text-v-600"
                  }`}
                >
                  <Icon name={r.icon} size={14} />
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Result count */}
          <p
            className="text-xs text-gray-400 mb-6 animate-fade-up"
            style={{ animationDelay: ".42s", opacity: 0 }}
          >
            {filteredTotal === TOTAL_SERVERS
              ? `${TOTAL_SERVERS} серверов`
              : `Найдено ${filteredTotal} из ${TOTAL_SERVERS}`}
          </p>

          {/* Regions */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 animate-fade-up">
              <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
                <Icon name="SearchX" size={24} className="text-gray-300" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">Ничего не найдено</p>
              <p className="text-sm text-gray-400">Попробуйте изменить поисковый запрос</p>
            </div>
          ) : (
            <div className="space-y-10">
              {filtered.map((region, ri) => (
                <div
                  key={region.key}
                  className="animate-fade-up"
                  style={{ animationDelay: `${0.44 + ri * 0.08}s`, opacity: 0 }}
                >
                  {/* Region header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-v-50 flex items-center justify-center">
                      <Icon name={region.icon} size={16} className="text-v-500" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-foreground leading-tight">
                        {region.label}
                      </h2>
                      <p className="text-xs text-gray-400">
                        {region.servers.length}{" "}
                        {region.servers.length === 1
                          ? "сервер"
                          : region.servers.length < 5
                          ? "сервера"
                          : "серверов"}
                      </p>
                    </div>
                  </div>

                  {/* Server cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {region.servers.map((server, si) => (
                      <div
                        key={`${server.country}-${server.city}-${si}`}
                        className="group relative rounded-xl border border-gray-100 bg-white p-5 hover:border-v-200 hover:shadow-md transition-all"
                      >
                        {/* Online dot */}
                        <span
                          className={`absolute top-4 right-4 w-2.5 h-2.5 rounded-full ${
                            server.online ? "bg-emerald-400" : "bg-red-400"
                          }`}
                          title={server.online ? "Online" : "Offline"}
                        />

                        {/* Country + city */}
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-2xl leading-none">{server.flag}</span>
                          <div>
                            <h3 className="text-sm font-bold text-foreground leading-tight">
                              {server.country}
                            </h3>
                            <p className="text-xs text-gray-400">{server.city}</p>
                          </div>
                        </div>

                        {/* Ping */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1.5">
                            <Icon name="Activity" size={12} className="text-gray-400" />
                            <span className="text-xs text-gray-500">Пинг</span>
                          </div>
                          <span className={`text-xs font-bold ${pingColor(server.ping)}`}>
                            {server.ping} ms
                          </span>
                        </div>

                        {/* Load bar */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5">
                            <Icon name="Server" size={12} className="text-gray-400" />
                            <span className="text-xs text-gray-500">Нагрузка</span>
                          </div>
                          <span className="text-xs font-bold text-gray-600">{server.load}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${loadBarColor(server.load)}`}
                            style={{ width: `${server.load}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info cards */}
      <section className="px-5 pb-24">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-3 animate-fade-up"
          >
            Почему наша сеть быстрая
          </h2>
          <p
            className="text-sm text-gray-500 text-center mb-10 animate-fade-up"
            style={{ animationDelay: ".1s", opacity: 0 }}
          >
            Инфраструктура, построенная для максимальной производительности
          </p>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-up"
            style={{ animationDelay: ".15s", opacity: 0 }}
          >
            {[
              {
                icon: "Zap",
                title: "Премиум каналы",
                desc: "Прямые каналы до 10 Гбит/с в каждом дата-центре. Без перепродажи и промежуточных узлов.",
              },
              {
                icon: "Shield",
                title: "Tier-3 дата-центры",
                desc: "Все серверы размещены в сертифицированных дата-центрах с резервным питанием и охлаждением.",
              },
              {
                icon: "RefreshCw",
                title: "Автоматический failover",
                desc: "При сбое сервера трафик мгновенно перенаправляется на ближайшую доступную точку.",
              },
              {
                icon: "Lock",
                title: "Zero-log политика",
                desc: "Серверы работают в RAM-only режиме. При перезагрузке все данные уничтожаются.",
              },
              {
                icon: "Globe",
                title: "Anycast DNS",
                desc: "Собственная DNS-инфраструктура для мгновенного разрешения имён без утечек.",
              },
              {
                icon: "BarChart3",
                title: "Мониторинг 24/7",
                desc: "Автоматический мониторинг нагрузки, пинга и доступности каждого сервера каждые 30 секунд.",
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
      <section className="px-5 pb-24">
        <div className="max-w-3xl mx-auto">
          <div
            className="relative rounded-2xl bg-gradient-to-br from-v-500 to-v-700 p-10 md:p-14 text-center overflow-hidden animate-fade-up"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_60%)]" />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
                Подключитесь к ближайшему серверу
              </h2>
              <p className="text-sm text-white/70 mb-8 max-w-md mx-auto leading-relaxed">
                Выберите тариф и получите доступ ко всей сети серверов VORTEX VPN.
                Настройка занимает не более 2 минут.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/tariffs"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-v-700 bg-white hover:bg-gray-50 px-7 py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md"
                >
                  Выбрать тариф
                  <Icon name="ArrowRight" size={16} />
                </Link>
                <Link
                  to="/help"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white border border-white/20 hover:border-white/40 px-7 py-3.5 rounded-xl transition-all"
                >
                  Помощь с настройкой
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
