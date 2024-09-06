"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import BaseButton from "@/components/common/button/base-button";
import BaseInput from "@/components/common/form/base-input";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import { resetError, updateHomeOwnerProfile } from "@/lib/features/authSlice";
import { FaEdit } from "react-icons/fa";
import { HomeOwnerUpdateProfilePayload } from "@/_utils/types";
import { useMutation } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function ContactInfo() {
  // const [user,setUser]=useState({
  //   firstName:'',
  //   lastName:'',
  //   phone:'',
  //   email:'',
  //   profilePicture:''
  // })
  // const dispatch = useAppDispatch();
  // const user={
  //   firstName:'',
  //   lastName:'',
  //   phone:'',
  //   email:'',
  //   profilePicture:''
  // }
  // const { loading, error, user } = useAppSelector((state) => state.auth);

  // console.log('user info',user)

  const { control, handleSubmit, setValue } = useForm<any>();


  const changeProfileImgMutation=useMutation((datas:any)=>axiosInstance.putForm('/home-owner',datas),{
    onSuccess(data) {
      console.log('change profile picture',data.data)
      // const userData=JSON.parse(Cookies.get('userData')!)
      // const newData={...userData,profilePicture:data.data.data.user.profilePicture}
      Cookies.set('userData',JSON.stringify(data.data.data.user))
      // setImageSrc(`${config.mediaURL}/${data.data.data.user.profilePicture}`)
      // setSelectedFile(null)
    },
    onError(error:any) {
      if (Array.isArray(error.response.data.message)) {
        toast.error(error.response.data.message[0]);
    } else {
        toast.error(error.response.data.message);
    }
    },
  })
  useEffect(() => {
    const userData=JSON.parse(Cookies.get('userData')!)
    console.log('user',userData)
    setValue("firstName", userData.firstName);
      setValue("lastName", userData.lastName);
      setValue("phone", userData.phone);
      setValue("email", userData.email);
  }, []);

  const onSubmit = (data: HomeOwnerUpdateProfilePayload) => {
    // dispatch(resetError());
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
    };
    const formData=new FormData()
    formData.append('firstName',data.firstName as any)
    formData.append('lastName',data.lastName as any)
    formData.append('phone',data.phone as any)
    changeProfileImgMutation.mutate(formData)

    // dispatch(updateHomeOwnerProfile(payload));
  };

  return (
    <div className="flex flex-col gap-5">
      <h4 className="text-base lg:text-xl font-bold text-color-6">
        Contact Info
      </h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <div className="my-8">
          <h3 className="text-sm lg:text-base font-semibold text-color-6 mb-1">
            Email address
          </h3>
          <BaseInput
            name="email"
            type="email"
            placeholder="email@example.com"
            control={control}
            disabled={true}
            icon={<FaEdit color="#2BABFB" />}
            rules={{
              required: "Email is required",
            }}
          />
        </div> */}
        <div className="my-8">
          <h3 className="text-sm lg:text-base font-semibold text-color-6 mb-1">
            Phone Number
          </h3>
          <BaseInput
            name="phone"
            type="text"
            // defaultValue={user.phone}
            placeholder="001122114400"
            control={control}
            icon={<FaEdit color="#2BABFB" />}
            rules={{
              required: "Phone Number is required",
            }}
          />
        </div>
        <div className="my-8">
          <h3 className="text-sm lg:text-base font-semibold text-color-6 mb-1">
            First Name
          </h3>
          <BaseInput
            name="firstName"
            type="text"
            // defaultValue={user.firstName}
            placeholder="First Name Here"
            control={control}
            icon={<FaEdit color="#2BABFB" />}
            rules={{
              required: "First Name is required",
            }}
          />
        </div>
        <div className="my-8">
          <h3 className="text-sm lg:text-base font-semibold text-color-6 mb-1">
            Last Name
          </h3>
          <BaseInput
            name="lastName"
            type="text"
            placeholder="Last Name Here"
            control={control}
            icon={<FaEdit color="#2BABFB" />}
            rules={{
              required: "Last Name is required",
            }}
          />
        </div>

        <BaseButton type="submit" 
        isLoading={changeProfileImgMutation.isLoading} disabled={changeProfileImgMutation.isLoading}
        >
          Save
        </BaseButton>
        {/* {error && <p className="text-danger">{error}</p>} */}
      </form>
    </div>
  );
}
