import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const CONTACTS = [
  {
    icon: "Send",
    title: "Telegram-бот",
    desc: "Мгновенный ответ на любой вопрос. Бот знает контекст вашей подписки и помогает с настройкой.",
    badge: "24/7",
    action: "Открыть бот",
    href: "#",
  },
  {
    icon: "Mail",
    title: "Email поддержка",
    desc: "Напишите на support@vortexvpn.com для сложных вопросов. Среднее время ответа — менее часа.",
    badge: "< 1 час",
    action: "Написать",
    href: "mailto:support@vortexvpn.com",
  },
  {
    icon: "BookOpen",
    title: "База знаний",
    desc: "Более 100 статей с инструкциями, скриншотами и видео. Ответы на 95% вопросов уже здесь.",
    badge: "100+ статей",
    action: "Перейти",
    href: "#",
  },
];

const ARTICLES = [
  { icon: "Download", title: "Как скачать и установить Happ на Android" },
  { icon: "Key", title: "Импорт VLESS-ключа в Shadowrocket (iOS)" },
  { icon: "Repeat", title: "Конвертация конфигурации через Clash" },
  { icon: "Gauge", title: "Как проверить скорость VPN-соединения" },
  { icon: "ShieldOff", title: "VPN не подключается — пошаговая диагностика" },
  { icon: "Users", title: "Настройка родительского контроля в семейном тарифе" },
];

export default function ContactsAndArticles() {
  return (
    <>
      {/* Contact */}
      <section className="px-5 py-20">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-3 animate-fade-up"
          >
            Свяжитесь с нами
          </h2>
          <p
            className="text-sm text-gray-500 text-center mb-10 animate-fade-up"
            style={{ animationDelay: ".05s", opacity: 0 }}
          >
            Выберите удобный способ связи с командой поддержки
          </p>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-up"
            style={{ animationDelay: ".1s", opacity: 0 }}
          >
            {CONTACTS.map((c) => (
              <a
                key={c.title}
                href={c.href}
                className="group rounded-2xl border border-gray-100 bg-white p-7 hover:border-v-200 hover:shadow-lg transition-all text-left block"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-v-50 group-hover:bg-v-500 flex items-center justify-center transition-colors">
                    <Icon
                      name={c.icon}
                      size={22}
                      className="text-v-500 group-hover:text-white transition-colors"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-v-600 bg-v-50 rounded-full px-3 py-1">
                    {c.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">
                  {c.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">
                  {c.desc}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-v-500 group-hover:text-v-600 transition-colors">
                  {c.action}
                  <Icon name="ArrowRight" size={14} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Popular articles */}
      <section className="px-5 pb-20">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-3 animate-fade-up"
          >
            Популярные статьи
          </h2>
          <p
            className="text-sm text-gray-500 text-center mb-8 animate-fade-up"
            style={{ animationDelay: ".05s", opacity: 0 }}
          >
            Чаще всего читают в этом месяце
          </p>

          <div
            className="rounded-2xl border border-gray-100 bg-white shadow-sm divide-y divide-gray-50 animate-fade-up"
            style={{ animationDelay: ".1s", opacity: 0 }}
          >
            {ARTICLES.map((article, i) => (
              <a
                key={article.title}
                href="#"
                className="flex items-center gap-4 px-6 py-4 hover:bg-v-50/40 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-gray-50 group-hover:bg-v-50 flex items-center justify-center shrink-0 transition-colors">
                  <Icon
                    name={article.icon}
                    size={16}
                    className="text-gray-400 group-hover:text-v-500 transition-colors"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold text-foreground group-hover:text-v-600 transition-colors">
                    {article.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-semibold text-gray-400">
                    #{i + 1}
                  </span>
                  <Icon
                    name="ChevronRight"
                    size={14}
                    className="text-gray-300 group-hover:text-v-400 transition-colors"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-20">
        <div className="max-w-3xl mx-auto">
          <div
            className="relative rounded-2xl bg-gradient-to-br from-v-500 to-v-700 p-10 md:p-14 text-center overflow-hidden animate-fade-up"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_60%)]" />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
                Не нашли ответ?
              </h2>
              <p className="text-sm text-white/70 mb-8 max-w-md mx-auto leading-relaxed">
                Наш Telegram-бот с AI-ассистентом знает всё о VORTEX VPN и вашей
                подписке. Ответ за секунды, 24 часа в сутки.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-v-700 bg-white hover:bg-gray-50 px-7 py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md"
                >
                  <Icon name="Send" size={16} />
                  Написать в Telegram
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
    </>
  );
}
