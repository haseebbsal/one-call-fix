'use client'
import { JOB_DETAILS, JOB_ITEMS_WITH_SHORTLISTED } from "@/_utils/constant";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import JobDetailsSection from "@/components/modules/tradeperson/job-details-section";
import JobListSection from "@/components/modules/tradeperson/job-list-section";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";

export default function MyJobs({jobsInfinite,job,setJob}:{jobsInfinite:any,job:any,setJob:any}) {
  // const [job,setJob]=useState(null)
  
  return (
    <div className="flex gap-4 sm:flex-nowrap flex-wrap">
      <JobListSection
      setJob={setJob}
        type={'4'}
        title=""
        job={job}
        jobItems={jobsInfinite}
      />
      {/* {job && <JobDetailsSection  jobType="shortlisted" actualJob={job} job={JOB_DETAILS} />} */}
    </div>
  );
}
