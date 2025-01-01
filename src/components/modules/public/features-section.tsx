'use client'
import { Image } from "@nextui-org/image";
import { FaCircleCheck } from "react-icons/fa6";
type Feature = {
  imgSrc: string;
  heading: string;
  desc: string;
};
import { MdCancel } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";

import { FaCheck } from "react-icons/fa";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

type FeaturesProps = {
  features: Feature[];
};
const otherPlatforms=[
  'Generic forms, making it difficult for tradespeople to provide accurate quotes online & requiring home visits',
  'Contact details shared with all tradespeople',
  'Limited tradesperson details'
]

const feature=[
  "Accurate Quotes Directly Online",
  'Privacy Protection',
  'Full Information on Tradesperson'
]

const ourPlatform=[
  'AI-powered form helping to provide accurate quotes online, reducing need for home visits',
  'Contact details are only shared with the tradespeople you shortlist',
  'Full details including availability for urgent jobs, price, and timeline upfront',
]

export default function FeaturesSection({ features }: FeaturesProps) {
  return (
    <section >
      <div className="mb-2 sm:mb-4 ">
        <h2 className="text-2xl font-extrabold text-center sm:text-3xl md:text-4xl p-[1.8rem]">
          We Do The Hard Work For You
        </h2>
      </div>
      <div className="flex justify-center  flex-wrap sm:px-24 px-4 py-2 mb-16 w-[90%] m-auto">
      <Table classNames={{td:""}} aria-label="Example static collection table">
      <TableHeader>
        <TableColumn className="bg-color-5 text-white"><p className="text-xl">Other Platforms</p></TableColumn>
        <TableColumn className="bg-color-4 text-white"><p className="text-xl ">OneCallFix Platform</p></TableColumn>
      </TableHeader>
      <TableBody>
       
        <TableRow  key="2">
        <TableCell  className="w-[50%]" ><div className="flex gap-4"><MdCancel className="text-8xl sm:text-3xl  text-color-5"/> <p className="font-semibold  ">Generic forms, making it difficult for tradespeople to provide accurate quotes online & requiring home visits</p></div> </TableCell>
        <TableCell  ><div className="flex gap-4"><FaCircleCheck className="text-7xl sm:text-2xl"/> <p className="font-semibold  ">AI-powered form helping to provide accurate quotes online, reducing need for home visits</p></div> </TableCell>
        </TableRow>
        <TableRow key="3">
        <TableCell  ><div className="flex gap-4"><MdCancel className="text-5xl sm:text-xl text-color-5"/> <p className="font-semibold  ">Contact details shared with all tradespeople</p></div> </TableCell>
        <TableCell  ><div className="flex gap-4"><FaCircleCheck className="text-6xl sm:text-lg"/> <p className="font-semibold  ">Contact details are only shared with the tradespeople you shortlist</p></div> </TableCell>
        </TableRow>
        <TableRow key="4">
        <TableCell  ><div className="flex gap-4"><MdCancel className="text-3xl sm:text-xl text-color-5"/> <p className="font-semibold  ">Limited tradesperson details</p></div> </TableCell>
        <TableCell  ><div className="flex gap-4"><FaCircleCheck className="text-6xl sm:text-xl"/> <p className="font-semibold  ">Full details including availability for urgent jobs, price, and timeline upfront</p></div> </TableCell>
        </TableRow>
      </TableBody>
    </Table>
      {/* <div className="flex flex-col w-full sm:w-1/3 items-center px-4 sm:px-16 py-4 gap-2 bg-color-12 font-bold text-white shadow-2xl">
          <p className="text-xl">Features</p>
          {feature.map((e)=><div className="flex items-start gap-4 w-full min-h-[4rem]"> <FaInfoCircle className="w-[40%] sm:w-[10%] "/> <p className="font-semibold text-center w-full">{e}</p></div>)}
        </div>
        <div className="flex flex-col w-full sm:w-1/3 items-center px-4 sm:px-16 py-4 gap-2 bg-red-200 font-bold text-red-500 shadow-2xl">
          <p className="text-xl">Other Platforms</p>
          {otherPlatforms.map((e)=><div className="flex items-start gap-4 w-full min-h-[4rem]"> <MdCancel className="w-[40%] sm:w-[10%] "/> <p className="font-semibold text-center w-full">{e}</p></div>)}
        </div>
        <div className="flex sm:w-1/3 w-full flex-col gap-2 items-center px-4 sm:px-16 py-4 bg-green-200 font-bold text-green-700 shadow-xl">
          <p className="text-xl">OneCallFix Platform</p>
          {ourPlatform.map((e)=><div className="flex items-start gap-4 w-full min-h-[4rem]"> <FaCheck className="w-[40%]  sm:w-[10%] "/> <p className="font-semibold text-center w-full">{e}</p></div>)}
        </div> */}
        
      </div>
      {/* <div className="w-full sm:w-5/6 m-auto flex flex-wrap gap-8 sm:gap-10 md:gap-20 justify-center mb-20 sm:mb-32 md:mb-48">
        {features.map((feature, index) => (
          <div
            key={index}
            className="w-full sm:w-64 md:w-80 mb-8 sm:mb-10 md:mb-0"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg m-auto">
              <Image src={feature.imgSrc} alt="feature-image" />
            </div>
            <div className="text-center">
              <h5 className="text-base sm:text-lg text-color-4 font-bold mt-4">
                {feature.heading}
              </h5>
              <p className="text-sm text-color-6 mt-2">{feature.desc}</p>
            </div>
          </div>
        ))}

      </div> */}
    </section>
  );
}
