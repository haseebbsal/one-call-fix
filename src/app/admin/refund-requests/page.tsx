'use client'
import React, { useState } from "react";

import RefundCard from "@/components/common/cards/refund-card";
import LayoutWrapper from "@/components/modules/dashboard/layout-wrapper";
import { useQuery } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import Link from "next/link";
import BaseButton from "@/components/common/button/base-button";

export default function RefundRequests() {
  const [page,setPage]=useState(1)
  const getRefundsQuery=useQuery(['getAdminRefunds',page],({queryKey})=>axiosInstance.get(`/refund/all?page=${queryKey[1]}&limit=10`))
  return (
    <LayoutWrapper
      sectionOneTitle="Refund Requests"
      sectionOneChildren={
        <div>
          <h2 className="text-lg font-medium mb-6 text-color-17">
            Jobs List For Refund
          </h2>
          <div className="flex flex-col gap-5">
            {getRefundsQuery.data?.data.data.map((el:any) => (
              <Link href={`/admin/refund-requests/${el._id}`} className="pb-6 border-b border-b-color-19" key={el}>
                <RefundCard data={el}  description="Great service competitively priced. Lexus was great and very detail oriented hope that's who they send next time too!" />
              </Link>
            ))}
          </div>
          <div className="flex justify-center gap-8">
                {page!=getRefundsQuery.data?.data.lastPage && <BaseButton onClick={()=>setPage(page+1)}>Next Page</BaseButton>}
                {page!=1 && <BaseButton onClick={()=>setPage(page-1)}>Previous Page</BaseButton>}

              </div>
        </div>
      }
    />
  );
}
