"use client";

import { Image } from "@nextui-org/image";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import Link from "next/link";
import { useState } from "react";

import { MENU_ITEMS } from "@/_utils/constant";
import BaseButton from "@/components/common/button/base-button";

export default function AuthNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Navbar
        className="h-24 shadow-[rgba(0,0,0,0.1)] border border-[rgba(0,0,0,0.1)]"
        maxWidth="full"
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent justify="center" className="w-full">
          <NavbarBrand className="w-full sm:w-auto flex justify-center">
            <Link href={"/"}>
              <Image
                width={200}
                src="/logos/original-logo.png"
                alt="Logo"
                className="sm:ml-10"
              />
            </Link>
          </NavbarBrand>
        </NavbarContent>
      </Navbar>
    </>
  );
}
