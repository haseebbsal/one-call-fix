"use client";

import { Image } from "@nextui-org/image";
import { useDisclosure } from "@nextui-org/modal";
import React from "react";

import BaseButton from "@/components/common/button/base-button";
import BaseModal from "@/components/common/modal/base-modal";
import LayoutWrapper from "@/components/modules/dashboard/layout-wrapper";

export default function RefundJob() {
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
          <h5 className="text-color-20 text-sm lg:text-base pb-4 text-center">
            The job is refunded. Credits will be cuts form tradesperson as their
            refund fee equivalent to Job fee
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
        sectionOneTitle="Refund Requests"
        sectionOneChildren={
          <div>
            <h2 className="text-lg font-medium mb-6 text-color-17">
              Refund Request Details
            </h2>
            <div className="flex flex-col gap-5">
              <div>
                <h3 className="text-base text-black mb-3 font-medium">
                  Job Details
                </h3>
                <div className="flex items-start gap-3 mb-2">
                  <Image
                    src="/images/job-bell.png"
                    alt="bell"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                  <div className="flex flex-col gap-2">
                    <h5 className="text-sm text-color-22 font-medium">
                      Repair and Paint Walls and Ceilings
                    </h5>
                    <p className="text-color-14 text-xs font-[300]">
                      18 mins away from PO167GZ
                    </p>
                    <p className="text-color-6 text-xs font-[300]">
                      Due to water ingress we need the plastering sorted in one
                      or two areas, two walls and two ceilings re painted
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-base text-black mb-3 font-medium">
                  Tradeperson Details
                </h3>
                <div className="flex lg:justify-between lg:items-start gap-10 flex-col lg:flex-row lg:mb-5">
                  <div className="flex flex-1 items-center gap-3">
                    <Image
                      src="/images/profile-photo.png"
                      alt="profile-photo"
                      width={39}
                      height={39}
                      className="rounded-full"
                    />
                    <h2 className="text-base font-medium text-color-6">
                      John Clark
                    </h2>
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <p className="text-base text-color-17 font-medium">
                      Fee Charged
                    </p>
                    <h5 className="text-color-6 text-xl font-medium">
                      $ 156.00
                    </h5>
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <p className="text-base text-color-17 font-medium">
                      Reason For Refund
                    </p>
                    <h5 className="text-color-20 text-[15px] font-medium">
                      Lorem ipsum dolor sit amet, cons tetuer Lorem ipsum. Lorem
                      ipsum dolor sit amet, cons tetuer Lorem ipsum. Lorem ipsum
                      dolor sit
                    </h5>
                  </div>
                </div>
                <div className="flex lg:justify-between lg:items-start gap-10 flex-col lg:flex-row">
                  <div className="flex flex-1 flex-col gap-2">
                    <p className="text-base text-color-17 font-medium">
                      Purchased Lead
                    </p>
                    <h5 className="text-color-6 text-xl font-medium">
                      15-02-2024
                    </h5>
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <p className="text-base text-color-17 font-medium">
                      Requested Refund
                    </p>
                    <h5 className="text-color-6 text-xl font-medium">
                      15-03-2024
                    </h5>
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <p className="text-base text-color-17 font-medium">
                      File Uploaded
                    </p>
                    <button type="button">
                      <Image
                        src="/images/file.png"
                        alt="file.png"
                        width={63}
                        height={63}
                        className="object-contain"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-base text-black mb-3 font-medium">
                  Homeowner Details
                </h3>
                <div className="flex lg:justify-between lg:items-start gap-10 flex-col lg:flex-row lg:mb-5">
                  <div className="flex flex-1 flex-col gap-2">
                    <p className="text-base text-color-17 font-medium">Name</p>
                    <h5 className="text-color-6 text-[15px] font-medium">
                      Alvin Adams
                    </h5>
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <p className="text-base text-color-17 font-medium">
                      Home Owner Email
                    </p>
                    <h5 className="text-color-6 text-[15px] font-medium">
                      johndavid@gmail.com
                    </h5>
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <p className="text-base text-color-17 font-medium">
                      Contact Info
                    </p>
                    <h5 className="text-color-6 text-[15px] font-medium">
                      +123 456789 0
                    </h5>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 flex-col lg:flex-row">
                <BaseButton
                  type="button"
                  onClick={() => onOpen()}
                  extraClass="max-w-[190px] bg-color-9 "
                >
                  Refund
                </BaseButton>
                <BaseButton
                  type="button"
                  onClick={() => onOpen()}
                  extraClass="max-w-[190px] text-color-9 border bg-transparent border-color-9 "
                >
                  Reject
                </BaseButton>
              </div>
            </div>
          </div>
        }
      />
    </>
  );
}
