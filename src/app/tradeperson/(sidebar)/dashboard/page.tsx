'use client'
import { DASHBOARD_ITEMS, JOB_ITEMS } from "@/_utils/constant";
import DashboardCard from "@/components/common/cards/dashboard-card";
import JobListSection from "@/components/modules/tradeperson/job-list-section";
import ProfileCompletion from "@/components/modules/tradeperson/profile-completion";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useInfiniteQuery, useQuery } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import { Symbols } from "@/_utils/enums";


export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  useEffect(() => {
    const user = JSON.parse(Cookies.get('userData')!)
    console.log(user)
    setUser(user)
  }, [])

  const getUserQuery = useQuery(['tradePerson', user?._id], ({ queryKey }) => axiosInstance.get(`/user/?userId=${queryKey[1]}`), {
    enabled: !!user
  })

  const getStatsQuery = useQuery(['stats'], () => axiosInstance.get('/trades-person/stats'))
  const savedCardQuery = useQuery(['savedCard'], () => axiosInstance.get('/payment/card'));

  const jobsInfinite = useInfiniteQuery(
    ["allJobs", '1'],
    ({ queryKey, pageParam = 1 }) =>
      axiosInstance.get(`/job/trades-person?page=${pageParam}&limit=10&type=${queryKey[1]}`),
    {
      getNextPageParam: (lastPage: any, pages) => {
        if (lastPage.page != lastPage.lastPage) {
          return lastPage.page += 1;
        }
        return null;
      },
      refetchOnWindowFocus: false
      // enabled: !!activeDomain,
    }
  );

  const getCreditsQuery = useQuery(['credits'], () => axiosInstance.get('/wallet'))
  return (
    <>
      <div className="flex flex-wrap p-4 items-center justify-center w-full text-gray-800 sm:p-10 bg-gray-100 gap-10">
        {getStatsQuery.data?.data && Object.keys(getStatsQuery.data?.data.data).map((item: any, index) => (
          <DashboardCard
            key={index}
            icon={DASHBOARD_ITEMS.find((e) => e.slug == item)!.icon}
            title={DASHBOARD_ITEMS.find((e) => e.slug == item)!.title}
            value={`${DASHBOARD_ITEMS.find((e) => e.slug == item)!.symbol == 'pound' ? `${Symbols[DASHBOARD_ITEMS.find((e) => e.slug == item)!.symbol as 'none' | 'pound' | 'percent']}${Number(getStatsQuery.data?.data.data[item]).toFixed(2)}` : `${Number(getStatsQuery.data?.data.data[item]).toFixed(2)}${Symbols[DASHBOARD_ITEMS.find((e) => e.slug == item)!.symbol as 'none' | 'pound' | 'percent']}`}`}
          />
        ))}

        {!getCreditsQuery.isLoading &&
          <DashboardCard
            // key={index}
            icon={"/icons/revenue.png"}
            title={"Wallet Credits"}
            value={`£${getCreditsQuery.data?.data.data.amount}`}
          />
        }
      </div>

      <div className="p-5">
        <div className="flex flex-col xl:flex-row lg:gap-10">

          <JobListSection type={'1'} title="Available Jobs" jobItems={jobsInfinite} savedCard={savedCardQuery.data?.data.data} />

          <div className="w-full lg:max-w-sm flex flex-col">
            <h2 className="text-xl font-semibold mb-4 text-color-17">
              Profile
            </h2>
            <section className="flex-1 p-5 bg-white border border-gray-200 rounded-lg sm:p-8 dark:bg-color-16">
              {!getUserQuery.isLoading && user && <ProfileCompletion data={getUserQuery.data?.data.data} />}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
