import { Image } from "@nextui-org/image";

import BaseButton from "@/components/common/button/base-button";
import ReviewStar from "@/components/modules/public/review-star";
import { getTimeAgo } from "@/_utils/helpers";

interface Props {
  description: string;
  data:any
}
export default function RefundCard({ description ,data}: Props) {
  return (
    <div className="w-full pb-5 border-b border-b-[0,0,0,0.2]">
      <div className="flex items-center gap-2.5 mb-3">
        <h3 className="text-[15px] font-bold text-color-22">
          Requested For Refund
        </h3>
        <p className="text-color-14 text-xs font-[300]">{`Submitted ${getTimeAgo(data.createdAt)}`}</p>
      </div>
      <div className="bg-color-23 rounded-2xl p-2.5">
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
              {data.job.headline}
            </h5>
            {/* <p className="text-color-14 text-xs font-[300]">
              18 mins away from PO167GZ
            </p>
            <p className="text-color-6 text-xs font-[300]">
              Due to water ingress we need the plastering sorted in one or two
              areas, two walls and two ceilings re painted
            </p> */}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-[15px] font-medium text-color-6">Tradeperson</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/images/profile-photo.png"
                alt="profile-photo"
                width={39}
                height={39}
                className="rounded-full"
              />
              <h2 className="text-base font-medium text-color-6">{data.user.firstName} {data.user.lastName}</h2>
            </div>
            {/* <div className="flex items-center gap-10">
              <h5 className="text-color-14 text-xs font-[300]">Fee Charged</h5>
              <h5 className="text-color-14 text-xs font-medium">$ 156.00</h5>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
