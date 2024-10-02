import React from "react";

import { FAQ } from "@/_utils/constant";
import BaseAccordion from "@/components/common/accordian/base-accordion";
import PageTopSection from "@/components/modules/widgets/page-top-section";
import Image from "next/image";
import BaseButton from "@/components/common/button/base-button";

const pageTopSection = {
  title: "FAQ",
  text: "",
};

export default function Faq() {
  return (
    <main>
      <PageTopSection pageTopSection={pageTopSection} />
      <div className="flex justify-center p-8 border-2 gap-4 sm:flex-nowrap flex-wrap rounded-lg sm:w-[60%] m-auto bg-gray-100">
        <div className="flex flex-col items-center gap-2 sm:w-[35%] text-center bg-white p-4 rounded-lg">
          <h1 className="font-bold">Homeowner</h1>
          <Image src={'/images/pl (2).svg'} height={200} width={200} alt="homeowner"/>
          <p className="text-medium">Want to know more about how to post a job, or what happens once the job is posted? Click below to find out more!</p>
          <BaseButton as="link" link="/homeowner-faq">I'm A Homeowner</BaseButton>
        </div>
        <div className="flex flex-col items-center gap-2 sm:w-[35%] text-center bg-white p-4 rounded-lg">
          <h1 className="font-bold">Tradespeople</h1>
          <Image src={'/images/pl (1).svg'} height={200} width={200} alt="homeowner"/>
          <p className="text-medium">Want to know more about how our service works for tradespeople? Click the button below to learn more</p>
          <BaseButton as="link" link="/tradesperson-faq">I'm A Tradeperson</BaseButton>
        </div>

      </div>
      {/* <BaseAccordion faq={FAQ} /> */}
    </main>
  );
}
