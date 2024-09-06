import React from "react";

import PublicNavBar from "@/components/modules/widgets/public-nav-bar";
import SiteFooter from "@/components/modules/widgets/site-footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PublicNavBar />
      {children}
      <SiteFooter />
    </>
  );
}
