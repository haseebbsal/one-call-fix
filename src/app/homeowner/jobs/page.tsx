"use client";

import { Tab, Tabs } from "@nextui-org/tabs";
import Link from "next/link";
import React, { Key, useEffect, useState } from "react";
import JobCard from "@/components/common/cards/job-card";
// import { getAllHomeOwnerJobs } from "@/lib/features/jobSlice";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ReactStars from 'react-stars'
import { HomeOwnerJobTypes } from "@/_utils/enums";
import Loader from "@/components/common/Loader";
import { useMutation, useQuery } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import CompletedJobCard from "@/components/common/cards/completed-job-card";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal";
import BaseButton from "@/components/common/button/base-button";
import Image from "next/image";
import { FieldValues, useForm } from "react-hook-form";
import BaseTextArea from "@/components/common/form/base-textarea";
import toast from "react-hot-toast";

export default function Jobs() {
  // const dispatch = useAppDispatch();
  // const { allJobs, loading, error }: any = useAppSelector((state) => state.job);
  const [rating,setRating]=useState<number>(0)
  const {isOpen: isOpen1, onOpen: onOpen1, onOpenChange: onOpenChange1, onClose: onClose1} = useDisclosure();
  const { control, handleSubmit, watch } = useForm<any>();
  const [type,setType]=useState(HomeOwnerJobTypes.CURRENT)
  const [reviewData,setReviewData]=useState({
    tradesPerson:"",
    job:""
  })
  const jobsQuery=useQuery(['homeOwnerJobs',type],({queryKey})=>axiosInstance.get(`/job/homeowner?page=1&limit=20&type=${queryKey[1]}`))
  const reviewPost=useMutation((data:any)=>axiosInstance.post('/review',data),{
    onSuccess(data) {
      onClose1()
      setRating(0)
    },
    onError(error:any) {
      if (Array.isArray(error.response.data.message)) {
        toast.error(error.response.data.message[0]);
    } else {
        toast.error(error.response.data.message);
    }
    },
  })
  // const handleJobs = (type: HomeOwnerJobTypes) => {
  //   const pag: any = { page: 1, limit: 20, type };
  //   dispatch(getAllHomeOwnerJobs(pag));
  // };

  // useEffect(() => {
  //   if (!allJobs?.length) {
  //     // handleJobs(HomeOwnerJobTypes.CURRENT);
  //   }
  // }, []);

  function onSubmit(e:FieldValues){
    if(!rating){
      toast('Select Rating Review')
      return
    }
    const payload={
      ...e,
      ...reviewData,
      rating
    }
    reviewPost.mutate(payload)
    console.log('submit',e)
  }
  return (
    <>
    <section className="mt-20 mb-16 sm:px-16 p-4  flex flex-col gap-5">
      <div>
        <h5 className="capitalize text-lg lg:text-xl font-semibold text-color-17 pb-10">
          list of jobs
        </h5>
        <>
          <Tabs
            variant={"underlined"}
            aria-label="Tabs variants"
            fullWidth
            classNames={{
              tabList: "border-b border-b-[#D1D1D1] !pb-0 w-full",
              tab: `pb-[15px] w-fit text-lg`,
              tabContent:
                "group-data-[selected=true]:text-color-9 text-color-20",
              cursor:
                "bg-[#D1D1D1] group-data-[selected=true]:bg-color-9 h-[1px]",
            }}
            onSelectionChange={(key: Key) => {
              const index = key as unknown as HomeOwnerJobTypes;
              // console.log('index',index)
              setType(index)
              // handleJobs(index);
            }}
          >
            <Tab key={HomeOwnerJobTypes.CURRENT} title="Current Jobs">
              {jobsQuery.isLoading ? (
                <Loader />
              ) : (
                <div className="flex flex-col gap-5">
                  {jobsQuery.data?.data?.data.map((el: any) => (
                    <Link
                      href={`/homeowner/job/${el._id}`}
                      className="pb-6"
                      key={el._id}
                    >
                      <JobCard job={el} />
                    </Link>
                  ))}
                </div>
              )}
              {!jobsQuery.isLoading && jobsQuery.data?.data && !jobsQuery.data?.data.data?.length ? (
                <p className="text-lg font-bold text-center">
                  No Job Avaliable
                </p>
              ) : (
                ""
              )}
            </Tab>
            <Tab key={HomeOwnerJobTypes.COMPLETED} title="Completed Jobs">
              {jobsQuery.isLoading ? (
                <Loader />
              ) : (
                <div className="flex flex-col gap-5">
                  {jobsQuery.data?.data?.data.map((el: any) => (
                    // <Link
                    //   href={`/homeowner/job/${el._id}`}
                    //   className="pb-6 border-b border-b-color-19"
                    //   key={el._id}
                    // >
                      <CompletedJobCard setReviewData={setReviewData} openModal={onOpen1} job={el} />
                    // </Link>
                  ))}
                </div>
              )}
              {!jobsQuery.isLoading && jobsQuery.data?.data && !jobsQuery.data?.data.data?.length ? (
                <p className="text-lg font-bold text-center">
                  No Job Avaliable
                </p>
              ) : (
                ""
              )}
            </Tab>
          </Tabs>
        </>
      </div>
    </section>
    <Modal
                size={"xl"}
                isOpen={isOpen1}
                backdrop="blur"
                onOpenChange={onOpenChange1}
                placement="center"
                onClose={() => {
                    // navigate.push('/admin/manage-hunts');
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            {/* <ModalHeader className="flex flex-col text-xl gap-1">All Documents</ModalHeader> */}
                            <ModalBody className="flex flex-col items-center gap-4 pb-8">
                                <div className="flex flex-col items-center gap-2 w-1/2">
                                  <div className="w-full h-[10rem]">
                                    <Image className="w-full h-full object-contain" src={'/images/review.svg'} width={150} height={150} alt="review"/>
                                  </div>
                                  <p className="font-bold text-lg">Leave A Review</p>
                                  <ReactStars
                        value={rating}
                        // edit={false}
                        count={5}
                        onChange={(e)=>{
                          setRating(e)
                        }}
                        size={35}
                        color2={'#ffd700'} />
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                                  <BaseTextArea extraClass={{
                                    label:"!font-bold text-lg"
                                  }} name="description" label="Review" rules={{required:"Enter Review"}} control={control}/>
                                  <BaseButton type="submit">Submit Review</BaseButton>
                                </form>
                                  
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
    </>
    
  );
}
