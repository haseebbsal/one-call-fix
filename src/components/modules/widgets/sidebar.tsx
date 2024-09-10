"use client";

import { Image } from "@nextui-org/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { sidebarMenuItemType } from "@/_utils/types";
import { useMutation } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import BaseButton from "@/components/common/button/base-button";

interface Props {
  menuItems: sidebarMenuItemType[];
}
export default function Sidebar({ menuItems }: Props) {
  const [currentPath, setCurrentPath] = useState("");
  const pathname = usePathname();
  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);


  const logOutMutation=useMutation(()=>axiosInstance.post('/auth/logout'),{
    onSuccess(data, variables, context) {
      console.log('logout',data.data)
    },
  })
  return (
    <aside
      className="w-72 hidden md:block bg-color-13 min-h-screen"
      aria-label="Sidebar"
    >
      <div className="h-full pb-4 overflow-y-auto">
        <div className="flex justify-center items-center gap-3 my-7">
          <Image
            src="/images/profile-photo.png"
            alt="profile-photo"
            width={60}
            height={60}
            className="rounded-full"
          />
          <div>
            <h2 className="text-base font-medium text-white">John Clark</h2>
          </div>
        </div>

        <ul className="flex flex-col gap-6 font-medium">
          {menuItems.map((item, index) => {
            const isActive = currentPath === item.link;

            return (
              <li key={index}>
                {item.subItems ? (
                  <details className="group">
                    <summary
                      className={`flex items-center justify-between py-2.5 pl-10 pr-2.5 mr-2.5 rounded-tr-lg rounded-br-lg  text-base text-white transition duration-75 hover:bg-color-12 cursor-pointer ${isActive ? "bg-color-12 dark:bg-color-12" : ""}`}
                    >
                      <div className="flex items-center">
                        <Image
                          src={item.icon}
                          alt={item.label}
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap font-medium text-sm">
                          {item.label}
                        </span>
                      </div>
                      <svg
                        className="w-3 h-3 transition-transform duration-300 group-open:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </summary>
                    <ul className="flex flex-col gap-2 pt-2">
                      {item.subItems.map((subItem, subIndex) => {
                        const isSubActive = currentPath === subItem.link;
                        return (
                          <li key={subIndex}>
                            <Link
                              href={subItem.link}
                              className={`flex items-center font-medium text-sm py-2.5 pl-12 pr-2.5 mr-2.5 rounded-tr-lg rounded-br-lg text-white transition duration-75 hover:bg-color-12 ${isSubActive ? "bg-color-12" : ""}`}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </details>
                ) : item.link?(
                  <Link
                    href={item.link}
                    className={`flex items-center py-2.5 pl-10 pr-2.5 mr-2.5 text-white rounded-tr-lg rounded-br-lg transition-all duration-500 hover:bg-color-12 ${isActive ? "bg-color-12" : ""}`}
                  >
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                    <span className="ms-3 font-medium text-sm">
                      {item.label}
                    </span>
                  </Link>
                ):<BaseButton
                isLoading={logOutMutation.isLoading}
                disabled={logOutMutation.isLoading}
                // href={item.link}
                onClick={()=>{
                  logOutMutation.mutate()
                }}
                extraClass={`flex !w-full items-center justify-start bg-transparent py-2.5 pl-10 pr-2.5 mr-2.5 text-white !rounded-none !max-w-full transition-all duration-500 hover:bg-color-12 ${isActive ? "!bg-color-12" : ""}`}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <span className="ms-3 font-medium text-sm">
                  {item.label}
                </span>
              </BaseButton>}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
