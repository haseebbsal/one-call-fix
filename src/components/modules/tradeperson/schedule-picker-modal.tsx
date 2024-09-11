"use client";

import React, { useState, useEffect } from "react";
import BaseModal from "@/components/common/modal/base-modal";
// import { getSchedule, updateSchedule } from "@/lib/features/scheduleSlice";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import { getUserInfo } from "@/_utils/helpers/auth";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";

// const userInfo = getUserInfo();
// const UserId = userInfo?._id;
const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const availableTimes = [
  "09:30 AM - 10:30 AM",
  "11:00 AM - 12:00 PM",
  "02:00 PM - 03:00 PM",
  "03:00 PM - 04:00 PM",
  "05:00 PM - 06:00 PM",
  "08:00 PM - 09:00 PM",
];

interface SchedulePickerModalProps {
  isOpen: boolean;
  user?:string
}

export const SchedulePickerModal: React.FC<SchedulePickerModalProps> = ({
  isOpen,user
}) => {
  const router = useRouter();
  // const dispatch = useAppDispatch();
  // const { scheduleDetails, loading, error } = useAppSelector(
  //   (state) => state.schedule,
  // );
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [formError, setFromError] = useState<string>("");

  const getUserInfoQuery=useQuery(['getAvailabity',user],({queryKey})=>axiosInstance.get(`/availability?userId=${queryKey[1]}`))

  // useEffect(() => {
  //   if (isOpen) {
  //     dispatch(getSchedule(UserId));
  //   }
  // }, [isOpen, dispatch]);

  // useEffect(() => {
  //   if (scheduleDetails) {
  //     const availability = scheduleDetails?.data?.availability;

  //     if (!availability || availability.length === 0) {
  //       // Clear selections if no availability data
  //       setSelectedDays([]);
  //       setSelectedTimes([]);
  //     } else {
  //       const days = availability.map((item: any) => item.day);
  //       const times = availability.flatMap((item: any) =>
  //         item.times.map(
  //           (time: any) =>
  //             `${formatTime(time.start)} - ${formatTime(time.end)}`,
  //         ),
  //       );

  //       setSelectedDays(days); // Select the days from the API response
  //       setSelectedTimes(times); // Pre-select API times
  //     }
  //   }
  //   if (error) {
  //     console.error("Error fetching schedule:", error);
  //   }
  // }, [scheduleDetails, error]);

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(":");
    const hours = parseInt(hour);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHour = ((hours + 11) % 12) + 1; // Convert to 12-hour format
    return `${String(formattedHour).padStart(2, "0")}:${minute} ${period}`;
  };

  const handleDayClick = (day: string) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day],
    );
  };

  const handleTimeClick = (time: string) => {
    setSelectedTimes((prevTimes) =>
      prevTimes.includes(time)
        ? prevTimes.filter((t) => t !== time)
        : [...prevTimes, time],
    );
  };

  const formatTimeForApi = (time: string) => {
    const [formattedTime, period] = time.split(" ");
    let [hour, minute] = formattedTime.split(":");
    if (period === "PM" && hour !== "12") hour = String(parseInt(hour) + 12);
    if (period === "AM" && hour === "12") hour = "00";
    return `${hour}:${minute}`;
  };

  const removeDuplicates = (times: { start: string; end: string }[]) => {
    const uniqueTimes = times.filter(
      (time, index, self) =>
        index ===
        self.findIndex((t) => t.start === time.start && t.end === time.end),
    );
    return uniqueTimes;
  };

  const handleContinue = async () => {
    if (selectedDays.length > 0 && selectedTimes.length > 0) {
      const times = selectedTimes.map((time) => {
        const [start, end] = time.split(" - ");
        return {
          start: formatTimeForApi(start),
          end: formatTimeForApi(end),
        };
      });

      const availability = selectedDays.map((day) => ({
        day,
        times: removeDuplicates(times),
      }));
      // const response = await dispatch(updateSchedule({ availability }));
      // if (response.payload.message == "Success") {
      //   router.push(`/tradeperson/bid-submission`);
      // }
    } else {
      setFromError("Please select at least one day and one time.");
    }
  };

  return (
    // <>
    // yes
    // </>
    <BaseModal isOpen={isOpen} size="xl" hideCloseButton={true}>
      <div className="p-4 rounded-full">
        {getUserInfoQuery.isLoading && <p>Loading...</p>}
        {getUserInfoQuery.isError && <p>Error: Error</p>}
        {!getUserInfoQuery.isLoading && !getUserInfoQuery.isError && (
          <>
            <div className="mb-4 text-center">
              <h3 className="text-lg font-bold">Days Of The Week</h3>
              <div className="flex flex-wrap justify-center gap-1 mt-2">
                {daysOfWeek.map((day) => (
                  <button
                    key={day}
                    className={`rounded-full px-4 py-2 border ${selectedDays.includes(day) ? "bg-blue-500 text-white" : "bg-white text-blue-500"}`}
                    onClick={() => handleDayClick(day)}
                  >
                    {day.substring(0, 3)}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4 text-center">
              <h3 className="text-lg font-bold">Available Times</h3>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    className={`rounded-full px-4 py-2 border ${selectedTimes.includes(time) ? "bg-blue-500 text-white" : "bg-white text-blue-500"}`}
                    onClick={() => handleTimeClick(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
            {formError ?? (
              <p className="text-[14px] text-red-500 py-1">{formError}</p>
            )}
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-full w-48 focus:outline-none focus:shadow-outline"
                onClick={handleContinue}
                disabled={!selectedDays.length && !selectedTimes.length}
              >
                Continue
              </button>
            </div>
          </>
        )}
      </div>
    </BaseModal>
  );
};
