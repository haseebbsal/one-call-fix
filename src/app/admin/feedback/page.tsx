import React from "react";

import ReviewCard from "@/components/common/cards/review-card";
import LayoutWrapper from "@/components/modules/dashboard/layout-wrapper";

export default function Feedback() {
  return (
    <LayoutWrapper
      sectionOneTitle="Feedback"
      sectionTwoClassname="!flex-[2]"
      sectionOneChildren={
        <div>
          <h2 className="text-lg font-medium mb-6 text-color-17">
            Feedback From Home Owners
          </h2>
          <div className="flex flex-col gap-5">
            {[1, 2, 3, 4, 5].map((el) => (
              <div className="pb-6 border-b border-b-color-19" key={el}>
                <ReviewCard description="Great service competitively priced. Lexus was great and very detail oriented hope that's who they send next time too!" />
              </div>
            ))}
          </div>
        </div>
      }
      sectionTwoChildren={
        <div>
          <h2 className="text-lg font-medium mb-6 text-color-17">
            Feedback From Tradespeoples
          </h2>
          <div className="flex flex-col gap-5">
            {[1, 2, 3, 4, 5].map((el) => (
              <div className="pb-6 border-b border-b-color-19" key={el}>
                <ReviewCard description="Great service competitively priced. Lexus was great and very detail oriented hope that's who they send next time too!" />
              </div>
            ))}
          </div>
        </div>
      }
    />
  );
}
