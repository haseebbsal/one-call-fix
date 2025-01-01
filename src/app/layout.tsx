import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";

import Providers from "@/providers";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "One Call Fix",
  description: "Welcome To One Call Fix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const toastOptions = {
    style: {
      padding: "20px",
      color: "white",
      background: "gray",
    },
  };
  return (
    <html lang="en">
      <body className={inter.className}>
      <Toaster position="top-right" toastOptions={toastOptions} />
        <Providers>
          <QueryProvider>
          {children}
          </QueryProvider>
          </Providers>
      </body>
    </html>
  );
}
