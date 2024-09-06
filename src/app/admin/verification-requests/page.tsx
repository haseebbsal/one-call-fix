import React from "react";

import VerificationRequestCard from "@/components/common/cards/verification-request-card";
import LayoutWrapper from "@/components/modules/dashboard/layout-wrapper";

export default function VerificationRequests() {
  return (
    <LayoutWrapper
      sectionOneTitle="Verifications Requests"
      sectionOneChildren={
        <div className="flex flex-col gap-5">
          {[1, 2, 3, 4, 5].map((el) => (
            <div className="pb-6 border-b border-b-color-19" key={el}>
              <VerificationRequestCard description="Great service competitively priced. Lexus was great and very detail oriented hope that's who they send next time too!" />
            </div>
          ))}
        </div>
      }
    />
  );
}
