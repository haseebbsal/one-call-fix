"use client";

import BaseModal from "@/components/common/modal/base-modal";
import { useDisclosure } from "@nextui-org/modal";
import { useForm } from "react-hook-form";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import { setFormData } from "../../../lib/features/formDataSlice";
import { JobTimelineType } from "@/_utils/enums";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { Spacer } from "@nextui-org/spacer";
import React from "react";
import { useMutation } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import toast from "react-hot-toast";
import BaseTextArea from "@/components/common/form/base-textarea";

interface BidFormModelProps {
  openModal: boolean;
  setQuoteModal:React.Dispatch<React.SetStateAction<boolean>>
  jobid?:string
  setDataPayment?:any,
  dataPayment?:any
}
export const BidFormModel: React.FC<BidFormModelProps> = ({ openModal ,setQuoteModal,jobid,setDataPayment,dataPayment}) => {
  const router = useRouter();
  // const dispatch = useAppDispatch();
  // const { data }: any = useAppSelector((state) => state.form);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control
  } = useForm();
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  const createBidMutation=useMutation((data:any)=>axiosInstance.post('/bid',data),{
    onSuccess(data, variables, context) {
      console.log('created bid',data.data)
    },
    onError(error:any) {
      if (Array.isArray(error.response.data.message)) {
        toast.error(error.response.data.message[0]);
    } else {
        toast.error(error.response.data.message);
    }
    },
  })
  const onSubmit = (bid: any) => {
    let bidData: any = {
      "jobId": jobid,
    "quoteType": 2,
    // message:bid.message,
    // "useWalletCredits": bid.walletCredits=='1'?true:false,
      directQuote: {
        quote: Number(bid.quote),
        vatIncluded: bid.vatIncluded == "1" ? true : false,
        depositAmount: Number(bid.depositAmount),
        timelineType: Number(bid.timelineType),
        timelineValue: Number(bid.timelineValue),
      },
    };

    setDataPayment(bidData)
    setQuoteModal(false)

    // console.log('biddata',bidData)
    // createBidMutation.mutate(bidData)

    // dispatch(
    //   setFormData({
    //     ...bidData,
    //     ...data,
    //   }),
    // );
    // onClose();
    // router.push(`/tradeperson/bid-submission`);
  };

  console.log('dataPayment',dataPayment)
  return (
    <>
      <BaseModal
        isOpen={openModal}
        onOpenChange={onOpenChange}
        size="md"
        onClose={()=>{
          setQuoteModal(false)
        }}
        // hideCloseButton={true}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Spacer y={1} />
          <div>
            <label
              htmlFor="input1"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Quote
            </label>
            <Input
              type="number"
              id="input1"
              isInvalid={errors.quote as any}
              errorMessage={errors.quote?.message as any}
              placeholder="£53"
              isRequired
              {...register("quote", { required: true ,
                // validate:(value)=>value<=dataPayment.data?.data.data.price || "Quote Should Not Exceed Job Price"
              })}
            />
          </div>

          

          <Spacer y={1} />
          <div>
            <label
              htmlFor="dropdown1"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Is VAT Included
            </label>
            <Select
              id="dropdown1"
              placeholder="Include VAT"
              isRequired
              {...register("vatIncluded", { required: true })}
            >
              <SelectItem key="1" value="yes">
                Yes
              </SelectItem>
              <SelectItem key="2" value="no">
                No
              </SelectItem>
            </Select>
          </div>

          {/* <Spacer y={1} />
          <div>
            <label
              htmlFor="dropdown4"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Use Wallet Credits
            </label>
            <Select
              id="dropdown4"
              placeholder="Use Wallet Credits"
              isRequired
              {...register("walletCredits", { required: true })}
            >
              <SelectItem key="1" value="yes">
                Yes
              </SelectItem>
              <SelectItem key="0" value="no">
                No
              </SelectItem>
            </Select>
          </div> */}

          <Spacer y={1} />
          <div>
            <label
              htmlFor="input3"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Deposit Amount
            </label>
            <Input
              type="number"
              id="input3"
              placeholder="$53"
              isRequired
              {...register("depositAmount", { required: true })}
            />
          </div>

          <Spacer y={1} />
          <div>
            <label
              htmlFor="durationValue"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Job Duration
            </label>
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                id="durationValue"
                placeholder="Enter number"
                isRequired
                {...register("timelineValue", { required: true })}
              />
              <Select
                id="durationUnit"
                placeholder="Select Duration"
                isRequired
                {...register("timelineType", { required: true })}
              >
                <SelectItem key="1" value="Hours">
                  Hours
                </SelectItem>
                <SelectItem key="2" value="Days">
                  Days
                </SelectItem>
              </Select>
            </div>
          </div>

          <Spacer y={2} />
          <Button type="submit" color="primary">
            Submit
          </Button>
        </form>
      </BaseModal>
    </>
  );
};
