"use client";

import { Image } from "@nextui-org/image";
import { useDisclosure } from "@nextui-org/modal";
import React from "react";

import BaseButton from "@/components/common/button/base-button";
import BaseModal from "@/components/common/modal/base-modal";
import LayoutWrapper from "@/components/modules/dashboard/layout-wrapper";

export default function VerificationDocument() {
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
            Verification has been accepted.
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
        sectionOneTitle="Verifications Requests"
        sectionOneChildren={
          <div>
            <h2 className="text-lg font-medium mb-6 text-color-17">
              Verification Details
            </h2>
            <div className="flex flex-col gap-5">
              <h3 className="text-color-23 text-lg font-medium pb-10">
                Applied For Electrician
              </h3>
              <div className="mb-8">
                <h5 className="text-color-20 text-base font-medium pb-2">
                  ID (Passport, Driving License)
                </h5>
                <p className="text-color-13 text-xl">PHRT92793048028203K9</p>
              </div>
              <div className="mb-8">
                <h5 className="text-color-20 text-base font-medium pb-2">
                  Part P Qualification
                </h5>
                <p className="text-color-13 text-xl">Qualification</p>
              </div>
              <div className="mb-8">
                <h5 className="text-color-20 text-base font-medium pb-2">
                  17th or 18th Edition Wiring Regulations (BS 7671) Certificate
                </h5>
                <button type="button">
                  <Image
                    src="/images/certificate.png"
                    alt="Qualification"
                    width={144}
                    height={144}
                    className="object-contain"
                  />
                </button>
              </div>
              <div>
                <h5 className="text-color-20 text-base font-medium pb-2">
                  EICR Documentation (e.g: city , guilts 2391-52)
                </h5>
                <button type="button">
                  <Image
                    src="/images/file.png"
                    alt="File"
                    width={144}
                    height={144}
                    className="object-contain"
                  />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2.5 flex-col lg:flex-row mt-10">
              <BaseButton
                type="button"
                onClick={() => onOpen()}
                extraClass="max-w-[190px] bg-color-9 "
              >
                Accept
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
        }
      />
    </>
  );
}
