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
// import Cropper from "react-easy-crop";
import { CropperRef, Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css'
import BaseModal from "@/components/common/modal/base-modal";
import { useDisclosure } from "@nextui-org/modal";
 
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
  const [newImage,setNewImage]=useState<any>()
  const{isOpen,onClose,onOpenChange,onOpen} =useDisclosure()
  const { isOpen:isOpen1, onOpenChange:onOpenChange1, onOpen:onOpen1, onClose:onClose1 } = useDisclosure();


  const onChange = (cropper: CropperRef) => {
		// let newfile:any=''
    cropper.getCanvas()?.toBlob((blob) => {
      const file = new File([blob!], 'croppedImage.png', { type: 'image/png' });
      // console.log('new file',file)
      // newfile=file
      console.log('new',file)
      setSelectedFile(file)
      setImageSrc(URL.createObjectURL(file))
      // return file
    }, 'image/png')
	};
  // const onCropComplete = (croppedArea:any, croppedAreaPixels:any) => {
  //   console.log(croppedArea, croppedAreaPixels)
  // }

  // const dispatch = useAppDispatch();
  // const { loading, error, user } = useAppSelector((state) => state.auth);
  

  const changeProfileImgMutation=useMutation((datas:any)=>axiosInstance.putForm('/home-owner',datas),{
    onSuccess(data) {
      // onOpen()
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
        setNewImage(reader.result as string);
        onOpen1()
        // setSelectedFile(file);
        setCustomError('')
      };
      reader.readAsDataURL(file);
    } else {
      setCustomError("select valid image file");
    }
  };

  const uploadImageToDB = async () => {
    // dispatch(resetError());
    // setCustomError("");
    // if (!selectedFile) {
    //   return setCustomError("File not selected!");
    // }

    const formData=new FormData()
    formData.append('file',selectedFile!)

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
    <>
    <BaseModal
      onClose={onClose}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="md"
        header="System Generated Request"
        modalHeaderImage="/images/modal-success.png"
      >
        <div className="flex flex-col items-center mb-7">
          <h5 className="text-color-20 text-sm lg:text-base pb-4">
            Profile Updated Successfully
          </h5>
          <BaseButton
            type="button"
            onClick={onClose}
            extraClass="bg-color-9 !max-w-[350px] w-full text-white"
          >
            Okay
          </BaseButton>
        </div>
      </BaseModal>
      <BaseModal
      onClose={()=>{}}
      // isDismissable={false}
      hideCloseButton={true}
        isOpen={isOpen1}
        onOpenChange={onOpenChange1}
        size="md"
        header="Crop Image"
        // modalHeaderImage="/images/modal-success.png"
      >
        <div className="flex flex-col gap-2 items-center mb-7">
        <Cropper
                src={newImage}
                onChange={onChange}
                className={'cropper rounded-full h-[20rem] w-[20rem]   border border-color-8'}
                />
                <BaseButton type="button" onClick={()=>{
                  setNewImage(null)
                  uploadImageToDB()
                  onClose1()
                }}>Crop</BaseButton>
        </div>
      </BaseModal>
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
              {!newImage && <div className="rounded-full h-[8rem] w-[8rem] flex items-center justify-center p-[0.02rem] bg-[#C2C2C2] border border-color-8">
                 <img className="w-full h-full rounded-full  object-contain" src={imageSrc.includes('placeholder')?'/images/user.png':imageSrc} />
              </div>}
           
              
              <div>
                <label  className="pb-2.5 text-color-22 text-sm lg:text-base font-bold text-nowrap">
                  Update Your Profile
                </label>
                <label
                  // type="button"
                  htmlFor="fileInput"
                  className=" text-white bg-color-9 px-4 py-2 text-center cursor-pointer rounded-full  block "
                  // onClick={uploadImageToDB}
                  // disabled={!selectedFile || loading}
                  // isLoading={loading}
                >
                  Update Profile
                </label>
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
    </>
  );
}
