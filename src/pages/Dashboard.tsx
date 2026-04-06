import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Overview from "./dashboard/Overview";
import Keys from "./dashboard/Keys";
import Devices from "./dashboard/Devices";
import Buy from "./dashboard/Buy";
import Topup from "./dashboard/Topup";
import Payments from "./dashboard/Payments";
import IpChecker from "./dashboard/IpChecker";
import SpeedTest from "./dashboard/SpeedTest";
import XrayGenerator from "./dashboard/XrayGenerator";
import ClashConverter from "./dashboard/ClashConverter";
import AiChat from "./dashboard/AiChat";
import Referrals from "./dashboard/Referrals";
import Settings from "./dashboard/Settings";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:ml-64">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-5 md:p-8 max-w-6xl">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="keys" element={<Keys />} />
            <Route path="devices" element={<Devices />} />
            <Route path="buy" element={<Buy />} />
            <Route path="topup" element={<Topup />} />
            <Route path="payments" element={<Payments />} />
            <Route path="ip-checker" element={<IpChecker />} />
            <Route path="speed-test" element={<SpeedTest />} />
            <Route path="xray-gen" element={<XrayGenerator />} />
            <Route path="clash-conv" element={<ClashConverter />} />
            <Route path="ai-chat" element={<AiChat />} />
            <Route path="referrals" element={<Referrals />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
