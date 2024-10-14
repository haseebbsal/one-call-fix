"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { ROLES } from "@/_utils/enums";
import { useRouter } from "next/navigation";

import { LoginPayload } from "@/_utils/types";
import BaseButton from "@/components/common/button/base-button";
import BaseInput from "@/components/common/form/base-input";
// import { resetError, loginUser } from "@/lib/features/authSlice";
// import { getClientSecertKey } from "@/lib/features/paymentSlice";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { useMutation } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import BaseInputPassword from "@/components/common/form/base-password";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  // const dispatch = useAppDispatch();
  // const { loading, error, user } = useAppSelector((state) => state.auth);
  const loginMutation=useMutation((data:LoginPayload)=>axiosInstance.post('/auth/login',data),{
    onSuccess(data) {
      console.log('data',data.data)
      if(data.data.data.user.isApproved){
        if (data.data.data.user.role === ROLES.HOMEOWNER) {
          router.push("/homeowner/jobs");
        } else if (data.data.data.user.role === ROLES.TRADESPERSON) {
          router.push("/tradeperson/dashboard");
        } else {
          router.push("/admin/dashboard");
        }
        // if(data.data.data.user.role === ROLES.TRADESPERSON){
        //   cardClientSecretMutation.mutate()
        // }
      }
      else{
      router.push(`/email-verify/${data.data.data.user._id}`)
      }
        

    },
    onError(error: any) {
      if (Array.isArray(error.response.data.message)) {
        toast.error(error.response.data.message[0]);
    } else {
        toast.error(error.response.data.message);
    }
    }
  })
  const cardClientSecretMutation=useMutation(()=>axiosInstance.put('/payment/card'),{
    onSuccess(data) {
      console.log('data client secret',data.data)
      Cookies.set('clientSecret',data.data.data.clientSecret)
    },
  })
  const { control, handleSubmit, watch } = useForm<any>();
  // reroute to specific page based on user role
  // useEffect(() => {
  //   if (user) {
  //     if (user.role === ROLES.HOMEOWNER) {
  //       router.push("/homeowner/jobs");
  //     } else if (user.role === ROLES.TRADESPERSON) {
  //       router.push("/tradeperson/dashboard");
  //     } else {
  //       router.push("/admin/dashboard");
  //     }
  //   }
  // }, [user]);

  const onSubmit = async (data: LoginFormValues) => {
    // dispatch(resetError());
    // console.log('im here')
    const payload: LoginPayload = {
      email: data.email,
      password: data.password,
    };
    loginMutation.mutate(payload)
    // cardClientSecretMutation.mutate()
    // await dispatch(loginUser(payload));
    // await dispatch(getClientSecertKey());
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
      <BaseInputPassword
        name={"password"}
        type="password"
        control={control}
        rules={{required:"Enter Password"}}
        placeholder="Password *"
        // rules={{
        //   required: "Password is required",
        //   pattern: {
        //     value: /^(?=.[A-Z])(?=.\d)[A-Za-z\d@$!%*?&]{8,30}$/,
        //     message:
        //       "Password must contain at least 8 characters, one uppercase letter and one number",
        //   },
        // }}
      />
      <div className="w-full flex flex-col sm:flex-row justify-between items-start gap-2.5">
        <BaseButton type="submit" 
        isLoading={loginMutation.isLoading}
        >
          Login
        </BaseButton>
        <Link
          href={"/forgot-password"}
          className="text-xs text-color-9 transition-all duration-400 hover:opacity-80 text-right w-full"
        >
          Forgotten Password?
        </Link>
      </div>
      <div className="mt-4">
        <p className="text-xs md:text-base text-color-10 w-full">
          <Link
            href={"/homeowner/signup"}
            className="text-color-9 transition-all duration-400 hover:opacity-80"
          >
            Create An Account
          </Link>
          <span> {` if you don't have one.`}</span>
        </p>
      </div>
    </form>
  );
}
