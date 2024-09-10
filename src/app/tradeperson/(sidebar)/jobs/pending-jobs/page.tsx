import { JOB_DETAILS, JOB_ITEMS } from "@/_utils/constant";
import JobDetailsSection from "@/components/modules/tradeperson/job-details-section";
import JobListSection from "@/components/modules/tradeperson/job-list-section";

export default function PendingJobs() {
  return (
    <>
      <JobListSection title="Pending Jobs" jobItems={JOB_ITEMS} />
      <JobDetailsSection jobType="pending" job={JOB_DETAILS} />
    </>
  );
}
