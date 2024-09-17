"use client";

import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";

import { FILTER_ITEMS } from "@/_utils/constant";
import { columnType } from "@/_utils/types";
import BillingCard from "@/components/common/cards/billing-card";
// import DefaultLoader from "@/components/common/loader/default-loader.tsx";
import BaseTable from "@/components/common/table/base-table";
import { ChevronDownIcon } from "@/components/modules/public/chevron-down-icon";
import usePagination from "@/hooks/use-pagination";
import NewBillingCard from "@/components/common/cards/new-billing-card";
import { useQuery } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import { useEffect, useState } from "react";

const column: columnType[] = [
  {
    title: "Date",
  },
  {
    title: "Job Headline",
  },
  {
    title: "Amount",
  },
  {
    title: "User Name",
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
import Cookies from 'js-cookie'
import BaseButton from "@/components/common/button/base-button";
export default function FinancialManagement() {
  // const { page, changePage } = usePagination();
  const [page,setPage]=useState(1)
  const [user,setUser]=useState<any>(null)
  useEffect(()=>{
    const user=JSON.parse(Cookies.get('userData')!)
    console.log(user)
    setUser(user)
  },[])
  const getPaymentsAdmin=useQuery(['paymentsAdmin',page],({queryKey})=>axiosInstance.get(`/payment/all/trades-person?page=${queryKey[1]}&limit=10`),{
    enabled:!!user
  })

  const getPaymentStats=useQuery(['paymentStatsAdmin'],()=>axiosInstance.get('/payment/stats'))

  return (
    <>
      <div className="px-5 py-10 max-w-[100vw]">
        <div className="flex flex-col xl:flex-row lg:gap-5">
          <div className="w-full flex flex-col mb-8 lg:mb-0">
            <h2 className="text-xl font-semibold mb-4 text-color-17">
              Financial Management
            </h2>

            <section className="mb-5 lg:max-w-screen-xl ">
              <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-7">
                <BillingCard title={"Total Balance"} value={getPaymentStats.data?.data.data.totalBalance} />
                <BillingCard title={"Total Completed Jobs"} value={getPaymentStats.data?.data.data.totalCompletedJobs} />
                {/* <BillingCard title={"Monthly Revenue"} value={"2,388.00"} /> */}
                {/* <NewBillingCard title="" value={"2,388.00"} secondTitle="Revenue From Completed Jobs"/> */}
                {/* <BillingCard title={"Expenses To Date"} value={"5,345.00"} /> */}
              </div>
            </section>

            <section className="flex-1 p-4 sm:p-8 rounded-md border bg-color-16 text-left text-gray-600">
              
              
              <BaseTable
                columns={column}
                page={adminData?.page ?? 1}
                lastPage={adminData?.lastPage ?? 1}
                limit={limit}
                currentEntriesLength={adminData?.data.length ?? 1}
                summary={adminData?.total ?? 200}
                // changePage={changePage}
              >
                <tbody>
                {getPaymentsAdmin?.data?.data.data.map((el:any, index:number) => (
                    <tr key={el._id} className="border-b border-stroke text-sm">
                      <td className={` p-2.5 xl:p-5`}>
                        <span className=" truncate text-graydark flex justify-start text-xs 2xl:text-sm">
                          {new Date(el.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      

                      <td className={` p-2.5 xl:p-5`}>
                        <span className=" truncate text-graydark flex justify-start text-xs 2xl:text-sm">
                          {el.job.headline}
                        </span>
                      </td>
                      
                      <td className={` p-2.5 xl:p-5`}>
                        <span className=" truncate text-graydark flex justify-start text-xs 2xl:text-sm">
                          {el.amount}
                        </span>
                      </td>

                      <td className={` p-2.5 xl:p-5`}>
                        <span className=" truncate text-graydark flex justify-start text-xs 2xl:text-sm">
                          {el.user.firstName} {el.user.lastName}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </BaseTable>
              <div className="flex justify-center gap-8">
                {page!=getPaymentsAdmin.data?.data.lastPage && <BaseButton onClick={()=>setPage(page+1)}>Next Page</BaseButton>}
                {page!=1 && <BaseButton onClick={()=>setPage(page-1)}>Previous Page</BaseButton>}

              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
