import { DASHBOARD_ITEMS, JOB_ITEMS } from "@/_utils/constant";
import DashboardCard from "@/components/common/cards/dashboard-card";
import JobListSection from "@/components/modules/tradeperson/job-list-section";
import ProfileCompletion from "@/components/modules/tradeperson/profile-completion";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-wrap items-center w-full text-gray-800 p-10 bg-gray-100 gap-10">
        {DASHBOARD_ITEMS.map((item, index) => (
          <DashboardCard
            key={index}
            icon={item.icon}
            title={item.title}
            value={item.value}
          />
        ))}
      </div>

      <div className="p-5">
        <div className="flex flex-col xl:flex-row lg:gap-10">
          <JobListSection title="Available Jobs" jobItems={JOB_ITEMS} />

          <div className="w-full lg:max-w-sm flex flex-col">
            <h2 className="text-xl font-semibold mb-4 text-color-17">
              Profile
            </h2>
            <section className="flex-1 p-5 bg-white border border-gray-200 rounded-lg sm:p-8 dark:bg-color-16">
              <ProfileCompletion />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
