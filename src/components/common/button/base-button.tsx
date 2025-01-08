import { Button } from "@nextui-org/button";
import Link from "next/link";
import React from "react";

type LinkProps = {
  as?: "link";
  link: string;
  type?: undefined;
  isLoading?: undefined;
  onClick?: undefined;
  variant?: undefined;
  disabled?:undefined
};


type ButtonProps = {
  as?: "button";
  link?: undefined;
  type?: "button" | "submit";
  isLoading?: boolean;
  variant?: "solid" | "bordered";
  onClick?: () => void;
  disabled?:boolean;
};


type Props = {
  children: React.ReactNode;
  extraClass?: string;
  target?:string
} & (LinkProps | ButtonProps);

const spinner = (
  <svg
    className="animate-spin h-5 w-5 text-current"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      fill="currentColor"
    />
  </svg>
);
export default function BaseButton({
  onClick,
  children,
  link,
  extraClass = "",
  type = "button",
  variant = "solid",
  as = "button",
  isLoading = false,
  disabled=false,
  target
}: Props) {
  if (as === "button") {
    return (
      <Button
        onClick={onClick}
        type={type}
        isLoading={isLoading}
        disabled={disabled}
        variant={variant}
        spinner={spinner}
        color="primary"
        className={`w-full text-white bg-color-9 px-4 md:px-8 text-xs  md:text-sm 2xl:text-base h-10 md:h-12 rounded-full sm:max-w-[200px]  ${extraClass}`}
      >
        {children}
      </Button>
    );
  }
  if (as === "link") {
    return (
      <Link
        href={link!}
        target={target}
        className={`flex items-center justify-center text-white bg-color-5 px-4 md:px-8 text-xs  md:text-sm 2xl:text-base h-10 md:h-12 rounded-full max-w-[200px] transition-all duration-400 hover:opacity-50 ${extraClass}`}
      >
        {children}
      </Link>
    );
  }
}
