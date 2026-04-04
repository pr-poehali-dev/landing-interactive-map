import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const DOCS = [
  { icon: "BookOpen", title: "Начало работы", desc: "Как подключить VPN за 2 минуты на любом устройстве", tag: "Гайд" },
  { icon: "Code2", title: "Настройка Xray", desc: "Импорт VLESS-конфигурации в мобильные и десктоп-клиенты", tag: "Протоколы" },
  { icon: "Repeat", title: "Clash конвертер", desc: "Конвертация конфигов и настройка Clash for Windows/Android", tag: "Инструменты" },
  { icon: "Server", title: "Выбор сервера", desc: "Как выбрать оптимальный сервер по пингу и нагрузке", tag: "Серверы" },
  { icon: "Shield", title: "Безопасность", desc: "Шифрование, политика нулевых логов, kill-switch", tag: "Безопасность" },
  { icon: "Bot", title: "AI-ассистент", desc: "Как пользоваться умным ботом с контекстом подписки", tag: "Поддержка" },
];

const INIT_MSG = [
  { role: "bot" as const, text: "Привет! Я AI-ассистент NEXVPN. Могу помочь с настройкой, рассказать о тарифах или проверить статус серверов. Что интересует?" },
];

const REPLIES: Record<string, string> = {
  default: "Ваш запрос принят. Могу помочь с настройкой VPN, статусом серверов, тарифами или технической поддержкой.",
  сервер: "Сейчас онлайн 7/8 серверов. Лондон UK-02 на обслуживании. Рекомендую Amsterdam NL-01 — пинг 12мс, нагрузка 23%.",
  подписка: "Для просмотра подписки перейдите в Панель управления. Там отображается статус, период и устройства.",
  конфиг: "Перейдите в раздел Инструменты → Xray генератор. Выберите сервер и протокол, конфиг будет готов за секунду.",
  скорость: "Для теста скорости перейдите в Инструменты → Speed Test. Средняя скорость на тарифе Pro: 487 Мбит/с.",
  тариф: "У нас 3 тарифа: Starter (199₽/мес), Pro (399₽/мес), Ultra (799₽/мес). Подробнее на странице Тарифы.",
};

export default function Support() {
  const [messages, setMessages] = useState(INIT_MSG);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const send = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    const key = Object.keys(REPLIES).find((k) => text.toLowerCase().includes(k)) || "default";
    setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: REPLIES[key] }]);
      setTyping(false);
    }, 1000 + Math.random() * 600);
  }, [input]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const filteredDocs = DOCS.filter((d) =>
    !searchQ || d.title.toLowerCase().includes(searchQ.toLowerCase()) || d.desc.toLowerCase().includes(searchQ.toLowerCase())
  );

  return (
    <>
      <section className="bg-gradient-to-b from-gray-50 to-white pt-16 pb-12 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-sm font-semibold text-brand mb-3">Поддержка</div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
            Центр поддержки
          </h1>
          <p className="text-gray-500 max-w-2xl mb-8">
            Документация, AI-ассистент и ответы на частые вопросы
          </p>
          <div className="relative max-w-lg">
            <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={searchQ} onChange={(e) => setSearchQ(e.target.value)}
              placeholder="Поиск по документации..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-sm" />
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[1280px] mx-auto">
          {/* DOCS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {filteredDocs.map((d, i) => (
              <div key={d.title}
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-brand-100 transition-all cursor-pointer animate-slide-up"
                style={{ opacity: 0, animationDelay: `${i * 0.06}s` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name={d.icon} size={18} />
                  </div>
                  <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-0.5 rounded">{d.tag}</span>
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1.5">{d.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>

          {/* AI CHAT */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">AI-ассистент</h2>
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col" style={{ height: "480px" }}>
              {/* Header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                <div className="w-9 h-9 rounded-full bg-brand flex items-center justify-center">
                  <Icon name="Bot" size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">NEXVPN AI Assistant</div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs text-gray-400">Онлайн</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
                    {m.role === "bot" && (
                      <div className="w-7 h-7 rounded-full bg-brand-50 flex-shrink-0 mr-2 flex items-center justify-center">
                        <Icon name="Bot" size={12} className="text-brand" />
                      </div>
                    )}
                    <div className={`max-w-[75%] px-4 py-3 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-brand text-white rounded-2xl rounded-br-sm"
                        : "bg-gray-50 text-foreground border border-gray-100 rounded-2xl rounded-bl-sm"
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex items-center gap-2 animate-fade-in">
                    <div className="w-7 h-7 rounded-full bg-brand-50 flex items-center justify-center">
                      <Icon name="Bot" size={12} className="text-brand" />
                    </div>
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Quick actions */}
              <div className="px-4 py-2 border-t border-gray-50 flex flex-wrap gap-1.5">
                {["Статус серверов", "Мой тариф", "Настройка конфига"].map((q) => (
                  <button key={q} onClick={() => setInput(q)}
                    className="text-xs font-medium text-gray-500 bg-gray-50 hover:bg-brand-50 hover:text-brand border border-gray-100 px-2.5 py-1 rounded-lg transition-colors">
                    {q}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-100 flex gap-3">
                <input value={input} onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Задайте вопрос..."
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand" />
                <button onClick={send}
                  className="px-4 py-2.5 bg-brand text-white rounded-lg hover:bg-brand-600 transition-colors">
                  <Icon name="Send" size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
