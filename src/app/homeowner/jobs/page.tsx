"use client";

import { Tab, Tabs } from "@nextui-org/tabs";
import Link from "next/link";
import React, { Key, useEffect, useState } from "react";
import JobCard from "@/components/common/cards/job-card";
// import { getAllHomeOwnerJobs } from "@/lib/features/jobSlice";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { HomeOwnerJobTypes } from "@/_utils/enums";
import Loader from "@/components/common/Loader";
import { useQuery } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";

export default function Jobs() {
  // const dispatch = useAppDispatch();
  // const { allJobs, loading, error }: any = useAppSelector((state) => state.job);
  const [type,setType]=useState(HomeOwnerJobTypes.CURRENT)
  const jobsQuery=useQuery(['homeOwnerJobs',type],({queryKey})=>axiosInstance.get(`/job/homeowner?page=1&limit=20&type=${queryKey[1]}`))
  // const handleJobs = (type: HomeOwnerJobTypes) => {
  //   const pag: any = { page: 1, limit: 20, type };
  //   dispatch(getAllHomeOwnerJobs(pag));
  // };

  // useEffect(() => {
  //   if (!allJobs?.length) {
  //     // handleJobs(HomeOwnerJobTypes.CURRENT);
  //   }
  // }, []);
  return (
    <section className="mt-20 mb-16 px-16 flex flex-col gap-5">
      <div>
        <h5 className="capitalize text-lg lg:text-xl font-semibold text-color-17 pb-10">
          list of jobs
        </h5>
        <>
          <Tabs
            variant={"underlined"}
            aria-label="Tabs variants"
            fullWidth
            classNames={{
              tabList: "border-b border-b-[#D1D1D1] !pb-0 w-full",
              tab: `pb-[15px] w-fit text-lg`,
              tabContent:
                "group-data-[selected=true]:text-color-9 text-color-20",
              cursor:
                "bg-[#D1D1D1] group-data-[selected=true]:bg-color-9 h-[1px]",
            }}
            onSelectionChange={(key: Key) => {
              const index = key as unknown as HomeOwnerJobTypes;
              // console.log('index',index)
              setType(index)
              // handleJobs(index);
            }}
          >
            <Tab key={HomeOwnerJobTypes.CURRENT} title="Current Jobs">
              {jobsQuery.isLoading ? (
                <Loader />
              ) : (
                <div className="flex flex-col gap-5">
                  {jobsQuery.data?.data?.data.map((el: any) => (
                    <Link
                      href={`/homeowner/job/${el._id}`}
                      className="pb-6 border-b border-b-color-19"
                      key={el._id}
                    >
                      <JobCard job={el} />
                    </Link>
                  ))}
                </div>
              )}
              {!jobsQuery.isLoading && jobsQuery.data?.data && !jobsQuery.data?.data.data?.length ? (
                <p className="text-lg font-bold text-center">
                  No Job Avaliable
                </p>
              ) : (
                ""
              )}
            </Tab>
            <Tab key={HomeOwnerJobTypes.COMPLETED} title="Completed Jobs">
              {jobsQuery.isLoading ? (
                <Loader />
              ) : (
                <div className="flex flex-col gap-5">
                  {jobsQuery.data?.data?.data.map((el: any) => (
                    <Link
                      href={`/homeowner/job/${el._id}`}
                      className="pb-6 border-b border-b-color-19"
                      key={el._id}
                    >
                      <JobCard job={el} />
                    </Link>
                  ))}
                </div>
              )}
              {!jobsQuery.isLoading && jobsQuery.data?.data && !jobsQuery.data?.data.data?.length ? (
                <p className="text-lg font-bold text-center">
                  No Job Avaliable
                </p>
              ) : (
                ""
              )}
            </Tab>
          </Tabs>
        </>
      </div>
    </section>
  );
}
