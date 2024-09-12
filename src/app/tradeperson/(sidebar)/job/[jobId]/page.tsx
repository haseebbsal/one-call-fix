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

const formatTime = (time: string) => {
  const [hour, minute] = time.split(":");
  const hours = parseInt(hour);
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHour = ((hours + 11) % 12) + 1; // Convert to 12-hour format
  return `${String(formattedHour).padStart(2, "0")}:${minute} ${period}`;
};
export default function JobDetailsPage(datas:any) {
    const getUserQuery=useQuery(['individualJob',datas.params.jobId],({queryKey})=>axiosInstance.get(`/job?jobId=${queryKey[1]}`))
    const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
    const [quoteModal, setQuoteModal] = useState(false);
    const [sceduleModal, setSceduleModal] = useState(false);
    const [dataPayment,setDataPayment]=useState<any>(false)
    const [payment,setPayment]=useState(false)
    const router=useRouter()
    const qouteCecern = (type: any) => {
        // dispatch(
        //   setFormData({
        //     jobId: selectedJob?.jobId,
        //     quoteType: type,
        //   }),
        // );
        onClose();
        if (type == QuoteType.Direct) {
          setQuoteModal(true);
        }
        if (type == QuoteType.HomeVisit) {
          setSceduleModal(true);
        }
      };

      const [user,setUser]=useState<any>(null)

      const{handleSubmit,control}=useForm()
      const{handleSubmit:handleSubmit2,control:control2,register,watch}=useForm({
        defaultValues:{
          payment:"card",
          wallet:false
        }
      })

      const {field,fieldState}=useController(
        {
          control:control2,
          name:'payment',
          rules:{required:"Select Payment Method"}
        }
      )
  useEffect(()=>{
    const user=JSON.parse(Cookies.get('userData')!)
    console.log(user)
    setUser(user)
  },[])


  const paymentMutation=useMutation((data:any)=>axiosInstance.post('/bid',data),{
    onSuccess(data, variables, context) {
      console.log('payment done',data.data)
      router.push('/tradeperson/dashboard')
    },
    onError(error:any) {
      if (Array.isArray(error.response.data.message)) {
        toast.error(error.response.data.message[0]);
    } else {
        toast.error(error.response.data.message);
    }
    },
  })

  const getCreditsQuery=useQuery(['credits'],()=>axiosInstance.get('/wallet'))
//   const queryParams = useParams();
//   const [jobId, setJobId] = useState(queryParams.jobId as String);
//   const dispatch = useAppDispatch();
//   const { job, loading, error }: any = useAppSelector((state) => state.job);
//   useEffect(() => {
//     if (!job && jobId && !loading) {
//       dispatch(getJobById(jobId));
//     }

//     return () => {
//       dispatch(resetJob());
//     };
//   }, [jobId, job, loading, dispatch]);

const submitForm=(data:FieldValues)=>{
  console.log('values',data)
  setDataPayment({...dataPayment,...data})
  setPayment(true)
}

const paymentForm=(data:FieldValues)=>{
//   {
//     "jobId": "66cf4642147298d0e1648376",
    // "quoteType": 2,
    // "directQuote": {
    //     "quote": 60,
    //     "vatIncluded": true,
    //     "depositAmount": 12,
    //     "timelineType": 1,
    //     "timelineValue": 2
    // },
    // "message": "Hi, I'm a good trades-person, will resolve this issue",
//     "useWalletCredits": false
// }

let payload:any;
if(dataPayment.quoteType==2){
  payload={
    jobId:datas.params.jobId,
    "quoteType": dataPayment.quoteType,
    "directQuote":dataPayment.directQuote ,
    "message": dataPayment.message,
    "useWalletCredits": data.wallet
  
  }
}
else{
  payload={
    jobId:datas.params.jobId,
    "quoteType": dataPayment.quoteType,
    // "directQuote":dataPayment.directQuote ,
    "message": dataPayment.message,
    "useWalletCredits": data.wallet
  
  }
}

// console.log('penisss',data)

paymentMutation.mutate(payload)

// const payload={
//   jobId:datas.params.jobId,
  
//   ...dataPayment,

// }


  console.log('payment form',data)
}

const savedCardQuery = useQuery(['savedCard'], () => axiosInstance.get('/payment/card'));

console.log('data payment',dataPayment)
  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <BidFormModel setDataPayment={setDataPayment} jobid={datas.params.jobId}  setQuoteModal={setQuoteModal} openModal={quoteModal} />
        <SchedulePickerModal setDataPayment={setDataPayment} setSceduleModal={setSceduleModal} user={user?._id} isOpen={sceduleModal} />
        <BaseModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="lg"
          header=""
          modalHeaderImage="/images/modal-danger.png"
        >
          <div className="flex flex-col items-center mb-7">
            <h1 className="font-bold text-[23px]">
              Would you like to provide a quote?
            </h1>
            <h5 className="text-color-20 text-sm lg:text-base pb-4 text-center">
              Offering an estimated quote is more likely to get you shortlisted
            </h5>
            <div className="flex justify-center gap-4">
              <BaseButton
                type="button"
                onClick={() => qouteCecern(QuoteType.Direct)}
                extraClass="bg-color-9 w-[220px] text-white"
              >
                Yes
              </BaseButton>
              <BaseButton
                type="button"
                variant="bordered"
                onClick={() => qouteCecern(QuoteType.HomeVisit)}
                extraClass="w-[220px] text-blue"
              >
                No
              </BaseButton>
            </div>
          </div>
        </BaseModal>
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-8">
        {!dataPayment && !payment && <>
        
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Job Details
        </h1>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-4">
            <img
              className="h-10 w-10"
              src="/icons/notification.png"
              alt="Job Icon"
            />
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {getUserQuery.data?.data.data.headline}
              </h2>
              <p className="text-sm text-blue-500">18 mins away from PO167GZ</p>
            </div>
          </div>
          <p className="text-gray-700 mb-2">{getUserQuery.data?.data.data.issue}</p>
          <p className="text-sm text-gray-500">Posted {((new Date().getMonth()-new Date(getUserQuery.data?.data.data.createdAt).getMonth())*30 + (new Date().getDate()-new Date(getUserQuery.data?.data.data.createdAt).getDate()))} days ago</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-600">
              Purchased By Other Tradepeople
            </p>
            <p className="text-sm font-semibold text-gray-900">02 / 03</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Homeowner Name</p>
            <p className="text-sm font-semibold text-gray-900">
              {getUserQuery.data?.data.data.user?.firstName} {getUserQuery.data?.data.data.user?.lastName}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-800">
            Homeowner Address
          </h3>
          <p className="text-gray-700 mt-2">{getUserQuery.data?.data.data.address.city} {getUserQuery.data?.data.data.address.country}</p>
        </div>

        <div className="flex flex-col gap-2 items-start justify-between">
            <p>Lead Fee</p>
          <p className="text-lg font-semibold text-red-500">
          £{getUserQuery.data?.data.data.price}
          </p>
          <button onClick={()=>{
            onOpen()
          }} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded-full focus:outline-none focus:shadow-outline">
            Submit Interest
          </button>
        </div>
        </>}
        {
          dataPayment && !payment && <>
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Job Submission
        </h1>
        <form onSubmit={handleSubmit(submitForm)}  className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-8">
            {dataPayment.quoteType==2 && <div className="flex flex-col gap-1 w-1/3">
              <p className="font-light">Quote</p>
              <p className="font-semibold">£{dataPayment.directQuote.quote}</p>
            </div>}
            {dataPayment.quoteType==2 && <div className="flex flex-col gap-1 w-1/3">
              <p className="font-light">Vat Included</p>
              <p className="font-semibold">{dataPayment.directQuote.vatIncluded?"YES":"NO"}</p>
            </div>}

            {dataPayment.quoteType==2 && dataPayment.directQuote.timelineType==1 && <div className="flex flex-col gap-1 w-1/3">
              <p className="font-light">Work Duration (days)</p>
              <p className="font-semibold">{dataPayment.directQuote.timelineValue} Days</p>
            </div>}

            {dataPayment.quoteType==2 && dataPayment.directQuote.timelineType==2 && <div className="flex flex-col gap-1 w-1/3">
              <p className="font-light">Work Duration (Hours)</p>
              <p className="font-semibold">{dataPayment.directQuote.timelineValue} hours</p>
            </div>}

            {dataPayment.quoteType==2 && <div className="flex flex-col gap-1 w-1/3">
              <p className="font-light">Deposit Amount</p>
              <p className="font-semibold">£{dataPayment.directQuote.depositAmount}</p>
            </div>}
            {
              dataPayment.quoteType==1 && <div className="flex flex-col gap-1 w-1/3">
              <p className="font-light">Available Time</p>
              {dataPayment.availability.map((e:any)=>{
                return e.times.map((f:any)=><p className="font-semibold">{e.day} ({formatTime(f.start)}- {formatTime(f.end)})</p>)
                
              })}
              {/* <p className="font-semibold">Thursday (12:00 pm - 01:00 pm)</p> */}
            </div>
            }      
            
            <BaseTextArea rules={{required:"Enter Message"}} control={control} name="message" label="Want to leave a message for lead?" extraClass={{label:"font-semibold text-lg ml-0"}}/>
          </div>
          <BaseButton type="submit">Submit</BaseButton>
        </form>
          </>
        }
        {
          payment && < form onSubmit={handleSubmit2(paymentForm)}>
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Payment Method
        </h1>

        {savedCardQuery.data?.data?.data && Object.keys(savedCardQuery.data.data.data).length > 0 ? (
          <RadioGroup
          {...field}
        >
          <Radio value={'card'}><SavedPaymentCard card={savedCardQuery.data.data.data} /></Radio>
          {/* <Radio value={'credits'}><div className="flex items-center border-2 rounded-lg">
            <div className="w-[3rem] h-[3rem]">
              <Image alt="logo" src={'/logos/Original Logo (1) 2.svg'} className="w-full h-full object-contain" width={50} height={50}/>
            </div>
            <p><span className="font-light">OneCallFix Credits :</span> £{getCreditsQuery.data?.data.data.amount}</p>
            
            </div></Radio> */}
        </RadioGroup>
    
        
                              
          ) : (
              <p className="text-center">No saved payment method found.</p>
          )}


<div className="flex items-center w-max p-4 border-2 rounded-lg">
            <div className="w-[3rem] h-[3rem]">
              <Image alt="logo" src={'/logos/Original Logo (1) 2.svg'} className="w-full h-full object-contain" width={50} height={50}/>
            </div>
            <p><span className="font-light">OneCallFix Credits :</span> £{getCreditsQuery.data?.data.data.amount}</p>
            
            </div>
                                {/* <div className="flex flex-col ">
                                    <p className="text-gray-400 text-sm">Price</p>
                                    <p className="font-semibold">{getUserQuery.data?.data.data.price }</p>
                                </div> */}
                                <div className="flex flex-col mt-8 gap-2">
                                    {/* <p className="font-semibold">Total Amount</p> */}
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex justify-between border-b-[0.1rem] border-dashed border-[#c9c9c9] pb-4">
                                                <p className="text-[#c9c9c9] ">Price</p>
                                                <p className="font-semibold">£{getUserQuery.data?.data.data.price}</p>
                                            </div>
                                            {/* <div className="w-[98%] h-[0.1rem] bg-gray-400 "></div> */}
                                        </div>
                                        <div>
                                        <Switch {...register('wallet')} >
                                          Use Wallet Credits
                                        </Switch>
                                        </div>
                                        {/* <div className="flex flex-col gap-2">
                                            <div className="flex justify-between">
                                                <p>Tax</p>
                                                <p className="font-semibold">$2.30</p>
                                            </div>
                                            <div className="w-[98%] h-[0.1rem] bg-gray-400"></div>
                                        </div> */}
                                        <div className="flex flex-col gap-2">
                                            {/* <div className="w-[98%] h-[0.1rem] bg-gray-400"></div> */}
                                            <div className="flex justify-between">
                                                <p className="text-[#c9c9c9] ">Subtotal (Incl.VAT)</p>
                                                <p className="font-semibold">£{watch('wallet')?getUserQuery.data?.data.data.price-getCreditsQuery.data?.data.data.amount:getUserQuery.data?.data.data.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <BaseButton isLoading={paymentMutation.isLoading} disabled={paymentMutation.isLoading} extraClass="mt-4" type="submit" onClick={() => {
                                    // setCheckoutPage(1)
                                }} >Pay Now</BaseButton>
          </form>
        }
      </div>
    </div>
  );
}
