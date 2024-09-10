'use client'
import { DASHBOARD_ITEMS, JOB_ITEMS } from "@/_utils/constant";
import DashboardCard from "@/components/common/cards/dashboard-card";
import JobListSection from "@/components/modules/tradeperson/job-list-section";
import ProfileCompletion from "@/components/modules/tradeperson/profile-completion";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useQuery } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";


export default function Dashboard() {
  const [user,setUser]=useState<any>(null)
  useEffect(()=>{
    const user=JSON.parse(Cookies.get('userData')!)
    console.log(user)
    setUser(user)
  },[])

  const getUserQuery=useQuery(['tradePerson',user?._id],({queryKey})=>axiosInstance.get(`/user/?userId=${queryKey[1]}`),{
    enabled:!!user
  })

  const getStatsQuery=useQuery(['stats'],()=>axiosInstance.get('/trades-person/stats'))
  return (
    <>
      <div className="flex flex-wrap items-center w-full text-gray-800 p-10 bg-gray-100 gap-10">
        {getStatsQuery.data?.data && Object.keys(getStatsQuery.data?.data.data).map((item:any, index) => (
          <DashboardCard
            key={index}
            icon={DASHBOARD_ITEMS.find((e)=>e.slug==item)!.icon}
            title={DASHBOARD_ITEMS.find((e)=>e.slug==item)!.title}
            value={getStatsQuery.data?.data.data[item]}
          />
        ))}
      </div>

      <div className="p-5">
        <div className="flex flex-col xl:flex-row lg:gap-10">
          
          <JobListSection title="Available Jobs" jobItems={JOB_ITEMS} />

          <div className="w-full lg:max-w-sm flex flex-col">
            <h2 className="text-xl font-semibold mb-4 text-color-17">
              Profile
            </h2>
            <section className="flex-1 p-5 bg-white border border-gray-200 rounded-lg sm:p-8 dark:bg-color-16">
              {!getUserQuery.isLoading && user &&  <ProfileCompletion data={getUserQuery.data?.data.data}/>}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
