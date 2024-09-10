"use client";

import { useForm } from "react-hook-form";

import CustomButton from "@/components/common/button/custom-button";
import BaseFileUpload from "@/components/common/file-upload/base-file-upload";
import TradepersonCustomInput from "@/components/common/form/tradeperson-custom-input";
import InputWrapper from "@/components/modules/dashboard/input-wrapper";
import LayoutWrapper from "@/components/modules/dashboard/layout-wrapper";
import ProfileCompletion from "@/components/modules/tradeperson/profile-completion";

export default function RequiredDocuments() {
  const { control } = useForm();
  return (
    <>
      <LayoutWrapper
        sectionOneTitle="Required Documents"
        sectionOneHeading="Electrician"
        sectionOneChildren={
          <>
            <div>
              <InputWrapper
                className="mb-8"
                title="ID (Passport, Driving License)"
                description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <TradepersonCustomInput
                  name="id"
                  type="text"
                  control={control}
                  variant="bordered"
                  placeholder="Ex. P4366918 / KJ1220190000001"
                  radius="full"
                  size="lg"
                  extraClass="max-w-xl"
                />
              </InputWrapper>

              <InputWrapper
                className="mb-8"
                title="Part P Qualification"
                description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <TradepersonCustomInput
                  name="partPQualification"
                  type="text"
                  control={control}
                  variant="bordered"
                  placeholder="Qualification"
                  radius="full"
                  size="lg"
                  extraClass="max-w-xl"
                />
              </InputWrapper>

              <InputWrapper
                className="mb-8"
                title="17th or 18th Edition Wiring Regulations (BS 7671) Certificate"
                description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <BaseFileUpload labelClass="h-20"></BaseFileUpload>
              </InputWrapper>

              <InputWrapper
                className="mb-8"
                title="EICR documentation (e.g. City and Guilts 2391-52)"
                description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <BaseFileUpload labelClass="h-20"></BaseFileUpload>
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
        sectionTwoChildren={
          <>
            <ProfileCompletion />
          </>
        }
      ></LayoutWrapper>
    </>
  );
}
