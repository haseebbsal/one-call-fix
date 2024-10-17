"use client";

import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

import { ROLES } from "@/_utils/enums";
import { SignUpPayload } from "@/_utils/types";
import BaseButton from "@/components/common/button/base-button";
import BaseCheckbox from "@/components/common/form/base-checkbox";
import BaseInput from "@/components/common/form/base-input";
// import { resetError, signUpUser } from "@/lib/features/authSlice";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useMutation } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import toast from "react-hot-toast";
import axios from "axios";
import BaseInputPassword from "@/components/common/form/base-password";

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
  marketing: boolean;
}

export default function HomeOwnerSignUpForm({
  headlineRef,
  chatId,
  mandatoryAnswers
}:{headlineRef?:any,chatId?:any,
  mandatoryAnswers?:any}) {
  const router = useRouter();

  // const dispatch = useAppDispatch();
  const createJobMutation=useMutation((data:any)=>{
    const accessToken=localStorage.getItem('accessToken')
    return axios.postForm(`${process.env.NEXT_PUBLIC_BASE_API_URL}/job`,data,{
      headers:{Authorization:`Bearer ${accessToken}`}
    })
  },{
    onSuccess(data) {
      console.log('create job',data.data)
    },
  })
  const signUpMutation=useMutation((data:SignUpPayload)=>axiosInstance.post('/auth/signup',data),{
    onSuccess(data) {
      console.log('sign up',data.data)
      const{access_token,refresh_token}=data.data.data.tokens
      const {user}=data.data.data
      localStorage.setItem('accessToken',access_token)
      localStorage.setItem('refreshToken',refresh_token)
      localStorage.setItem('userData',JSON.stringify(user))
      if(headlineRef){
        const formData = new FormData();
        const {files,headline,address:{latitude,longitude,city,country,formattedAddress,postalCode}}=headlineRef()
        formData.append("completion", mandatoryAnswers.completion);
        formData.append("estimatedBudget", mandatoryAnswers.estimatedBudget);
        formData.append("headline", headline);
        formData.append("address[postalCode]", postalCode);
        formData.append("address[formattedAddress]", formattedAddress);
        formData.append("address[latitude]", latitude);
        formData.append("address[longitude]", longitude);
        formData.append("address[city]", city);
        formData.append("address[country]", country);
        formData.append("chatId", chatId!);

        for (const file of files) {
          formData.append("files", file);
        }
        createJobMutation.mutate(formData)
      }
      router.push(`/email-verify/${user._id}`)

    },
    onError(error: any) {
      if (Array.isArray(error.response.data.message)) {
        toast.error(error.response.data.message[0]);
    } else {
        toast.error(error.response.data.message);
    }
    }
  })
  // const { loading, error, user } = useAppSelector((state) => state.auth);
  const validateUKPhoneNumber = (value: any) => {
    // UK phone number regex
    const ukPhoneNumberPattern = /^(?:\+44|0)7\d{9}$/;
    return ukPhoneNumberPattern.test(value) || "Enter a valid UK phone number";
  };
  const { control, handleSubmit, watch } = useForm<any>();

  const onSubmit = async (data: SignUpFormValues) => {
    // dispatch(resetError());
    const payload: SignUpPayload = {
      role: ROLES.HOMEOWNER,
      homeOwner: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.mobile,
        password: data.password,
      },
    };

    signUpMutation.mutate(payload)
    // // const response = await dispatch(signUpUser(payload));
    // if (!response.type.includes("rejected")) {
    //   // redirect to verify email page
    //   router.push(`/email-verify/${user._id}`);
    // }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-10 flex flex-col gap-4"
    >
      <h3 className="text-xl lg:text-2xl font-bold text-color-6 pb-3">
        Create Account
      </h3>

      {/* split in 2 fields in same row */}
      <div className="flex flex-col sm:flex-row gap-4">
        <BaseInput
          name="firstName"
          type="text"
          control={control}
          placeholder="First Name *"
          rules={{ required: "First Name is required" }}
        />
        <BaseInput
          name="lastName"
          type="text"
          control={control}
          placeholder="Last Name *"
          rules={{ required: "Last Name is required" }}
        />
      </div>

      <Controller
        name="mobile"
        control={control}
        rules={{
          required: "Phone number is required",
          validate: validateUKPhoneNumber,
        }}
        render={({ field, fieldState: { error } }) => (
          <>
            <PhoneInput
              {...field}
              placeholder="Enter Phone Number"
              defaultCountry="GB"
              international
              addInternationalOption={false}
              countries={["GB"]}
              className="px-4 py-3 rounded-full border border-gray-300"
            />
            {error && (
              <span className="text-red-500 text-sm">{error.message}</span>
            )}
          </>
        )}
      />

      <BaseInput
        name="email"
        type="email"
        control={control}
        placeholder="Email Address *"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Invalid email address",
          },
        }}
      />
      <BaseInputPassword
        name="password"
        type="password"
        control={control}
        placeholder="Create Password *"
        rules={{
          required: "Password is required",
          pattern: {
            value: /^.{8,30}$/,
            message:"Password must contain at least 8 to 30 characters",
          },
        }}
      />
      <BaseInputPassword
        name="confirmPassword"
        type="password"
        control={control}
        placeholder="Confirm Password *"
        rules={{
          required: "Please confirm your password",
          validate: (value) =>
            value === watch("password") || "Passwords do not match",
        }}
      />

      {/* add 2 horizontal checkboxes */}
      <div className="flex flex-col sm:flex-row gap-4">
        <BaseCheckbox
          name="terms"
          label="Accept terms & condition"
          control={control}
        />
        <BaseCheckbox
          name="marketing"
          label="For marketing"
          control={control}
        />
      </div>

      <div className="w-full flex flex-col sm:flex-row justify-between items-start gap-2.5">
        <BaseButton type="submit" 
        // isLoading={loading} disabled={loading}
        >
          Sign Up
        </BaseButton>
      </div>
      <div className="mt-2">
        <p className="text-xs md:text-base text-color-10 w-full">
          <Link
            href={"/login"}
            className="text-color-9 transition-all duration-400 hover:opacity-80"
          >
            Already have an account?
          </Link>
        </p>
      </div>
    </form>
  );
}
