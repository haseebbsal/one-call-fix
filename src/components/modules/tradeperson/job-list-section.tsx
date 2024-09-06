import { Image } from "@nextui-org/image";
import React from "react";

import CustomButton from "@/components/common/button/custom-button";

interface JobItem {
  icon: string;
  title: string;
  location: string;
  description: string;
  posted: string;
  price: string;
  shortlistedCount?: number;
}

interface JobListSectionProps {
  title: string;
  jobItems: JobItem[];
  innerTitle?: string;
}

export default function JobListSection({
  title,
  jobItems,
  innerTitle,
}: JobListSectionProps) {
  return (
    <div className="w-full flex-[2] flex flex-col mb-8 lg:mb-0">
      <h2 className="text-xl font-semibold mb-4 text-color-17">{title}</h2>
      <section className="flex-1 p-4 sm:p-8 rounded-md border bg-color-16 text-left text-gray-600">
        {innerTitle && (
          <h2 className="text-lg font-medium mb-6 text-color-17">
            {innerTitle}
          </h2>
        )}
        {jobItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.shortlistedCount !== undefined && (
              <div className="flex items-center justify-end mb-1">
                <div className="py-1 px-3 border-2 rounded-lg text-xs font-normal text-white bg-color-21">
                  {item.shortlistedCount} Tradespeople Shortlisted
                </div>
              </div>
            )}
            <div className="mb-8 last:mb-0 flex flex-col sm:flex-row items-start border-b border-color-19">
              <Image
                className="mr-4 h-8 w-8 sm:h-16 sm:w-16"
                src={item.icon}
                alt="Profile Picture"
              />
              <div className="flex flex-col w-full">
                <div className="mb-1 flex flex-col sm:flex-row justify-between text-gray-600">
                  <h3 className="font-medium">{item.title}</h3>
                </div>
                <span className="text-xs sm:text-sm text-color-14">
                  {item.location}
                </span>
                <p className="mt-1 text-sm">{item.description}</p>
                <div className="mt-1 mb-5 flex items-center justify-between text-gray-600">
                  <span className="text-xs sm:text-sm text-color-14">
                    {item.posted}
                  </span>
                  <div className="py-1 px-9 border-2 rounded-lg text-sm font-semibold text-color-15">
                    {item.price}
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
        <CustomButton extraClass="bg-color-12 text-white px-7">
          Load More
        </CustomButton>
      </section>
    </div>
  );
}
