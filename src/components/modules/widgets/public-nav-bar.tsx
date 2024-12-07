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
import { useMutation } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";

export default function PublicNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname()
  const [display, setDisplay] = useState<any>()

  useEffect(() => {
    const getUser = Cookies.get('userData')
    if (getUser) {
      const user = JSON.parse(getUser)

      setDisplay(user)

      // console.log('user',parse)

    }
  }, [pathname])

  const logOutMutation = useMutation(() => axiosInstance.post('/auth/logout'), {
    onSuccess(data, variables, context) {
      console.log('logout', data.data)
    },
  })

  console.log(display?.role)
  return (
    <>
      <Navbar classNames={{ wrapper: "sm:px-24 px-4" }} isMenuOpen={isMenuOpen} className="h-24" maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
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
            <Link href="/" className={`text-sm font-semibold ${pathname == '/' ? 'text-color-5' : ""} hover:text-color-5`}>
              HOME
            </Link>
          </NavbarItem>
          {<NavbarItem>
            <Link
              href="/homeowner/post-a-job"
              className={`text-sm font-semibold ${pathname == '/homeowner/post-a-job' ? 'text-color-5' : ""} hover:text-color-5`}
            >
              POST A JOB
            </Link>
          </NavbarItem>}

          {display && <NavbarItem>
            <BaseButton
              isLoading={logOutMutation.isLoading}
              disabled={logOutMutation.isLoading}
              // href={item.link}
              onClick={() => {
                logOutMutation.mutate()
              }}
              extraClass={`text-sm font-semibold hover:text-color-5 bg-transparent text-black !p-0 !h-auto`}
            >

              Log Out
            </BaseButton>
          </NavbarItem>}

          {display && display?.role != 'HomeOwner' && <NavbarItem className="mr-5">
            <Link href="/tradeperson/dashboard" className={` ${pathname == '/login' ? 'text-color-5' : ""} text-sm font-semibold hover:text-color-5`}>
              MY ACCOUNT
            </Link>
          </NavbarItem>}
          {display && display?.role == 'HomeOwner' && <NavbarItem className="mr-5">
            <Link href="/homeowner/jobs" className={` ${pathname == '/login' ? 'text-color-5' : ""} text-sm font-semibold hover:text-color-5`}>
              MY ACCOUNT
            </Link>
          </NavbarItem>}


          {!display && <NavbarItem className="mr-5">
            <Link href="/login" className={` ${pathname == '/login' ? 'text-color-5' : ""} text-sm font-semibold hover:text-color-5`}>
              LOGIN
            </Link>
          </NavbarItem>}



          {(display?.role == 'HomeOwner' || !display) && <NavbarItem>
            <BaseButton
              as="link"
              link="/tradeperson/signup"
              extraClass="!text-base  w-[265px] !max-w-full !text-color-4 bg-transparent font-semibold border-3 border-black  px-10"
            >
              TRADEPERSON SIGN UP
            </BaseButton>
          </NavbarItem>}

        </NavbarContent>

        <NavbarMenu className="mt-10">
          {display && <NavbarMenuItem>
            <BaseButton
              isLoading={logOutMutation.isLoading}
              disabled={logOutMutation.isLoading}
              // href={item.link}
              onClick={() => {
                logOutMutation.mutate()
              }}
              
              extraClass={`text-sm font-semibold hover:text-color-5 bg-transparent text-black !p-0 !h-auto w-max !gap-0 min-w-max`}
            >

              Log Out
            </BaseButton>
          </NavbarMenuItem>}

          {display && display?.role != 'HomeOwner' && <NavbarMenuItem className="mr-5">
            <Link  href="/tradeperson/dashboard" className={` ${pathname == '/login' ? 'text-color-5' : ""} text-sm  font-semibold hover:text-color-5`}>
              MY ACCOUNT
            </Link>
          </NavbarMenuItem>}
          {display && display?.role == 'HomeOwner' && <NavbarMenuItem className="mr-5">
            <Link href="/homeowner/jobs" className={` ${pathname == '/login' ? 'text-color-5' : ""} text-sm font-semibold hover:text-color-5`}>
              MY ACCOUNT
            </Link>
          </NavbarMenuItem>}
          {MENU_ITEMS.map((item, index) => {
            if (index == 2) {
              return !display && <NavbarItem>
                <Link
                  href={item.link}
                  className={`text-sm font-semibold ${pathname == item.link ? 'text-color-5' : ""} hover:text-color-5`}
                >
                  {item.title}
                </Link>
              </NavbarItem>
            }
            if (index == 3) {
              return (display?.role == 'HomeOwner' || !display) && <NavbarItem>
                <Link
                  href={item.link}
                  className={`text-sm font-semibold ${pathname == item.link ? 'text-color-5' : ""} hover:text-color-5`}
                >
                  {item.title}
                </Link>
              </NavbarItem>
            }
            return (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  // color="foreground"
                  className={`text-sm font-semibold ${pathname == item.link ? 'text-color-5' : ""} hover:text-color-5`}
                  href={item.link}
                >
                  {item.title}
                </Link>
              </NavbarMenuItem>
            )
          })}
        </NavbarMenu>
      </Navbar>
    </>
  );
}
