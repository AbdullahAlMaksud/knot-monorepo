"use client";

import { Package, Settings, User, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export type AccountTab = "profile" | "orders" | "preference" | "reviews";

type AccountTabsProps = {
  activeTab: AccountTab;
  setActiveTab: (tab: AccountTab) => void;
};

const AccountTabs = ({
  activeTab,
  setActiveTab,
}: AccountTabsProps) => {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <Button
        onClick={() => setActiveTab("profile")}
        variant={activeTab === "profile" ? "default" : "outline"}
        className="rounded-full"
      >
        <User size={20} className="mr-2" />
        Profile
      </Button>
      <Button
        onClick={() => setActiveTab("orders")}
        variant={activeTab === "orders" ? "default" : "outline"}
        className="rounded-full"
      >
        <Package size={20} className="mr-2" />
        Order History
      </Button>
      <Button
        onClick={() => setActiveTab("preference")}
        variant={activeTab === "preference" ? "default" : "outline"}
        className="rounded-full"
      >
        <Settings size={20} className="mr-2" />
        Prefarence
      </Button>
      <Button
        onClick={() => setActiveTab("reviews")}
        variant={activeTab === "reviews" ? "default" : "outline"}
        className="rounded-full"
      >
        <Star size={20} className="mr-2" />
        My Reviews
      </Button>
    </div>
  );
};
export default AccountTabs;
