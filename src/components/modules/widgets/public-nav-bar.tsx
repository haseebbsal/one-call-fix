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
import { useEffect, useState } from "react";

import { MENU_ITEMS } from "@/_utils/constant";
import BaseButton from "@/components/common/button/base-button";
import { usePathname } from "next/navigation";
import Cookies from 'js-cookie'

export default function PublicNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname=usePathname()
  const [display,setDisplay]=useState(true)

  useEffect(()=>{
    const getUser=Cookies.get('userData')
    if(getUser){
      const {role}=JSON.parse(getUser)
      if(role!='HomeOwner'){
        setDisplay(false)
      }
      // console.log('user',parse)

    }
  },[pathname])
  return (
    <>
      <Navbar classNames={{wrapper:"sm:px-24 px-4"}} isMenuOpen={isMenuOpen} className="h-24" maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
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
                // className="sm:ml-10"
              />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent
          className="hidden custom-md:flex gap-4 "
          justify="end"
        >
          <NavbarItem>
            <Link href="/" className={`text-sm font-semibold ${pathname=='/'?'text-color-5':""} hover:text-color-5`}>
              HOME
            </Link>
          </NavbarItem>
          {display && <NavbarItem>
            <Link
              href="/homeowner/post-a-job"
              className={`text-sm font-semibold ${pathname=='/homeowner/post-a-job'?'text-color-5':""} hover:text-color-5`}
            >
              POST A JOB
            </Link>
          </NavbarItem>}
          <NavbarItem className="mr-5">
            <Link href="/login" className={` ${pathname=='/login'?'text-color-5':""} text-sm font-semibold hover:text-color-5`}>
              LOGIN
            </Link>
          </NavbarItem>

          <NavbarItem>
            <BaseButton
              as="link"
              link="/tradeperson/signup"
              extraClass="!text-base  w-[265px] !max-w-full !text-color-4 bg-transparent font-semibold border-3 border-black  px-10"
            >
              TRADEPERSON SIGN UP
            </BaseButton>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu className="mt-10">
          {MENU_ITEMS.map((item, index) => {
            if(index==1){
              return display && <NavbarItem>
                <Link
                  href="/homeowner/post-a-job"
                  className={`text-sm font-semibold ${pathname==item.link?'text-color-5':""} hover:text-color-5`}
                >
                  POST A JOB
                </Link>
              </NavbarItem>
            }
            return (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                // color="foreground"
                className={`text-sm font-semibold ${pathname==item.link?'text-color-5':""} hover:text-color-5`}
                href={item.link}
              >
                {item.title}
              </Link>
            </NavbarMenuItem>
          )})}
        </NavbarMenu>
      </Navbar>
    </>
  );
}
