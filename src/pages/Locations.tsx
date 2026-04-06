import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";
import ServerList, { REGIONS } from "@/components/locations/ServerList";
import NetworkInfoCards from "@/components/locations/NetworkInfoCards";

const MAP_IMG =
  "https://cdn.poehali.dev/projects/873a5974-24fa-404f-a1ef-56c0a5af27b5/files/a7d2f986-29ab-4ea8-af68-45d19853b807.jpg";

const TOTAL_SERVERS = REGIONS.reduce((s, r) => s + r.servers.length, 0);
const TOTAL_COUNTRIES = new Set(REGIONS.flatMap((r) => r.servers.map((s) => s.country))).size;

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
        <div className="absolute inset-0 bg-gradient-to-br from-[#F1F1F8] via-[#F1F1F8] to-transparent" />
        <div className="relative max-w-7xl mx-auto px-5 text-center">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-v-600 bg-v-50 border border-v-200 rounded-full px-4 py-1.5 mb-6 animate-fade-up">
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

      <ServerList
        filtered={filtered}
        filteredTotal={filteredTotal}
        TOTAL_SERVERS={TOTAL_SERVERS}
        search={search}
        setSearch={setSearch}
        activeRegion={activeRegion}
        setActiveRegion={setActiveRegion}
      />

      <NetworkInfoCards />

      <Footer />
    </>
  );
}