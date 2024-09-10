"use client";

import { useForm } from "react-hook-form";

import CustomButton from "@/components/common/button/custom-button";
import BaseFileUpload from "@/components/common/file-upload/base-file-upload";
import TradepersonCustomInput from "@/components/common/form/tradeperson-custom-input";
import InputWrapper from "@/components/modules/dashboard/input-wrapper";
import LayoutWrapper from "@/components/modules/dashboard/layout-wrapper";
import ProfileCompletion from "@/components/modules/tradeperson/profile-completion";

export default function AdditionalDocuments() {
  const { control } = useForm();
  return (
    <>
      <LayoutWrapper
        sectionOneTitle="Additional Documents"
        sectionOneHeading="Electrician"
        sectionOneChildren={
          <>
            <div>
              <InputWrapper
                className="mb-8"
                title="Attach Screenshot Proving You Are Part Of The Competent Persons Register"
                description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <BaseFileUpload labelClass="h-20"></BaseFileUpload>
              </InputWrapper>

              <InputWrapper
                className="mb-8"
                title="NVQ Level 3 Qualification"
                description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <TradepersonCustomInput
                  name="nvqQualification"
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
                title="EAL Qualification"
                description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <TradepersonCustomInput
                  name="ealQualification"
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
                title="Public Liability Insurance"
                description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <BaseFileUpload labelClass="h-20"></BaseFileUpload>
              </InputWrapper>

              <InputWrapper
                className="mb-8"
                title="Trustmark"
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
