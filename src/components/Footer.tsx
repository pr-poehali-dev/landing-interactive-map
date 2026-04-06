import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const COLS = [
  {
    title: "Продукты",
    links: [
      { label: "Турбо VPN", to: "/tariffs" },
      { label: "Семейный", to: "/tariffs" },
      { label: "Бизнес", to: "/tariffs" },
      { label: "Роутер", to: "/tariffs" },
    ],
  },
  {
    title: "Ресурсы",
    links: [
      { label: "Локации серверов", to: "/locations" },
      { label: "Аналитика сети", to: "/analytics" },
      { label: "Блог", to: "/blog" },
      { label: "FAQ", to: "/help" },
    ],
  },
  {
    title: "Поддержка",
    links: [
      { label: "Центр помощи", to: "/help" },
      { label: "Настройка Happ", to: "/help" },
      { label: "Настройка роутера", to: "/help" },
      { label: "Статус серверов", to: "/locations" },
    ],
  },
  {
    title: "Компания",
    links: [
      { label: "О нас", to: "/" },
      { label: "Контакты", to: "/help" },
      { label: "Партнёрам", to: "/" },
      { label: "Политика конф.", to: "/" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#060d0a] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-v-500 flex items-center justify-center">
                <Icon name="Shield" size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                VORTEX<span className="text-v-500"> VPN</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs mb-5">
              VPN-провайдер нового поколения. 80+ серверов, шифрование военного класса, поддержка 24/7.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-v-50 flex items-center justify-center transition-colors">
                <Icon name="Send" size={16} className="text-gray-400" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-v-50 flex items-center justify-center transition-colors">
                <Icon name="MessageCircle" size={16} className="text-gray-400" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-v-50 flex items-center justify-center transition-colors">
                <Icon name="Mail" size={16} className="text-gray-400" />
              </a>
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-foreground mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-gray-400 hover:text-v-500 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">&copy; 2025 Vortex VPN. Все права защищены.</p>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xs text-gray-400 hover:text-gray-300 transition-colors">
              Политика конфиденциальности
            </Link>
            <Link to="/" className="text-xs text-gray-400 hover:text-gray-300 transition-colors">
              Условия использования
            </Link>
            <Link to="/" className="text-xs text-gray-400 hover:text-gray-300 transition-colors">
              SLA
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}