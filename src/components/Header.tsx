import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

const NAV = [
  { label: "Главная", to: "/" },
  { label: "Тарифы", to: "/tariffs" },
  { label: "Локации", to: "/locations" },
  { label: "Аналитика", to: "/analytics" },
  { label: "Помощь", to: "/help" },
  { label: "Блог", to: "/blog" },
];

export default function Header() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-lg shadow-sm" : "bg-white/60 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-v-500 flex items-center justify-center">
            <Icon name="Shield" size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            VORTEX<span className="text-v-500"> VPN</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === n.to
                  ? "text-v-600 bg-v-50"
                  : "text-gray-600 hover:text-foreground hover:bg-gray-50"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/dashboard"
            className="text-sm font-medium text-gray-600 hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <Icon name="User" size={14} />
            Кабинет
          </Link>
          <Link
            to="/tariffs"
            className="text-sm font-semibold text-white bg-v-500 hover:bg-v-600 px-5 py-2.5 rounded-lg transition-colors"
          >
            Подключить
          </Link>
        </div>

        <button className="lg:hidden p-2 -mr-2" onClick={() => setOpen(!open)}>
          <Icon name={open ? "X" : "Menu"} size={22} className="text-foreground" />
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t px-5 pb-4 pt-2 space-y-1 shadow-lg">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`block px-4 py-2.5 text-sm font-medium rounded-lg ${
                pathname === n.to ? "text-v-600 bg-v-50" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/dashboard"
            className="block px-4 py-2.5 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50"
          >
            Личный кабинет
          </Link>
          <Link
            to="/tariffs"
            className="block text-center text-sm font-semibold text-white bg-v-500 px-4 py-2.5 rounded-lg mt-2"
          >
            Подключить
          </Link>
        </div>
      )}
    </header>
  );
}