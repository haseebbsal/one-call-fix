"use client";

import { useForm } from "react-hook-form";

import CustomButton from "@/components/common/button/custom-button";
import TradepersonCustomInput from "@/components/common/form/tradeperson-custom-input";
import InputWrapper from "@/components/modules/dashboard/input-wrapper";
import LayoutWrapper from "@/components/modules/dashboard/layout-wrapper";
import ProfileCompletion from "@/components/modules/tradeperson/profile-completion";

export default function AccountDetails() {
  const { control } = useForm();
  return (
    <>
      <LayoutWrapper
        sectionOneTitle="Account Details"
        sectionOneChildren={
          <>
            <div>
              <InputWrapper
                className="mb-8"
                title="Business Name"
                description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <TradepersonCustomInput
                  name="businessName"
                  type="text"
                  control={control}
                  variant="bordered"
                  placeholder="Your Business Type"
                  radius="full"
                  size="lg"
                  extraClass="max-w-xl"
                />
              </InputWrapper>

              <InputWrapper
                className="mb-8"
                title="Account Email"
                description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <TradepersonCustomInput
                  name="accountEmail"
                  type="text"
                  control={control}
                  variant="bordered"
                  placeholder="mail@example.com"
                  radius="full"
                  size="lg"
                  extraClass="max-w-xl"
                />
              </InputWrapper>

              <InputWrapper
                className="mb-8"
                title="Account Name"
                description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <TradepersonCustomInput
                  name="accountName"
                  type="text"
                  control={control}
                  variant="bordered"
                  placeholder="Full Name"
                  radius="full"
                  size="lg"
                  extraClass="max-w-xl"
                />
              </InputWrapper>

              <InputWrapper
                className="mb-8"
                title="Phone Number"
                description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <TradepersonCustomInput
                  name="phoneNumber"
                  type="text"
                  control={control}
                  variant="bordered"
                  placeholder="075 0123 458"
                  radius="full"
                  size="lg"
                  extraClass="max-w-xl"
                />
              </InputWrapper>

              <InputWrapper
                className="mb-8"
                title="Business Address"
                description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <TradepersonCustomInput
                  name="businessAddress"
                  type="text"
                  control={control}
                  variant="bordered"
                  placeholder="Type address here"
                  radius="full"
                  size="lg"
                  extraClass="max-w-xl"
                />
              </InputWrapper>

              <InputWrapper
                className="mb-8"
                title="Password"
                description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <TradepersonCustomInput
                  name="password"
                  type="password"
                  control={control}
                  variant="bordered"
                  placeholder="*************"
                  radius="full"
                  size="lg"
                  extraClass="max-w-xl"
                />
              </InputWrapper>

              <div className="flex flex-wrap gap-6 ml-5">
                <CustomButton extraClass="bg-color-12 text-white">
                  Save Changes
                </CustomButton>
                <CustomButton extraClass="bg-white text-white border-2 px-10 border-color-12 text-color-12 font-bold">
                  Cancel
                </CustomButton>
              </div>
            </div>
          </>
        }
        sectionTwoTitle="Profile"
        sectionTwoChildren={<ProfileCompletion />}
      ></LayoutWrapper>
    </>
  );
}
