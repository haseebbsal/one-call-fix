"use client";
import { Image } from "@nextui-org/image";
import React, { useEffect, useState } from "react";
import CustomButton from "@/components/common/button/custom-button";
import { toTitleCase } from "@/_utils/helpers";
import { Button } from "@nextui-org/button";
// import { useAppDispatch } from "@/lib/hooks";
import BaseModal from "@/components/common/modal/base-modal";
import { useDisclosure } from "@nextui-org/modal";
import BaseButton from "@/components/common/button/base-button";
// import { setFormData } from "../../../lib/features/formDataSlice";
import { QuoteType } from "@/_utils/enums";
import { BidFormModel } from "./bid-form-model";
import { SchedulePickerModal } from "./schedule-picker-modal";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";
import { useInfiniteQuery, useQuery } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";

interface JobItem {
  jobId?: string;
  title: string;
  location: string;
  description: string;
  posted: string;
  price: string;
  shortlistedCount?: number;
}

interface JobListSectionProps {
  title: string;
  jobItems: any;
  innerTitle?: string;
  isLoading?: boolean;
  errorMessage?: string | null;
  loadMoreData?: () => void;
  onJobClick?: (jobId: string) => void;
  type: string;
  setJob?: any
  savedCard?: any,
  job?: any
}

enum Verified {
  identification = 'isIdVerified',
  gasSafeId = 'isGasSafeVerified',
  partPQualification = "isPartPQualified",
  eicrDocumentation = "isEicrDocumentationVerified",
  wiringRegulationsCertificate = "isWiringRegulationsCertified"
}

import Cookies from 'js-cookie'

