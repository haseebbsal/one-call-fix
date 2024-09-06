import { COMPLAINTS_POLICY } from "@/_utils/constant";
import PoliciesSection from "@/components/modules/public/policies-section";
import PageTopSection from "@/components/modules/widgets/page-top-section";

const pageTopSection = {
  title: "COMPLAINTS POLICY",
  text: "Lorem ipsum dolor sit amet, cons tetuer Lorem ipsum dolor sit amet, cons tetuer",
};

export default function ComplaintsPolicy() {
  return (
    <main>
      <PageTopSection pageTopSection={pageTopSection} />
      <PoliciesSection policies={COMPLAINTS_POLICY} />
    </main>
  );
}
