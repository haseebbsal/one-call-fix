'use client'
import { TRADES } from "@/_utils/enums";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import { config } from "@/_utils/helpers/config";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

interface Props {
  name:string
  lead?: any;
  quoteType?:string,
  imageSrc:string,
  id:string,
  jobId:string,
  bidId:string
}
export default function LeadCard({ lead ,name,quoteType,imageSrc,id,jobId,bidId}: Props) {
  const shortlistMutation=useMutation((data:string)=>axiosInstance.put(`/bid/assign?bidId=${data}`),{
    onSuccess(data, variables, context) {
        console.log('shortlist',data.data)
    },
    onError(error:any) {
      if (Array.isArray(error.response.data.message)) {
        toast.error(error.response.data.message[0]);
    } else {
        toast.error(error.response.data.message);
    }
    },
})
  return (
    <div className="bg-[#F9FBFF] rounded-2xl p-2 shadow-md">
      <div className="flex relative flex-1 items-center gap-3">
        <Image
        src={imageSrc.includes('placeholder')?'/images/profile-review.png':`${config.mediaURL}/${imageSrc}`}
          // src="/images/profile-photo.png"
          alt="profile-photo"
          width={70}
          height={70}
          className="rounded-full object-contain"
        />
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium ">{name}</h3>
          <h2 className="rounded-full bg-[#3571EC38] py-1 px-2 text-[14px] text-center font-medium">
            {TRADES[1]}
          </h2> 
        </div>
        <Link className="absolute top-0 left-0 w-full h-full" href={`/homeowner/tradeperson?id=${id}&jobId=${jobId}`}></Link>
      </div>
      <div className="flex flex-col gap-2">
        {/* <p className="mt-2 text-base text-color-6 text-[14px] w-4/5">
          Lorem ipsum dolor sit amet, cons tetuer Lorem ipsum dolor sit amet,
          cons
        </p> */}
        <Button
        onClick={()=>{
          shortlistMutation.mutate(bidId)
        }}
          variant="bordered"
          radius="full"
          className="border border-[#3571EC] text-[#3571EC] text-lg h-14 w-fit px-10 mt-4"
        >
          Assign The Job
        </Button>
      </div>
    </div>
  );
}
