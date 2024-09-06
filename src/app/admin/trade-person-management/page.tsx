"use client";

import React from "react";

import { columnType } from "@/_utils/types";
import BaseTable from "@/components/common/table/base-table";
import LayoutWrapper from "@/components/modules/dashboard/layout-wrapper";
import usePagination from "@/hooks/use-pagination";

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
export default function TradePersonManagement() {
  const { changePage } = usePagination();
  return (
    <LayoutWrapper
      sectionOneTitle="Tradespeople Management"
      sectionOneChildren={
        <div>
          <h2 className="text-lg font-medium mb-6 text-color-17">
            Tradepeoples List
          </h2>
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
              {adminData?.data.map((el, index) => (
                <tr key={el._id} className="border-b border-stroke text-sm">
                  <td className={` p-2.5 xl:p-5`}>
                    <span className=" truncate text-graydark flex justify-start text-xs 2xl:text-sm">
                      {el.date}
                    </span>
                  </td>
                  <td className={` p-2.5 xl:p-5`}>
                    <span className=" truncate text-graydark flex justify-start text-xs 2xl:text-sm">
                      {el.activity}
                    </span>
                  </td>
                  <td className={` p-2.5 xl:p-5`}>
                    <span className=" truncate text-graydark flex justify-start text-xs 2xl:text-sm">
                      {el.description || "-"}
                    </span>
                  </td>

                  <td className={` p-2.5 xl:p-5`}>
                    <span className=" truncate text-graydark flex justify-start text-xs 2xl:text-sm">
                      {el.form}
                    </span>
                  </td>
                  <td className={` p-2.5 xl:p-5`}>
                    <span className=" truncate text-graydark flex justify-start text-xs 2xl:text-sm">
                      {el.order}
                    </span>
                  </td>
                  <td className={` p-2.5 xl:p-5`}>
                    <span className=" truncate text-graydark flex justify-start text-xs 2xl:text-sm">
                      {el.amount}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </BaseTable>
        </div>
      }
    />
  );
}
