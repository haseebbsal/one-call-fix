"use client";

import { Image } from "@nextui-org/image";
import React from "react";

import { COMPLAINT_STATUS } from "@/_utils/enums";
import ComplaintCard from "@/components/common/cards/complaint-card";
import ReviewCard from "@/components/common/cards/review-card";
import LayoutWrapper from "@/components/modules/dashboard/layout-wrapper";

export default function Job() {
  return (
    <>
      <LayoutWrapper
        sectionOneTitle="Jobs Management"
        sectionTwoClassname="!flex-[2]"
        sectionOneChildren={
          <div>
            <h2 className="text-lg font-medium pb-4 text-color-17">
              Job Detail
            </h2>
            <Image
              src="/images/job-bell.png"
              alt="Job Detail"
              width={91}
              height={91}
              className="object-contain mb-4"
            />
            <h2 className="text-xl font-bold pb-8 text-color-17">
              Repair and Paint Walls and Ceilings
            </h2>
            <div className="flex flex-col gap-8">
              <div className="flex items-center flex-wrap gap-9">
                <div>
                  <h2 className="text-lg font-medium pb-3.5 text-color-17">
                    Description
                  </h2>
                  <p className="text-sm text-color-6 text-[300]">
                    Due to water ingress we need the plastering sorted in one or
                    two areas, two walls and two ceilings re painted Due to
                    water ingress we need the plastering sorted in one or two
                    areas, two walls and two ceilings re painted Due to water
                    ingress we need the plastering sorted in one or two areas,
                    two walls and two ceilings re painted Due to water ingress
                    we need the plastering sorted in one or two areas, two walls
                    and two ceilings re painted
                  </p>
                </div>
              </div>
              <div className="flex items-center flex-wrap gap-9">
                <div>
                  <h2 className="text-lg font-medium pb-3.5 text-color-17">
                    Contact Info
                  </h2>
                  <p className="text-sm text-color-6 text-[300]">
                    +123 456789 0
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-medium pb-3.5 text-color-17">
                    Home Owner Email
                  </h2>
                  <p className="text-sm text-color-6 text-[300]">
                    johndavid@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex items-center flex-wrap gap-9">
                <div>
                  <h2 className="text-lg font-medium pb-3.5 text-color-17">
                    Interested Tradespeople
                  </h2>
                  <p className="text-sm text-color-6 text-[300]">45</p>
                </div>
                <div>
                  <h2 className="text-lg font-medium pb-3.5 text-color-17">
                    Shortlisted Tradespeople
                  </h2>
                  <p className="text-sm text-color-6 text-[300]">45</p>
                </div>
                <div>
                  <h2 className="text-lg font-medium pb-3.5 text-color-17">
                    Purchased By
                  </h2>
                  <p className="text-sm text-color-6 text-[300]">16</p>
                </div>
              </div>
              <div className="flex items-center flex-wrap gap-9">
                <div>
                  <h2 className="text-lg font-medium pb-3.5 text-color-17">
                    Final Chosen
                  </h2>
                  <p className="text-sm text-color-6 text-[300]">Alvin Adams</p>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </>
  );
}
