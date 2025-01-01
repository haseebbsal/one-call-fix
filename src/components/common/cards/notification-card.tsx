import { Image } from "@nextui-org/image";

import ReviewStar from "@/components/modules/public/review-star";

interface Props {
  description: string;
  title: string;
}
export default function NotificationCard({ description, title }: Props) {
  return (
    <div className="w-full py-4 px-6 border border-[0,0,0,0.10] rounded-2xl transition-all duration-500 hover:border-[#FFA113] hover:bg-[#FFFBEF]">
      <div className="flex items-center gap-3">
        <Image
          src="/images/notification-bell.png"
          alt="Notification Bell"
          width={55}
          height={55}
          className="object-contain"
        />
        <div>
          <h2 className="text-lg font-medium text-color-22 pb-1">{title}</h2>
          <p className="text-color-20 text-sm font-[300]">{description}</p>
        </div>
      </div>
    </div>
  );
}
