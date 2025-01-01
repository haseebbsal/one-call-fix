"use client";

import { useDisclosure } from "@nextui-org/modal";
import React from "react";
import { useForm } from "react-hook-form";

import { DASHBOARD_INPUT_EXTRA_CLASS } from "@/_utils/constant";
import { COMPLAINT_STATUS } from "@/_utils/enums";
import BaseButton from "@/components/common/button/base-button";
import ComplaintCard from "@/components/common/cards/complaint-card";
import ReviewCard from "@/components/common/cards/review-card";
import BaseFileUpload from "@/components/common/file-upload/base-file-upload";
import BaseInput from "@/components/common/form/base-input";
import BaseTextArea from "@/components/common/form/base-textarea";
import BaseModal from "@/components/common/modal/base-modal";
import InputWrapper from "@/components/modules/dashboard/input-wrapper";
import LayoutWrapper from "@/components/modules/dashboard/layout-wrapper";

export default function DisputeResolution() {
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
      {/* <div className={"flex items-center w-full justify-end pt-10 px-5"}>
        <BaseButton
          as="link"
          link="/admin/push-notification"
          extraClass="bg-color-9 !max-w-[350px] w-full text-white"
        >
          Set up Push Notification
        </BaseButton>
      </div> */}
      <div className="px-8 mt-8">
      <h2 className="text-xl font-semibold mb-4 text-color-17">
              Dispute Management
            </h2>
            <div className="w-full bg-white rounded-lg p-4">
            <h2 className="text-lg font-medium mb-6 text-color-17">
              Complaints
            </h2>
            <div className="flex flex-col gap-5">
              {[1, 2, 3, 4, 5].map((el, i) => (
                <div className="pb-6 border-b border-b-color-19" key={el}>
                  <ComplaintCard
                    title={`Complain-${el}`}
                    status={
                      i % 2 !== 0
                        ? COMPLAINT_STATUS.OPEN
                        : COMPLAINT_STATUS.RESOLVED
                    }
                    onClick={onOpen}
                    description="Great service competitively priced. Lexus was great and very detail oriented hope that's who they send next time too!"
                  />
                </div>
              ))}
            </div>
            </div>
          </div>
    </>
  );
}
