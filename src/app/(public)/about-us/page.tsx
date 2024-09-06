import {
  FEATURES,
  HOMEOWNER_SERVICE,
  TRADESPEOPLE_SERVICE,
} from "@/_utils/constant";
import HorizontalLine from "@/components/common/horizontal-line/horizontal-line";
import FeaturesSection from "@/components/modules/public/features-section";
import PostJobSection from "@/components/modules/public/post-job-section";

export default function AboutUs() {
  return (
    <main>
      <section className="bg-[url('/shapes/ellipse-bg.png')]">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">ABOUT US</h1>

            <p className="mt-4 sm:text-xl/relaxed text-color-6">
              Finding a reliable tradesperson is not always the easiest of
              tasks. From constant phone calls, constant home visits, constant
              vetting, the list goes on!
            </p>
          </div>
        </div>
      </section>

      <HorizontalLine />

      <section className="mx-auto max-w-screen-xl px-4 pt-32 pb-16 lg:flex">
        <div className="w-1/2 mx-auto max-w-xl">
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-6">
            Our Mission
          </h1>
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
          <p className="mb-12 lg:mb-0 text-color-6">
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
        <div className="w-1/2 mx-auto max-w-xl mt-auto">
          <img src="/images/about-us-video-image.png" alt="video-image" />
        </div>
      </section>

      <section className="mx-auto max-w-screen-xl px-4 mb-36">
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
          <button className="rounded-3xl bg-color-5 px-8 py-2 text-sm font-medium text-white focus:outline-none h-12 mt-6">
            POST A JOB
          </button>
        </div>

        <div>
          <h2 className="text-3xl font-extrabold sm:text-5xl mb-7">
            Why use our service as a tradespeople?
          </h2>
          <ul className="list-disc list-inside text-color-6">
            {TRADESPEOPLE_SERVICE.map((service, index) => (
              <li key={index} className="mb-3">
                {service.service}
              </li>
            ))}
          </ul>
          <button className="rounded-3xl bg-color-5 px-8 py-2 text-sm font-medium text-white focus:outline-none h-12 mt-6">
            SIGN UP AS A TRADE
          </button>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <FeaturesSection features={FEATURES} />

      {/* POST A JOB SECTION */}
      <PostJobSection />
    </main>
  );
}
