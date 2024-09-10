"use client";

// import { Image } from "@nextui-org/image";
import React from "react";

import ReviewStar from "@/components/modules/public/review-star";
import Image from "next/image";
import ReactStars from "react-stars";

interface ReviewProps {
  avatar: string;
  name: string;
  review: string;
  rating: number;
}

export default function ReviewsSection({
  avatar,
  name,
  review,
  rating,
}: ReviewProps) {
  return (
    <div className="mb-8 last:mb-0 flex items-start border-b border-color-19">
      <div className="flex flex-col w-full">
        <div className="flex items-center mb-4 gap-1 sm:gap-2 text-amber-400">
        <ReactStars
                        value={rating}
                        edit={false}
                        count={5}
                        // onChange={ratingChanged},
                        size={24}
                        color2={'#ffd700'} />
        </div>
        <p className="mt-1 mb-5 text-sm">{review}</p>
        <div className="flex items-center gap-3 sm:gap-5 mb-7">
          <div className="w-[4rem] h-[4rem]">
          <Image width={50} height={50} className="w-full h-full object-contain" src={avatar} alt="avatar" /> 
          </div>
          <div className="grid gap-1">
            <h5 className="text-gray-900 font-medium">{name}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
