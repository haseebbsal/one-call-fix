import { JOB_DETAILS, JOB_ITEMS } from "@/_utils/constant";
import JobDetailsSection from "@/components/modules/tradeperson/job-details-section";
import JobListSection from "@/components/modules/tradeperson/job-list-section";

export default function MyJobs() {
  return (
    <>
      <JobListSection title="My Jobs" jobItems={JOB_ITEMS} />
      <JobDetailsSection jobType="myJobs" job={JOB_DETAILS} />
    </>
  );
}
