'use client'
import React from "react";

import { columnType } from "@/_utils/types";
import BaseTable from "@/components/common/table/base-table";
import LayoutWrapper from "@/components/modules/dashboard/layout-wrapper";
import usePagination from "@/hooks/use-pagination";
import { Input } from "@nextui-org/input";
import { BiSearch } from "react-icons/bi";

const column: columnType[] = [
  {
    title: "Date",
  },
  {
    title: "Activity",
  },
  {
    title: "Description",
  },
  {
    title: "Form",
  },
  {
    title: "Order",
  },
  {
    title: "Amount",
  },
];

const adminData = {
  page: 1,
  lastPage: 5,
  total: 50,
  data: [
    {
      _id: "1",
      date: "5/1/2024",
      activity: "Expense",
      description: "Paid with earnings",
      form: "NY",
      order: "lorem ipsum lorem ipsum",
      amount: "-$7.28",
    },
    {
      _id: "2",
      date: "5/1/2024",
      activity: "Expense",
      description: "Paid with earnings",
      form: "NY",
      order: "lorem ipsum lorem ipsum",
      amount: "-$7.28",
    },
    {
      _id: "3",
      date: "5/1/2024",
      activity: "Expense",
      description: "Paid with earnings",
      form: "NY",
      order: "lorem ipsum lorem ipsum",
      amount: "-$7.28",
    },
    {
      _id: "4",
      date: "5/1/2024",
      activity: "Expense",
      description: "Paid with earnings",
      form: "NY",
      order: "lorem ipsum lorem ipsum",
      amount: "-$7.28",
    },
    {
      _id: "5",
      date: "5/1/2024",
      activity: "Expense",
      description: "Paid with earnings",
      form: "NY",
      order: "lorem ipsum lorem ipsum",
      amount: "-$7.28",
    },
    {
      _id: "6",
      date: "5/1/2024",
      activity: "Expense",
      description: "Paid with earnings",
      form: "NY",
      order: "lorem ipsum lorem ipsum",
      amount: "-$7.28",
    },
    {
      _id: "7",
      date: "5/1/2024",
      activity: "Expense",
      description: "Paid with earnings",
      form: "NY",
      order: "lorem ipsum lorem ipsum",
      amount: "-$7.28",
    },
  ],
};


const limit = 10;


export default function JobsManagement() {
  const { changePage } = usePagination();
  return (
    <>
    <LayoutWrapper
      sectionOneTitle="Jobs Management"
      sectionOneChildren={
        <div>
          <h2 className="text-lg font-medium mb-6 text-color-17">
            Current Jobs List
          </h2>
          <div>
          <Input
          type="email"
          // label="Email"
          className="w-1/3"
          placeholder="Search for Tradepeoples..."
          // labelPlacement="outside"
          startContent={
            <BiSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
        <div className=" flex flex-col gap-2 border-b-2 border-gray-200  p-4 mb-6">
          <div className="flex items-start ">
            <img
              className="h-10 w-10"
              src="/icons/jobs-card-icon.png"
              alt="Job Icon"
            />
            <div className="ml-4 flex flex-col w-full gap-2">
              <h2 className="text-lg font-semibold text-gray-900">
                {/* {getUserQuery.data?.data.data.headline} */}
                Headline
              </h2>
              <p className="text-sm text-blue-500">
                {/* {Number(getUserQuery.data?.data.data.distance).toFixed(2)} miles away */}
                miles away
                </p>
                <div className="flex items-center justify-between w-full">
                <p className="text-gray-700 ">
            {/* {getUserQuery.data?.data.data.issue} */}
            issue
            
            </p>
            <p className="text-sm text-gray-500">
            {/* Posted {((new Date().getMonth()-new Date(getUserQuery.data?.data.data.createdAt).getMonth())*30 + (new Date().getDate()-new Date(getUserQuery.data?.data.data.createdAt).getDate()))} days ago */}
            posted
            </p>
                </div>
                
          

            <div className="py-1 w-max  rounded-lg text-sm font-semibold ">
                      {/* £{e.price} */}
                      <p>Contact <span className="text-color-9 ml-4">+123456789</span></p>
                    </div>
            </div>
          </div>
          
        </div>
        <div className=" flex flex-col gap-2 border-b-2 border-gray-200  p-4 mb-6">
          <div className="flex items-start ">
            <img
              className="h-10 w-10"
              src="/icons/jobs-card-icon.png"
              alt="Job Icon"
            />
            <div className="ml-4 flex flex-col w-full gap-2">
              <h2 className="text-lg font-semibold text-gray-900">
                {/* {getUserQuery.data?.data.data.headline} */}
                Headline
              </h2>
              <p className="text-sm text-blue-500">
                {/* {Number(getUserQuery.data?.data.data.distance).toFixed(2)} miles away */}
                miles away
                </p>
                <div className="flex items-center justify-between w-full">
                <p className="text-gray-700 ">
            {/* {getUserQuery.data?.data.data.issue} */}
            issue
            
            </p>
            <p className="text-sm text-gray-500">
            {/* Posted {((new Date().getMonth()-new Date(getUserQuery.data?.data.data.createdAt).getMonth())*30 + (new Date().getDate()-new Date(getUserQuery.data?.data.data.createdAt).getDate()))} days ago */}
            posted
            </p>
                </div>
                
          

            <div className="py-1 w-max  rounded-lg text-sm font-semibold ">
                      {/* £{e.price} */}
                      <p>Contact <span className="text-color-9 ml-4">+123456789</span></p>
                    </div>
            </div>
          </div>
          
        </div>
          </div>
          
        </div>
      }
    />
    </>
  );
}
