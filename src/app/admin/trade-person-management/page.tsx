"use client";

import React, { useState } from "react";

import { columnType } from "@/_utils/types";
import BaseTable from "@/components/common/table/base-table";
import LayoutWrapper from "@/components/modules/dashboard/layout-wrapper";
import usePagination from "@/hooks/use-pagination";
import { Input } from "@nextui-org/input";
import { BiSearch } from "react-icons/bi";
import BaseButton from "@/components/common/button/base-button";
import { useQuery } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import { TRADES } from "@/_utils/enums";
import { useRouter } from "next/navigation";

const column: columnType[] = [
  {
    title: "S.no",
  },
  {
    title: "Email",
  },
  {
    title: "Full Name",
  },
  {
    title: "Contact",
  },
  {
    title: "Trade",
  },
  // {
  //   title: "Order",
  // },
  // {
  //   title: "Amount",
  // },
  
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
export default function TradePersonManagement() {
  const { changePage } = usePagination();
  const [page,setPage]=useState(1)
  const [search,setSearch]=useState('')
  const router=useRouter()
  const getTradepersonQuery=useQuery(['tradepersonsAdmin',page,search],({queryKey})=>axiosInstance.get(`/trades-person/all?page=${queryKey[1]}&limit=10${queryKey[2]?`&searchQuery=${queryKey[2]}`:""}`))
  return (
    <LayoutWrapper
      sectionOneTitle="Tradespeople Management"
      sectionOneChildren={
        <div>
          <h2 className="text-lg font-medium mb-6 text-color-17">
            Tradepeoples List
          </h2>
          <div>
          <Input
          type="text"
          // label="Email"
          onChange={(e)=>{
            setSearch(e.target.value)
            setPage(1)
          }}
          className="w-1/3"
          placeholder="Search for Tradepeoples..."
          // labelPlacement="outside"
          startContent={
            <BiSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
        <BaseTable
            columns={column}
            page={adminData?.page ?? 1}
            lastPage={adminData?.lastPage ?? 1}
            limit={limit}
            currentEntriesLength={adminData?.data.length ?? 1}
            summary={adminData?.total ?? 200}
            changePage={changePage}
          >
            <tbody>
              {getTradepersonQuery?.data?.data.data.map((el:any, index:number) => (
                <tr  key={el._id} className="border-b  border-stroke text-sm">
                  <td onClick={()=>router.push(`/admin/trade-person/${el._id}`)} className={` cursor-pointer p-2.5 xl:p-5`}>
                    <span className=" truncate text-graydark flex justify-start text-xs 2xl:text-sm">
                      {index+1<10?`0${index+1}`:index+1}
                    </span>
                  </td>

                  <td className={` p-2.5 xl:p-5`}>
                    <span className=" truncate text-graydark flex justify-start text-xs 2xl:text-sm">
                      {el.email} 
                    </span>
                  </td>
                  <td className={` p-2.5 xl:p-5`}>
                    <span className=" truncate text-graydark flex justify-start text-xs 2xl:text-sm">
                      {el.firstName} {el.lastName}
                    </span>
                  </td>
                  <td className={` p-2.5 xl:p-5`}>
                    <span className=" truncate text-graydark flex justify-start text-xs 2xl:text-sm">
                      {el.phone}
                    </span>
                  </td>
                  <td className={` p-2.5 xl:p-5`}>
                    <span className=" truncate text-graydark flex justify-start text-xs 2xl:text-sm">
                      {TRADES[el.profile.trade]}
                    </span>
                  </td>

                  {/* <td className={` p-2.5 xl:p-5`}>
                    <span className=" truncate text-graydark flex justify-start text-xs 2xl:text-sm">
                      {el.form}
                    </span>
                  </td>
                  <td className={` p-2.5 xl:p-5`}>
                    <span className=" truncate text-graydark flex justify-start text-xs 2xl:text-sm">
                      {el.amount}
                    </span>
                  </td> */}
                  <td className={` p-2.5 xl:p-5`}>
                  <span className=" truncate text-graydark flex justify-start text-xs 2xl:text-sm">
                  <BaseButton
            as="link"
            link={`/admin/verification-requests/${el._id}`}
            extraClass="max-w-[190px] bg-color-9 "
          >
           Verify
          </BaseButton>
                    </span>
                  
                  </td>
                </tr>
              ))}
            </tbody>
          </BaseTable>
          {getTradepersonQuery.data?.data && <div className="flex justify-center gap-4">
            {page!= getTradepersonQuery.data?.data.lastPage &&  <BaseButton onClick={()=>setPage(page+1)}>
            Next Page
            </BaseButton>}
            {page!=1 &&  <BaseButton onClick={()=>setPage(page-1)}>
            Previous Page
            </BaseButton>}
            </div>}
          </div>
          
        </div>
      }
    />
  );
}
