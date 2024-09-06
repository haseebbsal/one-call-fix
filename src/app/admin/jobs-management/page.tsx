import React from "react";

import { JOB_ITEMS } from "@/_utils/constant";
import JobListSection from "@/components/modules/tradeperson/job-list-section";

export default function JobsManagement() {
  return (
    <div className="px-5 py-10">
      <div className="flex flex-col xl:flex-row lg:gap-5">
        <JobListSection
          title="Jobs Management"
          innerTitle="Current Jobs List"
          jobItems={JOB_ITEMS}
        />
      </div>
    </div>
  );
}
