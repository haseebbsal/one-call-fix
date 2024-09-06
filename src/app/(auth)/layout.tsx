import React from "react";

import AuthNav from "@/components/modules/widgets/auth-nav";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthNav />
      {children}
    </>
  );
}
