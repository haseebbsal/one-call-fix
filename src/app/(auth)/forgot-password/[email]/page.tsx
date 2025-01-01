"use client";

import CustomOTPInput from "@/components/common/auth/otp-input";
import BaseButton from "@/components/common/button/base-button";
import BaseInput from "@/components/common/form/base-input";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import {
//   forgotPassword,
//   resetError,
//   resetPasswordForgot,
// } from "@/lib/features/authSlice";
import {
  ForgotPasswordPayload,
  ForgotResetPasswordPayload,
} from "@/_utils/types";
import { useState } from "react";
import { useMutation } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import toast from "react-hot-toast";

export default function ForgotResetPassword(datas:any) {
  const router = useRouter();

  // const queryParams = useParams();

  const forgotPasswordMutation=useMutation((data:any)=>axiosInstance.post('/auth/forgot-password/change-password',data),{
    onSuccess(data) {
      setOtp("");
      router.replace("/login");
    },
    onError(error:any) {
      if (Array.isArray(error.response.data.message)) {
        toast.error(error.response.data.message[0]);
    } else {
        toast.error(error.response.data.message);
    }
    },
  })
  const email: string =datas.params.email.replace('%40','@')

  // const dispatch = useAppDispatch();
  const [otp, setOtp] = useState("");
  const [customError, setCustomError] = useState("");

  // const { error, loading } = useAppSelector((state) => state.auth);
  const { control, handleSubmit, watch } = useForm<any>({
    defaultValues: {
      email,
      password: "",
      verificationCode: "",
      confirmPassword: "",
    },
  });

  const handleResendOTP = async () => {
    // dispatch(resetError());
    const payload: ForgotPasswordPayload = {
      email,
    };

    // dispatch(forgotPassword(payload));
  };

  const onSubmit = async (data: ForgotResetPasswordPayload) => {
    // dispatch(resetError());
    setCustomError("");

    if (!otp) {
      return setCustomError("Please enter the OTP sent to your email");
    }
    const payload = {
      email: data.email,
      password: data.password,
      verificationCode: otp,
    };

    forgotPasswordMutation.mutate(payload)
    // const response = await dispatch(resetPasswordForgot(payload));

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

          <div className="my-8">
            <h3 className="text-sm lg:text-base font-semibold text-color-6 mb-1">
              Email
            </h3>

            <BaseInput
              name="email"
              type="email"
              placeholder="Email"
              disabled={true}
              control={control}
            />
          </div>

          <div className="my-8">
            <h3 className="text-sm lg:text-base font-semibold text-color-6 mb-1">
              New Password
            </h3>
            <BaseInput
              name="password"
              type="password"
              placeholder="New Password"
              control={control}
              rules={{
                required: "New Password is required",
                // pattern: {
                //   value: /^(?=.[A-Z])(?=.\d)[A-Za-z\d@$!%*?&]{8,30}$/,
                //   message:
                //     "Password must contain at least 8 characters, one uppercase letter and one number",
                // },
              }}
            />
          </div>
          <div className="mt-8 mb-4">
            <h3 className="text-sm lg:text-base font-semibold text-color-6 mb-1">
              Confirm New Password
            </h3>
            <BaseInput
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              control={control}
              rules={{
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              }}
            />
          </div>

          <BaseButton type="submit" 
          // isLoading={loading} disabled={loading}
          >
            Update
          </BaseButton>
        </form>
        {( customError) && (
          <p className="text-danger mt-1">{customError}</p>
        )}
      </div>
    </section>
  );
}
