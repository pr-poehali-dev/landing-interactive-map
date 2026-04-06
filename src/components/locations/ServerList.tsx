import Icon from "@/components/ui/icon";

/* ───── types ───── */

export type Server = {
  flag: string;
  country: string;
  city: string;
  ping: number;
  load: number;
  online: boolean;
};

export type Region = {
  key: string;
  label: string;
  icon: string;
  servers: Server[];
};

/* ───── server data ───── */

export const REGIONS: Region[] = [
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

/* ───── helpers ───── */

export function pingColor(ping: number): string {
  if (ping <= 30) return "text-v-500";
  if (ping <= 100) return "text-amber-500";
  return "text-red-400";
}

export function loadBarColor(load: number): string {
  if (load <= 40) return "bg-v-400";
  if (load <= 70) return "bg-amber-400";
  return "bg-red-400";
}

/* ───── props ───── */

interface ServerListProps {
  filtered: Region[];
  filteredTotal: number;
  TOTAL_SERVERS: number;
  search: string;
  setSearch: (value: string) => void;
  activeRegion: string | null;
  setActiveRegion: (value: string | null) => void;
}

/* ───── component ───── */

export default function ServerList({
  filtered,
  filteredTotal,
  TOTAL_SERVERS,
  search,
  setSearch,
  activeRegion,
  setActiveRegion,
}: ServerListProps) {
  return (
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
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-white/[0.15] bg-white/[0.06] placeholder:text-gray-400 focus:outline-none focus:border-v-300 focus:ring-2 focus:ring-v-100 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-400"
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
                  : "bg-white/[0.06] text-gray-400 border border-white/[0.15] hover:border-v-200 hover:text-v-600"
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
                    : "bg-white/[0.06] text-gray-400 border border-white/[0.15] hover:border-v-200 hover:text-v-600"
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
                      className="group relative rounded-xl border border-white/10 bg-white/[0.06] p-5 hover:border-v-200 hover:shadow-md transition-all"
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
                        <span className="text-xs font-bold text-gray-400">{server.load}%</span>
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
  );
}