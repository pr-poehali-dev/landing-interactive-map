import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const FAQ_ITEMS = [
  { q: "Как начать пользоваться?", a: "Выберите тариф, оплатите удобным способом, получите конфиг и подключитесь через приложение Happ или любой совместимый клиент. Весь процесс занимает 2 минуты." },
  { q: "Какие протоколы поддерживаются?", a: "Xray/VLESS, VMess, Trojan, Shadowsocks. Все протоколы поддерживают обфускацию трафика и не определяются DPI-системами большинства провайдеров." },
  { q: "Можно ли использовать на роутере?", a: "Да. Мы поддерживаем OpenWrt и Keenetic. В разделе помощи есть пошаговые гайды по настройке. Тариф «Роутер» оптимизирован для этого сценария." },
  { q: "Что такое заморозка подписки?", a: "Вы можете приостановить подписку на срок до 30 дней. В это время деньги не списываются, а ключ становится неактивным. Разморозить можно в любой момент." },
  { q: "Как работает реферальная программа?", a: "Вы получаете 5% с платежей приглашённых друзей (1 уровень), 3% со второго уровня и 1% с третьего. Средства зачисляются на баланс автоматически." },
];

const NEWS = [
  { date: "28 мар", title: "Новые серверы в Швейцарии", desc: "Запущены 3 новых сервера в Цюрихе с поддержкой VLESS и Trojan." },
  { date: "15 мар", title: "Обновление Clash-конвертера", desc: "Добавлена поддержка правил маршрутизации и split-tunneling." },
  { date: "2 мар", title: "Семейный тариф", desc: "Новый тариф для семьи: DNS-фильтрация, родительский контроль, до 8 устройств." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="text-sm font-semibold text-foreground">{q}</span>
        <Icon name={open ? "ChevronUp" : "ChevronDown"} size={18} className="text-gray-400 shrink-0" />
      </button>
      {open && <p className="text-sm text-gray-500 leading-relaxed pb-5 -mt-1">{a}</p>}
    </div>
  );
}

export default function NewsAndFaqSection() {
  return (
    <>
      {/* News */}
      <section className="py-24 px-5 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-semibold text-v-500 mb-2">Новости</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                Последние обновления
              </h2>
            </div>
            <Link
              to="/blog"
              className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-v-500 hover:text-v-600 transition-colors"
            >
              Все новости <Icon name="ArrowRight" size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NEWS.map((n, i) => (
              <Link
                key={n.title}
                to="/blog"
                className="bg-white border border-gray-100 rounded-2xl p-7 hover:shadow-lg hover:border-v-100 transition-all animate-fade-up"
                style={{ opacity: 0, animationDelay: `${i * 0.08}s` }}
              >
                <span className="text-xs font-medium text-v-500">{n.date} 2025</span>
                <h3 className="text-base font-semibold text-foreground mt-2 mb-2">{n.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{n.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-v-500 mb-2">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
              Частые вопросы
            </h2>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl px-7">
            {FAQ_ITEMS.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/help"
              className="text-sm font-medium text-v-500 hover:text-v-600 inline-flex items-center gap-1 transition-colors"
            >
              Все вопросы и помощь <Icon name="ArrowRight" size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="bg-v-500 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                Готовы начать?
              </h2>
              <p className="text-emerald-100 text-lg mb-8 max-w-xl mx-auto">
                Выберите тариф, получите конфиг и подключитесь за 2 минуты. Бесплатный пробный период — 3 дня.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/tariffs"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-v-500 bg-white hover:bg-gray-50 px-6 py-3 rounded-lg transition-all"
                >
                  Смотреть тарифы <Icon name="ArrowRight" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
