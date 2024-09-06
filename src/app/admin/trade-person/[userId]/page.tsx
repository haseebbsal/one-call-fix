"use client";
import { Image } from "@nextui-org/image";
import { useDisclosure } from "@nextui-org/modal";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

import BaseButton from "@/components/common/button/base-button";
import BaseTextArea from "@/components/common/form/base-textarea";
import BaseModal from "@/components/common/modal/base-modal";
import LayoutWrapper from "@/components/modules/dashboard/layout-wrapper";

export default function TradePerson() {
  const {
    isOpen: isWarningOpen,
    onOpenChange: onWarningOpenChange,
    onOpen: onWarningOpen,
    onClose: onWarningClose,
  } = useDisclosure();
  const {
    isOpen: isSuspendOpen,
    onOpenChange: onSuspendOpenChange,
    onOpen: onSuspendOpen,
    onClose: onSuspendClose,
  } = useDisclosure();
  const { control } = useForm();
  return (
    <>
      <BaseModal
        isOpen={isSuspendOpen}
        onOpenChange={onSuspendOpenChange}
        size="md"
        header="System Generated Request"
        modalHeaderImage="/images/modal-danger.png"
      >
        <div className="flex flex-col items-center mb-7">
          <h5 className="text-color-20 text-sm lg:text-base pb-4 text-center">
            Are You sure you want to suspend this user?
          </h5>
          <BaseButton
            type="button"
            onClick={() => onSuspendClose()}
            extraClass="bg-color-9 !max-w-[350px] w-full text-white"
          >
            Suspend
          </BaseButton>
        </div>
      </BaseModal>
      <BaseModal
        isOpen={isWarningOpen}
        onOpenChange={onWarningOpenChange}
        size="md"
        header="Warning"
      >
        <form className="flex flex-col items-center mb-7">
          <BaseTextArea
            name={"message"}
            rows={4}
            control={control}
            placeholder="Write Warning to user...."
          />
          <BaseButton
            type="button"
            onClick={() => onWarningClose()}
            extraClass="bg-color-9 !max-w-[350px] w-full text-white mt-4"
          >
            Send
          </BaseButton>
        </form>
      </BaseModal>
      <LayoutWrapper
        sectionOneTitle="Tradespeople Management"
        sectionOneChildren={
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-medium text-color-17">Details</h2>
              <Link href={"/admin/edit-trade-person/abc"}>
                <Image
                  src="/icons/edit.png"
                  alt="Edit"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </Link>
            </div>
            <div className="mb-8">
              <Image
                src="/images/profile-photo.png"
                alt="Profile"
                className="object-contain rounded-full"
                width={104}
                height={104}
              />
            </div>
            <div className="flex flex-col lg:flex-row lg:flex-wrap lg:items-start gap-5">
              <div className="flex-1 flex flex-col gap-1.5">
                <h6 className="text-color-20 text-[15px] font-medium">Name</h6>
                <h5 className="text-color-17 text-lg font-medium">
                  John Marshall
                </h5>
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <h6 className="text-color-20 text-[15px] font-medium">
                  Contact Info
                </h6>
                <h5 className="text-color-17 text-lg font-medium">
                  +123 4567890
                </h5>
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <h6 className="text-color-20 text-[15px] font-medium">Trade</h6>
                <p className="rounded-full text-color-24 bg-color-25 p-3 max-w-[130px] w-full text-center text-sm">
                  Plumber
                </p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:flex-wrap lg:items-start gap-5">
              <div className="flex-1 flex flex-col gap-1.5">
                <h6 className="text-color-20 text-[15px] font-medium">
                  Reviews
                </h6>
                <h5 className="text-color-17 text-lg font-medium">
                  Lorem ipsum dolor sit amet, cons tetuer Lorem ipsum dolor sit
                  amet, cons tetuer Lorem ipsum dolor sit amet, cons tetuerLorem
                  ipsum
                </h5>
              </div>
            </div>
            <div className="flex items-center gap-2.5 flex-col lg:flex-row mt-10">
              <BaseButton
                type="button"
                onClick={() => onSuspendOpen()}
                extraClass="!max-w-[220px] w-full bg-color-9 "
              >
                Suspend/Unsuspend
              </BaseButton>
              <BaseButton
                type="button"
                onClick={() => onWarningOpen()}
                extraClass="!max-w-[220px] w-full text-color-9 border bg-transparent border-color-9 "
              >
                Send Warning/Notification
              </BaseButton>
            </div>
          </div>
        }
        sectionTwoClassname="opacity-0 flex-[2]"
        sectionTwoChildren={<div />}
      />
    </>
  );
}
