"use client";

import { useForm } from "react-hook-form";

import BaseButton from "@/components/common/button/base-button";
import BaseInput from "@/components/common/form/base-input";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import { resetError, updatePassword } from "@/lib/features/authSlice";
import Link from "next/link";
import { useMutation } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import toast from "react-hot-toast";

export default function ContactInfo() {
  // const dispatch = useAppDispatch();
  // const { loading, error } = useAppSelector((state) => state.auth);

  const newPasswordMutation=useMutation((data:any)=>axiosInstance.put('/user/password',data),
  {
    onSuccess(data) {
      console.log('new password',data.data)
    },
    onError(error:any) {
      if (Array.isArray(error.response.data.message)) {
        toast.error(error.response.data.message[0]);
    } else {
        toast.error(error.response.data.message);
    }
    },
  }
)

  const { control, handleSubmit, watch } = useForm<any>({
    defaultValues: {
      previousPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  interface UpdatePassword {
    previousPassword: string;
    newPassword: string;
    confirmPassword: string;
  }

  const onSubmit = (data: UpdatePassword) => {
    // dispatch(resetError());
    const payload = {
      oldPassword: data.previousPassword,
      newPassword: data.newPassword,
    };

    newPasswordMutation.mutate(payload)

    // dispatch(updatePassword(payload));
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-5">
        <h2 className="text-base lg:text-2xl font-bold">Manage Account</h2>
        <h4 className="text-base lg:text-xl font-bold text-color-6">
          Change your Password
        </h4>
      </div>
      <p className="text-base text-color-6 text-sm">
        You must need to provide existing password to update it
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-8">
          {/* <h3 className="text-sm lg:text-base font-semibold text-color-6 mb-1">
            Old Password
          </h3> */}
          <BaseInput
            name="previousPassword"
            type="password"
            placeholder="Previous Password"
            control={control}
            rules={{
              required: "Previous Password is required",
              // pattern: {
              //   value: /^(?=.[A-Z])(?=.\d)[A-Za-z\d@$!%*?&]{8,30}$/,
              //   message:
              //     "Password must contain at least 8 characters, one uppercase letter and one number",
              // },
            }}
          />
        </div>
        <div className="my-8">
          {/* <h3 className="text-sm lg:text-base font-semibold text-color-6 mb-1">
            New Password
          </h3> */}
          <BaseInput
            name="newPassword"
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
              validate: (value) =>
                value !== watch("previousPassword") ||
                "New Password should be different from old password",
            }}
          />
        </div>
        <div className="mt-8 mb-4">
          {/* <h3 className="text-sm lg:text-base font-semibold text-color-6 mb-1">
            Confirm New Password
          </h3> */}
          <BaseInput
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            control={control}
            rules={{
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            }}
          />
        </div>
        <div className="w-full flex sm:flex-row">
          <Link
            href={"/forgot-password"}
            className="text-xs text-color-9 transition-all duration-400 hover:opacity-80 text-right w-full"
          >
            Forgotten Password?
          </Link>
        </div>

        <BaseButton type="submit" 
        isLoading={newPasswordMutation.isLoading} disabled={newPasswordMutation.isLoading}
        >
          Update
        </BaseButton>
        {/* {error && <p className="text-danger">{error}</p>} */}
      </form>
    </div>
  );
}
