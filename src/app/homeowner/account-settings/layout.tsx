"use client";

import { Image } from "@nextui-org/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import BaseButton from "@/components/common/button/base-button";
// import { resetError, updateHomeOwnerProfile } from "@/lib/features/authSlice";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { config } from "@/_utils/helpers/config";
import Cookies from "js-cookie";
import { useMutation } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import toast from "react-hot-toast";
// import ReactCrop, { type Crop } from 'react-image-crop'
// import 'react-image-crop/dist/ReactCrop.css'
import Cropper from "react-easy-crop";
 
interface Props {
  children: React.ReactNode;
}

const LINKS = [
  {
    text: "Contact Info",
    link: "contact-info",
  },
  {
    text: "Change Password",
    link: "change-password",
  },
];

export default function AccountSettingsLayout({ children }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [customError, setCustomError] = useState<string>("");
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const onCropComplete = (croppedArea:any, croppedAreaPixels:any) => {
    console.log(croppedArea, croppedAreaPixels)
  }

  // const dispatch = useAppDispatch();
  // const { loading, error, user } = useAppSelector((state) => state.auth);
  

  const changeProfileImgMutation=useMutation((datas:any)=>axiosInstance.putForm('/home-owner',datas),{
    onSuccess(data) {
      console.log('change profile picture',data.data)
      const userData=JSON.parse(Cookies.get('userData')!)
      const newData={...userData,profilePicture:data.data.data.user.profilePicture}
      Cookies.set('userData',JSON.stringify(newData))
      setImageSrc(`${config.mediaURL}/${data.data.data.user.profilePicture}`)
      setSelectedFile(null)
    },
    onError(error:any) {
      if (Array.isArray(error.response.data.message)) {
        toast.error(error.response.data.message[0]);
    } else {
        toast.error(error.response.data.message);
    }
    },
  })

  const [imageSrc, setImageSrc] = useState<string>('');
  useEffect(() => {
    if (pathname === "/homeowner/account-settings") {
      router.replace(`${pathname}/${LINKS[0].link}`);
    }
    const imgProf=JSON.parse(Cookies.get('userData')!)
    console.log(imgProf)
    setImageSrc(`${config.mediaURL}/${imgProf.profilePicture}`)
  }, [pathname, router]);


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('im here')
    const file = event.target.files ? event.target.files[0] : null;
    if (file && file.type.substr(0, 5) === "image") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
        setSelectedFile(file);
        setCustomError('')
      };
      reader.readAsDataURL(file);
    } else {
      setCustomError("select valid image file");
    }
  };

  const uploadImageToDB = async () => {
    // dispatch(resetError());
    setCustomError("");
    if (!selectedFile) {
      return setCustomError("File not selected!");
    }

    const formData=new FormData()
    formData.append('file',selectedFile)

    changeProfileImgMutation.mutate(formData)
    // const response = await dispatch(
    //   updateHomeOwnerProfile({
    //     file: selectedFile,
    //   }),
    // );

    // if (!response.type.includes("rejected")) {
    //   setSelectedFile(null);
    // }

    // console.log('image',imageSrc)
  };

  return (
    <main>
      <div className="mx-auto mb-16 py-16 w-3/4 px-8 sm:w-2/3 sm:px-12 lg:px-16 border border-solid bg-[#FCFCFC] border-color-8 rounded-md">
        <h2 className="text-3xl lg:text-4xl font-bold mb-20 text-left uppercase">
          My Account
        </h2>
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <div className="flex items-center gap-5 mb-16">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="fileInput"
                className="hidden"
              />
              <div className="rounded-full w-[97px] h-[97px] flex items-center justify-center p-5 bg-[#C2C2C2] border border-color-8">
                <label htmlFor="fileInput">
                {/* <Cropper
      image={imageSrc.includes('placeholder')?'/images/user.png':imageSrc}
      crop={crop}
      zoom={zoom}
      aspect={4 / 3}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
    /> */}
      <img src={imageSrc.includes('placeholder')?'/images/user.png':imageSrc} />

                {/* <ReactCrop circularCrop crop={crop} onChange={c => setCrop(c)}>
      <img src={imageSrc.includes('placeholder')?'/images/user.png':imageSrc} />
    </ReactCrop> */}
                  
                </label>
              </div>
              <div>
                <label  className="pb-2.5 text-color-22 text-sm lg:text-base font-bold text-nowrap">
                  Update Your Profile
                </label>
                <BaseButton
                  type="button"
                  extraClass="!rounded !p-2.5 !text-xs max-w-[120px]"
                  onClick={uploadImageToDB}
                  // disabled={!selectedFile || loading}
                  // isLoading={loading}
                >
                  Upload Profile
                </BaseButton>
              </div>
              {(customError) && (
                <p className="text-danger">{customError}</p>
              )}
            </div>
            <div className="flex flex-col gap-5">
              {LINKS.map((el) => (
                <Link
                  key={el.text}
                  href={`/homeowner/account-settings/${el.link}`}
                  className={`pb-5 border-b border-b-[#989898] text-lg font-medium ${
                    pathname.includes(el.link)
                      ? "text-blue-500"
                      : "text-color-22"
                  }`}
                >
                  {el.text}
                </Link>
              ))}
            </div>
          </div>
          <section className="flex-[2] bg-white py-9 px-10 w-full border border-color-8 shadow rounded-lg">
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}
