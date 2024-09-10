'use client'
import { REVIEWS } from "@/_utils/constant";
import LayoutWrapper from "@/components/modules/dashboard/layout-wrapper";
import ProfileCompletion from "@/components/modules/tradeperson/profile-completion";
import ReviewsSection from "@/components/modules/tradeperson/reviews-section";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { useInfiniteQuery, useQuery } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import { config } from "@/_utils/helpers/config";
import BaseButton from "@/components/common/button/base-button";
import { tree } from "next/dist/build/templates/app-page";
export default function Reviews() {
  const [user,setUser]=useState<any>(null)
  useEffect(()=>{
    const user=JSON.parse(Cookies.get('userData')!)
    console.log(user)
    setUser(user)
  },[])

  const getUserQuery=useQuery(['tradePerson',user?._id],({queryKey})=>axiosInstance.get(`/user/?userId=${queryKey[1]}`),{
    enabled:!!user
  })


  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading:isLoadingApi,
  }: {
      data: any,
      fetchNextPage:any,
      hasNextPage?: any,
      isFetching: any,
      isLoading: any
} = useInfiniteQuery(
    ["allReviews",user?._id],
    ({ queryKey, pageParam = 1 }) =>
      axiosInstance.get(`/review/all?page=${pageParam}&limit=10&tradesPerson=${queryKey[1]}`),
    {
      getNextPageParam: (lastPage:any, pages) => {
        if(lastPage.page!=lastPage.lastPage){
          return lastPage.page+=1;
        }
        return null;
      },
      refetchOnWindowFocus:false,
      // enabled: !!activeDomain,
      enabled:!!user
    }
  );

  console.log('data',data?.pages)
  return (
    <>
      <LayoutWrapper
        sectionOneTitle="Reviews"
        sectionOneChildren={
          <>
            {data?.pages.map((review:any, index:number) => {
              return review.data.data.map((e:any)=>
                (
                  <ReviewsSection
                    key={index}
                    avatar={true?'/images/profile-review.png':`${config.mediaURL}/${e.user.profilePicture}`}
                    name={`${e.user.firstName} ${e.user.lastName}`}
                    review={e.description}
                    rating={e.rating}
                  />
                )
              )
            })}
            {hasNextPage && data &&  <BaseButton
        isLoading={isFetching}
        disabled={isFetching}
          extraClass="bg-color-12 text-white px-7"
          onClick={()=>{
            fetchNextPage()
          }}
        >
          Load More
        </BaseButton>}
          </>
        }
        sectionTwoTitle="Profile"
        sectionTwoChildren={
          <>
            {!getUserQuery.isLoading && user &&  <ProfileCompletion data={getUserQuery.data?.data.data}/>}
          </>
        }
      ></LayoutWrapper>
    </>
  );
}
