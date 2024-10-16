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

import { HOMEOWNER_AUTH_MENU_ITEMS } from "@/_utils/constant";
import BaseButton from "@/components/common/button/base-button";
import { useMutation } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import { usePathname } from "next/navigation";
import Cookies from 'js-cookie'
// import { useAppDispatch } from "@/lib/hooks";
// import { logoutUser } from "@/lib/features/authSlice";

export default function HomeownerNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [display,setDisplay]=useState(false)
  const pathname=usePathname()
  // const dispatch = useAppDispatch();
  const logOutMutation=useMutation(()=>axiosInstance.post('/auth/logout'),{
    onSuccess(data, variables, context) {
      console.log('logout',data.data)
    },
  })

  useEffect(()=>{
    const getUser=Cookies.get('userData')
    if(getUser){
      const {role}=JSON.parse(getUser)
      if(role=='HomeOwner'){
        setDisplay(true)
      }
      // console.log('user',parse)

    }
  },[pathname])
  // const logout = () => {
  //   dispatch(logoutUser({ isValidAccessToken: false }));
  // };
  return (
    <>
      <Navbar
        className="h-24"
        maxWidth="full"
        classNames={{
          base: "border border-[(0,0,0,0.1)] shadow",
        }}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="custom-md:hidden"
          />
          <NavbarBrand className="w-full sm:w-auto flex justify-center sm:justify-start">
            <Link href={"/homeowner/jobs"}>
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
          {display && <NavbarItem>
            <Link
              href="/homeowner/post-a-job"
              className="text-sm font-semibold"
            >
              POST A JOB
            </Link>
          </NavbarItem>}
          <NavbarItem>
            <Link href="/homeowner/jobs" className="text-sm font-semibold">
              MY JOB
            </Link>
          </NavbarItem>
          <NavbarItem className="mr-5" 
          >
            <BaseButton type="button" 
            extraClass="!text-sm !p-0 !font-semibold !bg-transparent !text-black"
        isLoading={logOutMutation.isLoading}
        onClick={()=>{
          logOutMutation.mutate()
        }}
        >
          LOGOUT
        </BaseButton>
            {/* <button onClick={()=>{
            console.log('logout')
          }} 
          className="text-sm font-semibold">
              LOGOUT
            </button> */}
          </NavbarItem>
          <NavbarItem>
            <BaseButton
              as="link"
              link="/homeowner/account-settings"
              extraClass="!text-base w-[265px] !max-w-full !text-color-4 bg-transparent font-semibold border-3 border-black px-10"
            >
              MY ACCOUNT
            </BaseButton>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu className="mt-10">
          {HOMEOWNER_AUTH_MENU_ITEMS.map((item:any, index:number) => {
            if(index!=2){
              if(index==0){
                if(display){
                  return (
                <NavbarMenuItem key={`${item}-${index}`}>
                  
                  <Link
                    // color="foreground"
                    className="text-lg font-semibold"
                    href={item.link}
                  >
                    {item.title}
                  </Link>
                </NavbarMenuItem>
              )
                }
                return
              }
              else{
                return (
                  <NavbarMenuItem key={`${item}-${index}`}>
                    
                    <Link
                      // color="foreground"
                      className="text-lg font-semibold"
                      href={item.link}
                    >
                      {item.title}
                    </Link>
                  </NavbarMenuItem>
                )
              }
              return (
                <NavbarMenuItem key={`${item}-${index}`}>
                  
                  <Link
                    // color="foreground"
                    className="text-lg font-semibold"
                    href={item.link}
                  >
                    {item.title}
                  </Link>
                </NavbarMenuItem>
              )
            }
            else{
              return (
                <NavbarMenuItem key={`${item}-${index}`}>
                  <BaseButton type="button" 
            extraClass="!text-lg !p-0 !font-semibold !bg-transparent !text-black !w-max"
        isLoading={logOutMutation.isLoading}
        onClick={()=>{
          logOutMutation.mutate()
        }}
        >
          {item.title}
        </BaseButton>
                </NavbarMenuItem>
              )  
            }
            }
          )
          }
        </NavbarMenu>
      </Navbar>
    </>
  );
}
