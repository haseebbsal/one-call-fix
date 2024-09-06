import { HOMEOWNER_FAQ } from "@/_utils/constant";
import BaseAccordion from "@/components/common/accordian/base-accordion";
import PageTopSection from "@/components/modules/widgets/page-top-section";

const pageTopSection = {
  title: "HOMEOWNER FAQ",
  text: "Lorem ipsum dolor sit amet, cons tetuer Lorem ipsum dolor sit amet, cons tetuer",
};

export default function HomeownerFaq() {
  return (
    <main>
      <PageTopSection pageTopSection={pageTopSection} />
      <BaseAccordion faq={HOMEOWNER_FAQ} />
    </main>
  );
}
