import { useState, useCallback, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface Message {
  id: number;
  role: "bot" | "user";
  text: string;
  time: string;
}

const BOT_RESPONSES: Record<string, string> = {
  "помощь":
    "Я могу помочь с настройкой VPN, выбором сервера, решением проблем с подключением, а также ответить на вопросы о тарифах и оплате. Просто спросите!",
  "сервер":
    "Рекомендую сервер NL-01 Amsterdam -- он ближайший к вашему региону с пингом 12 мс и загрузкой 23%. Для максимальной скорости также подойдёт CH-01 Zurich (28 мс, 15%).",
  "скорость":
    "Для увеличения скорости попробуйте: 1) Сменить протокол на VLESS + Reality, 2) Выбрать сервер с наименьшим пингом, 3) Использовать TCP вместо WebSocket. Текущая скорость вашего подключения: ~285 Мбит/с.",
  "тариф":
    "У вас активен тариф «Турбо» до 28 апр 2025. Доступно 5 устройств, безлимитный трафик, все серверы. Для продления перейдите в раздел «Тарифы».",
  "проблема":
    "Попробуйте следующее: 1) Перезапустите VPN-клиент, 2) Смените сервер на другую локацию, 3) Проверьте, не блокирует ли файрвол подключение. Если проблема сохраняется, напишите в поддержку.",
};

const DEFAULT_RESPONSE =
  "Спасибо за вопрос! К сожалению, я не нашёл точного ответа. Попробуйте спросить о: настройке VPN, выборе сервера, скорости подключения, тарифах или решении проблем. Также вы можете обратиться в поддержку.";

function getTimeString(): string {
  const now = new Date();
  return now.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
}

function findBotResponse(text: string): string {
  const lower = text.toLowerCase();
  for (const [keyword, response] of Object.entries(BOT_RESPONSES)) {
    if (lower.includes(keyword)) return response;
  }
  return DEFAULT_RESPONSE;
}

const WELCOME_MESSAGE: Message = {
  id: 0,
  role: "bot",
  text: "Привет! Я AI-ассистент VORTEX. Помогу с настройкой VPN, выбором сервера и решением проблем. Чем могу помочь?",
  time: getTimeString(),
};

export default function AiChat() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextIdRef = useRef(1);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: Message = {
      id: nextIdRef.current++,
      role: "user",
      text,
      time: getTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: Message = {
        id: nextIdRef.current++,
        role: "bot",
        text: findBotResponse(text),
        time: getTimeString(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  }, [input, isTyping]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const SUGGESTIONS = [
    "Какой сервер выбрать?",
    "Как увеличить скорость?",
    "Мой тариф",
    "Проблема с подключением",
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] min-h-[500px]">
      {/* Header */}
      <div
        className="animate-fade-up flex items-center gap-3 mb-4"
        style={{ animationDelay: "0ms" }}
      >
        <div className="w-11 h-11 rounded-xl bg-v-50 flex items-center justify-center">
          <Icon name="Bot" size={22} className="text-v-500" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground tracking-tight">
            AI Ассистент VORTEX
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Онлайн
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div
        className="animate-fade-up flex-1 bg-white border border-v-100 rounded-2xl flex flex-col overflow-hidden"
        style={{ animationDelay: "80ms" }}
      >
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-end gap-2 max-w-[80%] ${
                  msg.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    msg.role === "bot" ? "bg-v-50" : "bg-gray-100"
                  }`}
                >
                  <Icon
                    name={msg.role === "bot" ? "Bot" : "User"}
                    size={14}
                    className={msg.role === "bot" ? "text-v-500" : "text-gray-500"}
                  />
                </div>

                {/* Bubble */}
                <div>
                  <div
                    className={`px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-v-500 text-white rounded-2xl rounded-br-md"
                        : "bg-gray-50 text-foreground rounded-2xl rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div
                    className={`text-[10px] text-gray-300 mt-1 ${
                      msg.role === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-end gap-2 max-w-[80%]">
                <div className="w-7 h-7 rounded-lg bg-v-50 flex items-center justify-center flex-shrink-0">
                  <Icon name="Bot" size={14} className="text-v-500" />
                </div>
                <div className="bg-gray-50 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions (show only when few messages) */}
        {messages.length <= 1 && (
          <div className="px-5 pb-3">
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setInput(s);
                    inputRef.current?.focus();
                  }}
                  className="text-xs font-medium text-v-500 bg-v-50 hover:bg-v-100 px-3 py-1.5 rounded-full transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Напишите сообщение..."
              disabled={isTyping}
              className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-v-500/20 focus:border-v-500 disabled:opacity-60 transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 rounded-xl bg-v-500 hover:bg-v-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors flex-shrink-0"
            >
              <Icon name="Send" size={16} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
