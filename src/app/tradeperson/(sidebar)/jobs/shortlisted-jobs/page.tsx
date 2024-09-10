'use client'
import { JOB_DETAILS, JOB_ITEMS_WITH_SHORTLISTED } from "@/_utils/constant";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import JobDetailsSection from "@/components/modules/tradeperson/job-details-section";
import JobListSection from "@/components/modules/tradeperson/job-list-section";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";

export default function ShortlistedJobs() {
  const [job,setJob]=useState(null)
  const jobsInfinite = useInfiniteQuery(
    ["allJobs",'3'],
    ({ queryKey, pageParam = 1 }) =>
      axiosInstance.get(`/job/trades-person?page=${pageParam}&limit=10&type=${queryKey[1]}`),
    {
      getNextPageParam: (lastPage:any, pages) => {
        if(lastPage.page!=lastPage.lastPage){
          return lastPage.page+=1;
        }
        return null;
      },
      refetchOnWindowFocus:false
      // enabled: !!activeDomain,
    }
  );
  return (
    <>
      <JobListSection
      setJob={setJob}
        type={'3'}
        title="Shortlisted Jobs"
        jobItems={jobsInfinite}
      />
      {job && <JobDetailsSection  jobType="shortlisted" actualJob={job} job={JOB_DETAILS} />}
    </>
  );
}
