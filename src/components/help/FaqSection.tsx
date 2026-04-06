import Icon from "@/components/ui/icon";

export const FAQ_ITEMS = [
  {
    q: "Как начать пользоваться VORTEX VPN?",
    a: "Выберите тариф на странице «Тарифы», оплатите удобным способом (карта, СБП, криптовалюта). После оплаты вы мгновенно получите ссылку на конфигурацию. Импортируйте её в приложение Happ или любой совместимый клиент. Весь процесс занимает не более 2 минут.",
    cat: "start",
  },
  {
    q: "Какие протоколы поддерживаются?",
    a: "VORTEX VPN поддерживает Xray/VLESS, VMess, Trojan и Shadowsocks. Все протоколы используют обфускацию трафика и не определяются DPI-системами большинства провайдеров. Рекомендуем VLESS как наиболее быстрый и стабильный протокол.",
    cat: "tech",
  },
  {
    q: "Какие способы оплаты доступны?",
    a: "Принимаем банковские карты Visa, Mastercard, МИР, систему быстрых платежей (СБП), а также криптовалюты (BTC, USDT, ETH). Все платежи защищены SSL-шифрованием. Чек автоматически отправляется на email.",
    cat: "pay",
  },
  {
    q: "Можно ли использовать VPN на роутере?",
    a: "Да, мы поддерживаем OpenWrt и Keenetic. В разделе гайдов есть пошаговые инструкции по настройке. Тариф «Роутер» (300 руб/мес) оптимизирован специально для этого сценария и покрывает все устройства в вашей домашней сети.",
    cat: "tech",
  },
  {
    q: "Сколько устройств можно подключить одновременно?",
    a: "Зависит от тарифа: Персональный — 3 устройства, Турбо — 5, Семейный — 8, Бизнес — 20. На тарифе «Роутер» ограничение по устройствам отсутствует, так как VPN работает на уровне маршрутизатора.",
    cat: "sub",
  },
  {
    q: "Что такое заморозка подписки?",
    a: "Вы можете приостановить подписку на срок до 30 дней без потери оставшегося периода. В это время деньги не списываются, а ключ становится неактивным. Разморозить подписку можно в любой момент через личный кабинет или Telegram-бота.",
    cat: "sub",
  },
  {
    q: "Как работает семейный тариф?",
    a: "Семейный тариф (800 руб/мес) включает до 8 устройств, DNS-фильтрацию рекламы и родительский контроль. Каждый член семьи получает индивидуальный профиль с собственными настройками фильтрации. Управление доступно через панель администратора.",
    cat: "sub",
  },
  {
    q: "Как работает реферальная программа?",
    a: "Вы получаете 5% с каждого платежа приглашённого друга (1 уровень), 3% со второго уровня и 1% с третьего. Средства автоматически зачисляются на ваш баланс и могут быть использованы для оплаты подписки или выведены на карту.",
    cat: "pay",
  },
  {
    q: "Что делать, если VPN не подключается?",
    a: "Проверьте подключение к интернету. Попробуйте сменить сервер — выберите ближайший с низким пингом на странице «Локации». Если проблема сохраняется, воспользуйтесь Clash-конвертером для смены протокола. Также можно обратиться в поддержку через Telegram-бота.",
    cat: "tech",
  },
  {
    q: "Хранит ли VORTEX VPN логи активности?",
    a: "Нет. Мы придерживаемся строгой Zero-log политики. Серверы работают в RAM-only режиме — при перезагрузке все данные полностью уничтожаются. Мы не фиксируем, какие сайты вы посещаете, какие файлы скачиваете и когда подключаетесь.",
    cat: "tech",
  },
  {
    q: "Можно ли получить выделенный IP-адрес?",
    a: "Да, выделенный IP доступен на тарифе «Бизнес» (1 500 руб/мес). Вы получаете персональный статический IP, который не используется другими пользователями. Это удобно для доступа к корпоративным ресурсам и сервисам с IP-фильтрацией.",
    cat: "sub",
  },
  {
    q: "Как обновить или сменить тариф?",
    a: "Перейдите в личный кабинет или напишите Telegram-боту. Смена тарифа происходит мгновенно. При переходе на более дорогой тариф оплата пересчитывается пропорционально оставшемуся периоду. При понижении разница зачисляется на баланс.",
    cat: "pay",
  },
];

function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="text-sm font-semibold text-foreground">{q}</span>
        <Icon
          name={open ? "ChevronUp" : "ChevronDown"}
          size={18}
          className="text-gray-400 shrink-0"
        />
      </button>
      <div
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm text-gray-500 leading-relaxed pb-5">{a}</p>
        </div>
      </div>
    </div>
  );
}

interface FaqSectionProps {
  filteredFaq: typeof FAQ_ITEMS;
  openFaq: number | null;
  setOpenFaq: (i: number | null) => void;
  activeCategory: string | null;
  setActiveCategory: (cat: string | null) => void;
}

export default function FaqSection({
  filteredFaq,
  openFaq,
  setOpenFaq,
  activeCategory,
  setActiveCategory,
}: FaqSectionProps) {
  const categories = [
    { key: null, label: "Все" },
    { key: "start", label: "Начало работы" },
    { key: "tech", label: "Технические" },
    { key: "sub", label: "Подписка" },
    { key: "pay", label: "Оплата" },
  ];

  return (
    <section className="px-5 pb-20 pt-20 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-3 animate-fade-up"
        >
          Частые вопросы
        </h2>
        <p
          className="text-sm text-gray-500 text-center mb-8 animate-fade-up"
          style={{ animationDelay: ".05s", opacity: 0 }}
        >
          Ответы на самые популярные вопросы наших пользователей
        </p>

        {/* Category filter */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-8 animate-fade-up"
          style={{ animationDelay: ".1s", opacity: 0 }}
        >
          {categories.map((cat) => (
            <button
              key={cat.key ?? "all"}
              onClick={() => setActiveCategory(cat.key)}
              className={`text-sm font-medium px-4 py-2 rounded-xl transition-all ${
                activeCategory === cat.key
                  ? "bg-v-500 text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-v-200 hover:text-v-600"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div
          className="rounded-2xl border border-gray-200 bg-white shadow-sm px-6 animate-fade-up"
          style={{ animationDelay: ".15s", opacity: 0 }}
        >
          {filteredFaq.length === 0 ? (
            <div className="text-center py-12">
              <Icon
                name="HelpCircle"
                size={28}
                className="text-gray-300 mx-auto mb-3"
              />
              <p className="text-sm font-semibold text-foreground mb-1">
                Вопросы не найдены
              </p>
              <p className="text-sm text-gray-400">
                Попробуйте изменить запрос или категорию
              </p>
            </div>
          ) : (
            filteredFaq.map((item, i) => (
              <FaqItem
                key={item.q}
                q={item.q}
                a={item.a}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
