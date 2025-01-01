import { TRADES } from "@/_utils/enums";
import { getTimeAgo, toTitleCase } from "@/_utils/helpers";
import { config } from "@/_utils/helpers/config";
import Image from "next/image";
import BaseButton from "../button/base-button";
// import { Image } from "@nextui-org/image";
Image

interface Props {
  job?: any;
  openModal:any,
  setReviewData:any
}

export default function CompletedJobCard({ job ,openModal,setReviewData}: Props) {
  if (!job) {
    return <div>No job available</div>; // Handle the case where job data is not available
  }

  return (
    <div className="bg-color-23 rounded-2xl p-2.5">
      <div className="pb-2 flex items-center gap-2">
        <span className="font-[300] text-xs text-color-6">Job ID</span>
        <p className="font-medium text-[15px] text-color-6">{job._id}</p>
      </div>
      <div className="flex items-start gap-3 mb-2">
        <Image
          src="/images/job-bell.png"
          alt="bell"
          width={40}
          height={40}
          className="object-contain"
        />
        <div className="flex flex-col gap-2">
          <h5 className="text-sm text-color-22 font-medium">
            {toTitleCase(job.headline)}
          </h5>
          <p className="text-color-14 text-xs font-[300]">
            {`Posted ${getTimeAgo(job.createdAt)}`}
          </p>
          <p className="text-color-6 text-xs font-[300]">{job.chat.issue}</p>
        </div>
      </div>
      <div className="flex justify-between sm:flex-row flex-col sm:items-center items-start sm:w-[80%] w-full gap-2">
      <div className="flex flex-col gap-1">
          <h3 className=" font-semibold text-color-6">Tradeperson</h3>
          <div className="flex gap-2 items-center">
              <div className="h-[2rem] w-[2rem]">
                  <Image
                      src={job.tradesPerson.profilePicture.includes('placeholder')?'/images/profile-review.png':`${config.mediaURL}/${job.tradesPerson.profilePicture}`}
                      // src="/images/profile-photo.png"
                      alt="profile-photo"
                      width={70}
                      height={70}
                      className="rounded-full !w-full !h-full object-contain"
                  />
              </div>
              <p className="font-semibold">{job.tradesPerson.firstName} {job.tradesPerson.lastName}</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-[12px] text-color-6">Job Type</h3>
          <h2 className="text-base font-medium text-color-6">
            {TRADES[job?.chat.trade]}
          </h2>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-[12px] text-color-6">Completion Date</h3>
          <h2 className="text-base font-medium text-color-6">
            {job?.summary.completionDate} 
          </h2>
        </div>
      </div>
      <BaseButton onClick={()=>{
        openModal()
        setReviewData({
            job:job._id,
            tradesPerson:job.tradesPerson._id
        })
      }} type="button" extraClass="!bg-transparent !text-color-9 !border-color-9 border-2 mt-4" >
        Leave A Review
        </BaseButton>
    </div>
  );
}
