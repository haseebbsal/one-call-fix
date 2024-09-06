import { Image } from "@nextui-org/image";

type Feature = {
  imgSrc: string;
  heading: string;
  desc: string;
};

type FeaturesProps = {
  features: Feature[];
};

export default function FeaturesSection({ features }: FeaturesProps) {
  return (
    <section>
      <div className="mb-8 sm:mb-14">
        <h2 className="text-2xl font-extrabold text-center sm:text-3xl md:text-4xl">
          We Do The Hard Work For You
        </h2>
      </div>

      <div className="w-full sm:w-5/6 m-auto flex flex-wrap gap-8 sm:gap-10 md:gap-20 justify-center mb-20 sm:mb-32 md:mb-48">
        {features.map((feature, index) => (
          <div
            key={index}
            className="w-full sm:w-64 md:w-80 mb-8 sm:mb-10 md:mb-0"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg m-auto">
              <Image src={feature.imgSrc} alt="feature-image" />
            </div>
            <div className="text-center">
              <h5 className="text-base sm:text-lg text-color-4 font-bold mt-4">
                {feature.heading}
              </h5>
              <p className="text-sm text-color-6 mt-2">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
