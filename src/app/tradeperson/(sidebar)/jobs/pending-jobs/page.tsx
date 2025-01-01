'use client'
import { JOB_DETAILS, JOB_ITEMS } from "@/_utils/constant";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import JobDetailsSection from "@/components/modules/tradeperson/job-details-section";
import JobListSection from "@/components/modules/tradeperson/job-list-section";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";

export default function PendingJobs() {
  const [job,setJob]=useState(null)
  const jobsInfinite = useInfiniteQuery(
    ["allJobs",'2'],
    ({ queryKey, pageParam = 1 }) =>
      axiosInstance.get(`/job/trades-person?page=${pageParam}&limit=10&type=${queryKey[1]}`),
    {
      getNextPageParam: (lastPage:any, pages) => {
        if(lastPage.page!=lastPage.lastPage){
          return lastPage.page+=1;
        }
        return null;
      },
      refetchOnWindowFocus:false,
      onSuccess(data) {
        if(data.pages[0].data.data.length){
          setJob(data.pages[0].data.data[0])
        }
        // console.log('success',data.pages[0].data.data)
      },
      // enabled: !!activeDomain,
    }
  );
  return (
    <>
      <JobListSection setJob={setJob} type={'2'} title="Pending Jobs" jobItems={jobsInfinite} />
      {job && <JobDetailsSection actualJob={job} jobType="pending" job={job} />}
    </>
  );
}
