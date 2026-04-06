import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface Props {
  onMenuClick: () => void;
}

export default function DashboardHeader({ onMenuClick }: Props) {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-5 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-gray-50"
          onClick={onMenuClick}
        >
          <Icon name="Menu" size={20} className="text-gray-600" />
        </button>
        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-v-500 transition-colors">Главная</Link>
          <Icon name="ChevronRight" size={14} className="text-gray-300" />
          <span className="text-foreground font-medium">Личный кабинет</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-1.5 bg-v-50 text-v-600 text-sm font-semibold px-3.5 py-1.5 rounded-lg">
          <Icon name="Wallet" size={14} />
          2 450 ₽
        </div>

        <button className="relative p-2 rounded-lg hover:bg-gray-50 transition-colors">
          <Icon name="Bell" size={18} className="text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="w-9 h-9 rounded-full bg-v-100 flex items-center justify-center text-v-600 text-sm font-bold cursor-pointer">
          V
        </div>
      </div>
    </header>
  );
}
