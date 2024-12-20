import {
  FEATURES,
  HOMEOWNER_SERVICE,
  TRADESPEOPLE_SERVICE,
} from "@/_utils/constant";
import BaseButton from "@/components/common/button/base-button";
import HorizontalLine from "@/components/common/horizontal-line/horizontal-line";
import FeaturesSection from "@/components/modules/public/features-section";
import PostJobSection from "@/components/modules/public/post-job-section";
import Video from "@/components/modules/public/Video";
import { Poppins } from "next/font/google";
const poppins=Poppins({
  weight:'300',
  subsets:['latin']
})

export default function AboutUs() {
  return (
    <main className={`${poppins.className}`}>
      <section className="bg-[url('/shapes/ellipse-bg.png')]">
        <div className="mx-auto max-w-screen-xl px-4 sm:py-32 py-8 lg:flex">
          <div className="mx-auto max-w-xl text-center">
            <h1 className={`text-3xl font-extrabold sm:text-5xl ${poppins.className}`}>ABOUT US</h1>

            <p className={`mt-4 sm:text-xl/relaxed text-color-6 ${poppins.className}`}>
              Finding a reliable tradesperson is not always the easiest of
              tasks. From constant phone calls, constant home visits, constant
              vetting, the list goes on!
            </p>
          </div>
        </div>
      </section>

      <HorizontalLine />

      <section className=" sm:px-24 p-4 sm:pt-32 pt-8 sm:pb-16 pb-0 lg:flex items-center">
        <div className={`${poppins.className} sm:w-full `}>
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-6">
            Our Mission
          </h1>
          <div className="flex w-full sm:flex-nowrap flex-wrap sm:gap-0 gap-8">
            <div className="sm:w-1/2 w-full">
            <p className="mb-6 text-color-6">
            Finding a reliable tradesperson is not always the easiest of tasks.
            From constant phone calls, constant home visits, constant vetting,
            the list goes on! At OneCallFix, we pride ourselves in connecting
            homeowners with vetted tradespeople who are eager to complete your
            jobs to a high standard. Our aim is to make the process of finding a
            reliable tradesperson as easy as possible. We vet all tradespeople
            by verifying identification, insurance and any regulatory
            documentation required for their specific trade. We understand that
            transparency is key - so we ensure to provide you with the full
            information on a tradesperson to help you make the right decision.
            We have a verified review system so you can trust any testimonials
            you read on a tradesperson on our platform.
          </p>
          <p className="lg:mb-0 text-color-6">
            For tradespeople, it is not an easy task to get clients either.
            Whilst word of mouth is great, marketing yourself online can be
            difficult, technical, and expensive! We aim to take these efforts
            away from you so that you can focus on your craft and let us provide
            you with the jobs. Transparency and fairness is crucial, so we put
            the tradesperson at the heart of our platform. We ensure to only
            charge tradespeople when they have at least been shortlisted from a
            client, preventing them from spending excess on jobs which they may
            not have a high chance of winning. With OneCallFix`s feedback
            system, we ensure that tradespeople are rewarded for their good
            work, helping to win more jobs tomorrow.
          </p>
            </div>
          <div className="sm:w-1/2 w-full ">
        <Video extraClass="!static sm:!h-[30rem] " url="/videos/about.mp4" imgUrl="/images/about-us-video-image.png"/>
        
          {/* <img src="/images/about-us-video-image.png" alt="video-image" /> */}
        </div>
          </div>
          
        </div>
      </section>

      <section className=" sm:px-24 sm:p-4 px-4 py-8 sm:mb-16">
        <div className="mb-16">
          <h2 className="text-3xl font-extrabold sm:text-5xl mb-7">
            Why use our service as a homeowner?
          </h2>
          <ul className="list-disc list-inside text-color-6">
            {HOMEOWNER_SERVICE.map((service, index) => (
              <li key={index} className="mb-3">
                {service.service}
              </li>
            ))}
          </ul>
          <BaseButton as="link" link="/homeowner/post-a-job">
            POST A JOB
          </BaseButton>
        </div>

        <div>
          <h2 className="text-3xl font-extrabold sm:text-5xl mb-7">
          Why use our service as a tradesperson?
          </h2>
          <ul className="list-disc list-inside text-color-6">
            {TRADESPEOPLE_SERVICE.map((service, index) => (
              <li key={index} className="mb-3">
                {service.service}
              </li>
            ))}
          </ul>
          <BaseButton as="link" extraClass="max-w-max" link="/tradeperson/signup">
            SIGN UP AS A TRADE
          </BaseButton>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <FeaturesSection features={FEATURES} />

      {/* POST A JOB SECTION */}
      <PostJobSection />
    </main>
  );
}
