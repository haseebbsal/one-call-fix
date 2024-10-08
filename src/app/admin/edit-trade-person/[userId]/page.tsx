"use client";

import { useDisclosure } from "@nextui-org/modal";
import React from "react";
import { useForm } from "react-hook-form";

import { DASHBOARD_INPUT_EXTRA_CLASS } from "@/_utils/constant";
import BaseButton from "@/components/common/button/base-button";
import BaseInput from "@/components/common/form/base-input";
import BaseModal from "@/components/common/modal/base-modal";
import InputWrapper from "@/components/modules/dashboard/input-wrapper";
import LayoutWrapper from "@/components/modules/dashboard/layout-wrapper";

export default function EditTradePerson() {
  const { control } = useForm();
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  return (
    <>
      <BaseModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="md"
        header="System Generated Request"
        modalHeaderImage="/images/modal-success.png"
      >
        <div className="flex flex-col items-center mb-7">
          <h5 className="text-color-20 text-sm lg:text-base pb-4">
            Profile has been updated successfully
          </h5>
          <BaseButton
            type="button"
            onClick={() => onClose()}
            extraClass="bg-color-9 !max-w-[350px] w-full text-white"
          >
            Okay
          </BaseButton>
        </div>
      </BaseModal>
      <LayoutWrapper
        sectionOneTitle="Tradespeople Management"
        sectionOneChildren={
          <form>
            <h2 className="text-lg font-medium mb-6 text-color-17">
              Edit Profile
            </h2>
            <InputWrapper
              className="mb-8"
              title="Name"
              description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
            >
              <BaseInput
                name="name"
                type="text"
                control={control}
                placeholder="Enter Name"
                extraClass={DASHBOARD_INPUT_EXTRA_CLASS}
              />
            </InputWrapper>

            <InputWrapper
              className="mb-8"
              title="Contact Info"
              description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
            >
              <BaseInput
                name="contact"
                type="text"
                control={control}
                placeholder="Enter Contact Info"
                extraClass={DASHBOARD_INPUT_EXTRA_CLASS}
              />
            </InputWrapper>
            <InputWrapper
              className="mb-8"
              title="Trade"
              description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
            >
              <BaseInput
                name="trade"
                type="text"
                control={control}
                placeholder="Enter Trade Info"
                extraClass={DASHBOARD_INPUT_EXTRA_CLASS}
              />
            </InputWrapper>

            <BaseButton
              type="button"
              onClick={() => onOpen()}
              extraClass="bg-color-9 !max-w-[350px] w-full text-white"
            >
              Update Profile
            </BaseButton>
          </form>
        }
      />
    </>
  );
}
