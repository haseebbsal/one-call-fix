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
import { useDisclosure } from "@nextui-org/modal";
import BaseModal from "@/components/common/modal/base-modal";
export default function AdditionalDocuments() {
  const { control,register,handleSubmit ,setValue} = useForm();
  const [user,setUser]=useState<any>(null)
  const {isOpen,onOpen,onClose,onOpenChange}=useDisclosure()

  const queryClient=useQueryClient()
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
    // console.log(Object.entries(data))
    const filterData=Object.entries(data).filter((e:any[])=>e[1].name)
    const formData=new FormData()
    filterData.forEach((e)=>{
      formData.append(e[0],e[1])
    })
    console.log('dataaa',[...formData.entries()])
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
      <LayoutWrapper
        sectionOneTitle="Additional Documents"
        sectionOneHeading="Electrician"
        sectionOneChildren={
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <>
                <InputWrapper
                className="mb-8"
                title="Attach Screenshot Proving You Are Part Of The Competent Persons Register"
                // description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <BaseVettingFileUpload setValue={setValue} currentValue={{imgSrc:getUserQuery.data?.data.data.profile.documents.additional.competentPersonRegister,isVerified:true}} extraClass="!bg-[#357EEC29] !border-[#357EEC]" register={register} name="competentPersonRegister"  labelClass="h-20"></BaseVettingFileUpload>
              </InputWrapper>
             
              

              <InputWrapper
                className="mb-8"
                title="EAL Qualification"
                // description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <BaseVettingFileUpload setValue={setValue} currentValue={{imgSrc:getUserQuery.data?.data.data.profile.documents.additional.ealQualification,isVerified:true}} extraClass="!bg-[#357EEC29] !border-[#357EEC]" register={register} name="ealQualification"  labelClass="h-20"></BaseVettingFileUpload>
              </InputWrapper>
              </>

              {
                !getUserQuery.data?.data.data.profile.gasSafeRegistered && getUserQuery.data?.data.data.profile.trade==1 && <>
                <InputWrapper
                className="mb-8"
                title="Diploma"
                // description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <BaseVettingFileUpload setValue={setValue} currentValue={{imgSrc:getUserQuery.data?.data.data.profile.documents.additional.diploma,isVerified:true}} extraClass="!bg-[#357EEC29] !border-[#357EEC]" register={register} name="diploma"  labelClass="h-20"></BaseVettingFileUpload>
              </InputWrapper>
             
              

              <InputWrapper
                className="mb-8"
                title="City Guild Qualification"
                // description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <BaseVettingFileUpload setValue={setValue} currentValue={{imgSrc:getUserQuery.data?.data.data.profile.documents.additional.cityGuildQualification,isVerified:true}} extraClass="!bg-[#357EEC29] !border-[#357EEC]" register={register} name="cityGuildQualification"  labelClass="h-20"></BaseVettingFileUpload>
              </InputWrapper>
                </>}
              <InputWrapper
                className="mb-8"
                title="NVQ Level 3 Qualification"
                // description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <BaseVettingFileUpload setValue={setValue} currentValue={{imgSrc:getUserQuery.data?.data.data.profile.documents.additional.nvqQualification,isVerified:true}} extraClass="!bg-[#357EEC29] !border-[#357EEC]" register={register} name="nvqQualification"  labelClass="h-20"></BaseVettingFileUpload>
              </InputWrapper>

              <InputWrapper
                className="mb-8"
                title="Public Liability Insurance"
                // description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <BaseVettingFileUpload setValue={setValue} currentValue={{imgSrc:getUserQuery.data?.data.data.profile.documents.additional.publicLiabilityInsurance,isVerified:true}} extraClass="!bg-[#357EEC29] !border-[#357EEC]" register={register} name="publicLiabilityInsurance"  labelClass="h-20"></BaseVettingFileUpload>
              </InputWrapper>

              <InputWrapper
                className="mb-8"
                title="Trustmark"
                // description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <BaseVettingFileUpload setValue={setValue} currentValue={{imgSrc:getUserQuery.data?.data.data.profile.documents.additional.trustMark,isVerified:true}} extraClass="!bg-[#357EEC29] !border-[#357EEC]" register={register} name="trustMark"  labelClass="h-20"></BaseVettingFileUpload>
              </InputWrapper>

              <div className="flex flex-wrap gap-6 ml-5">
                <BaseButton isLoading={updateProfileMutation.isLoading} disabled={updateProfileMutation.isLoading} type="submit" extraClass="bg-color-12 text-white">
                  Save Changes
                </BaseButton>
                {/* <CustomButton extraClass="bg-white text-white border-2 px-10 border-color-12 text-color-12 font-bold">
                  Cancel
                </CustomButton> */}
              </div>
            </form>
          </>
        }
        sectionTwoTitle="Profile"
        sectionTwoChildren={
          <>
            <ProfileCompletion data={getUserQuery.data?.data.data} />
          </>
        }
      ></LayoutWrapper>
    </>
  );
}
