import { Image } from "@nextui-org/image";
import React from "react";

import CustomButton from "@/components/common/button/custom-button";
import { config } from "@/_utils/helpers/config";
import BaseButton from "@/components/common/button/base-button";
import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import { useDisclosure } from "@nextui-org/modal";
import BaseModal from "@/components/common/modal/base-modal";
import { toTitleCase } from "@/_utils/helpers";
import { Input } from "@nextui-org/input";
import { FieldValues, useController, useForm } from "react-hook-form";
import { CalendarDate, DateInput } from "@nextui-org/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Job {
  title: string;
  description: string;
  price: number;
  contactName: string;
  phoneNumber: string;
  email: string;
  details: string[];
  attachments: string[];
  location: string;
  reviewLink?: string;
}

type JobType = "pending" | "shortlisted" | "myJobs";

interface JobDetailsProps {
  jobType: JobType;
  job: Job;
  actualJob:any
}


enum Status{
  Pending=1,
  Approved,
  Declined
}

enum Sstatus{
  Pending='2',
}

type Accept={
  status:Status
}
type Acceptt={
  status:Sstatus
}

// const obj:Acceptt={status:'2'}


export default function JobDetailsSection({ jobType, job ,actualJob}: JobDetailsProps) {
  console.log('job data',actualJob)

  const queryClient=useQueryClient()

  const {isOpen,onOpen,onClose}=useDisclosure()

  const router=useRouter()

  const acceptJobMutation=useMutation((data:Accept)=>axiosInstance.put(`/bid/status?bidId=${actualJob.bidId}`,data),{
    onSuccess(data) {
      console.log('accepted',data.data)
      queryClient.invalidateQueries('allJobs')
    },
  })

  const declineJobMutation=useMutation((data:Accept)=>axiosInstance.put(`/bid/status?bidId=${actualJob.bidId}`,data),{
    onSuccess(data) {
      console.log('declined',data.data)
      queryClient.invalidateQueries('allJobs')

    },
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control
  } = useForm({
    defaultValues:{
      completionDate:"",
      finalQuote:"",
      tip:""

    }
  });
  // const markJobMutation=useMutation((data:any)=>ax)
  const renderJobDetails = () => {
    switch (jobType) {
      case "pending":
        return (
          <>
            <h3 className="font-semibold text-color-15">£{actualJob.price}</h3>
            <span className="text-xs text-color-14">Lead Price</span>
          </>
        );
      case "shortlisted":
        return (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold text-color-15">£{actualJob.price}</h3>
              <span className="text-xs text-color-14">Lead Price</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <BaseButton isLoading={acceptJobMutation.isLoading} disabled={acceptJobMutation.isLoading} onClick={()=>{
                router.push(`/tradeperson/payment?id=${actualJob?._id}&bidId=${actualJob?.bidId}`)
                // acceptJobMutation.mutate({status:2})
              }} extraClass="bg-color-12 text-white w-max px-2 sm:px-7">
                Accept Job
              </BaseButton>
              <BaseButton isLoading={declineJobMutation.isLoading} disabled={declineJobMutation.isLoading} onClick={()=>{
                declineJobMutation.mutate({status:3})
              }} extraClass="bg-color-21 text-white w-max px-2 sm:px-7">
                Decline
              </BaseButton>
            </div>
          </div>
        );
      case "myJobs":
        return (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold text-color-15">£{actualJob.price}</h3>
              <span className="text-xs text-color-14">Lead Price</span>
            </div>
            <div className="flex flex-wrap flex-col justify-center items-center">
              <BaseButton onClick={()=>onOpen()} extraClass="!px-4 !text-sm !max-w-full">Mark This Job As Completed</BaseButton>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // const {field,fieldState}=useController({
  //   control,name:"completionDate",rules:{
  //     required:true
  //   }
  // })

  // console.log('errors',errors)
  const markCompletedMutation=useMutation((data:any)=>axiosInstance.post(`/job/completion?jobId=${actualJob._id}`,data),{
    onSuccess(data, variables, context) {
      console.log('mark completed ',data.data)
      onClose()
    },
    onError(error:any) {
      if (Array.isArray(error.response.data.message)) {
        toast.error(error.response.data.message[0]);
    } else {
        toast.error(error.response.data.message);
    }
    },
  })
  
  const submit=(data:FieldValues)=>{
    console.log('penisss')
    markCompletedMutation.mutate({
      "finalQuote": Number(data.finalQuote),
      "tip": Number(data.tip),
      "completionDate": data.completionDate
  })
  }

  console.log('fucker see this',actualJob)

  return (
    <div className="sm:min-w-[30rem] w-full flex-1 flex flex-col">
      <h2 className="text-xl font-semibold mb-4 text-color-17">Job Detail</h2>
      <section className="flex-1 bg-white border border-gray-200 rounded-lg dark:bg-color-16">
        <div className="flex flex-col w-full">
          <div className="p-5 sm:p-8 border-b border-color-19">
            <div className="mb-1 flex flex-col sm:flex-row justify-between">
              <h3 className="font-semibold">{actualJob.headline}</h3>
            </div>
            <span className="text-xs sm:text-sm text-color-14">
              {actualJob.issue}
            </span>
          </div>

          <div className="py-2 px-5 sm:py-4 sm:px-8 border-b border-color-19">
            {renderJobDetails()}
          </div>

          
        {jobType!='pending' && <div className="py-2 px-5 sm:py-4 sm:px-8 border-b border-color-19 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-14">
          {jobType=='myJobs' && <div className="flex flex-col justify-between text-gray-600">
              <span className="text-sm text-color-14 mb-3">
                Contact Details
              </span>

              <span className="text-xs text-color-14">Name:</span>
              <h3 className="font-semibold text-md mb-2">{actualJob.user.firstName} {actualJob.user.lastName}</h3>

              <span className="text-xs text-color-14">Phone Number:</span>
              <h3 className="font-semibold text-md mb-2">{actualJob.user.phone}</h3>

              <span className="text-xs text-color-14">Email:</span>
              <h3 className="font-semibold text-md mb-2">{actualJob.user.email}</h3>
            </div>}
            

            {jobType=='shortlisted' && <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <img src="/icons/warning.png" alt="warning" className="w-5 h-5" />
              <span className="text-xs font-medium text-center sm:text-left">
                Purchase Job to Reveal Contact Info.
              </span>
            </div>}
            
          </div>}
          

          <div className="py-2 px-5 sm:py-4 sm:px-8">
            <div className="flex flex-col justify-between text-gray-600">
              {/* <span className="text-sm text-color-14 mb-3">About the job</span>
              <ul className="list-disc text-color-6 px-6">
                {actualJob?.details?.map((detail:any, index:number) => (
                  <li className="mb-3" key={index}>
                    {detail}
                  </li>
                ))}
              </ul> */}

              <span className="text-sm text-color-14 mb-3">Attachments</span>
              <div className="flex items-center gap-2 mb-5">
                {actualJob.media.map((attachment:any, index:any) => (
                  <Image
                    src={`${config.mediaURL}/${attachment}`}
                    alt={`attachment-${index + 1}`}
                    radius="none"
                    className="w-14 h-16 object-contain"
                    key={index}
                  />
                ))}
              </div>

              <span className="text-sm text-color-14 mb-2">Job Location</span>
              <div className="flex items-center gap-2">
                <Image
                  src="/icons/location.png"
                  alt="location"
                  className="w-3 h-3"
                />
                <span className="text-md">{actualJob.address.city} {actualJob.address.country}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BaseModal onClose={onClose} header="Job Completion Form" isOpen={isOpen}>
      <div>
      <React.Fragment>
              
              {/* job div */}
              <div
                className={`mb-8 last:mb-0 flex  flex-col sm:flex-row items-start border-b border-color-19`}
                
              >
                <Image
                  className="mr-4 h-8 w-8 sm:h-16 sm:w-16"
                  src="/images/job-bell.png"
                  alt="bellProfile Picture"
                />
                <div className="flex flex-col w-full">
                  <div className="mb-1 flex flex-col sm:flex-row justify-between text-gray-600">
                    <div className="flex flex-col gap-1">
                      <h3 className="font-medium">{toTitleCase(actualJob.headline)}</h3>
                      <span className="text-xs sm:text-sm text-color-14">
                        {Number(actualJob.distance).toFixed(2)} miles away
                      </span>
                    </div>
                   
                    
                  </div>
                  <p className="mt-1 text-sm">{actualJob.issue}</p>
                  <div className="mt-1 mb-5 flex items-center justify-between text-gray-600">
                    <span className="text-xs sm:text-sm text-color-14">
                      Posted {((new Date().getMonth()-new Date(actualJob.createdAt).getMonth())*30 + (new Date().getDate()-new Date(actualJob.createdAt).getDate()))} days ago
                      {/* {item.posted} */}
                    </span>
                    <div className="py-1 px-9 border-2 rounded-lg text-sm font-semibold text-color-15">
                      £{actualJob.price}
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit(submit)} className="flex gap-4 flex-wrap">
              <div>
            <label
              htmlFor="input1"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Final Quote
            </label>
            <Input
              type="number"
              id="input1"
              placeholder="£53"
              isRequired
              {...register("finalQuote", { required: true })}
            />
          </div>
          <div>
            <label
              htmlFor="input2"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              How Much Tip (Optional)
            </label>
            <Input
              type="number"
              id="input2"
              placeholder="£53"
              isRequired
              {...register("tip", { required: true })}
            />
          </div>
          
          {/* <DateInput {...field} onChange={()=>{}} label={"Job Completion Date"} labelPlacement="outside" classNames={{label:"text-gray-700 text-sm font-bold"}} className="max-w-sm" /> */}
            <BaseButton type="submit">Submit Form</BaseButton>
              </form>
            </React.Fragment>
      </div>
      </BaseModal>
    </div>
  );
}
