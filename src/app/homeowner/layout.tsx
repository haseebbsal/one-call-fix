"use client";

import React, { useEffect, useState } from "react";

import PublicNavBar from "@/components/modules/widgets/public-nav-bar";
import SiteFooter from "@/components/modules/widgets/site-footer";
// import { useAppSelector } from "@/lib/hooks";
import HomeownerNavBar from "@/components/modules/widgets/homeowner-nav-bar";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
export default function HomeownerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname=usePathname()
  const [user,setUser]=useState(false)
  // const { user } = useAppSelector((state) => state.auth);
  useEffect(()=>{
    let user=Cookies.get('accessToken')?true:false
    setUser(user)
  },[pathname])
  return (
    <main>
      {user ? <HomeownerNavBar /> : <PublicNavBar />}
      {children}
      <SiteFooter />
    </main>
  );
}
