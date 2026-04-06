import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";
import TariffSelector from "@/components/tariffs/TariffSelector";
import ComparisonTable from "@/components/tariffs/ComparisonTable";
import PlatformsAndCta from "@/components/tariffs/PlatformsAndCta";

export default function Tariffs() {
  const [activeTab, setActiveTab] = useState("turbo");

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-v-50 via-white to-emerald-50/30" />
        <div className="relative max-w-7xl mx-auto px-5 text-center">
          <div
            className="inline-flex items-center gap-2 text-sm font-medium text-v-600 bg-v-50 border border-v-100 rounded-full px-4 py-1.5 mb-6 animate-fade-up"
          >
            <Icon name="CreditCard" size={14} />
            Гибкие тарифные планы
          </div>

          <h1
            className="text-4xl md:text-[3.25rem] font-extrabold text-foreground leading-[1.12] tracking-tight mb-5 animate-fade-up"
            style={{ animationDelay: ".1s", opacity: 0 }}
          >
            Тарифы <span className="text-v-500">VORTEX VPN</span>
          </h1>

          <p
            className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-up"
            style={{ animationDelay: ".2s", opacity: 0 }}
          >
            Выберите подходящий план -- от бесплатного пробного до корпоративного с выделенным IP и SLA.
            Все тарифы включают шифрование военного класса.
          </p>
        </div>
      </section>

      <TariffSelector activeTab={activeTab} setActiveTab={setActiveTab} />
      <ComparisonTable />
      <PlatformsAndCta setActiveTab={setActiveTab} />

      <Footer />
    </>
  );
}
