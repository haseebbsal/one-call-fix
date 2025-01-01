"use client";

import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";
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
import React, { useState } from "react";

import { sidebarMenuItemType } from "@/_utils/types";

import { SearchIcon } from "../public/search-icon";

interface Props {
  menuItems: sidebarMenuItemType[];
}
export default function AdminNav({ menuItems }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      isBordered
      className="h-full w-full"
      maxWidth="full"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand className="mr-4">
          <Link href={"/"}>
            <Image
              width={150}
              src="/logos/original-logo.png"
              alt="Logo"
              className="sm:ml-10 max-w-36"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="sm:flex gap-3 mr-10" justify="end">
        <NavbarItem
          className="hidden md:block"
          as={Link}
          href="/admin/notifications"
        >
          <Image
            src="/icons/notification.png"
            alt="notifications"
            width={40}
            className="cursor-pointer"
          />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-color-13">
        <div className="flex justify-center items-center gap-3 p-2">
          <NavbarItem>
            <Image
              src="/icons/settings.png"
              alt="settings"
              width={40}
              className="cursor-pointer"
            />
          </NavbarItem>
          <NavbarItem>
            <Image
              src="/icons/notification.png"
              alt="notification"
              width={40}
              className="cursor-pointer"
            />
          </NavbarItem>
        </div>

        <div className="flex items-center p-2 space-x-4 mb-5">
          <Image
            src="/images/profile-photo.png"
            alt="profile-photo"
            className="w-12 h-12 rounded-full dark:bg-gray-500"
          />
          <div>
            <h2 className="text-md font-normal text-white">Jhon Clark</h2>
          </div>
        </div>

        <div className="md:hidden p-2">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[14rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal rounded-full",
            }}
            placeholder="Search"
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
        </div>

        <ul className="space-y-4 font-medium">
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <li>
                {item.subItems ? (
                  <details className="group">
                    <summary
                      className={`flex items-center justify-between py-2.5 pl-10 pr-2.5 mr-2.5 rounded-tr-lg rounded-br-lg  text-base text-white transition duration-75 hover:bg-color-12 cursor-pointer`}
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
                        return (
                          <li key={subIndex}>
                            <Link
                              href={subItem.link}
                              className={`flex items-center font-medium text-sm py-2.5 pl-12 pr-2.5 mr-2.5 rounded-tr-lg rounded-br-lg text-white transition duration-75 hover:bg-color-12`}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </details>
                ) : (
                  <Link
                    href={item.link}
                    className={`flex items-center py-2.5 pl-10 pr-2.5 mr-2.5 text-white rounded-tr-lg rounded-br-lg transition-all duration-500 hover:bg-color-12`}
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
                )}
              </li>
            </NavbarMenuItem>
          ))}
        </ul>
      </NavbarMenu>
    </Navbar>
  );
}
