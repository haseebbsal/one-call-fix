import { Image } from "@nextui-org/image";
import React from "react";

import CustomButton from "@/components/common/button/custom-button";
import { config } from "@/_utils/helpers/config";
import BaseButton from "@/components/common/button/base-button";
import { useMutation } from "react-query";

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

export default function JobDetailsSection({ jobType, job ,actualJob}: JobDetailsProps) {
  console.log('job data',actualJob)
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
              <CustomButton extraClass="bg-color-12 text-white px-2 sm:px-7">
                Purchase Job
              </CustomButton>
              <CustomButton extraClass="bg-color-21 text-white px-2 sm:px-7">
                Decline
              </CustomButton>
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
              <BaseButton extraClass="!px-4 !text-sm !max-w-full">Mark This Job As Completed</BaseButton>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col">
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

          <div className="py-2 px-5 sm:py-4 sm:px-8 border-b border-color-19 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-14">
            <div className="flex flex-col justify-between text-gray-600">
              <span className="text-sm text-color-14 mb-3">
                Contact Details
              </span>

              <span className="text-xs text-color-14">Name:</span>
              <h3 className="font-semibold text-md mb-2">{actualJob.user.firstName} {actualJob.user.lastName}</h3>

              <span className="text-xs text-color-14">Phone Number:</span>
              <h3 className="font-semibold text-md mb-2">{actualJob.user.phone}</h3>

              <span className="text-xs text-color-14">Email:</span>
              <h3 className="font-semibold text-md mb-2">{actualJob.user.email}</h3>
            </div>

            {jobType=='shortlisted' && <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <img src="/icons/warning.png" alt="warning" className="w-5 h-5" />
              <span className="text-xs font-medium text-center sm:text-left">
                Purchase Job to Reveal Contact Info.
              </span>
            </div>}
            
          </div>

          <div className="py-2 px-5 sm:py-4 sm:px-8">
            <div className="flex flex-col justify-between text-gray-600">
              <span className="text-sm text-color-14 mb-3">About the job</span>
              <ul className="list-disc text-color-6 px-6">
                {job.details.map((detail, index) => (
                  <li className="mb-3" key={index}>
                    {detail}
                  </li>
                ))}
              </ul>

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
    </div>
  );
}
