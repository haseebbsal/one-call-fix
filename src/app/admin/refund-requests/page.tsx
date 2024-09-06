import React from "react";

import RefundCard from "@/components/common/cards/refund-card";
import LayoutWrapper from "@/components/modules/dashboard/layout-wrapper";

export default function RefundRequests() {
  return (
    <LayoutWrapper
      sectionOneTitle="Refund Requests"
      sectionOneChildren={
        <div>
          <h2 className="text-lg font-medium mb-6 text-color-17">
            Jobs List For Refund
          </h2>
          <div className="flex flex-col gap-5">
            {[1, 2, 3, 4, 5].map((el) => (
              <div className="pb-6 border-b border-b-color-19" key={el}>
                <RefundCard description="Great service competitively priced. Lexus was great and very detail oriented hope that's who they send next time too!" />
              </div>
            ))}
          </div>
        </div>
      }
    />
  );
}
