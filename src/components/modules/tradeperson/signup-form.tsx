"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

import { ROLES, TRADES } from "@/_utils/enums";
import { Address, SignUpPayload } from "@/_utils/types";
import BaseButton from "@/components/common/button/base-button";
import BaseCheckbox from "@/components/common/form/base-checkbox";
import BaseInput from "@/components/common/form/base-input";
// import { resetError, signUpUser } from "@/lib/features/authSlice";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import BaseSelect from "@/components/common/form/base-select";
import { useRouter } from "next/navigation";
import BaseRadioGroupSimple from "@/components/common/form/base-radio-group-simple";
import GooglePlacesInput from "@/components/common/form/google-places-input";
import { useMutation } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import toast from "react-hot-toast";

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
  marketing: boolean;
  address: Address;
  companyName: string;
  externalReviews: string;
  website: string;
  trade: number;
  gasSafeRegistered?: boolean;
}

export default function HomeOwnerSignUpForm() {
  // const dispatch = useAppDispatch();
  // const { loading, error, user } = useAppSelector((state) => state.auth);
  const { control, handleSubmit, watch } = useForm<any>();
  const router = useRouter();
  
  const trade = watch("trade");
  
  const tradePersonSignupMutation=useMutation((data:any)=>axiosInstance.post('/auth/signup',data),{
    onSuccess(data) {
      const{access_token,refresh_token}=data.data.data.tokens
      const {user}=data.data.data
      localStorage.setItem('accessToken',access_token)
      localStorage.setItem('refreshToken',refresh_token)
      localStorage.setItem('userData',JSON.stringify(user))
      router.push(`/email-verify/${user._id}`)
    },
    onError(error:any) {
      if (Array.isArray(error.response.data.message)) {
        toast.error(error.response.data.message[0]);
    } else {
        toast.error(error.response.data.message);
    }
    },
  })
  // reroute to specific page based on user role
  // useEffect(() => {
  //   if (user) {
  //     router.push("/tradeperson/dashboard");
  //   }
  // }, [user]);

  const onSubmit = async (data: SignUpFormValues) => {
    // dispatch(resetError());
    const payload: SignUpPayload = {
      role: ROLES.TRADESPERSON,
      tradesPerson: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.mobile,
        password: data.password,
        address: {
          formattedAddress: data.address.formattedAddress,
          latitude: data.address.latitude,
          longitude: data.address.longitude,
          ...(data.address.postalCode && {
            postalCode: data.address.postalCode,
          }),
          ...(data.address.city && { city: data.address.city }),
          country: data.address.country,
        },
        companyName: data.companyName,
        externalReviews: data.externalReviews,
        website: data.website,
        trade: data.trade,
        gasSafeRegistered: data.gasSafeRegistered
          ? data.gasSafeRegistered
          : false,
      },
    };
    tradePersonSignupMutation.mutate(payload)
    // const response = await dispatch(signUpUser(payload));
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
      {/* <h3 className="text-xl lg:text-2xl font-bold text-color-6 pb-3">
        Create Account
      </h3> */}
      {/* split in 2 fields in same row */}
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
      {/* company name */}
      <BaseInput
        name="companyName"
        type="text"
        control={control}
        placeholder="Company Name *"
        rules={{ required: "Company Name is required" }}
      />

      {/* address */}
      <GooglePlacesInput
        name="address"
        control={control}
        placeholder="Address *"
        rules={{ required: "Address is required" }}
        addressKey="formattedAddress"
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
      <BaseInput
        name="mobile"
        type="text"
        control={control}
        placeholder="Phone Number *"
        rules={{
          required: "Phone number is required",
          pattern: {
            value: /^[0-9]*$/,
            message: "Invalid mobile number",
          },
        }}
      />

      <BaseInput
        name="password"
        type="password"
        control={control}
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
      <BaseInput
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

      {/* external reviews */}
      <div>
        <h3 className="text-xl lg:text-2xl font-bold text-color-6 pt-1">
          Link to External Reviews *
        </h3>
        <p className="text-xs md:text-base text-color-6 w-full pb-3">
          We ask this to help you win jobs while you’re still building up
          reviews on our platform!
        </p>
      </div>
      <BaseInput
        name="externalReviews"
        type="text"
        control={control}
        placeholder="\\http:"
        rules={{ required: "External Reviews is required" }}
      />
      {/* website */}
      <h3 className="text-xl lg:text-2xl font-bold text-color-6 pt-1 pb-3">
        Your Website (Optional)
      </h3>
      <BaseInput
        name="website"
        type="text"
        control={control}
        placeholder="\\http:www.example.com"
      />
      {/* select box trade */}
      <h3 className="text-xl lg:text-2xl font-bold text-color-6 pt-1 pb-3">
        Trade *
      </h3>
      <BaseSelect
        name="trade"
        control={control}
        placeholder="Select Trade *"
        options={[
          { value: TRADES.PLUMBER, label: "PLUMBER" },
          { value: TRADES.ELECTRICIAN, label: "ELECTRICIAN" },
        ]}
        // defaultSelectedKeys={["1"]}
        rules={{ required: "Trade is required" }}
      />
      {/* gas safe registered */}
      {/* show only for plumber trade */}
      {trade == TRADES.PLUMBER && (
        <div className="flex flex-col gap-2">
          <h3 className="text-xl lg:text-2xl font-bold text-color-6 py-1">
            Are you gas safe registered ?
          </h3>

          <p className="text-sm text-red-500">We'll need to verify your Gas Safe ID Card before you can win any gas-related jobs</p>

          <BaseRadioGroupSimple
            name="gasSafeRegistered"
            options={[
              { value: true, label: "Yes" },
              { value: false, label: "No" },
            ]}
            control={control}
            orientation="horizontal"
            rules={{ required: "Gas Safe Registered is required" }}
          />
        </div>
      )}
      <BaseCheckbox
        name="terms"
        label="Accept terms & condition"
        control={control}
      />
      <div className="w-full flex flex-col sm:flex-row justify-between items-start gap-3.5 my-3">
        <BaseButton type="submit" 
        isLoading={tradePersonSignupMutation.isLoading} disabled={tradePersonSignupMutation.isLoading}
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
