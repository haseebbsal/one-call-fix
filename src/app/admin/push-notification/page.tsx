"use client";

import { useDisclosure } from "@nextui-org/modal";
import React from "react";
import { useForm } from "react-hook-form";

import { DASHBOARD_INPUT_EXTRA_CLASS } from "@/_utils/constant";
import BaseButton from "@/components/common/button/base-button";
import BaseFileUpload from "@/components/common/file-upload/base-file-upload";
import BaseInput from "@/components/common/form/base-input";
import BaseTextArea from "@/components/common/form/base-textarea";
import BaseModal from "@/components/common/modal/base-modal";
import InputWrapper from "@/components/modules/dashboard/input-wrapper";
import LayoutWrapper from "@/components/modules/dashboard/layout-wrapper";

export default function PushNotification() {
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
            Notification Pushed Successfully
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
        sectionOneTitle="Dispute Management"
        sectionOneChildren={
          <form>
            <h2 className="text-lg font-medium mb-6 text-color-17">
              Set Up Push Notification
            </h2>
            <InputWrapper
              className="mb-8"
              title="Title"
              description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
            >
              <BaseInput
                name="title"
                type="text"
                control={control}
                placeholder="Enter Title"
                extraClass={DASHBOARD_INPUT_EXTRA_CLASS}
              />
            </InputWrapper>

            <InputWrapper
              className="mb-8"
              title="Description"
              description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
            >
              <BaseTextArea
                name="description"
                rows={4}
                control={control}
                placeholder="Write Description...."
                extraClass={DASHBOARD_INPUT_EXTRA_CLASS}
              />
            </InputWrapper>

            <InputWrapper
              className="mb-8"
              title="Upload Necessary Media"
              description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
            >
              <BaseFileUpload labelClass="h-20" />
            </InputWrapper>

            <BaseButton
              type="button"
              onClick={() => onOpen()}
              extraClass="bg-color-9 !max-w-[350px] w-full text-white"
            >
              Push
            </BaseButton>
          </form>
        }
      />
    </>
  );
}
