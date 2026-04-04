import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const NAV = [
  { path: "/", label: "Продукты", children: [
    { path: "/", label: "VPN для бизнеса" },
    { path: "/tools", label: "Инструменты" },
  ]},
  { path: "/pricing", label: "Тарифы" },
  { path: "/tools", label: "Инструменты" },
  { path: "/support", label: "Поддержка" },
  { path: "/dashboard", label: "Панель управления" },
];

function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      scrolled ? "bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100" : "bg-white"
    }`}>
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
              <Icon name="Shield" size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">
              NEX<span className="text-brand">VPN</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => (
              <Link key={item.path + item.label} to={item.path}
                className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? "text-brand bg-brand-50"
                    : "text-gray-600 hover:text-foreground hover:bg-gray-50"
                }`}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/dashboard"
            className="text-sm font-medium text-gray-600 hover:text-foreground px-3.5 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            Войти
          </Link>
          <Link to="/pricing"
            className="text-sm font-semibold text-white bg-brand hover:bg-brand-600 px-5 py-2.5 rounded-lg transition-colors shadow-sm">
            Подключить VPN
          </Link>
        </div>

        <button className="lg:hidden p-2 -mr-2" onClick={() => setMobileOpen(!mobileOpen)}>
          <Icon name={mobileOpen ? "X" : "Menu"} size={20} className="text-foreground" />
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t bg-white px-6 py-4 space-y-1 animate-fade-in shadow-lg">
          {NAV.map((item) => (
            <Link key={item.path + item.label} to={item.path}
              className={`block px-4 py-2.5 text-sm font-medium rounded-lg ${
                location.pathname === item.path ? "text-brand bg-brand-50" : "text-gray-600 hover:bg-gray-50"
              }`}>
              {item.label}
            </Link>
          ))}
          <div className="pt-3 border-t mt-3 space-y-2">
            <Link to="/dashboard" className="block text-sm font-medium text-gray-600 px-4 py-2.5">Войти</Link>
            <Link to="/pricing"
              className="block text-sm text-center font-semibold text-white bg-brand px-4 py-2.5 rounded-lg">
              Подключить VPN
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

const FOOTER_LINKS = [
  { title: "Продукты", links: [
    { label: "VPN для бизнеса", path: "/" },
    { label: "Выделенный IP", path: "/pricing" },
    { label: "Xray / VLESS", path: "/tools" },
    { label: "Clash конвертер", path: "/tools" },
  ]},
  { title: "Компания", links: [
    { label: "О нас", path: "/support" },
    { label: "Тарифы", path: "/pricing" },
    { label: "Блог", path: "/" },
    { label: "Контакты", path: "/support" },
  ]},
  { title: "Поддержка", links: [
    { label: "Документация", path: "/support" },
    { label: "FAQ", path: "/support" },
    { label: "Telegram-бот", path: "/support" },
    { label: "Статус серверов", path: "/dashboard" },
  ]},
  { title: "Инструменты", links: [
    { label: "IP-чекер", path: "/tools" },
    { label: "Speed Test", path: "/tools" },
    { label: "Xray генератор", path: "/tools" },
    { label: "Clash конвертер", path: "/tools" },
  ]},
];

function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
                <Icon name="Shield" size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                NEX<span className="text-brand">VPN</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-4 max-w-xs">
              Профессиональный VPN-провайдер с серверами в 15+ странах. Шифрование военного класса.
            </p>
            <div className="flex items-center gap-3">
              {["Globe", "MessageCircle", "Mail"].map((ic) => (
                <div key={ic} className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-brand-300 hover:bg-brand-50 transition-colors cursor-pointer">
                  <Icon name={ic} size={16} className="text-gray-500" />
                </div>
              ))}
            </div>
          </div>
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-foreground mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="text-sm text-gray-500 hover:text-brand transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">&copy; 2025 NEXVPN. Все права защищены.</p>
          <div className="flex items-center gap-6">
            {["Политика конфиденциальности", "Условия использования", "SLA"].map((t) => (
              <a key={t} href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
}
