import { useState } from "react";
import Icon from "@/components/ui/icon";

const AMOUNTS = [100, 300, 500, 1000, 2000, 5000];

export default function Topup() {
  const [amount, setAmount] = useState(500);
  const [custom, setCustom] = useState("");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Пополнить баланс</h1>
        <p className="text-sm text-gray-500">Текущий баланс: <span className="font-semibold text-v-500">2 450 ₽</span></p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6 animate-fade-up">
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">Выберите сумму</label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {AMOUNTS.map((a) => (
              <button
                key={a}
                onClick={() => { setAmount(a); setCustom(""); }}
                className={`py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  amount === a && !custom ? "bg-v-500 text-white" : "bg-gray-50 text-foreground hover:bg-v-50"
                }`}
              >
                {a} ₽
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Или введите свою сумму</label>
          <input
            type="number"
            value={custom}
            onChange={(e) => { setCustom(e.target.value); setAmount(0); }}
            placeholder="Сумма в рублях"
            className="w-full max-w-xs border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-v-100 focus:border-v-300"
          />
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-v-500 hover:bg-v-600 px-6 py-3 rounded-lg transition-colors">
            <Icon name="Wallet" size={16} />
            Пополнить на {custom || amount} ₽
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 animate-fade-up" style={{ opacity: 0, animationDelay: ".15s" }}>
        <h3 className="text-base font-semibold text-foreground mb-4">Способы оплаты</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: "CreditCard", label: "Банковская карта", desc: "Visa, Mastercard, МИР" },
            { icon: "Banknote", label: "СБП", desc: "Система быстрых платежей" },
            { icon: "Bitcoin", label: "Криптовалюта", desc: "BTC, ETH, USDT" },
          ].map((m) => (
            <div key={m.label} className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-v-100 hover:bg-v-50/30 transition-all cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                <Icon name={m.icon} size={18} className="text-gray-500" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">{m.label}</div>
                <div className="text-xs text-gray-400">{m.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
