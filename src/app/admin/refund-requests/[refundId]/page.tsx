"use client";

import { Image } from "@nextui-org/image";
import { useDisclosure } from "@nextui-org/modal";
import React from "react";

import BaseButton from "@/components/common/button/base-button";
import BaseModal from "@/components/common/modal/base-modal";
import LayoutWrapper from "@/components/modules/dashboard/layout-wrapper";
import { useMutation, useQuery } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import { config } from "@/_utils/helpers/config";



export default function RefundJob(datas:any) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const { isOpen:isOpen2, onOpenChange:onOpenChange2, onOpen:onOpen2, onClose:onClose2 } = useDisclosure();

  const refundMutation=useMutation((data:any)=>axiosInstance.put(`/refund?refundId=${datas.params.refundId}`,data),{
    onSuccess(data, variables, context) {
      onOpen()
    },
  })
  const getIndividualRefundQuery=useQuery(['individualRefund',datas.params.refundId],({queryKey})=>axiosInstance.get(`/refund?refundId=${queryKey[1]}`))
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
            The job refund request is Refunded. Credits will be cuts form tradesperson as their
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
      <BaseModal
        isOpen={isOpen2}
        onOpenChange={onOpenChange2}
        size="md"
        header="System Generated Request"
        modalHeaderImage="/images/modal-success.png"
      >
        <div className="flex flex-col items-center mb-7">
          <h5 className="text-color-20 text-sm lg:text-base pb-4 text-center">
            The job refund request is Rejected.
          </h5>
          <BaseButton
            type="button"
            onClick={() => onClose2()}
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
                      {getIndividualRefundQuery.data?.data.data.job.headline}
                    </h5>
                    {/* <p className="text-color-14 text-xs font-[300]">
                      18 mins away from PO167GZ
                    </p>
                    <p className="text-color-6 text-xs font-[300]">
                      Due to water ingress we need the plastering sorted in one
                      or two areas, two walls and two ceilings re painted
                    </p> */}
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
                      src={getIndividualRefundQuery.data?.data.data.user.profilePicture.includes('placeholder')?"/images/profile-photo.png":`${config.mediaURL}/${getIndividualRefundQuery.data?.data.data.user.profilePicture}`}
                      alt="profile-photo"
                      width={39}
                      height={39}
                      className="rounded-full"
                    />
                    <h2 className="text-base font-medium text-color-6">
                      {getIndividualRefundQuery.data?.data.data.user.firstName} {getIndividualRefundQuery.data?.data.data.user.lastName}
                    </h2>
                  </div>
                  {/* <div className="flex flex-1 flex-col gap-2">
                    <p className="text-base text-color-17 font-medium">
                      Fee Charged
                    </p>
                    <h5 className="text-color-6 text-xl font-medium">
                      $ 156.00
                    </h5>
                  </div> */}
                  <div className="flex flex-1 flex-col gap-2">
                    <p className="text-base text-color-17 font-medium">
                      Reason For Refund
                    </p>
                    <h5 className="text-color-20 text-[15px] font-medium">
                      {getIndividualRefundQuery.data?.data.data.description}
                    </h5>
                  </div>
                </div>
                <div className="flex lg:justify-between lg:items-start gap-10 flex-col lg:flex-row">
                  {/* <div className="flex flex-1 flex-col gap-2">
                    <p className="text-base text-color-17 font-medium">
                      Purchased Lead
                    </p>
                    <h5 className="text-color-6 text-xl font-medium">
                      15-02-2024
                    </h5>
                  </div> */}
                  <div className="flex flex-1 flex-col gap-2">
                    <p className="text-base text-color-17 font-medium">
                      Requested Refund
                    </p>
                    <h5 className="text-color-6 text-xl font-medium">
                      {new Date(getIndividualRefundQuery.data?.data.data.createdAt).toLocaleDateString()}
                      {/* 15-03-2024 */}
                    </h5>
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <p className="text-base text-color-17 font-medium">
                      File Uploaded
                    </p>
                    <div className="flex gap-4 flex-wrap">
                    {getIndividualRefundQuery.data?.data.data.media.map((e:any)=><a href={`${config.mediaURL}/${e}`} >
                      <Image
                        src="/images/file.png"
                        alt="file.png"
                        width={63}
                        height={63}
                        className="object-contain"
                      />
                    </a>)}

                    </div>
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
                      {getIndividualRefundQuery.data?.data.data.user.firstName} {getIndividualRefundQuery.data?.data.data.user.lastName}
                    </h5>
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <p className="text-base text-color-17 font-medium">
                      Home Owner Email
                    </p>
                    <h5 className="text-color-6 text-[15px] font-medium">
                    {getIndividualRefundQuery.data?.data.data.user.email}
                    </h5>
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <p className="text-base text-color-17 font-medium">
                      Contact Info
                    </p>
                    <h5 className="text-color-6 text-[15px] font-medium">
                    {getIndividualRefundQuery.data?.data.data.user.phone}
                    </h5>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 flex-col lg:flex-row">
                <BaseButton
                  type="button"
                  onClick={() => {
                    refundMutation.mutate({
                      status:2
                    })
                  }}
                  extraClass="max-w-[190px] bg-color-9 "
                >
                  Refund
                </BaseButton>
                <BaseButton
                  type="button"
                  onClick={() => {
                    refundMutation.mutate({
                      status:3
                    })
                  }}
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
