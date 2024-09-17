'use client'
// import { Image } from "@nextui-org/image";
import Image from "next/image";

import { COMPLAINT_STATUS } from "@/_utils/enums";
import BaseButton from "@/components/common/button/base-button";
import ReviewStar from "@/components/modules/public/review-star";
import BaseModal from "../modal/base-modal";
import { useDisclosure } from "@nextui-org/modal";
import BaseTextArea from "../form/base-textarea";
import { useForm } from "react-hook-form";

interface Props {
  description: string;
  title: string;
  status: COMPLAINT_STATUS;
  onClick?: () => void;
}
const SUCCESS_CLASS = "text-[#1EA624] bg-[#C9FFD5]";
const ERROR_CLASS = "text-[#FF0000] bg-[#FFC9C9]";
export default function ComplaintCard({
  title,
  description,
  status,
  onClick,
}: Props) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const {control}=useForm()

  return (
    <>
    <BaseModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="md"
        // header="Complaint 01"
        // modalHeaderImage="/images/modal-success.png"
      >
        
        <form className="flex flex-col gap-2 mb-7">
          <h5 className=" font-semibold text-xl pb-4">
            Complaint 01
          </h5>
          <p className="font-light">Great service competitively priced. Lexus was great and very detail oriented hope that's who they send next time too!</p>
          <h5 className=" font-semibold text-xl pb-4">
            Home Owner Details
          </h5>
          <div className="flex gap-2 items-center">
            <div className="w-[3rem] h-[3rem]">
              <Image src="/images/profile-photo.png"
          alt="profile-photo"
          width={39}
          height={39}
          className="w-full object-contain h-full"/>
            </div>
            <p>Allie Eilla</p>
          </div>
          <p>Email Address: <span className="text-color-9">Aille@gmail.com</span></p>
          <p>Contact: <span className="text-color-9">+123456789</span></p>
          <BaseTextArea extraClass={{label:"ml-0 font-semibold text-md"}} control={control} label="Reply To Complain" name="complain"/>
          <BaseButton extraClass="self-center" type="submit">Mark As Resolved</BaseButton>
        </form>
      </BaseModal>
      <div className="w-full">
      <div className="flex items-center gap-4 pb-2">
        <h5 className="text-black text-lg 2xl:text-xl font-medium">{title}</h5>
        <div
          className={`rounded-full p-2.5 max-w-28 w-full text-center ${status === COMPLAINT_STATUS.OPEN ? ERROR_CLASS : SUCCESS_CLASS}`}
        >
          <p className="text-sm font-medium">
            {status === COMPLAINT_STATUS.OPEN ? <button onClick={()=>onOpen()}>Open</button> : "Resolved"}
          </p>
        </div>
        {/* {status === COMPLAINT_STATUS.OPEN && onClick && (
          <BaseButton
            type="button"
            extraClass="!p-2.5 !max-w-28 !h-10"
            onClick={onClick}
          >
            View
          </BaseButton>
        )} */}
      </div>
      <p className="text-color-6 text-[300] text-sm lg:text-base pb-3">
        {description}
      </p>
      <div className="flex items-center gap-3">
        <Image
          src="/images/profile-photo.png"
          alt="profile-photo"
          width={39}
          height={39}
          className="rounded-full"
        />
        <div>
          <h2 className="text-base font-medium text-color-6">John Clark</h2>
        </div>
      </div>
    </div>
    </>
  );
}
