"use client";

import React, { useEffect, useState } from "react";
// import { getJobById, resetJob } from "@/lib/features/jobSlice";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import { useParams } from "next/navigation";
import { getTimeAgo } from "@/_utils/helpers";
import { useQuery } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import { BidFormModel } from "@/components/modules/tradeperson/bid-form-model";
import { SchedulePickerModal } from "@/components/modules/tradeperson/schedule-picker-modal";
import { useDisclosure } from "@nextui-org/modal";
import { QuoteType } from "@/_utils/enums";
import BaseModal from "@/components/common/modal/base-modal";
import BaseButton from "@/components/common/button/base-button";
import Cookies from "js-cookie";
export default function JobDetailsPage(datas:any) {
    const getUserQuery=useQuery(['individualJob',datas.params.jobId],({queryKey})=>axiosInstance.get(`/job?jobId=${queryKey[1]}`))
    const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
    const [quoteModal, setQuoteModal] = useState(false);
    const [sceduleModal, setSceduleModal] = useState(false);
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
  useEffect(()=>{
    const user=JSON.parse(Cookies.get('userData')!)
    console.log(user)
    setUser(user)
  },[])
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

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <BidFormModel jobid={datas.params.jobId}  setQuoteModal={setQuoteModal} openModal={quoteModal} />
        <SchedulePickerModal user={user?._id} isOpen={sceduleModal} />
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
      </div>
    </div>
  );
}
