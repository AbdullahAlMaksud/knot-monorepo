"use client";

import { User, Package } from "lucide-react";

type AccountTabsProps = {
  activeTab: "profile" | "orders";
  setActiveTab: (tab: "profile" | "orders") => void;
};

export default function AccountTabs({
  activeTab,
  setActiveTab,
}: AccountTabsProps) {
  return (
    <div className="flex gap-4 mb-8">
      <button
        onClick={() => setActiveTab("profile")}
        className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition ${
          activeTab === "profile"
            ? "bg-black text-white"
            : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
      >
        <User size={20} />
        Profile
      </button>
      <button
        onClick={() => setActiveTab("orders")}
        className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition ${
          activeTab === "orders"
            ? "bg-black text-white"
            : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
      >
        <Package size={20} />
        Order History
      </button>
    </div>
  );
}
