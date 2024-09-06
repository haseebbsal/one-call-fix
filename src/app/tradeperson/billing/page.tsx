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

export default function BillingList() {
  const { page, changePage } = usePagination();

  return (
    <>
      <div className="px-5 py-10 max-w-[100vw]">
        <div className="flex flex-col xl:flex-row lg:gap-5">
          <div className="w-full flex flex-col mb-8 lg:mb-0">
            <h2 className="text-xl font-semibold mb-4 text-color-17">
              Billing
            </h2>

            <section className="mb-5 lg:max-w-screen-xl ">
              <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-7">
                <BillingCard title={"Total Balance"} value={"25,324.01"} />
                <BillingCard title={"This Week Earnings"} value={"2,388.00"} />
                <BillingCard title={"Expenses To Date"} value={"5,345.00"} />
              </div>
            </section>

            <section className="flex-1 p-4 sm:p-8 rounded-md border bg-color-16 text-left text-gray-600">
              <div className="flex gap-5 mb-7">
                <Dropdown>
                  <DropdownTrigger className="hidden sm:flex">
                    <Button
                      endContent={<ChevronDownIcon className="text-small" />}
                      variant="bordered"
                      radius="sm"
                      className="border-2 border-color-12 text-color-12 font-semibold"
                    >
                      Date Range
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    closeOnSelect={false}
                    selectionMode="multiple"
                  >
                    {FILTER_ITEMS.map((item) => (
                      <DropdownItem key={item.id} className="capitalize">
                        {item.value}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <Dropdown>
                  <DropdownTrigger className="hidden sm:flex">
                    <Button
                      endContent={<ChevronDownIcon className="text-small" />}
                      variant="bordered"
                      radius="sm"
                      className="border-2 border-color-12 text-color-12 font-semibold"
                    >
                      Activity
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    closeOnSelect={false}
                    selectionMode="multiple"
                  >
                    {FILTER_ITEMS.map((item) => (
                      <DropdownItem key={item.id} className="capitalize">
                        {item.value}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-xs sm:text-sm text-color-14">
                  Showing Results 1-50 Of 141
                </span>
                <span className="text-xs sm:text-sm text-color-14 underline cursor-pointer">
                  Email Activity Report
                </span>
              </div>
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
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
