import { TRADES } from "@/_utils/enums";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";

interface Props {
  lead?: any;
}
export default function LeadCard({ lead }: Props) {
  return (
    <div className="bg-[#F9FBFF] rounded-2xl p-2 shadow-md">
      <div className="flex flex-1 items-center gap-3">
        <Image
          src="/images/profile-photo.png"
          alt="profile-photo"
          width={70}
          height={70}
          className="rounded-full"
        />
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium ">John Clark</h3>
          <h2 className="rounded-full bg-[#3571EC38] py-1 px-2 text-[14px] text-center font-medium">
            {TRADES[1]}
          </h2>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="mt-2 text-base text-color-6 text-[14px] w-4/5">
          Lorem ipsum dolor sit amet, cons tetuer Lorem ipsum dolor sit amet,
          cons
        </p>
        <Button
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
