import { Image } from "@nextui-org/image";

import ReviewStar from "@/components/modules/public/review-star";

interface Props {
  description: string;
}
export default function ReviewCard({ description }: Props) {
  return (
    <div className="w-full">
      <div className="flex items-center mb-4 gap-1 sm:gap-2 text-amber-400">
        <ReviewStar />
        <ReviewStar />
        <ReviewStar />
        <ReviewStar />
        <ReviewStar />
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
