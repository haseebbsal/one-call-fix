'use client'

import { JOB_DETAILS } from "@/_utils/constant";
import { HomeOwnerJobTypes } from "@/_utils/enums";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import Loader from "@/components/common/Loader";
import JobDetailsSection from "@/components/modules/tradeperson/job-details-section";
import MyJobs from "@/components/modules/tradeperson/my-jobs";
import Pending from "@/components/modules/tradeperson/pending-jobs";
import ShortlistedJobs from "@/components/modules/tradeperson/shortlisted-jobs";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Key, useState } from "react";
import { useInfiniteQuery } from "react-query";

export default function Jobs() {
  const [type, setType] = useState<null | number>()
  const [job, setJob] = useState<any>(null)
  const jobsInfinite = useInfiniteQuery(
    ["allJobs", type],
    ({ queryKey, pageParam = 1 }) =>
      axiosInstance.get(`/job/trades-person?page=${pageParam}&limit=10&type=${queryKey[1]}`),
    {
      getNextPageParam: (lastPage: any, pages) => {
        if (lastPage.page != lastPage.lastPage) {
          return lastPage.page += 1;
        }
        return null;
      },
      refetchOnWindowFocus: false,
      onSuccess(data) {
        if (data.pages[0].data.data.length) {
          setJob(data.pages[0].data.data[0])
        }
        // console.log('success',data.pages[0].data.data)
      },
      // enabled: !!activeDomain,
    }
  );
  return (
    <>
      <div className="w-full flex gap-4 sm:flex-nowrap flex-wrap">
        <div className="w-full">
          <Tabs
            variant={"underlined"}
            aria-label="Tabs variants"
            fullWidth
            classNames={{
              tabList: " !pb-0 w-full flex-wrap",
              tab: `pb-[15px] w-fit text-lg group-data-[selected=true]:border-none`,
              tabContent:
                "group-data-[selected=true]:text-color-9 text-color-20",
              cursor:
                "bg-transparent group-data-[selected=true]:border-none h-[1px]",
            }}
            onSelectionChange={(key: Key) => {
              const index = key as unknown as HomeOwnerJobTypes;
              console.log('index', index)
              setType(index)
              setJob(null)
              // handleJobs(index);
            }}
          >
            <Tab key={2} title="Pending Jobs">
              {jobsInfinite.isFetching ? (
                <Loader />
              ) : (
                <Pending jobsInfinite={jobsInfinite} job={job} setJob={setJob} />
              )}
              {/* {!false && jobsQuery.data?.data && !jobsQuery.data?.data.data?.length ? (
                <p className="text-lg font-bold text-center">
                  No Job Avaliable
                </p>
              ) : (
                ""
              )} */}
            </Tab>
            <Tab key={3} title="Shortlisted Jobs">
              {jobsInfinite.isFetching ? (
                <Loader />
              ) : (
                <ShortlistedJobs jobsInfinite={jobsInfinite} job={job} setJob={setJob} />
                // <p>Anything 2</p>

              )}
              {/* {!false && jobsQuery.data?.data && !jobsQuery.data?.data.data?.length ? (
                <p className="text-lg font-bold text-center">
                  No Job Avaliable
                </p>
              ) : (
                ""
              )} */}
            </Tab>
            <Tab key={4} title="My Jobs">
              {false ? (
                <Loader />
              ) : (
                <MyJobs jobsInfinite={jobsInfinite} job={job} setJob={setJob} />

              )}
              {/* {!false && jobsQuery.data?.data && !jobsQuery.data?.data.data?.length ? (
                <p className="text-lg font-bold text-center">
                  No Job Avaliable
                </p>
              ) : (
                ""
              )} */}
            </Tab>
          </Tabs>
        </div>

        {job && <JobDetailsSection jobType={type == 3 ? "shortlisted" : type == 2 ? "pending" : "myJobs"} actualJob={job} job={JOB_DETAILS} />}

      </div>
    </>
  )
}




























