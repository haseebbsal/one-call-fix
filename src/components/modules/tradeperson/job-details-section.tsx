import { Image } from "@nextui-org/image";
import React from "react";

import CustomButton from "@/components/common/button/custom-button";

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
}

export default function JobDetailsSection({ jobType, job }: JobDetailsProps) {
  const renderJobDetails = () => {
    switch (jobType) {
      case "pending":
        return (
          <>
            <h3 className="font-semibold text-color-15">${job.price}</h3>
            <span className="text-xs text-color-14">Lead Price</span>
          </>
        );
      case "shortlisted":
        return (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold text-color-15">${job.price}</h3>
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
              <h3 className="font-semibold text-color-15">${job.price}</h3>
              <span className="text-xs text-color-14">Lead Price</span>
            </div>
            <div className="flex flex-wrap flex-col justify-center items-center">
              <h3 className="font-semibold">Review Link</h3>
              <span className="text-sm text-color-14">{job.reviewLink}</span>
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
              <h3 className="font-semibold">{job.title}</h3>
            </div>
            <span className="text-xs sm:text-sm text-color-14">
              {job.description}
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
              <h3 className="font-semibold text-md mb-2">{job.contactName}</h3>

              <span className="text-xs text-color-14">Phone Number:</span>
              <h3 className="font-semibold text-md mb-2">{job.phoneNumber}</h3>

              <span className="text-xs text-color-14">Email:</span>
              <h3 className="font-semibold text-md mb-2">{job.email}</h3>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <img src="/icons/warning.png" alt="warning" className="w-5 h-5" />
              <span className="text-xs font-medium text-center sm:text-left">
                Purchase Job to Reveal Contact Info.
              </span>
            </div>
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
                {job.attachments.map((attachment, index) => (
                  <Image
                    src={attachment}
                    alt={`attachment-${index + 1}`}
                    radius="none"
                    className="w-14 h-16"
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
                <span className="text-md">{job.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
