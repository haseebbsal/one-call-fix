"use client";
import { Image } from "@nextui-org/image";
import { useDisclosure } from "@nextui-org/modal";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import BaseButton from "@/components/common/button/base-button";
import BaseTextArea from "@/components/common/form/base-textarea";
import BaseModal from "@/components/common/modal/base-modal";
import LayoutWrapper from "@/components/modules/dashboard/layout-wrapper";
import { Bar, Line, Pie, PolarArea } from "react-chartjs-2"
import { Chart, ArcElement, RadialLinearScale, CategoryScale, LinearScale, PointElement,LineElement,BarElement } from 'chart.js'
import { Tab, Tabs } from "@nextui-org/tabs";
import { useQuery } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import { config } from "@/_utils/helpers/config";
import { TRADES } from "@/_utils/enums";
Chart.register(RadialLinearScale);
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(ArcElement);
Chart.register(PointElement);
Chart.register(LineElement);
Chart.register(BarElement);
import Cookies from 'js-cookie'
import { getTimeAgo } from "@/_utils/helpers";
const options: any = {
  responsive: true,
  plugins: {
      legend: {
          position: "bottom",
      },
      title: {
          display: true,
          text: "Pie Chart Example",
      },
  },
};

export default function TradePerson(datas:any) {
  const {
    isOpen: isWarningOpen,
    onOpenChange: onWarningOpenChange,
    onOpen: onWarningOpen,
    onClose: onWarningClose,
  } = useDisclosure();
  const {
    isOpen: isSuspendOpen,
    onOpenChange: onSuspendOpenChange,
    onOpen: onSuspendOpen,
    onClose: onSuspendClose,
  } = useDisclosure();
  const { control } = useForm();
  const [type,setType]=useState(2)
  const [page,setPage]=useState(1)
  // const [user,setUser]=useState<any>(null)
  // useEffect(()=>{
  //   const user=JSON.parse(Cookies.get('userData')!)
  //   console.log(user)
  //   setUser(user)
  // },[])
  const getJobsAdminQuery=useQuery(['getJobsAdmin',type,page,datas.params.userId],({queryKey})=>axiosInstance.get(`/job/admin?page=${queryKey[2]}&limit=6&type=${queryKey[1]}&userId=${queryKey[3]}`))
  const getUserQuery=useQuery(['getIndividualTradpersonAdmin',datas.params.userId],({queryKey})=>axiosInstance.get(`/user/?userId=${queryKey[1]}`))
  return (
    <>
      <BaseModal
        isOpen={isSuspendOpen}
        onOpenChange={onSuspendOpenChange}
        size="md"
        header="System Generated Request"
        modalHeaderImage="/images/modal-danger.png"
      >
        <div className="flex flex-col items-center mb-7">
          <h5 className="text-color-20 text-sm lg:text-base pb-4 text-center">
            Are You sure you want to suspend this user?
          </h5>
          <BaseButton
            type="button"
            onClick={() => onSuspendClose()}
            extraClass="bg-color-9 !max-w-[350px] w-full text-white"
          >
            Suspend
          </BaseButton>
        </div>
      </BaseModal>
      <BaseModal
        isOpen={isWarningOpen}
        onOpenChange={onWarningOpenChange}
        size="md"
        header="Warning"
      >
        <form className="flex flex-col items-center mb-7">
          <BaseTextArea
            name={"message"}
            rows={4}
            control={control}
            placeholder="Write Warning to user...."
          />
          <BaseButton
            type="button"
            onClick={() => onWarningClose()}
            extraClass="bg-color-9 !max-w-[350px] w-full text-white mt-4"
          >
            Send
          </BaseButton>
        </form>
      </BaseModal>
      <div className="flex flex-col gap-4 p-4">
      <h5 className="capitalize text-lg lg:text-xl font-semibold text-color-17 ">
          Tradespeople Management
        </h5>
        <div className="flex sm:flex-nowrap flex-wrap gap-8">
          <div className="p-8 w-full flex flex-col gap-4 bg-white rounded-lg">
            <div className="flex items-center justify-between ">
              <h2 className="text-lg font-medium text-color-17">Details</h2>
              {/* <Link href={"/admin/edit-trade-person/abc"}>
                <Image
                  src="/icons/edit.png"
                  alt="Edit"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </Link> */}
            </div>
            <div className="">
              <Image
                src={getUserQuery.data?.data.data.user.profilePicture.includes('placeholder')?"/images/profile-photo.png":`${config.mediaURL}/${getUserQuery.data?.data.data.user.profilePicture}`}
                alt="Profile"
                className="object-contain rounded-full"
                width={104}
                height={104}
              />
            </div>
            <div className="flex flex-col lg:flex-row lg:flex-wrap lg:items-start gap-5">
              <div className="flex-1 flex flex-col gap-1.5">
                <h6 className="text-color-20 text-[15px] font-medium">Name</h6>
                <h5 className="text-color-17 text-lg font-medium">
                  {getUserQuery.data?.data.data.user.firstName} {getUserQuery.data?.data.data.user.lastName}
                </h5>
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <h6 className="text-color-20 text-[15px] font-medium">
                  Contact Info
                </h6>
                <h5 className="text-color-17 text-lg font-medium">
                  {getUserQuery.data?.data.data.user.phone}
                </h5>
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <h6 className="text-color-20 text-[15px] font-medium">Trade</h6>
                <p className="rounded-full text-color-24 bg-color-25 p-3 max-w-[130px] w-full text-center text-sm">
                  {TRADES[getUserQuery.data?.data.data.profile.trade]}
                </p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:flex-wrap lg:items-start gap-5">
              <div className="flex-1 flex flex-col gap-1.5">
                <h6 className="text-color-20 text-[15px] font-medium">
                  Reviews
                </h6>
                <h5 className="text-color-17 text-lg font-medium">
                  {getUserQuery.data?.data.data.review.average}/5
                </h5>
                <h5 className="text-color-17 text-lg font-medium">
                  Total Reviews: {getUserQuery.data?.data.data.review.total}
                </h5>
              </div>
            </div>
            <div className="flex items-center gap-2.5 flex-col lg:flex-row ">
              {/* <BaseButton
                type="button"
                onClick={() => onSuspendOpen()}
                extraClass="!w-max  bg-color-9 "
              >
                Suspend/Unsuspend
              </BaseButton> */}
              {/* <BaseButton
                type="button"
                onClick={() => onWarningOpen()}
                extraClass="!max-w-[220px] w-full text-color-9 border bg-transparent border-color-9 "
              >
                Send Warning/Notification
              </BaseButton> */}
            </div>
          </div>
          {/* <div className=" flex flex-col gap-2 p-8 bg-white rounded-lg">
          <h5 className="capitalize text-lg lg:text-xl font-semibold text-color-17 ">
          Performance
        </h5>
            <div className="h-full">
            <Line className="!h-full !w-full" options={options} data={{
              labels: ['Jan',"Feb",'Mar','Apr'],
              datasets: [{
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              }]
            }} />
            </div>
            
          </div> */}
        </div>
        <div className="p-4 flex flex-col gap-2 bg-white rounded-lg">
        <h5 className="capitalize text-lg lg:text-xl font-semibold text-color-17 ">
          Job Activities
        </h5>
        <Tabs onSelectionChange={(key:any)=>{
          setType(key)
          setPage(1)
        }
        } classNames={{
              // tabList: "group-data-[selected=true]:bg-green-500",
              // tab: `group-data-[selected=true]:bg-green-500`,
              tabContent:
                " text-color-20 p-4 ",
              cursor:
                "border-2 border-color-9 group-data-[selected=true]:bg-[#EAEDFF] ",
            }} key={'light'} variant={'light'} aria-label="Tabs variants">
          <Tab key="2" title="Jobs Interested In">
            <>
            {getJobsAdminQuery.data?.data.data.map((e:any)=><div className="bg-blue-50 flex flex-col gap-2 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start ">
            <img
              className="h-10 w-10"
              src="/icons/jobs-card-icon.png"
              alt="Job Icon"
            />
            <div className="ml-4 flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-gray-900">
                {/* {getUserQuery.data?.data.data.headline} */}
                {/* Headline */}
                {e.headline}
              </h2>
              <p className="text-sm text-blue-500">
                {/* {Number(getUserQuery.data?.data.data.distance).toFixed(2)} miles away */}
                {e.distance} miles away
                </p>
                <p className="text-gray-700 ">
            {/* {getUserQuery.data?.data.data.issue} */}
            {/* issue */}
            {e.issue}
            
            </p>
          <p className="text-sm text-gray-500">
            Posted {getTimeAgo(e.createdAt)}
            {/* Posted {((new Date().getMonth()-new Date(getUserQuery.data?.data.data.createdAt).getMonth())*30 + (new Date().getDate()-new Date(getUserQuery.data?.data.data.createdAt).getDate()))} days ago */}
            {/* posted */}
            </p>

            <div className="py-1 w-max px-9 border-2 rounded-lg text-sm font-semibold text-color-15">
                      £{e.price}
                      {/* price */}
                    </div>
            </div>
          </div>
          
        </div>)
        }
        {getJobsAdminQuery.data?.data && <div className="flex justify-center gap-4">
            {page!= getJobsAdminQuery.data?.data.lastPage && !!getJobsAdminQuery.data?.data.lastPage&& <BaseButton onClick={()=>setPage(page+1)}>
            Next Page
            </BaseButton>}
            {page!=1 &&  <BaseButton onClick={()=>setPage(page-1)}>
            Previous Page
            </BaseButton>}
            </div>}
            </>
            </Tab>
          <Tab key="3" title="Shortlisted">
          <>
            {getJobsAdminQuery.data?.data.data.map((e:any)=><div className="bg-blue-50 flex flex-col gap-2 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start ">
            <img
              className="h-10 w-10"
              src="/icons/jobs-card-icon.png"
              alt="Job Icon"
            />
            <div className="ml-4 flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-gray-900">
                {/* {getUserQuery.data?.data.data.headline} */}
                {/* Headline */}
                {e.headline}
              </h2>
              <p className="text-sm text-blue-500">
                {/* {Number(getUserQuery.data?.data.data.distance).toFixed(2)} miles away */}
                {e.distance} miles away
                </p>
                <p className="text-gray-700 ">
            {/* {getUserQuery.data?.data.data.issue} */}
            {/* issue */}
            {e.issue}
            
            </p>
          <p className="text-sm text-gray-500">
            Posted {getTimeAgo(e.createdAt)}
            {/* Posted {((new Date().getMonth()-new Date(getUserQuery.data?.data.data.createdAt).getMonth())*30 + (new Date().getDate()-new Date(getUserQuery.data?.data.data.createdAt).getDate()))} days ago */}
            {/* posted */}
            </p>

            <div className="py-1 w-max px-9 border-2 rounded-lg text-sm font-semibold text-color-15">
                      £{e.price}
                      {/* price */}
                    </div>
            </div>
          </div>
          
        </div>)
        }
        {getJobsAdminQuery.data?.data && <div className="flex justify-center gap-4">
            {page!= getJobsAdminQuery.data?.data.lastPage && !!getJobsAdminQuery.data?.data.lastPage&&   <BaseButton onClick={()=>setPage(page+1)}>
            Next Page
            </BaseButton>}
            {page!=1 &&  <BaseButton onClick={()=>setPage(page-1)}>
            Previous Page
            </BaseButton>}
            </div>}
            </>
            </Tab>
          <Tab key="4" title="Won">
          <>
            {getJobsAdminQuery.data?.data.data.map((e:any)=><div className="bg-blue-50 flex flex-col gap-2 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start ">
            <img
              className="h-10 w-10"
              src="/icons/jobs-card-icon.png"
              alt="Job Icon"
            />
            <div className="ml-4 flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-gray-900">
                {/* {getUserQuery.data?.data.data.headline} */}
                {/* Headline */}
                {e.headline}
              </h2>
              <p className="text-sm text-blue-500">
                {/* {Number(getUserQuery.data?.data.data.distance).toFixed(2)} miles away */}
                {e.distance} miles away
                </p>
                <p className="text-gray-700 ">
            {/* {getUserQuery.data?.data.data.issue} */}
            {/* issue */}
            {e.issue}
            
            </p>
          <p className="text-sm text-gray-500">
            Posted {getTimeAgo(e.createdAt)}
            {/* Posted {((new Date().getMonth()-new Date(getUserQuery.data?.data.data.createdAt).getMonth())*30 + (new Date().getDate()-new Date(getUserQuery.data?.data.data.createdAt).getDate()))} days ago */}
            {/* posted */}
            </p>

            <div className="py-1 w-max px-9 border-2 rounded-lg text-sm font-semibold text-color-15">
                      £{e.price}
                      {/* price */}
                    </div>
            </div>
          </div>
          
        </div>)
        }
        {getJobsAdminQuery.data?.data && <div className="flex justify-center gap-4">
            {page!= getJobsAdminQuery.data?.data.lastPage && !!getJobsAdminQuery.data?.data.lastPage  &&  <BaseButton onClick={()=>setPage(page+1)}>
            Next Page
            </BaseButton>}
            {page!=1 &&  <BaseButton onClick={()=>setPage(page-1)}>
            Previous Page
            </BaseButton>}
            </div>}
            </>
            </Tab>

        </Tabs>
        </div>
      </div>
      
      
    </>
  );
}
