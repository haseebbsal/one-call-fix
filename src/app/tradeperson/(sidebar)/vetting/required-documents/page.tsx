"use client";

import { FieldValues, useForm } from "react-hook-form";

import CustomButton from "@/components/common/button/custom-button";
import TradepersonCustomInput from "@/components/common/form/tradeperson-custom-input";
import InputWrapper from "@/components/modules/dashboard/input-wrapper";
import LayoutWrapper from "@/components/modules/dashboard/layout-wrapper";
import ProfileCompletion from "@/components/modules/tradeperson/profile-completion";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import BaseButton from "@/components/common/button/base-button";
import toast from "react-hot-toast";
import BaseVettingFileUpload from "@/components/common/file-upload/vetting-file-upload";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@nextui-org/modal";
import BaseModal from "@/components/common/modal/base-modal";


enum Verified {
  identification = 'isIdVerified',
  gasSafeId = 'isGasSafeVerified',
  partPQualification="isPartPQualified",
  eicrDocumentation="isEicrDocumentationVerified",
  wiringRegulationsCertificate="isWiringRegulationsCertified"
}


export default function RequiredDocuments() {
  const {isOpen,onOpen,onClose,onOpenChange}=useDisclosure()
  const { control,register,handleSubmit ,setValue} = useForm();
  const [user,setUser]=useState<any>(null)
  const queryClient=useQueryClient()
  const router=useRouter()
  useEffect(()=>{
    const user=JSON.parse(Cookies.get('userData')!)
    console.log(user)
    setUser(user)
  },[])

  const getUserQuery=useQuery(['tradePerson',user?._id],({queryKey})=>axiosInstance.get(`/user/?userId=${queryKey[1]}`),{
    enabled:!!user
  })

  const updateProfileMutation=useMutation((data:any)=>axiosInstance.putForm('/trades-person',data),{
    onSuccess(data, variables, context) {
      console.log('update',data.data)
      queryClient.invalidateQueries('tradePerson')
      onOpen()
      router.refresh()
    },
    onError(error:any) {
      if (Array.isArray(error.response.data.message)) {
        toast.error(error.response.data.message[0]);
    } else {
        toast.error(error.response.data.message);
    }
    },
  })
  function onSubmit(data:FieldValues){
    console.log('values',data)
    console.log(Object.entries(data))
    const filterData=Object.entries(data).filter((e:any[])=>e[1].name)
    const formData=new FormData()
    filterData.forEach((e)=>{
      formData.append(e[0],e[1])
    })

    // formData.append('penis','daddy')

    // console.log('formdata',formData.get('eicrDocumentation'))
    updateProfileMutation.mutate(formData)
    // console.log(filterData)
  }
  return (
    <>
    <BaseModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="md"
        header="System Generated Request"
        modalHeaderImage="/images/modal-success.png"
      >
        <div className="flex flex-col items-center mb-7">
          <h5 className="text-color-20 text-sm lg:text-base pb-4">
            Documents Submitted Successfully
          </h5>
          <BaseButton
            type="button"
            onClick={()=>onClose()}
            extraClass="bg-color-9 !max-w-[350px] w-full text-white"
          >
            Okay
          </BaseButton>
        </div>
      </BaseModal>
    {getUserQuery.data &&   <LayoutWrapper
        sectionOneTitle="Required Documents"
        sectionOneHeading={getUserQuery.data?.data.data.profile.trade==2?"Electrician":"Plumber"}
        sectionOneChildren={
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputWrapper
                className="mb-8"
                title="ID (Passport, Driving License)"
                // description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <BaseVettingFileUpload setValue={setValue} currentValue={{imgSrc:getUserQuery.data?.data.data.profile.documents.required.identification,isVerified:getUserQuery.data?.data.data.profile[Verified['identification']]}} extraClass="!bg-[#357EEC29] !border-[#357EEC]" register={register} name="identification"  labelClass="h-20"></BaseVettingFileUpload>
              </InputWrapper>

              { getUserQuery.data?.data.data.profile.trade==2 && <>
                <InputWrapper
                className="mb-8"
                title="Part P Qualification"
                // description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <BaseVettingFileUpload setValue={setValue} currentValue={{imgSrc:getUserQuery.data?.data.data.profile.documents.required.partPQualification,isVerified:getUserQuery.data?.data.data.profile[Verified['partPQualification']]}} extraClass="!bg-[#357EEC29] !border-[#357EEC]" register={register} name="partPQualification"  labelClass="h-20"></BaseVettingFileUpload>
              </InputWrapper>

              <InputWrapper
                className="mb-8"
                title="17th or 18th Edition Wiring Regulations (BS 7671) Certificate"
                // description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <BaseVettingFileUpload setValue={setValue} currentValue={{imgSrc:getUserQuery.data?.data.data.profile.documents.required.wiringRegulationsCertificate,isVerified:getUserQuery.data?.data.data.profile[Verified['wiringRegulationsCertificate']]}} extraClass="!bg-[#357EEC29] !border-[#357EEC]" register={register} name="wiringRegulationsCertificate"  labelClass="h-20"></BaseVettingFileUpload>
              </InputWrapper>

              <InputWrapper
                className="mb-8"
                title="EICR documentation (e.g. City and Guilts 2391-52)"
                // description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <BaseVettingFileUpload setValue={setValue} currentValue={{imgSrc:getUserQuery.data?.data.data.profile.documents.required.eicrDocumentation,isVerified:getUserQuery.data?.data.data.profile[Verified['eicrDocumentation']]}} extraClass="!bg-[#357EEC29] !border-[#357EEC]" register={register} name="eicrDocumentation"  labelClass="h-20"></BaseVettingFileUpload>
              </InputWrapper>

              </>}

              {
                getUserQuery.data?.data.data.profile.gasSafeRegistered && getUserQuery.data?.data.data.profile.trade==1 && 
                <InputWrapper
                className="mb-8"
                title="Gas Safe ID"
                // description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <BaseVettingFileUpload setValue={setValue} currentValue={{imgSrc:getUserQuery.data?.data.data.profile.documents.required.gasSafeId,isVerified:getUserQuery.data?.data.data.profile[Verified['gasSafeId']]}} extraClass="!bg-[#357EEC29] !border-[#357EEC]" register={register} name="gasSafeId"  labelClass="h-20"></BaseVettingFileUpload>
              </InputWrapper>
              }
             
              <div className="flex flex-wrap gap-6 ml-5">
              <BaseButton isLoading={updateProfileMutation.isLoading} disabled={updateProfileMutation.isLoading} type="submit" extraClass="bg-color-12 text-white">
                  Save Changes
                </BaseButton>
                {/* <BaseButton extraClass="bg-white text-white border-2 px-10 border-color-12 text-color-12 font-bold">
                  Cancel
                </BaseButton> */}
              </div>
            </form>
          </>
        }
        sectionTwoTitle="Profile"
        sectionTwoChildren={
          <>
            <ProfileCompletion data={getUserQuery.data?.data.data}/>
          </>
        }
      ></LayoutWrapper>}
     
    </>
  );
}
