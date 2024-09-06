import React from "react";

import NotificationCard from "@/components/common/cards/notification-card";
import LayoutWrapper from "@/components/modules/dashboard/layout-wrapper";

export default function Notifications() {
  return (
    <LayoutWrapper
      sectionOneTitle="Notifications"
      sectionOneChildren={
        <div className="flex flex-col gap-5">
          {[1, 2, 3, 4, 5].map((el) => (
            <NotificationCard
              key={el}
              description="Lorem ipsum dolor sit amet, cons tetuer Lorem ipsum. Lorem ipsum
            dolor sit amet, cons tetuer Lorem ipsum. Lorem ipsum dolor sit amet,
            cons tetuer Lorem ipsum. Lorem ipsum dolor sit amet, cons tetuer
            Lorem ipsum."
              title={`Notification ${el}`}
            />
          ))}
        </div>
      }
    />
  );
}
