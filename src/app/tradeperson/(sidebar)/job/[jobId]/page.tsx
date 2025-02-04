"use client";

import React, { useEffect, useState } from "react";
// import { getJobById, resetJob } from "@/lib/features/jobSlice";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import { useParams } from "next/navigation";
import { getTimeAgo } from "@/_utils/helpers";
import { useMutation, useQuery } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import { BidFormModel } from "@/components/modules/tradeperson/bid-form-model";
import { SchedulePickerModal } from "@/components/modules/tradeperson/schedule-picker-modal";
import { useDisclosure } from "@nextui-org/modal";
import { QuoteType } from "@/_utils/enums";
import BaseModal from "@/components/common/modal/base-modal";
import BaseButton from "@/components/common/button/base-button";
import Cookies from "js-cookie";
import BaseTextArea from "@/components/common/form/base-textarea";
import { FieldValues, useController, useForm } from "react-hook-form";
import SavedPaymentCard from "@/components/user/layout/SavedPaymentCard";
import { Radio, RadioGroup } from "@nextui-org/radio";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Switch } from "@nextui-org/react";


// options: [
//   "As Soon As Possible",
//   "This Week",
//   "Within Two Weeks",
//   "Within This Month",
//   "Within The Next Two Months",
//   "Flexible",
// ],

const noScheduleOptions=[
  "Within Two Weeks",
  "Within This Month",
  "Within The Next Two Months",
]

