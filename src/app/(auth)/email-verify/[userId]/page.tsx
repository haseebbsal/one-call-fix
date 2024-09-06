"use client";

import CustomOTPInput from "@/components/common/auth/otp-input";
import BaseButton from "@/components/common/button/base-button";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import {
//   resendVerificationCode,
//   resetError,
//   verifyEmail,
// } from "@/lib/features/authSlice";
import { ResendEmailPayload } from "@/_utils/types";
import { useState } from "react";
import { useMutation } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import Cookies from "js-cookie";
import { ROLES } from "@/_utils/enums";
import toast from "react-hot-toast";

export default function EmailVerification(datas:any) {
  const router = useRouter();

  const cardClientSecretMutation=useMutation(()=>axiosInstance.put('/payment/card'),{
    onSuccess(data) {
      console.log('data client secret',data.data)
      Cookies.set('clientSecret',data.data.data.clientSecret)
    },
  })
  const resendEmailMutation=useMutation(()=>axiosInstance.get(`/auth/resend-verification-code?userId=${userId}`))
  const verifyEmailMutation=useMutation((data:any)=>axiosInstance.post(`/auth/email-verification?userId=${userId}`,data),{
    onSuccess(data) {
      setOtp("");
      const user=JSON.parse(localStorage.getItem('userData')!)
      const accessToken=localStorage.getItem('accessToken')
      const refreshToken=localStorage.getItem('refreshToken')
      Cookies.set('accessToken', accessToken!)
      Cookies.set('refreshToken', refreshToken!)
      Cookies.set('userData',localStorage.getItem('userData')!)
      if (user.role === ROLES.HOMEOWNER) {
        router.push("/homeowner/jobs");
      } else if (user.role === ROLES.TRADESPERSON) {
        router.push("/tradeperson/dashboard");
      } else {
        router.push("/admin/dashboard");
      }
      if(user.role === ROLES.TRADESPERSON){
        cardClientSecretMutation.mutate()
      }

      localStorage.clear()
      // router.replace("/login");
    },
    onError(error:any) {
      if (Array.isArray(error.response.data.message)) {
        toast.error(error.response.data.message[0]);
    } else {
        toast.error(error.response.data.message);
    }
    },
  })
  const userId: string =datas.params.userId

  // const dispatch = useAppDispatch();
  const [otp, setOtp] = useState("");
  const [customError, setCustomError] = useState("");

  // const { error, loading } = useAppSelector((state) => state.auth);
  const { handleSubmit } = useForm({
    defaultValues: {
      verificationCode: "",
      confirmPassword: "",
    },
  });

  const handleResendOTP = async () => {
    // dispatch(resetError());
    const payload: ResendEmailPayload = {
      userId,
    };
    resendEmailMutation.mutate()
    // dispatch(resendVerificationCode(payload));
  };

  const onSubmit = async () => {
    // dispatch(resetError());
    setCustomError("");

    if (!otp) {
      return setCustomError("Please enter the OTP sent to your email");
    }
    if (!userId) {
      return setCustomError("User ID is required");
    }

    const payload = {
      verificationCode: otp,
      userId,
    };

    verifyEmailMutation.mutate(payload)
    // const response = await dispatch(verifyEmail(payload));

    // if (!response.type.includes("rejected")) {
      // setOtp("");
      // router.replace("/login");
    // }
  };

  return (
    <section className="bg-color-11 p-6 md:p-10 lg:p-28 flex items-center justify-center">
      <div className="pt-4 pb-6 px-5 md:pt-6 md:pb-10 md:px-10 lg:pt-14 lg:pb-32 lg:px-20 border border-[#E1E1E1] bg-white shadow-lg rounded-lg w-full md:max-w-[700px] 2xl:max-w-[800px]">
        <h3 className="text-2xl font-extrabold sm:text-3xl mb-2 text-color-1 uppercase">
          Verify your identity
        </h3>
        <p className="text-color-6 text-large">
          Please input the 4 digit code sent to your email address
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomOTPInput
            value={otp}
            onChange={setOtp}
            resendOTPService={handleResendOTP}
          />

          <BaseButton type="submit" 
          isLoading={verifyEmailMutation.isLoading} disabled={verifyEmailMutation.isLoading}
          >
            Verify
          </BaseButton>
        </form>
        {(customError) && (
          <p className="text-danger mt-1">{customError}</p>
        )}
      </div>
    </section>
  );
}
