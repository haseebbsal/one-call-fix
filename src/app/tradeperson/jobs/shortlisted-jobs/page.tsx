import { JOB_DETAILS, JOB_ITEMS_WITH_SHORTLISTED } from "@/_utils/constant";
import JobDetailsSection from "@/components/modules/tradeperson/job-details-section";
import JobListSection from "@/components/modules/tradeperson/job-list-section";

export default function ShortlistedJobs() {
  return (
    <>
      <JobListSection
        title="Shortlisted Jobs"
        jobItems={JOB_ITEMS_WITH_SHORTLISTED}
      />
      <JobDetailsSection jobType="shortlisted" job={JOB_DETAILS} />
    </>
  );
}
