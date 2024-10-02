"use client";

import { FieldValues, useForm } from "react-hook-form";

import CustomButton from "@/components/common/button/custom-button";
import TradepersonCustomInput from "@/components/common/form/tradeperson-custom-input";
import InputWrapper from "@/components/modules/dashboard/input-wrapper";
import LayoutWrapper from "@/components/modules/dashboard/layout-wrapper";
import ProfileCompletion from "@/components/modules/tradeperson/profile-completion";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import Cookies from "js-cookie";
import GooglePlacesInput from "@/components/common/form/google-places-input";
import EditGooglePlacesInput from "@/components/common/form/edit-google-place";
import toast from "react-hot-toast";
export default function AccountDetails() {
  const { control,setValue ,handleSubmit,watch,getValues} = useForm();
  const [notMatch,setNotMatch]=useState(false)
  const [user,setUser]=useState<any>(null)
  useEffect(()=>{
    const user=JSON.parse(Cookies.get('userData')!)
    console.log(user)
    setUser(user)
  },[])
  
  useEffect(()=>{
    const oldValue=getValues('oldPassword')
    const value=getValues('newPassword')
    if(value){
      if(value!=oldValue){
        setNotMatch(true)
      }
      setNotMatch(false)
    }
  },[watch('oldPassword')])

  const getUserQuery=useQuery(['tradePerson',user?._id],({queryKey})=>axiosInstance.get(`/user/?userId=${queryKey[1]}`),{
    enabled:!!user,
    onSuccess(data) {
      setValue('businessName',data.data.data.profile.companyName)
      setValue('accountFirstName',data.data.data.user.firstName)
      setValue('accountLastName',data.data.data.user.lastName)
      setValue('phoneNumber',data.data.data.user.phone)
      setValue('address',{
        city:data.data.data.profile.address.city,
        country:data.data.data.profile.address.country,
        postalCode:data.data.data.profile.address.postalCode,
        latitude:data.data.data.profile.address.location.coordinates[0],
        longitude:data.data.data.profile.address.location.coordinates[1]

    })
    },
  })

  const updateProfileMutation=useMutation((data:any)=>axiosInstance.putForm('/trades-person',data),{
    onSuccess(data, variables, context) {
      console.log('update profile',data.data)
    },
    onError(error:any) {
      if (Array.isArray(error.response.data.message)) {
        toast.error(error.response.data.message[0]);
    } else {
        toast.error(error.response.data.message);
    }
    },
  })

  const updatePassword=useMutation((data:any)=>axiosInstance.put('/user/password',data),{
    onSuccess(data, variables, context) {
      console.log('update password',data.data)
    },
    onError(error:any) {
      if (Array.isArray(error.response.data.message)) {
        toast.error(error.response.data.message[0]);
    } else {
        toast.error(error.response.data.message);
    }
    },
  })

  const submit=(data:FieldValues)=>{
    console.log('submit data',data)
    if(data.oldPassword && data.confirmPassword){
      updatePassword.mutate({
        "oldPassword": data.oldPassword,
        "newPassword": data.confirmPassword
    })
    }
    const formData=new FormData()
    formData.append('companyName',data.businessName)
    formData.append('firstName',data.accountFirstName)
    formData.append('lastName',data.accountLastName)
    formData.append("address[postalCode]", (data.address as any).postalCode);
    formData.append("address[formattedAddress]", (data.address as any).formattedAddress);
    formData.append("address[latitude]", (data.address as any).latitude);
    formData.append("address[longitude]", (data.address as any).longitude);
    formData.append("address[city]", (data.address as any).city);
    formData.append("address[country]", (data.address as any).country);
    formData.append('phone',data.phoneNumber)
    updateProfileMutation.mutate(formData)
  }
  
  return (
    <>
      <LayoutWrapper
        sectionOneTitle="Account Details"
        sectionOneChildren={
          <>
            <form onSubmit={handleSubmit(submit)}>
              <InputWrapper
                className="mb-8"
                title="Business Name"
                // description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <TradepersonCustomInput
                  name="businessName"
                  type="text"
                  defaultValue={getUserQuery.data?.data.data.profile.companyName}
                  control={control}
                  variant="bordered"
                  placeholder="Your Business Type"
                  radius="full"
                  size="lg"
                  extraClass="max-w-xl"
                />
              </InputWrapper>

              {/* <InputWrapper
                className="mb-8"
                title="Account Email"
                // description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <TradepersonCustomInput
                  name="accountEmail"
                  type="text"
                  control={control}
                  variant="bordered"
                  placeholder="mail@example.com"
                  radius="full"
                  size="lg"
                  extraClass="max-w-xl"
                />
              </InputWrapper> */}

              <InputWrapper
                className="mb-8"
                title="Account First Name"
                // description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <TradepersonCustomInput
                  name="accountFirstName"
                  type="text"
                  control={control}
                  variant="bordered"
                  placeholder="First Name"
                  radius="full"
                  size="lg"
                  extraClass="max-w-xl"
                />
              </InputWrapper>

              <InputWrapper
                className="mb-8"
                title="Account Last Name"
                // description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <TradepersonCustomInput
                  name="accountLastName"
                  type="text"
                  control={control}
                  variant="bordered"
                  placeholder="Last Name"
                  radius="full"
                  size="lg"
                  extraClass="max-w-xl"
                />
              </InputWrapper>
              <InputWrapper
                className="mb-8"
                title="Phone Number"
                // description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <TradepersonCustomInput
                  name="phoneNumber"
                  type="text"
                  control={control}
                  variant="bordered"
                  placeholder="075 0123 458"
                  radius="full"
                  size="lg"
                  extraClass="max-w-xl"
                />
              </InputWrapper>

              <InputWrapper
                className="mb-8"
                title="Business Address"
                // description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <EditGooglePlacesInput
                    // changeAddressKey={setMandatoryAnswers}
                      name="address"
                      control={control}
                      placeholder="Postcode"
                      rules={{}}
                      // rules={(mandatoryAnswers.address as any).postalCode?{}:{ required: "Post Code is required" }}
                      addressKey={getUserQuery.data?.data.data.profile.address}
                      radius="sm"
                    />
              </InputWrapper>

              <InputWrapper
                className="mb-8"
                title="Old Password"
                // description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <TradepersonCustomInput
                  name="oldPassword"
                  type="password"
                  control={control}
                  variant="bordered"
                  placeholder="*************"
                  radius="full"
                  size="lg"
                  extraClass="max-w-xl"
                />
              </InputWrapper>
              <InputWrapper
                className="mb-8"
                title="New Password"
                // description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <TradepersonCustomInput
               
                  name="newPassword"
                  type="password"
                  control={control}
                  variant="bordered"
                  placeholder="*************"
                  radius="full"
                  size="lg"
                  extraClass="max-w-xl"
                />
              </InputWrapper>

              <InputWrapper
                className="mb-8"
                title="Confirm Password"
                // description="Lorem ipsum dolor sit amet,cons tetuer lorem ipsum."
              >
                <TradepersonCustomInput
               
                  name="confirmPassword"
                  type="password"
                  rules={{
                    // required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("newPassword") || "Passwords do not match",
                  }}
                  control={control}
                  variant="bordered"
                  placeholder="*************"
                  radius="full"
                  size="lg"
                  extraClass="max-w-xl"
                />
              </InputWrapper>

              <div className="flex flex-wrap gap-6 ml-5">
                <CustomButton type="submit" extraClass="bg-color-12 text-white">
                  Save Changes
                </CustomButton>
                <CustomButton extraClass="bg-white text-white border-2 px-10 border-color-12 text-color-12 font-bold">
                  Cancel
                </CustomButton>
              </div>
            </form>
          </>
        }
        sectionTwoTitle="Profile"
        sectionTwoChildren={<ProfileCompletion data={getUserQuery.data?.data.data}/>}
      ></LayoutWrapper>
    </>
  );
}
