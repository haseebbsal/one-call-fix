"use client";

import { NextUIProvider } from "@nextui-org/system";
import React from "react";

interface Props {
  children: React.ReactNode;
}
export default function NextUiProviderWrapper({ children }: Props) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
