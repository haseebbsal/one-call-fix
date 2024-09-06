"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import BaseButton from "@/components/common/button/base-button";
import BaseInput from "@/components/common/form/base-input";
// import { resetError, forgotPassword } from "@/lib/features/authSlice";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ForgotPasswordPayload } from "@/_utils/types";
import { useMutation } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import toast from "react-hot-toast";
import { useState } from "react";

export default function ForgotPassword() {
  // const dispatch = useAppDispatch();
  // const { loading, error } = useAppSelector((state) => state.auth);
  const [email,setEmail]=useState('')

  const forgotPassswordMutation=useMutation((data:ForgotPasswordPayload)=>axiosInstance.post('/auth/forgot-password',data),{
    onSuccess(data, variables, context) {
      console.log(data.data)
      router.push(`/forgot-password/${email}`);
    },
    onError(error:any) {
      if (Array.isArray(error.response.data.message)) {
        toast.error(error.response.data.message[0]);
    } else {
        toast.error(error.response.data.message);
    }
    },
  })
  const { control, handleSubmit } = useForm<any>();
  const router = useRouter();

  const onSubmit = async (data: ForgotPasswordPayload) => {
    // dispatch(resetError());
    const payload: ForgotPasswordPayload = {
      email: data.email,
    };
    setEmail(data.email)
    forgotPassswordMutation.mutate(payload)


    // const response = await dispatch(forgotPassword(payload));
    // if (!response.type.includes("rejected")) {
    //   router.push(`/forgot-password/${data.email}`);
    // }
  };

  return (
    <form
      className="mt-10 flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <BaseInput
        name={"email"}
        type="email"
        control={control}
        placeholder="Email Address *"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "Invalid email address",
          },
        }}
      />

      <div className="w-full flex flex-col sm:flex-row justify-between items-start gap-2.5">
        <BaseButton type="submit" 
        // isLoading={loading}
        >
          Continue
        </BaseButton>
        {/* show error message */}
        {/* {error && <p className="text-danger text-sm">{error}</p>} */}
      </div>
    </form>
  );
}
