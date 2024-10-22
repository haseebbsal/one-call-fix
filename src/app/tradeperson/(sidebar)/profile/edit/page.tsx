"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
// import {
//   resetTradePerson,
//   updateprofile,
// } from "@/lib/features/tradePersonSlice";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { HiPlusCircle } from "react-icons/hi2";
import { useDisclosure } from "@nextui-org/modal";
import BaseModal from "@/components/common/modal/base-modal";
import BaseButton from "@/components/common/button/base-button";
import { useRouter } from "next/navigation";
// import { getUserInfo } from "@/_utils/helpers/auth";
import { config } from "@/_utils/helpers/config";
// import { resetUser } from "@/lib/features/userSlice";
import toast from "react-hot-toast";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { TRADES } from "@/_utils/enums";
import Image from "next/image";
import BaseTextArea from "@/components/common/form/base-textarea";
import BaseFileUpload from "@/components/common/file-upload/base-file-upload";
import { MdDelete } from "react-icons/md";
import { Button } from "@nextui-org/button";
import { CropperRef, Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css'

export default function EditProfile(datas:any) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const [userDetails,setUserDetails]=useState<any>()
  const [previousWork,setPreviousWork]=useState<any>([])
  const [newWork,setNewWork]=useState<any>([])
  const [imageSrc, setImageSrc] = useState<string>('');

  const [files,setFiles]=useState<any>([])
  // const dispatch = useAppDispatch();
  // const { userDetails }: any = useAppSelector((state) => state.user);
  const getUserQuery=useQuery(['tradePerson',datas.searchParams.id],({queryKey})=>axiosInstance.get(`/user/?userId=${queryKey[1]}`),{
    onSuccess(data) {
      setUserDetails(data.data)
      setValue('trade',`${data?.data.data.profile.trade}`)
      setValue('externalReviews',data?.data.data.profile.externalReviews)
      setValue('gasSafeRegistered',data.data.data.profile.gasSafeRegistered)
      setValue('website',data.data.data.profile.website)
      setServices(data.data.data.profile.servicesOffered)
      setValue('about',data?.data.data.profile.about)
      setProfilePic(data?.data.data.user.profilePicture.includes('placeholder')?'/images/profile-review.png':`${config.mediaURL}/${data?.data.data.user.profilePicture}`)
      
      setPreviousWork(data?.data.data.profile.previousJobs)
    },
    refetchOnWindowFocus:false
  })
  const router = useRouter();
  // const userInfo = getUserInfo();
  const [profilePic, setProfilePic] = useState(
    `${config.mediaURL}/${userDetails?.data.user.profilePicture}`,
  );
  const [profileFile, setProfileFile] = useState<any>(null);
  const [inputValue, setInputValue] = useState("");
  const [services, setServices] = useState<string[]>(
    userDetails?.data?.profile?.servicesOffered || [],
  );

  const handleAddService = () => {
    if (services.length >= 20) {
      toast.error("Limit of 20 services reached");
      return;
    }
    if (inputValue.trim() === "") {
      toast.error("Input cannot be empty");
      return;
    }
    setServices([...services, inputValue]);
    setInputValue("");
  };
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      about:"",
      trade: userDetails?.data?.profile?.trade.toString(),
      gasSafeRegistered: userDetails?.data?.profile?.gasSafeRegistered
        ? "Yes"
        : "No",
      externalReviews: userDetails?.data?.profile?.externalReviews,
      website: userDetails?.data?.profile?.website,
      // previousJobs:""
    },
  });

  console.log('values',getValues())
  const [newImage,setNewImage]=useState<any>(null)

  const queryClient=useQueryClient()
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files?.[0];
    if (file) {
      setProfileFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result as string);

        // setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const handleClick = () => {
    const inputElement = document.getElementById(
      "profilePicInput",
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.click();
    }
  };
  const onSubmit = async (data: any) => {
    console.log(data);
    console.log('entries',Object.entries(data))

    const filteredData:any = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== "" && value !== null,
      ),
    );

    // console.log('filtered data',filteredData)

    if (!Object.keys(filteredData).length && !services.length && !profileFile) {
      let err: any = ["No Data to Update"];
      toast.error(err);
      return;
    }
    if(!services.length && profileFile){
      const payload={
        // servicesOffered: services,
        profileImage: profileFile,
        ...filteredData,
      }
      const formData=new FormData()
      formData.append('profileImage',profileFile)
      formData.append('gasSafeRegistered',filteredData.gasSafeRegistered)
      formData.append('externalReviews',filteredData.externalReviews)
      formData.append('trade',filteredData.trade)
      formData.append('website',filteredData.website)
      formData.append('about',data.about)

      if(files.length>0){
        files.forEach((e:any)=>{
          formData.append('previousJobs',e)
        })
      }
  
      console.log('payload2',payload)
      editTradepersonMutation.mutate(formData)
      // toast.error(err);
      return
    }
    else if(services.length && !profileFile){
      const payload={
        servicesOffered: services,
        // profileImage: profileFile,
        ...filteredData,
      }
      const formData=new FormData()
      // console.log('services',services)
      // formData.append('servicesOffered',services as any)
      services.forEach((item,index) => {
        if(item.trim()){
  
          formData.append(`servicesOffered[${index}]`, item);
        }
       })
      //  formData.append('servicesOffered', ' ');

      formData.append('gasSafeRegistered',filteredData.gasSafeRegistered)
      formData.append('externalReviews',filteredData.externalReviews)
      formData.append('trade',filteredData.trade)
      formData.append('website',filteredData.website)
      formData.append('about',data.about)
      console.log('previous',data.previousJobs)
      if(files.length>0){
        files.forEach((e:any)=>{
          formData.append('previousJobs',e)
        })
      }
  
      console.log('payload3',[...formData.entries()])
      editTradepersonMutation.mutate(formData)
      return 
    }
    else if(!services.length && !profileFile){
      const payload={
        // servicesOffered: services,
        // profileImage: profileFile,
        ...filteredData,
      }
      const formData=new FormData()
      // formData.append('servicesOffered',services as any)
      formData.append('gasSafeRegistered',filteredData.gasSafeRegistered)
      formData.append('externalReviews',filteredData.externalReviews)
      formData.append('trade',filteredData.trade)
      formData.append('website',filteredData.website)
      formData.append('about',data.about)
      console.log('payload4',payload)
      editTradepersonMutation.mutate(formData)
      return 
    }
    const payload={
      servicesOffered: services,
      profileImage: profileFile,
      ...filteredData,
    }

    console.log('payload',payload)
    const formData=new FormData()
    services.forEach((item,index) => {
      if(item.trim()){

        formData.append(`servicesOffered[${index}]`, item);
      }
     })
      // formData.append('servicesOffered',services as any)
      formData.append('gasSafeRegistered',filteredData.gasSafeRegistered)
      formData.append('profileImage',profileFile!)
      formData.append('externalReviews',filteredData.externalReviews)
      formData.append('trade',filteredData.trade)
      formData.append('about',data.about)
      formData.append('website',filteredData.website)
      if(files.length>0){
        files.forEach((e:any)=>{
          formData.append('previousJobs',e)
        })
      }
      // console.log('payload',payload)
      editTradepersonMutation.mutate(formData)
    
  };
  const closeModel = () => {
    onClose();
    router.push('/tradeperson/profile')
  };

  

  const editTradepersonMutation=useMutation((data:any)=>axiosInstance.putForm('/trades-person',data),{
    onSuccess(data) {
      console.log('edit profile',data.data)
      queryClient.invalidateQueries('tradePerson')
      // router.refresh()
      setNewWork(null)

      onOpen()
    },
  })

  const deleteImage=useMutation((datasss:any)=>{
    // console.log('dataaaa',datasss)
    return axiosInstance.delete(`/trades-person/previous-jobs?name=${datasss}`)
  },{
    onSuccess(data, variables, context) {
      console.log('delteeee',data.data)
      queryClient.invalidateQueries('tradePerson')
    },
  })

  const onChange = (cropper: CropperRef) => {
		// let newfile:any=''
    cropper.getCanvas()?.toBlob((blob) => {
      const file = new File([blob!], 'croppedImage.png', { type: 'image/png' });
      // console.log('new file',file)
      // newfile=file
      console.log('new',file)
      setProfileFile(file)
      // setSelectedFile(file)
      // setProfilePic()
      setImageSrc(URL.createObjectURL(file))
      // return file
    }, 'image/png')
	};
  return (
    <>
      <BaseModal
      onClose={()=>router.push('/tradeperson/profile')}
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
            onClick={closeModel}
            extraClass="bg-color-9 !max-w-[350px] w-full text-white"
          >
            Okay
          </BaseButton>
        </div>
      </BaseModal>
      <div className="p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Edit Profile
        </h2>
        <div className="p-6 bg-white shadow-sm">
          {/* Profile Picture and Name */}
          <form
            className="flex flex-col sm:w-1/2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-2 items-start">
              <div className="relative w-max">
              {!newImage && <div className="rounded-full h-[5rem] w-[5rem] flex items-center justify-center p-5 bg-[#C2C2C2] border border-color-8">
                <Image
                width={50}
                height={50}
                  src={profilePic}
                  alt="Profile Image"
                  className="w-full h-full rounded-full object-contain cursor-pointer"
                  onClick={handleClick}
                />
                 {/* <img className="w-full h-full object-contain" src={imageSrc.includes('placeholder')?'/images/user.png':imageSrc} /> */}
              </div>}
              {newImage && <div className="flex flex-col gap-2">
                <Cropper
                src={newImage}
                onChange={onChange}
                className={'cropper rounded-full h-[5rem] w-[5rem] p-5 !bg-[#C2C2C2] border border-color-8'}
                />
                <BaseButton onClick={()=>{
                  setNewImage(null)
                  setProfilePic(imageSrc)
                  // uploadImageToDB()
                }}>Crop</BaseButton>
                
              </div> }
                {!newImage &&  <span
                  className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer"
                  onClick={handleClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A2.992 2.992 0 015 16V9a3 3 0 015-2.236V7a1 1 0 102 0V6.764A3 3 0 0114 9v7a3 3 0 01-.121.804l-5.91 5.91a1.992 1.992 0 01-2.828 0l-5.909-5.91A1.992 1.992 0 015.121 17.804z"
                    />
                  </svg>
                </span>}
                
                {/* Hidden File Input */}
                <input
                  type="file"
                  id="profilePicInput"
                  accept="image/*"
                  className="hidden"
                  // {...register("profileImage", { required: false })}
                  onChange={handleImageUpload}
                />
              </div>
              <div>
                <h2 className="text-md font-semibold">
                  {userDetails?.data.user.firstName} {userDetails?.data.user.lastName}
                </h2>
              </div>
            </div>

            {/* Service Type */}
            <div className="mt-6">
              <label className="block text-lg font-medium text-black mb-2">
                Service Type
              </label>
              <div className="flex space-x-4">
                <label
                  className={`inline-flex items-center justify-center px-4 py-2 border rounded-lg cursor-pointer ${
                    watch("trade") === "1"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    value="1"
                    {...register("trade", { required: false })}
                    className="hidden"
                  />
                  <span className="ml-2">Plumber</span>
                </label>
                <label
                  className={`inline-flex items-center justify-center px-4 py-2 border rounded-lg cursor-pointer ${
                    watch("trade") === "2"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    value="2"
                    {...register("trade", { required: false })}
                    className="hidden"
                  />
                  <span className="ml-2">Electrician</span>
                </label>
              </div>
            </div>
            <div
              className={`mt-6 ${watch("trade") === "1" ? "flex" : "hidden"} flex-col gap-2`}
            >
              <label className="block text-lg font-medium text-black ">
                Are you gas safe registered?
              </label>
              <p className="text-sm text-red-500">We'll need to verify your Gas Safe ID Card before you can win any gas-related jobs</p>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="Yes"
                    {...register("gasSafeRegistered", { required: false })}
                    className="form-radio text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-gray-700">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="No"
                    {...register("gasSafeRegistered", { required: false })}
                    className="form-radio text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-gray-700">No</span>
                </label>
              </div>
            </div>
            {/* services Section */}

            <div className="flex items-center space-x-2 mt-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="border border-gray-300 rounded-lg py-4 px-2 flex-grow"
                placeholder="Enter a service offer"
              />
              <button
                onClick={handleAddService}
                type="button"
                className="bg-blue-500 text-white p-2 rounded-lg"
              >
                <HiPlusCircle className="w-8 h-8" />
              </button>
            </div>
            <div className="mt-4 flex gap-2 flex-wrap w-full">
              {services.map((service, index) => (

                service.trim()!='' && 
                <div className="flex flex-col gap-1">
                  <button type="button" onClick={()=>{
                    setServices(services.filter((e,inde)=>inde!=index))
                  }} className="text-red-500 bg-red-200 p-1 rounded-full ml-auto text-xs !">X</button>
                   <span
                  key={index}
                  className="inline-block bg-blue-600 text-white px-3 py-1 rounded-lg text-lg  mb-2"
                >
                  {service}
                </span>
                </div>
               
              ))}
            </div>

            <div className="mt-6 w-full">
            <label className="block text-lg font-medium text-black mb-2">
                About Me
              </label>
              <BaseTextArea 
              name="about"

              // defaultValue={getUserQuery.data?.data.data.profile.about}
              control={control}
              // rules={{
              //   required:""
              // }}
              placeholder="Write details..."
              // label="About Me"
              extraClass={{
                label:"font-medium text-lg m-0"
              }}
              />
            </div>

            {/* Website URL */}
            <div className="mt-6 w-full">
              <label className="block text-lg font-medium text-black">
                Website URL
              </label>
              <div className="mt-1">
                <input
                  type="url"
                  placeholder="http://example.com"
                  className="w-full px-4 py-6 text-gray-700 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
                  {...register("website", { required: false })}
                />
              </div>
            </div>

            {/* External Reviews Link */}
            <div className="mt-6 w-full">
              <label className="block text-lg font-medium text-black">
                External Reviews Link
              </label>
              <div className="mt-1">
                <input
                  type="url"
                  placeholder="http://example.com"
                  className="w-full px-4 py-6 text-gray-700 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
                  {...register("externalReviews", { required: false })}
                />
              </div>
            </div>

            <div className="mt-6">
            <label className="block text-lg font-medium text-black">
                Work Gallery
              </label>
             <div className="flex gap-4 mt-4 w-full flex-wrap">
              {previousWork?.map((e:any)=>
              <div className="relative flex flex-col ">
                <button type="button" onClick={()=>{
                  // console.log('clickinngg')
                 
                  // console.log('delete',{
                  //   name:e
                  // })
                  // console.log('image',e)
                  // axiosInstance.delete('/trades-person/previous-jobs',{name:e})
                  // axiosInstance.delete('/trades-person/previous-jobs',{name:e})
                  deleteImage.mutate(e)
                }} className="bg-transparent ml-auto z-[4] top-[-1rem] text-sm bg-red-400  p-0 rounded-full w-max min-w-max h-max min-h-max right-0 text-red-500">x</button>
                <Image src={e.includes('blob')?e:`${config.mediaURL}/${e}`} alt="previous" width={100} height={100} className="object-contain"/>
              </div>)}
              {newWork?.map((e:any,index:number)=>
              <div className="relative flex flex-col">
                <button type="button" onClick={()=>{
                 
                  const filter=newWork.filter((j:string)=>j!=e)
                    setNewWork(filter)
                    setFiles((prev:any)=>prev.filter((j:any,ind:number)=>ind!=index))
                    return
                 
                }} className="bg-transparent ml-auto z-[4] top-[-1rem]   p-0 rounded-full w-max min-w-max text-md h-max min-h-max right-0 text-red-500">x</button>
                <Image src={e} alt="previous" width={100} height={100} className="object-contain"/>
              </div>)}
             </div>


      
             <label htmlFor="work" className="block bg-color-9 text-white text-center p-2 rounded-full mt-2 cursor-pointer relative">
              Add Work Gallery
              <input {...register('previousJobs' as any)} id="work" type="file" accept=".jpeg,.png,.jpg" className="absolute invisible" multiple onChange={(e)=>{
                const newFiles=(e.target.files)
                Object.values(newFiles as any).forEach((e)=>{
                  const newUrl=URL.createObjectURL(e as File)
                  setNewWork((prev:any)=>[...prev,newUrl])
                  setFiles((prev:any)=>[...prev,e])
                  // console.log(newUrl)
                })

              }}/>
             </label>
            </div>
            <div className="py-4">
              <BaseButton
              isLoading={editTradepersonMutation.isLoading}
              disabled={editTradepersonMutation.isLoading}
                type="submit"
                extraClass=" text-lg"
                // className="px-12 py-4 text-lg text-white bg-blue-500 rounded-full hover:bg-blue-600"
              >
                Save Profile
              </BaseButton>
              
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
