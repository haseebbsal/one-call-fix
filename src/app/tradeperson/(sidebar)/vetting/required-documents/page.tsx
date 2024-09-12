"use client";

import { FieldValues, useForm } from "react-hook-form";

import CustomButton from "@/components/common/button/custom-button";
import BaseFileUpload from "@/components/common/file-upload/base-file-upload";
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
export default function RequiredDocuments() {
  const { control,register,handleSubmit } = useForm();
  const [user,setUser]=useState<any>(null)
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
    const filterData=Object.entries(data).filter((e:any[])=>e[1].length)
    const formData=new FormData()
    filterData.forEach((e)=>{
      formData.append(e[0],e[1][0])
    })

    formData.append('penis','daddy')

    console.log('formdata',formData.get('eicrDocumentation'))
    updateProfileMutation.mutate(formData)
    // console.log(filterData)
  }
  return (
    <>
      <LayoutWrapper
        sectionOneTitle="Required Documents"
        sectionOneHeading="Electrician"
        sectionOneChildren={
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputWrapper
                className="mb-8"
                title="ID (Passport, Driving License)"
                // description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <BaseFileUpload register={register} name="identification"  labelClass="h-20"></BaseFileUpload>
              </InputWrapper>

              <InputWrapper
                className="mb-8"
                title="Part P Qualification"
                // description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <BaseFileUpload register={register} name="partPQualification"  labelClass="h-20"></BaseFileUpload>
              </InputWrapper>

              <InputWrapper
                className="mb-8"
                title="17th or 18th Edition Wiring Regulations (BS 7671) Certificate"
                // description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <BaseFileUpload register={register} name="wiringRegulationsCertificate"  labelClass="h-20"></BaseFileUpload>
              </InputWrapper>

              <InputWrapper
                className="mb-8"
                title="EICR documentation (e.g. City and Guilts 2391-52)"
                // description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <BaseFileUpload register={register} name="eicrDocumentation"  labelClass="h-20"></BaseFileUpload>
              </InputWrapper>

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
      ></LayoutWrapper>
    </>
  );
}
