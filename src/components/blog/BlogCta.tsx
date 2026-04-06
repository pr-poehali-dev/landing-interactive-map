import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function BlogCta() {
  return (
    <section className="px-5 pb-20">
      <div className="max-w-3xl mx-auto">
        <div
          className="relative rounded-2xl bg-gradient-to-br from-v-500 to-v-700 p-10 md:p-14 text-center overflow-hidden animate-fade-up"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_60%)]" />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
              Не пропустите обновления
            </h2>
            <p className="text-sm text-white/70 mb-8 max-w-md mx-auto leading-relaxed">
              Подпишитесь на Telegram-канал VORTEX VPN, чтобы первым узнавать о
              новых серверах, обновлениях и акциях.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold text-v-700 bg-white hover:bg-gray-50 px-7 py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md"
              >
                <Icon name="Send" size={16} />
                Telegram-канал
              </a>
              <Link
                to="/tariffs"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white border border-white/20 hover:border-white/40 px-7 py-3.5 rounded-xl transition-all"
              >
                Выбрать тариф
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
