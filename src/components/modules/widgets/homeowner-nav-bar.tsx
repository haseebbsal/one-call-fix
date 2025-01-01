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
import { usePathname, useRouter } from "next/navigation";
import Cookies from 'js-cookie'
import { Button } from "@nextui-org/button";
// import { useAppDispatch } from "@/lib/hooks";
// import { logoutUser } from "@/lib/features/authSlice";

export default function HomeownerNavBar({user}:{user:any}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [display,setDisplay]=useState(false)
  const pathname=usePathname()
  const router=useRouter()
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
  console.log('path',pathname)
  return (
    <>
      <Navbar
        className="h-24"
        maxWidth="full"
        isMenuOpen={isMenuOpen}
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
            <Button
            onClick={()=>{
              router.push("/homeowner/post-a-job")
                // setIsMenuOpen(!isMenuOpen)
              }}
              className={`text-sm font-semibold bg-transparent p-0 ${pathname=="/homeowner/post-a-job"?"!text-color-9":""}`}
            >
              POST A JOB
            </Button>
          </NavbarItem>}
          {user?.role=='HomeOwner' && <NavbarItem>
            <Button onClick={()=>{
                router.push("/homeowner/jobs" )
                  // setIsMenuOpen(!isMenuOpen)
                }} className={`text-sm font-semibold bg-transparent p-0 ${pathname=="/homeowner/jobs"?"!text-color-9":""}`}>
              MY JOB
            </Button>
          </NavbarItem>}
          
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
              // as="link"
              onClick={()=>{
                if(user.role=='HomeOwner'){
                  router.push("/homeowner/account-settings")
                  return
                }
                router.push("/tradeperson/dashboard")
                  // setIsMenuOpen(!isMenuOpen)
                }}
              // link="/homeowner/account-settings"
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
                  
                  <Button
                  onClick={()=>{
                    router.push(item.link)
                      setIsMenuOpen(!isMenuOpen)
                    }}
                    // color="foreground"
                    className={`text-lg font-semibold bg-transparent p-0 ${pathname==item.link?"!text-color-9":""}`}
                    href={item.link}
                  >
                    {item.title}
                  </Button>
                </NavbarMenuItem>
              )
                }
                return
              }
              else{
                return (
                  <NavbarMenuItem key={`${item}-${index}`}>
                    
                    <Button
                    onClick={()=>{
                      router.push(item.link)
                        setIsMenuOpen(!isMenuOpen)
                      }}
                      // color="foreground"
                      className={`text-lg font-semibold bg-transparent p-0 ${pathname==item.link?"!text-color-9":""}`}
                      href={item.link}
                    >
                      {item.title}
                    </Button>
                  </NavbarMenuItem>
                )
              }
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
