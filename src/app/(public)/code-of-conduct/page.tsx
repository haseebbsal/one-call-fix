import { CODE_OF_CONDUCT } from "@/_utils/constant";
import PoliciesSection from "@/components/modules/public/policies-section";
import PageTopSection from "@/components/modules/widgets/page-top-section";

const pageTopSection = {
  title: "CODE OF CONDUCT",
  text: "Lorem ipsum dolor sit amet, cons tetuer Lorem ipsum dolor sit amet, cons tetuer",
};

export default function CodeOfConduct() {
  return (
    <main>
      <PageTopSection pageTopSection={pageTopSection} />
      <PoliciesSection policies={CODE_OF_CONDUCT} />
    </main>
  );
}
