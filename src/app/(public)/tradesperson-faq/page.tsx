import { TRADESPERSON_FAQ } from "@/_utils/constant";
import BaseAccordion from "@/components/common/accordian/base-accordion";
import PageTopSection from "@/components/modules/widgets/page-top-section";

const pageTopSection = {
  title: "TRADESPERSON FAQ",
  text: "Lorem ipsum dolor sit amet, cons tetuer Lorem ipsum dolor sit amet, cons tetuer",
};

export default function TradespersonFaq() {
  return (
    <main>
      <PageTopSection pageTopSection={pageTopSection} />
      <BaseAccordion faq={TRADESPERSON_FAQ} />
    </main>
  );
}
