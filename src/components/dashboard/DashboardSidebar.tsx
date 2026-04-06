import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

const NAV_MAIN = [
  { to: "/dashboard", icon: "LayoutDashboard", label: "Панель" },
  { to: "/dashboard/keys", icon: "Key", label: "Мои ключи" },
  { to: "/dashboard/devices", icon: "Smartphone", label: "Устройства" },
  { to: "/dashboard/buy", icon: "ShoppingCart", label: "Купить" },
  { to: "/dashboard/topup", icon: "Wallet", label: "Пополнить" },
  { to: "/dashboard/payments", icon: "Receipt", label: "Платежи" },
];

const NAV_TOOLS = [
  { to: "/dashboard/ip-checker", icon: "Globe", label: "IP чекер" },
  { to: "/dashboard/speed-test", icon: "Gauge", label: "Speed Test" },
  { to: "/dashboard/xray-gen", icon: "Code2", label: "Xray ген." },
  { to: "/dashboard/clash-conv", icon: "Repeat", label: "Clash конв." },
  { to: "/dashboard/ai-chat", icon: "Bot", label: "AI ассистент" },
];

const NAV_BOTTOM = [
  { to: "/dashboard/referrals", icon: "Users", label: "Рефералы" },
  { to: "/dashboard/settings", icon: "Settings", label: "Настройки" },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

function NavGroup({ title, items }: { title?: string; items: typeof NAV_MAIN }) {
  const { pathname } = useLocation();

  return (
    <div>
      {title && (
        <div className="px-3 mb-2 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
          {title}
        </div>
      )}
      <div className="space-y-0.5">
        {items.map((item) => {
          const active = pathname === item.to || (item.to !== "/dashboard" && pathname.startsWith(item.to));
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-v-50 text-v-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-foreground"
              }`}
            >
              <Icon name={item.icon} size={18} className={active ? "text-v-500" : "text-gray-400"} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function DashboardSidebar({ open, onClose }: Props) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-100 z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center gap-2.5 px-5 border-b border-gray-100 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-v-500 flex items-center justify-center">
            <Icon name="Shield" size={16} className="text-white" />
          </div>
          <span className="text-base font-bold tracking-tight">
            VORTEX<span className="text-v-500"> VPN</span>
          </span>
          <button className="ml-auto lg:hidden p-1" onClick={onClose}>
            <Icon name="X" size={18} className="text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          <NavGroup items={NAV_MAIN} />
          <NavGroup title="Инструменты" items={NAV_TOOLS} />
          <NavGroup items={NAV_BOTTOM} />
        </div>

        <div className="p-4 border-t border-gray-100">
          <div className="bg-v-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Zap" size={14} className="text-v-500" />
              <span className="text-xs font-semibold text-v-600">Турбо</span>
            </div>
            <div className="text-xs text-gray-500 mb-3">До 28 апр 2025</div>
            <div className="h-1.5 bg-v-100 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-v-500 rounded-full" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
