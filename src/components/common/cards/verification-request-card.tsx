import { Image } from "@nextui-org/image";

import BaseButton from "@/components/common/button/base-button";
import ReviewStar from "@/components/modules/public/review-star";

interface Props {
  description: string;
}
export default function VerificationRequestCard({ description }: Props) {
  return (
    <div className="w-full">
      <div className="flex items-start gap-3">
        <Image
          src="/images/profile-photo.png"
          alt="profile-photo"
          width={39}
          height={39}
          className="rounded-full"
        />
        <div className="pt-2">
          <div className="flex items-center gap-3 pb-2">
            <h2 className="text-base font-medium text-color-6">John Clark</h2>
            <p className="text-color-14 text-xs font-[300]">
              Submitted 3 days ago
            </p>
          </div>
          <h3 className="text-[15px] font-medium text-color-22 pb-2">
            Document Verification
          </h3>
          <p className="text-color-20 text-[300] text-sm pb-3">{description}</p>
          <BaseButton
            as="link"
            link={`/admin/verification-requests/abc`}
            extraClass="max-w-[190px] bg-color-9 "
          >
            View
          </BaseButton>
        </div>
      </div>
    </div>
  );
}
