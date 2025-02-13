import { config } from "@/_utils/helpers/config";
import { cn } from "@nextui-org/theme";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { TbCloudUpload, TbPlus } from "react-icons/tb";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property];
};

type BaseFileInputProps<T extends FieldValues> = {
  name: string;
  extraClass?: { inputWrapper?: string; label?: string; input?: string };
  label?: string;
  show?:boolean
  currentData?:any
  deleteMedia?:any,
} & WithRequiredProperty<UseControllerProps<T>, "control">;

const BaseFileInput = <T extends FieldValues>({
  control,
  name,
  extraClass,
  label,
  currentData,
  rules = {},
  show=true,
  deleteMedia
}: BaseFileInputProps<T>) => {
  const [apiImages,setApiImages]=useState(currentData)
  const {
    field: { value, onChange },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules,
  });

  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (value) {
      setFiles(Array.isArray(value) ? value : [value]);
    }
  }, [value]);

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = [...files, ...acceptedFiles];
    localStorage.setItem('filess',JSON.stringify(newFiles))
    setFiles(newFiles);
    onChange(newFiles);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onChange(newFiles);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + " MB";
    else return (bytes / 1073741824).toFixed(1) + " GB";
  };

  const renderPreview = (file: File, index: number) => {
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    return (
      <SwiperSlide
        key={index}
        className="relative w-32 h-32 m-2 border rounded shadow-sm"
      >
        <div className="w-full h-32 overflow-hidden">
          {isImage && (
            <Image
              src={URL.createObjectURL(file)}
              alt={file.name}
              layout="fill"
              className="object-cover"
            />
          )}
          {isVideo && (
            <video
              src={URL.createObjectURL(file)}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      
        <button
        type="button"
          onClick={() => removeFile(index)}
          className="absolute top-1 left-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
        >
          ×
        </button>
      </SwiperSlide>
    );
  };

  return (
    <div className="mb-4">
      {label && (
        <label
          className={`block text-sm font-medium ${invalid ? "text-red-500" : "text-gray-700"}`}
        >
          {label}
        </label>
      )}
      <div
        {...getRootProps()}
        className={cn(
          "mt-1 block w-full p-4 border border-dashed rounded-full shadow-sm ",
          invalid ? "border-red-500" : "border-gray-300",
          "focus:ring-black-900 focus:border-black-900",
          "bg-white text-gray-700",
          extraClass?.inputWrapper,
        )}
      >
        <input {...getInputProps()} className="sr-only" />

        <p className="text-center text-gray-500">
          <TbCloudUpload className="w-6 h-6 inline mx-auto mr-2" />
          Drop Items here or
          <span className="font-bold cursor-pointer ml-1" onClick={open}>
            Browse Files
          </span>
        </p>
      </div>
      {show && <p className="text-center text-gray-500 mt-2">
        Adding photos/videos will increase your chances of getting a quote
        online
      </p>}
      
      

      
      { (
        <div className="mt-4">
          <div className="flex flex-wrap">
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
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      }}
    //   onSlideChange={() => console.log('slide change')}
    //   onSwiper={(swiper) => console.log(swiper)}
    >
       {apiImages?.map((j:any,index:number)=>{
            return (
                  <SwiperSlide
              key={index}
              className="relative w-32 h-32 m-2 border rounded shadow-sm"
            >
              <div className="w-full h-32 overflow-hidden">
                {!j.isVideo && <Image
              src={`${config.mediaURL}/${j.name}`}
              alt={j.name}
              layout="fill"
              objectFit="cover"
            />}
              
            {j.isVideo && (
            <video
              src={`${config.mediaURL}/${j.name}`}
              className="w-full h-full object-cover"
            />
          )}
              </div>
        <button
        type="button"
          onClick={() => {
            deleteMedia.mutate(j._id)
            setApiImages(apiImages.filter((e:any)=>e._id!=j._id))
          }}
          className="absolute top-1 left-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
        >
          ×
        </button>
            </SwiperSlide>)
            })}
          {files.length>0 && files.map((file, index) => renderPreview(file, index))}
     
    
          </Swiper>
         
            <button
            type="button"
              onClick={open}
              className="w-48 h-48 mt-8 sm:m-2 border-2 border-dashed border-gray-300 rounded flex items-center justify-center"
            >
              <TbPlus className="w-8 h-8 text-gray-400" />
            </button>
          </div>
        </div>
      )}
      

      {invalid && <p className="text-red-500 text-sm mt-1">{error?.message}</p>}
    </div>
  );
};

export default BaseFileInput;
