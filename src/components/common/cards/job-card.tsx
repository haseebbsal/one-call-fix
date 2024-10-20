import { TRADES } from "@/_utils/enums";
import { getTimeAgo, toTitleCase } from "@/_utils/helpers";
import { Image } from "@nextui-org/image";

interface Props {
  job?: any;
}

export default function JobCard({ job }: Props) {
  if (!job) {
    return <div>No job available</div>; // Handle the case where job data is not available
  }

  return (
    <div className="bg-color-23 rounded-2xl p-2.5">
      <div className="pb-2 flex sm:flex-nowrap flex-wrap items-center gap-2">
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
      <div className="flex sm:justify-between sm:flex-nowrap flex-wrap gap-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-[12px] text-color-6">Job Type</h3>
          <h2 className="text-base font-medium text-color-6">
            {TRADES[job?.chat.trade]}
          </h2>
        </div>
        <div className="flex flex-col gap-1 sm:mx-auto">
          <h3 className="text-[12px] text-color-6">Trade People Applied</h3>
          <h2 className="text-base font-medium text-color-6">
            {job?.tradesPersonApplied} Trade People Applied
          </h2>
        </div>
      </div>
    </div>
  );
}
