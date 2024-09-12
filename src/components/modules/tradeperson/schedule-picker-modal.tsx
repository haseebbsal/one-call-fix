"use client";

import React, { useState, useEffect } from "react";
import BaseModal from "@/components/common/modal/base-modal";
// import { getSchedule, updateSchedule } from "@/lib/features/scheduleSlice";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import { getUserInfo } from "@/_utils/helpers/auth";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import toast from "react-hot-toast";
import BaseButton from "@/components/common/button/base-button";

// const userInfo = getUserInfo();
// const UserId = userInfo?._id;
const daysOfWeek = [
  {day:"Sunday",
    times:[
      "09:30 AM - 10:30 AM",
      "11:00 AM - 12:00 PM",
      "02:00 PM - 03:00 PM",
      "03:00 PM - 04:00 PM",
      "05:00 PM - 06:00 PM",
      "08:00 PM - 09:00 PM",
    ]
  },
  {day:"Monday",
    times:[
      "09:30 AM - 10:30 AM",
      "11:00 AM - 12:00 PM",
      "02:00 PM - 03:00 PM",
      "03:00 PM - 04:00 PM",
      "05:00 PM - 06:00 PM",
      "08:00 PM - 09:00 PM",
    ]
  },
  {day:"Tuesday",
    times:[
      "09:30 AM - 10:30 AM",
      "11:00 AM - 12:00 PM",
      "02:00 PM - 03:00 PM",
      "03:00 PM - 04:00 PM",
      "05:00 PM - 06:00 PM",
      "08:00 PM - 09:00 PM",
    ]
  },
  {day:"Wednesday",
    times:[
      "09:30 AM - 10:30 AM",
      "11:00 AM - 12:00 PM",
      "02:00 PM - 03:00 PM",
      "03:00 PM - 04:00 PM",
      "05:00 PM - 06:00 PM",
      "08:00 PM - 09:00 PM",
    ]
  },
  {day:"Thursday",
    times:[
      "09:30 AM - 10:30 AM",
      "11:00 AM - 12:00 PM",
      "02:00 PM - 03:00 PM",
      "03:00 PM - 04:00 PM",
      "05:00 PM - 06:00 PM",
      "08:00 PM - 09:00 PM",
    ]
  },
  {day:"Friday",
    times:[
      "09:30 AM - 10:30 AM",
      "11:00 AM - 12:00 PM",
      "02:00 PM - 03:00 PM",
      "03:00 PM - 04:00 PM",
      "05:00 PM - 06:00 PM",
      "08:00 PM - 09:00 PM",
    ]
  },
  {day:"Saturday",
    times:[
      "09:30 AM - 10:30 AM",
      "11:00 AM - 12:00 PM",
      "02:00 PM - 03:00 PM",
      "03:00 PM - 04:00 PM",
      "05:00 PM - 06:00 PM",
      "08:00 PM - 09:00 PM",
    ]
  }
];
// const availableTimes = ;

interface SchedulePickerModalProps {
  isOpen: boolean;
  user?:string
  setDataPayment?:any,
  setSceduleModal:any
}

const formatTime = (time: string) => {
  const [hour, minute] = time.split(":");
  const hours = parseInt(hour);
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHour = ((hours + 11) % 12) + 1; // Convert to 12-hour format
  return `${String(formattedHour).padStart(2, "0")}:${minute} ${period}`;
};

const formatTimeForApi = (time: string) => {
  const [formattedTime, period] = time.split(" ");
let [hour, minute] = formattedTime.split(":");
if (period === "PM" && hour !== "12") hour = String(parseInt(hour) + 12);
if (period === "AM" && hour === "12") hour = "00";
return `${hour}:${minute}`;
};

