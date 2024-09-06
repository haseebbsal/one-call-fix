import React from "react";

import { TRADESPERSON_REFUND_POLICY } from "@/_utils/constant";
import PoliciesSection from "@/components/modules/public/policies-section";
import PageTopSection from "@/components/modules/widgets/page-top-section";

const pageTopSection = {
  title: "TRADESPERSON REFUND POLICY",
  text: "Lorem ipsum dolor sit amet, cons tetuer Lorem ipsum dolor sit amet, cons tetuer",
};

export default function TradespersonRefundPolicy() {
  return (
    <main>
      <PageTopSection pageTopSection={pageTopSection} />
      <PoliciesSection policies={TRADESPERSON_REFUND_POLICY} />
    </main>
  );
}
