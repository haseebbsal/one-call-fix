import BaseButton from "@/components/common/button/base-button";

export default function PostJobSection() {
  return (
    <section className="w-full py-4 sm:gap-16 flex flex-col md:flex-row justify-center items-center bg-color-4 text-white  ">
      <div className="w-full sm:w-1/4 mb-4 md:mb-0 text-center md:text-left">
        <p className="font-bold text-xs sm:text-sm lg:text-xl">
          What Trade Are You Looking For?
        </p>
      </div>
      <div className="w-full  md:w-auto  flex justify-center md:justify-end">
        <BaseButton  as="link" link="/homeowner/post-a-job">
          POST A JOB
        </BaseButton>
      </div>
    </section>
  );
}
