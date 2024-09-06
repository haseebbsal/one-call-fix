import React from "react";

import { TRADE_PERSON_SIDEBAR_MENU_ITEMS } from "@/_utils/constant";
import Sidebar from "@/components/modules/widgets/sidebar";
import TradepersonNavBar from "@/components/modules/widgets/tradeperson-nav-bar";

export default function TradepersonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="flex flex-col min-h-screen">
        <TradepersonNavBar menuItems={TRADE_PERSON_SIDEBAR_MENU_ITEMS} />
        <div className="flex">
          <Sidebar menuItems={TRADE_PERSON_SIDEBAR_MENU_ITEMS} />
          <main className="flex-1 flex flex-col bg-gray-100">{children}</main>
        </div>
      </main>
    </>
  );
}
