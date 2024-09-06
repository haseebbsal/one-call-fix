import { DASHBOARD_ITEMS } from "@/_utils/constant";
import DashboardCard from "@/components/common/cards/dashboard-card";

export default function Dashboard() {
  return (
    <section>
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
    </section>
  );
}
