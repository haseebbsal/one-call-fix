import React from "react";

export default function JobsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="px-5 py-10">
        <div className="flex flex-col xl:flex-row lg:gap-5">{children}</div>
      </div>
    </>
  );
}
