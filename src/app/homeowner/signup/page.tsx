import HomeOwnerSignUpForm from "@/components/modules/auth/homeowner-signup-form";

export default function HomeOwnerSignUp() {
  return (
    <section className="bg-color-11 p-6 md:p-10 lg:p-28 flex items-center justify-center">
      <div className="pt-4 pb-6 px-5 md:pt-6 md:pb-10 md:px-10 lg:pt-14 lg:pb-32 lg:px-20 border border-[#E1E1E1] bg-white shadow-lg rounded-lg w-full md:max-w-[700px] 2xl:max-w-[800px]">
        <h3 className="text-2xl font-bold sm:text-3xl mb-2 text-color-1">
          SignUp
        </h3>
        <p className="text-color-6 text-base sm:text-xl font-light">
          Access your OneCallFix account.
        </p>
        <HomeOwnerSignUpForm />
      </div>
    </section>
  );
}
