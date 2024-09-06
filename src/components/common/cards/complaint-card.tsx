import { Image } from "@nextui-org/image";

import { COMPLAINT_STATUS } from "@/_utils/enums";
import BaseButton from "@/components/common/button/base-button";
import ReviewStar from "@/components/modules/public/review-star";

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
  return (
    <div className="w-full">
      <div className="flex items-center gap-4 pb-2">
        <h5 className="text-black text-lg 2xl:text-xl font-medium">{title}</h5>
        <div
          className={`rounded-full p-2.5 max-w-28 w-full text-center ${status === COMPLAINT_STATUS.OPEN ? ERROR_CLASS : SUCCESS_CLASS}`}
        >
          <p className="text-sm font-medium">
            {status === COMPLAINT_STATUS.OPEN ? "Open" : "Resolved"}
          </p>
        </div>
        {status === COMPLAINT_STATUS.OPEN && onClick && (
          <BaseButton
            type="button"
            extraClass="!p-2.5 !max-w-28 !h-10"
            onClick={onClick}
          >
            View
          </BaseButton>
        )}
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
  );
}