export const SchedulePickerModal: React.FC<SchedulePickerModalProps> = ({
  isOpen,user,setDataPayment,setSceduleModal
}) => {
  const router = useRouter();
  // const dispatch = useAppDispatch();
  // const { scheduleDetails, loading, error } = useAppSelector(
  //   (state) => state.schedule,
  // );
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  // const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [daysOfWeekk,setDaysOfWeek]=useState<any>([])
  const [availableTimess,setAvailableTimes]=useState<any>([])
  const [formError, setFromError] = useState<string>("");
  const [defaultDay,setDefaultDay]=useState<any>(null)

const queryClient=useQueryClient()
  const getUserInfoQuery=useQuery(['getAvailabity',user],({queryKey})=>axiosInstance.get(`/availability?userId=${queryKey[1]}`),{
    onSuccess(data) {
      if(!data.data.data){
        const filterDaysOfWeek=daysOfWeek.filter((e,index)=>index>=new Date().getDay())
        setDaysOfWeek(filterDaysOfWeek)
        setDefaultDay(0)
        // setAvailableTimes(availableTimes)
      }
      else{
        const {availability}=data.data.data
        const filterDaysOfWeek=daysOfWeek.filter((e,index)=>index>=new Date().getDay())
        setDaysOfWeek(filterDaysOfWeek)
        setDefaultDay(0)
        const days=availability.map((e:any)=>{
          const day=e.day
          const times=e.times.map((e:any)=>{
            return `${formatTime(e.start)} - ${formatTime(e.end)}`
          })

          return {
            day,
            times
          }

        })
        setSelectedDays(days)

        
      }
    },
    refetchOnWindowFocus:false
  })

  const createAvailabilityMutation=useMutation((data:any)=>axiosInstance.put('/availability',data),{
    onSuccess(data, variables, context) {
      console.log('create availability',data.data)
      queryClient.invalidateQueries('getAvailability')
    },
  })


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
                
                
                
                console.log('format',formatTime('10:00'))
                const handleDayClick = (day: number) => {
                  setDefaultDay(day)
                //   setSelectedDays((prevDays) =>
                //     prevDays.includes(day)
                //   ? prevDays.filter((d) => d !== day)
                //   : [...prevDays, day],
                // );
              };
              
              const handleTimeClick = (time: string) => {
                setSelectedDays((prev:any)=>{
                  const day=daysOfWeekk[defaultDay].day
                  const findIfDayInside=prev.find((e:any)=>e.day==daysOfWeekk[defaultDay].day)
                  if(findIfDayInside){
                    if(findIfDayInside.times.includes(time)){
                      let newData=findIfDayInside.times.filter((e:string)=>e!=time)
                      if(newData.length==0){
                        const dataToSet=prev.map((e:any)=>e.day!=day)
                        return dataToSet
                      }
                      else{
                        const dataToSet=prev.map((e:any)=>{
                          if(e.day==day){
                            return {
                              day,
                              times:newData
                            }
                          }
                          return e
                        })
                        return dataToSet
                      }
                    }
                    const newData=prev.map((e:any,index:number)=>{
                      if(day==e.day){
                        return {
                          day,
                          times:[
                            ...findIfDayInside.times,time
                          ]
                        }
                      }
                      return e
                    })
                    return newData
                  }
                  else{
                    return [
                      ...prev,
                      {
                        day,
                        times:[
                          time
                        ]
                      }
                    ]
                  }
                  // return findIfDayInside
                  // if(daysOfWeekk[defaultDay].day)
                })
              //   setSelectedTimes((prevTimes) =>
              //     prevTimes.includes(time)
              //   ? prevTimes.filter((t) => t !== time)
              //   : [...prevTimes, time],
              // );
            };
            
            

  const removeDuplicates = (times: { start: string; end: string }[]) => {
    const uniqueTimes = times.filter(
      (time, index, self) =>
        index ===
        self.findIndex((t) => t.start === time.start && t.end === time.end),
    );
    return uniqueTimes;
  };

  console.log('selected days',selectedDays)

  const handleContinue = async () => {
    if (selectedDays.length > 0) {
      const times = selectedDays.map((time:any) => {
        const newTimes=time.times.map((e:any)=>{
          const [start, end] = e.split(" - ");
        return {
          start: formatTimeForApi(start),
          end: formatTimeForApi(end),
        };
        })

        return {
          day:time.day,
          times:newTimes
        }
        
      });

      const payload={
        "quoteType": 1,
        availability:times
      }

      createAvailabilityMutation.mutate(payload)
      setDataPayment(payload)
      // const availability = selectedDays.map((day) => ({
      //   day,
      //   times: removeDuplicates(times),
      // }));
      // const response = await dispatch(updateSchedule({ availability }));
      // if (response.payload.message == "Success") {
      //   router.push(`/tradeperson/bid-submission`);
      // }
    } else {
      toast.error("Please select at least one day and one time.")
      // setFromError("Please select at least one day and one time.");
    }
  };

  console.log('checkk',selectedDays?.find((e:any)=>e.day==daysOfWeekk[defaultDay].day) as any)
  return (
    // <>
    // yes
    // </>
    <BaseModal onClose={()=>setSceduleModal(false)} isOpen={isOpen} size="xl" >
      <div className="p-4 rounded-full">
        {getUserInfoQuery.isLoading && <p>Loading...</p>}
        {getUserInfoQuery.isError && <p>Error: Error</p>}
        {!getUserInfoQuery.isLoading && !getUserInfoQuery.isError && (
          <>
            <div className="mb-4 text-center">
              <h3 className="text-lg font-bold">Days Of The Week</h3>
              <div className="flex flex-wrap justify-center gap-1 mt-2">
                {defaultDay!=null && daysOfWeekk?.map((day:any,index:number) => (
                  <button
                    key={day.day}
                    className={`rounded-full px-4 py-2 border ${defaultDay==index ? "bg-blue-500 text-white" : "bg-white text-blue-500"}`}
                    onClick={() => handleDayClick(index)}
                  >
                    {day.day.substring(0, 3)}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4 text-center">
              <h3 className="text-lg font-bold">Available Times</h3>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {defaultDay!=null && daysOfWeekk[defaultDay].times?.map((time:any) => (
                  <button
                    key={time}
                    className={`rounded-full px-4 py-2 border ${(selectedDays.length>0 && selectedDays?.find((e:any)=>e.day==daysOfWeekk[defaultDay].day) && (selectedDays?.find((e:any)=>e.day==daysOfWeekk[defaultDay].day) as any).times.includes(time))? "bg-blue-500 text-white" : "bg-white text-blue-500"}`}
                    onClick={() =>{
                       handleTimeClick(time)
                    }
                      }
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
              <BaseButton
                extraClass="bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-full w-48 focus:outline-none focus:shadow-outline"
                onClick={handleContinue}
                isLoading={createAvailabilityMutation.isLoading}
                disabled={createAvailabilityMutation.isLoading}
                // disabled={!selectedDays.length && !selectedTimes.length}
              >
                Continue
              </BaseButton>
            </div>
          </>
        )}
      </div>
    </BaseModal>
  );
};
