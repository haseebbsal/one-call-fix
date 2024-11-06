"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { useState } from "react";

interface Faq {
  key: string;
  title: string;
  desc: string;
}

interface FaqProps {
  faq: Faq[];
}

export default function BaseAccordion({ faq }: FaqProps) {
  const [activeKey, setActiveKey] = useState(new Set(["1"])); // State to track open item

  const handleOpenChange = (key: any) => {
    setActiveKey(new Set([key.currentKey]));
  };

  const styledTitle = (title: string, isActive: boolean) => (
    <div className={`${isActive ? "text-white" : "text-black"}`}>{title}</div>
  );

  return (
    <div className="mx-auto mb-16 sm:py-16 py-8 w-[90%] sm:px-8 px-2 sm:w-2/3 md:px-16 lg:px-20 xl:px-0 border border-solid border-color-8 rounded-md">
      <div className="mx-auto max-w-[48rem]">
        <Accordion
          variant="splitted"
          defaultExpandedKeys={["1"]}
          onSelectionChange={handleOpenChange}
        >
          {faq.map((item) => (
            <AccordionItem
              key={item.key}
              aria-label={item.title}
              title={styledTitle(item.title, activeKey.has(item.key))}
              className={
                activeKey.has(item.key) ? "!bg-color-4 text-white text-sm" : ""
              }
            >
              {item.desc}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
