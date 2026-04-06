import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function Settings() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [autoRenew, setAutoRenew] = useState(true);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Настройки</h1>
        <p className="text-sm text-gray-500">Управление аккаунтом и уведомлениями</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-50 animate-fade-up">
        <div className="p-6">
          <h3 className="text-base font-semibold text-foreground mb-4">Профиль</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1.5 block">Email</label>
              <div className="flex items-center gap-3">
                <input
                  type="email"
                  defaultValue="user@example.com"
                  className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-v-100 focus:border-v-300"
                />
                <button className="text-sm font-medium text-v-500 hover:text-v-600 whitespace-nowrap">
                  Изменить
                </button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1.5 block">Пароль</label>
              <button className="text-sm font-medium text-v-500 hover:text-v-600 flex items-center gap-1.5">
                <Icon name="Lock" size={14} />
                Сменить пароль
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-base font-semibold text-foreground mb-4">Уведомления</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-foreground">Push-уведомления</div>
                <div className="text-xs text-gray-400">Уведомления об истечении подписки и акциях</div>
              </div>
              <button
                onClick={() => setPushEnabled(!pushEnabled)}
                className={`w-11 h-6 rounded-full transition-colors relative ${pushEnabled ? "bg-v-500" : "bg-gray-200"}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${pushEnabled ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-foreground">Автопродление</div>
                <div className="text-xs text-gray-400">Автоматически продлевать подписку при достаточном балансе</div>
              </div>
              <button
                onClick={() => setAutoRenew(!autoRenew)}
                className={`w-11 h-6 rounded-full transition-colors relative ${autoRenew ? "bg-v-500" : "bg-gray-200"}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${autoRenew ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-base font-semibold text-foreground mb-4">Telegram</h3>
          <p className="text-sm text-gray-500 mb-3">Привяжите Telegram для входа через бот и получения уведомлений.</p>
          <button className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#2AABEE] hover:bg-[#229ED9] px-5 py-2.5 rounded-lg transition-colors">
            <Icon name="Send" size={16} />
            Привязать Telegram
          </button>
        </div>
      </div>

      <div className="bg-red-50 rounded-2xl border border-red-100 p-6 animate-fade-up" style={{ opacity: 0, animationDelay: ".1s" }}>
        <h3 className="text-base font-semibold text-red-600 mb-2">Опасная зона</h3>
        <p className="text-sm text-gray-500 mb-4">Удаление аккаунта невозможно отменить. Все данные будут утеряны.</p>
        <button className="text-sm font-semibold text-red-500 border border-red-200 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors">
          Удалить аккаунт
        </button>
      </div>
    </div>
  );
}
