import ContactForm from "@/components/modules/public/contact-form";
import PageTopSection from "@/components/modules/widgets/page-top-section";

const pageTopSection = {
  title: "CONTACT US",
  text: "Lorem ipsum dolor sit amet, cons tetuer Lorem ipsum dolor sit amet, cons tetuer",
};

export default function ContactUs() {
  return (
    <main>
      <PageTopSection pageTopSection={pageTopSection} />
      <section className="bg-color-11 p-6 md:p-10 lg:p-28 flex items-center justify-center">
        <div className="pt-4 pb-6 px-5 md:pt-6 md:pb-10 md:px-10 lg:pt-14 lg:pb-32 lg:px-20 border border-[#E1E1E1] bg-white shadow-lg rounded-lg w-full md:max-w-[700px] 2xl:max-w-[800px]">
          <h3 className="text-2xl font-bold sm:text-3xl mb-2 text-color-1">
            CONTACT
          </h3>
          <p className="text-color-6 text-base sm:text-xl font-light">
            Access Lorem ipsum dolor sit amet, cons tetuer Lorem ipsum dolor sit
            amet, cons tetuer
          </p>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
