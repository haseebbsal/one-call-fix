"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// import { TRADES } from "@/_utils/enums";
// import { getJobById, resetJob } from "@/lib/features/jobSlice";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import { config } from "@/_utils/helpers/config";
import { toTitleCase } from "@/_utils/helpers";
// import LeadCard from "@/components/common/cards/lead-card";
import { Button } from "@nextui-org/button";
// import Loader from "@/components/common/Loader";
import { TRADES } from "@/_utils/enums";
import { config } from "@/_utils/helpers/config";
import Loader from "@/components/common/Loader";
import LeadCard from "@/components/common/cards/lead-card";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import BaseButton from "@/components/common/button/base-button";
import toast from "react-hot-toast";
import BaseModal from "@/components/common/modal/base-modal";
import { useDisclosure } from "@nextui-org/modal";

export default function Jobs(datas:any) {
  // const queryParams = useParams();
  // const [jobId, setJobId] = useState(queryParams.jobId as String);
  // const dispatch = useAppDispatch();
  // const { job, loading, error }: any = useAppSelector((state) => state.job);
  const {isOpen,onOpen,onClose}=useDisclosure()
  const router=useRouter()
  const queryCient=useQueryClient()
  const getMoreLeadsMutation=useMutation(()=>axiosInstance.put(`/job/request-quote?jobId=${datas.params.jobId}`),{
    onSuccess(data) {
      console.log('more leads',data.data)
    },
    onError(error:any) {
      if (Array.isArray(error.response.data.message)) {
        toast.error(error.response.data.message[0]);
    } else {
        toast.error(error.response.data.message);
    }
    },
  })
  const [jobId, setJobId] = useState(datas.params.jobId as String);
  const individualJob=useQuery(['individualJob',datas.params.jobId],({queryKey})=>axiosInstance.get(`/job?jobId=${queryKey[1]}`))
  const bidsQuery=useQuery(['bids',datas.params.jobId],({queryKey})=>axiosInstance.get(`/bid/all?page=1&limit=10&jobId=${queryKey[1]}`))
  const deleteJob=useMutation(()=>axiosInstance.delete(`/job?jobId=${datas.params.jobId}`),{
    onSuccess(data, variables, context) {
      console.log('deleted',data.data)
      onClose()
      queryCient.invalidateQueries('homeOwnerJobs')
      router.replace('/homeowner/jobs')
    },
  })
  // useEffect(() => {
  //   if (!job && jobId) {
  //     dispatch(getJobById(jobId));
  //   }
  //   return () => {
  //     dispatch(resetJob());
  //   };
  // }, [job]);

  return (
    <section className="mt-20 mx-auto mb-16 w-3/4 sm:w-2/3">
      <h5 className="capitalize text-lg lg:text-xl font-semibold text-color-17 pb-6">
        Job Details
      </h5>
      {individualJob.isLoading ? (
        <div className="flex justify-center w-full h-full">
          <Loader />
        </div>
      ) : (
        <div className="py-4 px-8 lg:px-16 border border-solid rounded-md border-color-8">
          <h5 className="capitalize text-lg lg:text-xl font-semibold text-color-17 pb-5">
            Job Responses: {toTitleCase(individualJob.data?.data?.data?.headline)}
          </h5>
          <div className="pb-2 mb-2">
            <h5 className="capitalize text-lg lg:text-xl font-semibold text-color-17 pb-5">
              Job Details
            </h5>
            <div className="flex flex-col gap-2.5 w-1/2">
              <div className="flex">
                <h6 className="flex-1 text-color-6 text-[16px] font-[300]">
                  Job ID:
                </h6>
                <p className="flex-1 text-color-6 text-[15px] font-semibold">
                  {individualJob.data?.data?.data._id}
                </p>
              </div>
              <div className="flex">
                <h6 className="flex-1 text-color-6 text-[16px] font-[300]">
                  Job Type:
                </h6>
                <p className="flex-1 text-color-6 text-[15px] font-semibold">
                  {TRADES[individualJob.data?.data?.data.chat.trade]}
                </p>
              </div>
              <div className="flex">
                <h6 className="flex-1 text-color-6 text-[16px] font-[300]">
                  Trade People Applied:
                </h6>
                <p className="flex-1 text-color-6 text-[15px] font-semibold">
                  {individualJob.data?.data?.data.bidCount}
                </p>
              </div>
            </div>
          </div>
          <div>
            <ul className="px-7">
              {individualJob.data?.data?.data.chat.questionAnswers?.map((chat: any, index: any) => (
                <li
                  key={index}
                  className="list-disc text-color-6 font-[300] text-[16px]"
                >
                  {`${chat.question} \n` + `${chat.options[chat.answerIndex]}`}
                </li>
              ))}
            </ul>
            <p className="text-color-6 font-[300] text-[15px]">
              {individualJob.data?.data?.data.chat.issue}
            </p>
          </div>
          <div className="mb-2">
            <h6 className="text-black py-2.5 font-[500] text-[18px]">
              Job Location
            </h6>
            <p className="text-[15px] font-[300] text-color-6 flex items-center">
              <Image
                src={"/icons/location.png"}
                alt={"Location"}
                width={10}
                height={11}
                className="mr-2"
              />
              {individualJob.data?.data?.data.address.postalCode}
            </p>
          </div>
          <div className="pb-9 mb-5 border-t border-t-[204,196,184,0.5)]">
            <h6 className="text-black py-2.5 font-[700] text-[18px]">
              Attachments
            </h6>
            <div className="flex justify-between flex-wrap gap-2 items-center">
              <div className="flex items-center gap-2.5">
                {individualJob.data?.data?.data.media.map((item: any, index: any) =>
                  item.isVideo ? (
                    <video
                      key={index}
                      src={`${config.mediaURL}/${item.name}`}
                      height={120}
                      width={150}
                      controls
                    />
                  ) : (
                    <Image
                      key={index}
                      src={`${config.mediaURL}/${item.name}`}
                      alt="Attachments"
                      width={200}
                      height={170}
                      className=""
                    />
                  ),
                )}
              </div>
              <BaseButton onClick={()=>{
                getMoreLeadsMutation.mutate()
              }} extraClass="!underline !m-auto bg-transparent !text-color-9 !mr-4 !text-medium">
                Need More Leads
              </BaseButton>
            </div>
          </div>
          <h6 className="text-black py-2.5 font-[700] text-[18px]">
            Trade People Who Applied For this Job
          </h6>
          <div className="flex gap-2">
            {bidsQuery.data?.data.data.map((e:any)=><LeadCard bidId={e._id} jobId={datas.params.jobId} id={e.user._id} imageSrc={e.user.profilePicture} name={`${e.user.firstName} ${e.user.lastName}`}/>)}
            {/* <LeadCard /> */}
            {/* <LeadCard /> */}
            {/* <LeadCard /> */}
          </div>
          <div className="flex gap-4 mt-12">
            <BaseButton
            as={'link'}
            link={`/homeowner/job/edit?id=${datas.params.jobId}`}
            extraClass="!min-w-[12rem]"
              // variant="solid"
              // radius="full"
              // className="border bg-[#3571EC] text-white text-lg w-fit px-16 py-6"
            >
              Edit Job Post
            </BaseButton>
            <BaseButton
              variant="bordered"
              // radius="full"
              isLoading={deleteJob.isLoading}
              disabled={deleteJob.isLoading}
              onClick={()=>{
                onOpen()
              }}
              extraClass="border border-color-6 text-color-6 text-lg w-fit !min-w-[12rem] bg-transparent"
            >
              Delete Job Post
            </BaseButton>
          </div>

          <BaseModal header="Delete Job Confirmation" isOpen={isOpen} onClose={onClose}>
          <div className="flex flex-col gap-4 items-center">
            <p className="text-center">Are you sure you want to delete this job?</p>
            <div className="flex gap-4">
            <BaseButton type="button" onClick={()=>{
                deleteJob.mutate()
              }}>Yes</BaseButton>
            <BaseButton type="button" onClick={()=>onClose()}>No</BaseButton>
            </div>
          </div>
          </BaseModal>
        </div>
      )}
    </section>
  );
}