export default function JobListSection({
  setJob,
  type,
  title,
  jobItems,
  innerTitle,
  isLoading,
  errorMessage,
  loadMoreData,
  savedCard,
  job,
  onJobClick, // <-- Added this prop
}: JobListSectionProps) {
  // const dispatch = useAppDispatch();
  const router = useRouter();
  console.log('job items', jobItems)
  console.log('card', savedCard)
  const [user, setUser] = useState<any>(null)
  useEffect(() => {
    const user = JSON.parse(Cookies.get('userData')!)
    console.log(user)
    setUser(user)
  }, [])
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const [selectedJob, setSelectedJob] = useState<JobItem>({
    jobId: "",
    title: "",
    location: "",
    description: "",
    posted: "",
    price: "",
    shortlistedCount: 0,
  });
  const [quoteModal, setQuoteModal] = useState(false);
  const [sceduleModal, setSceduleModal] = useState(false);
  const applyBid = (job: any) => {
    setSelectedJob(job);
    onOpen();
  };

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


  console.log('selectedjob', selectedJob)




  const getUserQuery = useQuery(['tradePerson', user?._id], ({ queryKey }) => axiosInstance.get(`/user/?userId=${queryKey[1]}`), {
    enabled: !!user
  })





  return (
    <>
      <BaseModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        header=""
        modalHeaderImage="/images/modal-danger.png"
      >
        <div className="flex flex-col gap-4 items-center mb-7">
          <h1 className="font-bold  text-center">
            Required documents need to be submitted and verified before you can submit interest in any jobs.
          </h1>
          <div className="flex justify-center gap-4">
            <BaseButton
              type="button"
              onClick={() => router.push('/tradeperson/vetting/required-documents')}
              extraClass="bg-color-9 !max-w-full w-max text-white"
            >
              Submit Required Documents
            </BaseButton>
          </div>
        </div>
      </BaseModal>
      <div className="w-full flex-[2] flex flex-col mb-8 lg:mb-0 h-fit max-h-[670px] relative overflow-y-auto overflow-x-hidden">
        <h2 className="text-xl font-semibold mb-4 text-color-17 sticky top-0 left-0 bg-gray-100 ">{title}</h2>
        <section className="flex-1  rounded-md border bg-color-16 text-left text-gray-600">
          {innerTitle && (
            <h2 className="text-lg font-medium mb-6 text-color-17">
              {innerTitle}
            </h2>
          )}
          {jobItems.isLoading ? (
            <div className="flex justify-center w-full h-full">
              <Loader />
            </div>
          ) : errorMessage ? (
            <p className="text-danger text-lg font-bold text-center">
              {errorMessage}
            </p>
          ) : (
            jobItems.data?.pages.map((item: any, index: number) => (
              item.data.data.map((e: any) => {
                return <React.Fragment key={index}>
                  {type == '3' && (
                    <div className="flex items-center justify-end mb-1">
                      <div className="py-1 px-3 border-2 rounded-lg text-xs font-normal text-white bg-color-21">
                        {`${e.tradesPersonApplied}`} Tradespeople Shortlisted
                      </div>
                    </div>
                  )}
                  {/* job div */}
                  <div
                    className={`mb-2 ${e._id == job?._id ? "bg-[#F9FBFF] border-l-[0.2rem] border-color-9 border-b-0" : "bg-white"} p-4 sm:p-8 last:mb-0 gap-2 flex ${type == '1' ? "cursor-text" : "cursor-pointer"}  flex-col sm:flex-row items-start border-b border-color-19`}
                    onClick={() => {
                      if (setJob) {
                        setJob(e)

                      }
                      // if (item.jobId) {
                      //   // onJobClick(item.jobId);
                      // }
                    }}
                  >
                    <Image
                      className="mr-4 h-8 w-8 sm:h-16 sm:w-16 "
                      src="/images/job-bell.png"
                      alt="bellProfile Picture"
                    />
                    <div className="flex flex-col w-full">
                      <div className="mb-1 flex flex-col gap-2 sm:flex-row justify-between text-gray-600">
                        <div className="flex flex-col gap-1">
                          <h3 className="font-medium">{toTitleCase(e.headline)}</h3>
                          <span className="text-xs sm:text-sm text-color-14">
                            {Number(e.distance).toFixed(2)} miles away
                          </span>
                        </div>
                        {type == '1' && <BaseButton
                          // as={'link'}
                          onClick={() => {

                            if (getUserQuery.data?.data.data) {
                              // if(getUserQuery.data.data.data.profileCompletion>=75){
                              //   router.push(`/tradeperson/job/${e._id}`)
                              //   return 
                              // }


                              const { trade, isIdVerified, isGasSafeVerified, isPartPQualified, isEicrDocumentationVerified, isWiringRegulationsCertified, gasSafeRegistered } = getUserQuery.data?.data.data.profile
                              if (trade == 2) {
                                if (isIdVerified && isWiringRegulationsCertified && isPartPQualified && isEicrDocumentationVerified) {
                                  router.push(`/tradeperson/job/${e._id}`)
                                }
                                else {
                                  onOpen()
                                }
                              }
                              else {
                                if (isIdVerified && (!gasSafeRegistered || (isGasSafeVerified && gasSafeRegistered))) {
                                  router.push(`/tradeperson/job/${e._id}`)
                                }
                                else {
                                  onOpen()
                                }
                                // if (getUserQuery.data.data.data.profileCompletion >= 75) {
                                //   router.push(`/tradeperson/job/${e._id}`)
                                //   return
                                // }
                              }
                              // onOpen()
                            }
                          }}
                          // link={`/tradeperson/job/${e._id}`}
                          // variant="bordered"
                          // radius="full"
                          extraClass="!border !border-[#3571EC] !bg-transparent !text-color-9 text-lg w-fit px-12 py-4"
                        // onClick={(f) => {
                        //   f.stopPropagation();
                        //   applyBid(e);
                        // }}
                        >
                          Submit Interest
                        </BaseButton>}

                      </div>
                      <p className="mt-1 text-sm">{e.issue}</p>
                      <div className="mt-1 mb-5 flex items-center justify-between text-gray-600">
                        <span className="text-xs sm:text-sm text-color-14">
                          Posted {((new Date().getMonth() - new Date(e.createdAt).getMonth()) * 30 + (new Date().getDate() - new Date(e.createdAt).getDate()))} days ago
                          {/* {item.posted} */}
                        </span>
                        <div className="py-1 px-9 border-2 rounded-lg text-sm font-semibold text-color-15">
                          £{e.price}
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              })
            ))
          )}
          {!jobItems.isLoading && !jobItems.data ? (
            <p className="text-lg font-bold text-center">No Job Avaliable</p>
          ) : (
            ""
          )}
          {jobItems.hasNextPage && <BaseButton
            isLoading={jobItems.isFetching}
            disabled={jobItems.isFetching}
            extraClass="bg-color-12 text-white px-7"
            onClick={() => {
              jobItems.fetchNextPage()
            }}
          >
            Load More
          </BaseButton>}

        </section>

      </div>
    </>

  );
}
