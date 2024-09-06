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

export default function PublicNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Navbar className="h-24" maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="custom-md:hidden"
          />
          <NavbarBrand className="w-full sm:w-auto flex justify-center sm:justify-start">
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

        <NavbarContent
          className="hidden custom-md:flex gap-4 mr-10"
          justify="end"
        >
          <NavbarItem>
            <Link href="/" className="text-sm font-semibold">
              HOME
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href={'/homeowner/post-a-job'} className="text-sm font-semibold">
              POST A JOB
            </Link>
          </NavbarItem>
          <NavbarItem className="mr-5">
            <Link href="/login" className="text-sm font-semibold">
              LOGIN
            </Link>
          </NavbarItem>

          <NavbarItem>
            <BaseButton
              as="link"
              link="/tradesperson-signup"
              extraClass="!text-base w-[265px] !max-w-full !text-color-4 bg-transparent font-semibold border-3 border-black px-10"
            >
              TRADEPERSON SIGN UP
            </BaseButton>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu className="mt-10">
          {MENU_ITEMS.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                // color="foreground"
                className="text-lg font-semibold"
                href={item.link}
              >
                {item.title}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
}
