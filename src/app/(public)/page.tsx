'use client';
import { Image } from "@nextui-org/image";
import { FEATURES, REVIEWS, STEPS, TRADESPERSON } from "@/_utils/constant";
import BaseButton from "@/components/common/button/base-button";
import HorizontalLine from "@/components/common/horizontal-line/horizontal-line";
import FeaturesSection from "@/components/modules/public/features-section";
import PostJobSection from "@/components/modules/public/post-job-section";
import ReviewStar from "@/components/modules/public/review-star";
import Video from "@/components/modules/public/Video";
import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const animals = [
  {label: "Plumber", value: 1},
  {label: "Electrician", value: 2},
 
];

const poppy=Poppins(
  {
    weight:['600','300'],
    subsets:['latin']
  }
)
import { Navigation } from 'swiper/modules';
import { Pagination,Autoplay } from 'swiper/modules';
import { Poppins } from "next/font/google";

export default function Home() {
  const router=useRouter()
  const [selectedKey,setSelectedKey]=useState<any>(null)
  
  return (
    <main className={`${poppy.className} flex min-h-screen flex-col items-center justify-between bg-[url('/shapes/ellipse-bg.png')] `}>
      {/* GET STARTED SECTION */}
      <section className="w-full flex flex-wrap justify-center sm:px-24 px-4 gap-8 sm:gap-16 md:mt-12 ">
      <div className="flex w-full sm:flex-nowrap flex-wrap items-center sm:gap-16 gap-16 ">
        <div className="mt-12 md:mt-0 flex flex-col gap-2 sm:w-1/2 w-full">
          <div className="text-center md:text-start flex flex-col gap-1">
            <h2 className="font-extrabold text-xl md:text-2xl lg:text-3xl">
              GET QUOTES
            </h2>
            <div className="font-extrabold text-xl md:text-2xl lg:text-3xl flex gap-2 items-center sm:justify-start justify-center">
            <h2 className=" bg-color-4 w-max text-white p-1 rounded-lg">
              DIRECTLY ONLINE
            </h2>
            <p>USING AI</p>
            </div>
          </div>

          <p className=" text-[#525252]  text-sm  text-center md:text-start md:text-2xl w-full">
          It's FREE and there are no obligations!
          </p>

          <div className="relative text-center flex w-full sm:flex-row sm:gap-0 gap-4 flex-col items-center m-auto custom-sm:m-0 custom-sm:text-start sm:border-2 rounded-full">
          <Autocomplete
      isRequired
      variant="bordered"
      radius="full"
      // classNames={{:"!border-none"}}
      className=" inline-block custom-auto w-full"
      // label="Favorite Animal"
      onSelectionChange={(key)=>{
        setSelectedKey(key!)
      }}
      defaultItems={animals}
      placeholder="What trade are you looking for?"
      defaultSelectedKey="cat"
      selectorIcon={false}

      // className="max-w-xs"
    >
      {(item) => 
      <AutocompleteItem  key={item.value}>
        {item.label}

      </AutocompleteItem>}
    </Autocomplete>
            {/* <Input
              type="email"
              variant="bordered"
              placeholder="You are looking for Electrician or Plumber?"
              radius="full"
              className="hidden custom-sm:inline-block"
            /> */}
            <Button  onClick={()=>{
              router.push(`/homeowner/post-a-job/${selectedKey}`)
            }} disabled={!selectedKey} className="rounded-3xl bg-color-9 px-8 py-[0.8rem] !opacity-100 hover:bg-color-9  text-sm font-medium text-white focus:outline-none  h-full">
              Get Started
            </Button>
          </div>
          <div className="sm:mt-0 mt-8 flex sm:justify-start justify-center">

          <Image src="/images/trustpilot.svg" alt="trustpilot" className="object-contain sm:h-auto h-[8rem]" />
          </div>
        </div>
        <div className="sm:w-1/2 w-full relative  sm:h-[33rem] h-[15rem] sm:block hidden">
          <img alt="Ellipse" src="/shapes/ellipse.png" className="absolute z-[1] w-full h-[90%] object-contain" />
          <img
            alt="HomeImage"
            src="/images/home-image.png"
            className="z-[2] relative w-full h-[100%] object-contain top-4 left-4"
          />
        </div>
      </div>

        <HorizontalLine />

        {/* VIDEO SECTION */}
        <div className="w-full  flex justify-center items-center relative -mt-16 z-10">
        <Video url="/videos/how.mp4" imgUrl="/images/home-video-image.png"/>
        </div>
      </section>

      {/* WORKING SECTION */}
      <section className="w-full min-h-max sm:px-24 bg-color-4 flex flex-col gap-4 sm:gap-0 mt-32 sm:mt-48 custom-xs:mt-36 lg:mt-80">
        <div className="sm:mb-14 sm:mt-24 mt-8 md:mt-60 custom-md:mt-[12rem]">
          <h2 className="text-2xl font-extrabold sm:text-4xl text-center text-white mt-10">
            How It Works
          </h2>
        </div>

        <div className="w-full flex flex-wrap justify-center gap-32 sm:p-0 p-4">
        <Swiper
      className="w-full"
      modules={[Pagination,Autoplay]}
       autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{clickable:true}}
      spaceBetween={0}
      slidesPerView={1}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 100,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 100,
        },
      }}
    //   onSlideChange={() => console.log('slide change')}
    //   onSwiper={(swiper) => console.log(swiper)}
    >
          {STEPS.map((step, index) => (
            <SwiperSlide className="sm:p-0 ">
       <div key={index} className="">
              <div className=" h-72 bg-white rounded-3xl flex justify-center items-center">
                <img src={step.imgSrc} alt="step" />
              </div>
              <div className="text-white text-sm sm:mt-10 sm:mb-10 my-8">
                <h5 className="text-center font-semibold mb-2">{step.step}</h5>
                <p className="text-center font-extralight">{step.desc}</p>
              </div>
            </div>
              </SwiperSlide>
            
          ))}
          </Swiper>
        </div>
      </section>

      <section className="mt-10 w-full">
        {/* FEATURES SECTION */}
        <FeaturesSection features={FEATURES} />

        {/* REVIEWS SECTION */}
        <section className="w-full sm:px-24">
          <div className="sm:mb-16 mb-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl text-center px-[1.8rem]">
              Recent Completed Jobs
            </h2>
          </div>

          {/* <div className="w-auto m-auto flex flex-wrap justify-center gap-4 mb-8 sm:gap-6 sm:mb-12 md:gap-20 md:mb-20"> */}
            
          <Swiper
      className="w-full"
      wrapperClass="mb-8 sm:mb-4"
       modules={[Pagination,Autoplay]}
       autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{clickable:true}}
      spaceBetween={0}
      slidesPerView={1}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      }}
    >
            {REVIEWS.map((review, index) => (
              <SwiperSlide className="w-max" >
              <div
                key={index}
                className="min-w-[20rem] max-w-[30rem] bg-white border border-solid border-gray-300 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 md:mb-12 shadow-xl sm:mx-0 mx-4"
              >
                <div className="flex items-center mb-4 gap-1 sm:gap-2 text-amber-400">
                  <ReviewStar />
                  <ReviewStar />
                  <ReviewStar />
                  <ReviewStar />
                  <ReviewStar />
                </div>
                <p className="text-sm sm:text-md text-color-6 leading-6 sm:leading-8 h-20 transition-all duration-500 mb-6 sm:mb-9 group-hover:text-gray-800">
                  {review.review}
                </p>
                <div className="flex items-center gap-3 sm:gap-5">
                  <Image src={review.avatar} alt="avatar" />
                  <div className="grid gap-1">
                    <h5 className="text-gray-900 font-medium ">
                      {review.name}
                    </h5>
                  </div>
                </div>
              </div>
              </SwiperSlide>
            ))}
            </Swiper>
          {/* </div> */}
        </section>
      </section>

      {/* POST A JOB SECTION */}
      <PostJobSection />

      {/* TRADESPERSON SECTION */}
      <section className="bg-[#F4F4F46E]">
        <div className="w-full flex sm:flex-nowrap flex-wrap sm:px-24 px-4 gap-4 sm:mt-0 pt-16 relative sm:mb-24 mb-16">
          <div className="relative order-1 sm:block hidden sm:-order-10 sm:w-1/2 w-full sm:mt-0 mt-20 sm:h-auto h-[15rem]   justify-center">
            <img
              src="/shapes/ellipse.png"
              alt="ellipse"
              className="relative max-w-full h-full"
            />
            <img
              src="/images/tradesperson.png"
              alt="tradesperson"
              className="absolute h-full sm:-top-32 top-[1rem] md:-top-1 left-1/2 transform -translate-x-1/2 custom-md:left-60 "
            />
            {/* bsolute h-full -top-36 md:-top-32 left-1/2 transform -translate-x-1/2 custom-md:left-60 lg:left-64 xl:left-96 */}
          </div>

          <div className="sm:w-1/2 w-full ">
            <h1 className="text-4xl font-extrabold mb-6">
              Are You A Tradesperson?
            </h1>
            <div>
              {TRADESPERSON.map((item, index) => (
                <div key={index} className="mb-4">
                  <p className="text-color-6  font-bold">{item.title}:</p>
                  <p className="text-color-6">{item.desc}</p>
                </div>
              ))}
              <div>
                <BaseButton as="link" link="/tradeperson/signup" extraClass="bg-color-9 mt-10 w-max max-w-[100%] sm:m-0 mx-auto">
                Learn More
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
