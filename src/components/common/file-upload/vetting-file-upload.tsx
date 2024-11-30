'use client'
import { config } from "@/_utils/helpers/config";
import { p } from "framer-motion/client";
import Image from "next/image";
import React, { useState } from "react";

interface FileUploadProps {
  labelClass?: string;
  register?:any,
  name?:string
  rules?:any,
  extraClass?:string,
  currentValue:{imgSrc:string,isVerified:boolean},
  setValue:any
}

export default function BaseVettingFileUpload({ labelClass,register,name ,rules,extraClass,currentValue,setValue}: FileUploadProps) {
  const [imageSrc,setImageSrc]=useState<null| string>(null)
  return (
    <div className="flex flex-col gap-2">
    <div className="relative w-full">
      <div className="items-center justify-center max-w-xl mx-auto">
        <label
          className={`flex ${extraClass} justify-center w-full h-14 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-full appearance-none cursor-pointer hover:border-gray-400 focus:outline-none ${labelClass}`}
          id="drop"
        >
          <span className="flex items-center space-x-2">
            <img src="/icons/upload.png" alt="upload" />
            <span className="font-medium text-sm lg:text-medium text-center">
              Drop items here or
              <span className="font-extrabold ml-[4px]">Browse Files</span>
            </span>
          </span>
          <input 
            type="file"
            {...register(`${name}`,rules)}
            onChange={(e:any)=>{
              const file=e.target.files[0]
              setImageSrc(URL.createObjectURL(file))
              setValue(name,file)
              
            }}
            accept=".jpeg,.jpg,.png"
            // name="file_upload"
            className="hidden"
            // accept="image/png,image/jpeg"
          />
        </label>
      </div>
    </div>
    

    {(currentValue.isVerified || imageSrc) && <div className="">
      {(currentValue.imgSrc || imageSrc) &&   <Image className="object-contain" src={imageSrc?imageSrc:`${config.mediaURL}/${currentValue.imgSrc}`} alt='doc' width={200} height={200}/>}
    </div>}

    {!currentValue.isVerified && currentValue.imgSrc && !imageSrc && <p>Your Document Is Pending Verification</p>}
    
    </div>
  );
}
