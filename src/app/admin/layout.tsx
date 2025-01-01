import React from "react";

import { ADMIN_SIDEBAR_MENU_ITEMS } from "@/_utils/constant";
import AdminNav from "@/components/modules/widgets/admin-nav";
import Sidebar from "@/components/modules/widgets/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="flex flex-col min-h-screen">
        <AdminNav menuItems={ADMIN_SIDEBAR_MENU_ITEMS} />
        <div className="flex w-full">
          <Sidebar menuItems={ADMIN_SIDEBAR_MENU_ITEMS} />
          <main className="flex-1 flex flex-col bg-gray-100 w-full">{children}</main>
        </div>
      </main>
    </>
  );
}
