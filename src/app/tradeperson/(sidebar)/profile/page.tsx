"use client";

import { useRouter } from "next/navigation";
// import { getUserData } from "@/lib/features/userSlice";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import { getUserInfo } from "@/_utils/helpers/auth";
import { useEffect, useState } from "react";
import { TRADES } from "@/_utils/enums";
import { config } from "@/_utils/helpers/config";
import Loader from "@/components/common/Loader";
import Cookies from 'js-cookie'
import { useQuery } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import Image from "next/image";
import BaseButton from "@/components/common/button/base-button";
export default function ViewProfile() {
  const router = useRouter();
  const [user,setUser]=useState<any>(null)
  useEffect(()=>{
    const user=JSON.parse(Cookies.get('userData')!)
    console.log(user)
    setUser(user)
  },[])

  const getUserQuery=useQuery(['tradePerson',user?._id],({queryKey})=>axiosInstance.get(`/user/?userId=${queryKey[1]}`),{
    enabled:!!user
  })
  // const dispatch = useAppDispatch();
  // const userInfo = getUserInfo();
  // const { userDetails, loading }: any = useAppSelector((state) => state.user);
  // useEffect(() => {
  //   if (!userDetails) {
  //     dispatch(getUserData(userInfo._id));
  //   }
  // }, [userDetails]);
  const editPage = () => {
    router.push("/tradeperson/profile/edit");
  };
  return (
    <div className="p-6">
      <h1 className="text-[22px] text-color-6 font-semibold mb-2">Profile</h1>
      {!user && getUserQuery.isLoading ? (
        <div className="flex justify-center w-full h-full">
          <Loader />
        </div>
      ) : (
        <div className=" p-6 bg-white rounded-lg shadow-sm">
          {/* Profile Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
              width={50}
              height={50}
              src={getUserQuery.data?.data.data.user.profilePicture.includes('placeholder')?'/images/profile-review.png':`${config.mediaURL}/${getUserQuery.data?.data.data.user.profilePicture}`}
                // src={`${config.mediaURL}/${getUserQuery.data?.data.data.profilePicture}`}
                alt="Profile Image"
                className="w-20 h-20 rounded-full object-contain"
              />
              <div>
                <h2 className="text-2xl font-semibold">
                  {getUserQuery.data?.data.data.user.firstName}{" "}
                  {getUserQuery.data?.data.data.user.lastName}
                </h2>
                <span className="px-3 py-1 text-sm text-white bg-blue-500 rounded-full">
                  {TRADES[getUserQuery.data?.data.data.profile.trade]}
                </span>
              </div>
            </div>
            <BaseButton
            as="link"
            link={`/tradeperson/profile/edit?id=${getUserQuery.data?.data.data.user._id}`}
              // className="ml-auto px-8 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
              // onClick={editPage}
            >
              Edit Profile
            </BaseButton>
          </div>

          {/* Offered Services Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold">Offered Services</h3>
            <ul className="list-disc list-inside text-gray-600 mt-4">
              {getUserQuery.data?.data.data.profile.servicesOffered.map(
                (item: any, index: any) => {
                  return <li key={index}>{item}</li>;
                },
              )}
            </ul>
          </div>

          {/* Links Section */}
          <div className="mt-8 grid grid-cols-2">
            <div>
              <h4 className="text-xl font-semibold">
                Link To External Reviews
              </h4>
              <a
                href="http://www.google.com/"
                className="text-blue-500 underline text-lg"
              >
                {getUserQuery.data?.data.data.profile.externalReviews}
              </a>
            </div>
            <div>
              <h4 className="text-xl font-semibold">Website</h4>
              <a
                href="http://www.google.com/"
                className="text-blue-500 underline text-lg"
              >
                {getUserQuery.data?.data.data.profile.website}
              </a>
            </div>
          </div>

          {/* Work Gallery Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold">Work Gallery</h3>
            <div className="flex gap-2">
                            {getUserQuery.data?.data.data.profile.previousJobs.map((e:any)=>
                            <div className="h-[8rem] w-[5rem]">
                            <Image
                                src={e.includes('placeholder')?'/images/profile-review.png':`${config.mediaURL}/${e}`}
                                // src="/images/profile-photo.png"
                                alt="profile-photo"
                                width={70}
                                height={70}
                                className="rounded-full w-full h-full object-contain"
                            />
                        </div>
                            )}
                            
                        </div>
            {/* <div className="grid grid-cols-4 gap-4 mt-4">
              <img
                src={`${config.mediaURL}/${getUserQuery.data?.data.data.profile?.documents?.additional.competentPersonRegister}`}
                alt="Work Image"
                className="w-56 h-auto rounded-lg"
              />
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