const formatTime = (time: string) => {
  const [hour, minute] = time.split(":");
  const hours = parseInt(hour);
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHour = ((hours + 11) % 12) + 1; // Convert to 12-hour format
  return `${String(formattedHour).padStart(2, "0")}:${minute} ${period}`;
};
export default function JobDetailsPage(datas: any) {
  const getUserQuery = useQuery(['individualJob', datas.params.jobId], ({ queryKey }) => axiosInstance.get(`/job?jobId=${queryKey[1]}`),
    {
      onSuccess(data) {
        console.log('dataaaa', data.data.data)
        setShowAvailabilityOnQuote(data.data.data.completion == "As Soon As Possible" || data.data.data.completion == "This Week")
      },
    })
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const [quoteModal, setQuoteModal] = useState(false);
  const [sceduleModal, setSceduleModal] = useState(false);
  const [dataPayment, setDataPayment] = useState<any>(false)
  const [payment, setPayment] = useState(false)
  const [showAvailabilityOnQuote, setShowAvailabilityOnQuote] = useState<boolean>(false)
  const router = useRouter()
  const qouteCecern = (type: any) => {
    onClose();
    if (type == QuoteType.Direct) {
      setQuoteModal(true);
    }
    if (type == QuoteType.HomeVisit) {
      setSceduleModal(true);
    }
  };

  const [user, setUser] = useState<any>(null)

  const { handleSubmit, control } = useForm()

  useEffect(() => {
    const user = JSON.parse(Cookies.get('userData')!)
    // console.log(user)
    setUser(user)
  }, [])


  const paymentMutation = useMutation((data: any) => axiosInstance.post('/bid', data), {
    onSuccess(data, variables, context) {
      console.log('payment done', data.data)
      router.push('/tradeperson/dashboard')
    },
    onError(error: any) {
      if (Array.isArray(error.response.data.message)) {
        toast.error(error.response.data.message[0]);
      } else {
        toast.error(error.response.data.message);
      }
    },
  })



  const submitForm = (data: FieldValues) => {
    console.log('values', data)
    setDataPayment({ ...dataPayment, ...data })
    paymentMutation.mutate({ ...dataPayment, ...data })
    console.log('checkkkkk', { ...dataPayment, ...data })
  }




  console.log('data payment', dataPayment)
  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <BidFormModel dataPayment={getUserQuery} setSceduleModal={setSceduleModal} showAvailabilityOnQuote={showAvailabilityOnQuote} setDataPayment={setDataPayment} jobid={datas.params.jobId} setQuoteModal={setQuoteModal} openModal={quoteModal} />
      <SchedulePickerModal jobId={datas.params.jobId} setDataPayment={setDataPayment} dataPayment={dataPayment} setSceduleModal={setSceduleModal} user={user?._id} isOpen={sceduleModal} />
      <BaseModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        header=""
        modalHeaderImage="/images/modal-danger.png"
      >
        <div className="flex flex-col items-center mb-7 gap-2">
          <h1 className="font-bold text-[23px]">
            Would you like to provide a quote?
          </h1>
          <h5 className="text-color-20 text-sm lg:text-base pb-4 text-center">
            Offering an estimated quote is more likely to get you shortlisted
          </h5>
          <div className="flex justify-center gap-2 ">
            <BaseButton
              type="button"
              onClick={() => qouteCecern(QuoteType.Direct)}
              extraClass="bg-color-9 !px-16 text-white"
            >
              Yes
            </BaseButton>
            <BaseButton
              type="button"
              variant="bordered"
              onClick={() => qouteCecern(QuoteType.HomeVisit)}
              extraClass=" !px-16  text-white"
            >
              No
            </BaseButton>
          </div>
        </div>
      </BaseModal>
      <div className=" w-full h-full  rounded-lg ">
        {!dataPayment && !payment && <>

          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Job Details
          </h1>
          <div className="bg-white shadow-lg p-8 rounded-lg">
            <div className="  rounded-lg p-4 mb-6">
              <div className="flex items-center mb-4">
                <img
                  className="h-10 w-10"
                  src="/images/job-bell.png"
                  alt="Job Icon"
                />
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {getUserQuery.data?.data.data.headline}
                  </h2>
                  <p className="text-sm text-gray-500">{Number(getUserQuery.data?.data.data.distance).toFixed(2)} miles away</p>
                  <p className="text-gray-700 mb-2">{getUserQuery.data?.data.data.issue}</p>
                  <p className="text-sm text-gray-500">Posted {((new Date().getMonth() - new Date(getUserQuery.data?.data.data.createdAt).getMonth()) * 30 + (new Date().getDate() - new Date(getUserQuery.data?.data.data.createdAt).getDate()))} days ago</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-600">
                  Tradespeople Interested
                </p>
                <p className="text-sm font-semibold text-gray-900">{getUserQuery.data?.data.data.bidCount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Homeowner Name</p>
                <p className="text-sm font-semibold text-gray-900">
                  {getUserQuery.data?.data.data.user?.firstName} {getUserQuery.data?.data.data.user?.lastName}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm  text-gray-600">
                Homeowner Address
              </h3>
              <p className="text-gray-700 mt-2"> {getUserQuery.data?.data.data.address.country}</p>
            </div>
            <div className="mb-6">
              <h3 className="text-sm  text-gray-600">
                Completion
              </h3>
              <p className="text-gray-700 mt-2">{getUserQuery.data?.data.data.completion} </p>
            </div>

            <div className="mb-6">
              <h3 className="text-sm  text-gray-600">
                Question And Answers
              </h3>
              <div className="flex flex-col gap-2">

                {getUserQuery.data?.data.data.chat.questionAnswers.map((e: any, index: number) => <div className="flex flex-col gap-1">
                  <p>{index + 1}. {e.question}</p>
                  <p>- {e.options[e.answerIndex]}</p>
                </div>)}
              </div>
            </div>

            <div className="flex flex-col gap-2 items-start justify-between">
              <p>Lead Fee</p>
              <p className="text-lg font-semibold text-red-500 rounded-md px-8 py-2 border-2 ">
                £{getUserQuery.data?.data.data.price.toFixed(2)}
              </p>
              <div className="flex flex-col gap-2">
                <p className="text-sm">Submitting interest is free! You only have to pay once the homeowner has shortlisted you and you have confirmed that you would like their details</p>
                <button onClick={() => {
                  if(noScheduleOptions.includes(getUserQuery.data?.data.data.completion)){
                    setQuoteModal(true)
                    return
                  }
                  onOpen()
                }} className="bg-blue-500  w-max hover:bg-blue-700 text-white py-2 px-6 rounded-full focus:outline-none focus:shadow-outline">
                  Submit Interest
                </button>
              </div>

            </div>
          </div>


        </>}
        {
          dataPayment && !payment && <>
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
              Job Submission
            </h1>
            <form onSubmit={handleSubmit(submitForm)} className=" bg-white shadow-lg p-8 rounded-lg flex flex-col gap-2">
              <div className="flex flex-wrap gap-8">
                {dataPayment.quoteType == 2 && <div className="flex flex-col gap-1 w-1/3">
                  <p className="font-light">Quote</p>
                  <p className="font-semibold">£{dataPayment.directQuote.quote}</p>
                </div>}
                {dataPayment.quoteType == 2 && <div className="flex flex-col gap-1 w-1/3">
                  <p className="font-light">Vat Included</p>
                  <p className="font-semibold">{dataPayment.directQuote.vatIncluded ? "YES" : "NO"}</p>
                </div>}

                {dataPayment.quoteType == 2 && dataPayment.directQuote.timelineType == 1 && <div className="flex flex-col gap-1 w-1/3">
                  <p className="font-light">Work Duration (days)</p>
                  <p className="font-semibold">{dataPayment.directQuote.timelineValue} Days</p>
                </div>}

                {dataPayment.quoteType == 2 && dataPayment.directQuote.timelineType == 2 && <div className="flex flex-col gap-1 w-1/3">
                  <p className="font-light">Work Duration (Hours)</p>
                  <p className="font-semibold">{dataPayment.directQuote.timelineValue} hours</p>
                </div>}

                {dataPayment.quoteType == 2 && <div className="flex flex-col gap-1 w-1/3">
                  <p className="font-light">Deposit Amount</p>
                  <p className="font-semibold">£{dataPayment.directQuote.depositAmount}</p>
                </div>}
                {
                 <div className="flex flex-col gap-1 w-1/3">
                    <p className="font-light">Available Time</p>
                    {dataPayment.availability?.map((e: any) => {
                      return e.times.map((f: any) => <p className="font-semibold">{e.day} ({formatTime(f.start)}- {formatTime(f.end)})</p>)

                    })}
                  </div>
                }

                <BaseTextArea rules={{ required: "Enter Message" }} control={control} name="message" label="Want to leave a message for lead?" extraClass={{ label: "font-semibold text-lg ml-0" }} />
              </div>
              <div className="flex gap-4 flex-wrap mt-4">
                <BaseButton disabled={paymentMutation.isLoading} isLoading={paymentMutation.isLoading} type="submit">Submit</BaseButton>
                <BaseButton onClick={() => setDataPayment(null)} type="button">Back</BaseButton>
              </div>

            </form>
          </>
        }
      </div>
    </div>
  );
}
