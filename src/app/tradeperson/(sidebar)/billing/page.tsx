'use client';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import {useQuery, useMutation} from 'react-query';
// import axiosInstance from '@/app/utils/axiosInstance';
import Payment from '@/components/user/layout/Payment';
import SavedPaymentCard from '@/components/user/layout/SavedPaymentCard';
import {useState} from 'react';
import {Modal, ModalBody, ModalContent, ModalHeader, useDisclosure, Button} from "@nextui-org/react";
import {ImSpinner2} from "react-icons/im";
import axiosInstance from '@/_utils/helpers/axiosInstance';
// import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { IoIosCard } from "react-icons/io";

import { FILTER_ITEMS } from "@/_utils/constant";
import { columnType } from "@/_utils/types";
import BillingCard from "@/components/common/cards/billing-card";
// import DefaultLoader from "@/components/common/loader/default-loader.tsx";
import BaseTable from "@/components/common/table/base-table";
import { ChevronDownIcon } from "@/components/modules/public/chevron-down-icon";
import usePagination from "@/hooks/use-pagination";
import BaseButton from '@/components/common/button/base-button';

const column: columnType[] = [
  {
    title: "S.No",
  },
  {
    title: "Date",
  },
  {
    title: "Job Headline",
  },
  {
    title: "Is Completed",
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

const stripePromise = loadStripe('pk_test_51PdxQzJIYZ5rXPiNWB72z0vGbq85xwfdVqd1PigywiQb5JvId4SaxsqjGh6QAYKGRchAyzXn69tLwh0t7glRVxtV00tW1k9s7V');

export default function UpdateCard() {
    const [clientSecret, setClientSecret] = useState(null);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [page,setPage]=useState(1)

    const getPayments=useQuery(['payments',page],({queryKey})=>axiosInstance.get(`/payment/all/trades-person?page=${queryKey[1]}&limit=10`))
    const savedCardQuery = useQuery(['savedCard'], () => axiosInstance.get('/payment/card'));

    const getClientSecret = useMutation(() => axiosInstance.put('/payment/card'), {
        onSuccess: (data) => {
          console.log('clientsecret',data.data)
            setClientSecret(data.data.data.clientSecret);
        }
    });

    const confirmUpdateCard = () => {
        getClientSecret.mutate(); // Fetch clientSecret when user confirms update
    };


    console.log('secret',clientSecret)

    return (
        <>

<div className="px-5 py-10 max-w-[100vw]">
        <div className="flex flex-col xl:flex-row lg:gap-5">
          <div className="w-full flex flex-col mb-8 lg:mb-0">
            <h2 className="text-xl font-semibold mb-4 text-color-17">
              Billing
            </h2>

            <section className="mb-5 lg:max-w-screen-xl ">
            <p className="font-semibold text-lg md:text-xl">Payment Method</p>

                {savedCardQuery.isFetching ? (
                    <div className={`flex justify-center items-center h-48`}>
                        <ImSpinner2 className="text-4xl animate-spin"/>
                    </div>
                ) : (
                        <>
                        <div className='flex gap-4 flex-wrap'>
                        <div id='card'>
                            {savedCardQuery.data?.data?.data && Object.keys(savedCardQuery.data.data.data).length > 0 ? (
                                <SavedPaymentCard card={savedCardQuery.data.data.data} />
                            ) : (
                                <p className="text-center">No saved payment method found.</p>
                            )}
                        </div>

                        <div onClick={onOpen} className="flex cursor-pointer flex-col gap-2 text-color-5 items-center justify-center border-2 border-dotted border-color-5 bg-[#2CA5FD1A] h-[11.5rem] rounded-xl my-auto">
                            <IoIosCard className='text-2xl' />
                            <p
                                
                                className="px-16 py-2  rounded ">
                                Update Payment Method
                            </p>
                        </div>
                        </div>
                        
                    </>
                )}
            </section>

            <section className="flex-1 p-4 sm:p-8 rounded-md border bg-color-16 text-left text-gray-600">
              {/* <div className="flex gap-5 mb-7">
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
              </div> */}
              {/* <div className="flex justify-between mb-4">
                <span className="text-xs sm:text-sm text-color-14">
                  Showing Results 1-50 Of 141
                </span>
                <span className="text-xs sm:text-sm text-color-14 underline cursor-pointer">
                  Email Activity Report
                </span>
              </div> */}
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
                  {getPayments?.data?.data.data.map((el:any, index:number) => (
                    <tr key={el._id} className="border-b border-stroke text-sm">
                      <td className={` p-2.5 xl:p-5`}>
                        <span className=" truncate text-graydark flex justify-start text-xs 2xl:text-sm">
                          {index+1<10?`0${index+1}`:index+1}
                        </span>
                      </td>
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
                        <span className={`${el.job.isCompleted?"bg-green-200 text-green-400":"bg-red-200 text-red-400"} max-w-[8rem] block text-center p-4 rounded-xl truncate  flex justify-start text-xs 2xl:text-sm`}>
                          {el.job.isCompleted?"Completed":"Not Completed"}
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
              
              <div className='flex gap-4'>
              {page!=getPayments.data?.data.lastPage && <BaseButton onClick={()=>setPage(page+1)}>Next Page</BaseButton> }
              {page!=1 && <BaseButton onClick={()=>setPage(page-1)}>Previous Page</BaseButton> } 
                   
              </div>
              
            </section>
          </div>
        </div>
      </div>
      <Modal
                    size="xl"
                    isOpen={isOpen}
                    backdrop="blur"
                    onClose={onClose}
                    placement="center"
                >
                    <ModalContent>
                        <ModalHeader className="flex flex-col text-xl gap-1">Update Your Card</ModalHeader>
                        <ModalBody className="flex flex-col gap-4 pb-8">
                            {clientSecret ? (
                                <Elements stripe={stripePromise} options={{clientSecret}}>
                                    <Payment/>
                                </Elements>
                            ) : (
                                <><p className="text-sm text-gray-500">
                                    Are you sure you want to update your card ?
                                </p><Button
                                    onPress={confirmUpdateCard}
                                    className="px-16 py-2 bg-color-9 flex rounded text-white w-max">
                                    Confirm Update
                                </Button></>

                            )}
                        </ModalBody>
                    </ModalContent>
                </Modal>
        </>
    );
}
































