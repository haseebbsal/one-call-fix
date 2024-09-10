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

interface BidFormModelProps {
  openModal: boolean;
}
export const BidFormModel: React.FC<BidFormModelProps> = ({ openModal }) => {
  const router = useRouter();
  // const dispatch = useAppDispatch();
  // const { data }: any = useAppSelector((state) => state.form);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const onSubmit = (bid: any) => {
    let bidData: any = {
      directQuote: {
        quote: bid.quote,
        vatIncluded: bid.vatInclude == "yes" ? true : false,
        depositAmount: bid.depositAmount,
        timelineType: JobTimelineType[bid.timelineType],
        timelineValue: bid.timelineValue,
      },
    };
    // dispatch(
    //   setFormData({
    //     ...bidData,
    //     ...data,
    //   }),
    // );
    onClose();
    router.push(`/tradeperson/bid-submission`);
  };
  return (
    <>
      <BaseModal
        isOpen={openModal}
        onOpenChange={onOpenChange}
        size="md"
        hideCloseButton={true}
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
              placeholder="$53"
              isRequired
              {...register("quote", { required: true })}
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
