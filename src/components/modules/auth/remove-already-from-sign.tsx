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
import BaseModal from "@/components/common/modal/base-modal";

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

interface LoginFormValues {
  email: string;
  password: string;
}

import { LoginPayload } from "@/_utils/types";
import { useDisclosure } from "@nextui-org/modal";


export default function RemoveAlreadyFromHomeOwnerSignUpForm({
  headlineRef,
  chatId,
  mandatoryAnswers,
  onOpen
}: {
  headlineRef?: any, chatId?: any,
  mandatoryAnswers?: any, onOpen: any
}) {
  const router = useRouter();
  const { isOpen, onOpenChange, onOpen: onOpen2, onClose } = useDisclosure();
  const { isOpen: isOpen3, onOpenChange: onOpenChange3, onOpen: onOpen3, onClose: onClose3 } = useDisclosure();



  // const dispatch = useAppDispatch();
  const createJobMutation = useMutation((data: any) => {
    // const token =localStorage.getItem('accessToken')
    return axiosInstance.postForm(`${process.env.NEXT_PUBLIC_BASE_API_URL}/job`, data)

  }, {
    onSuccess(data) {
      console.log('create job', data.data)
      //   toast.success("Job Created Successfully")
    },
    onError(error, variables, context) {
      console.log('error in creating job', error)
    },
  })
  const signUpMutation = useMutation((data: SignUpPayload) => axiosInstance.post('/auth/signup', data), {
    onSuccess(data) {
      console.log('sign up', data.data)
      const { access_token, refresh_token } = data.data.data.tokens
      const { user } = data.data.data
      localStorage.setItem('accessToken', access_token)
      localStorage.setItem('refreshToken', refresh_token)
      localStorage.setItem('userData', JSON.stringify(user))
      if (headlineRef) {
        const formData = new FormData();
        const { files, headline, address: { latitude, longitude, city, country, formattedAddress, postalCode } } = headlineRef()
        formData.append("completion", mandatoryAnswers.completion);
        formData.append("estimatedBudget", mandatoryAnswers.estimatedBudget);
        formData.append("headline", headline);
        formData.append("address[postalCode]", postalCode);
        formData.append("address[formattedAddress]", formattedAddress);
        formData.append("address[latitude]", latitude);
        formData.append("address[longitude]", longitude);
        formData.append("address[city]", city ? city : "random");
        formData.append("address[country]", country);
        formData.append("chatId", chatId!);
        if (files) {
          for (const file of files) {
            formData.append("files", file);
          }
        }
        // Cookies.set('accessToken',access_token)
        // Cookies.set('refreshToken',refresh_token)
        // Cookies.set('userData',JSON.stringify(user))
        createJobMutation.mutate(formData)
      }

      router.push(`/email-verify/${user._id}?job=1`)

    },
    onError(error: any) {
      if (Array.isArray(error.response.data.message)) {
        toast.error(error.response.data.message[0]);
      } else {
        toast.error(error.response.data.message);
      }
    }
  })

  const loginMutation = useMutation((data: LoginPayload) => axiosInstance.post('/auth/login', data), {
    onSuccess(data) {
      console.log('data', data.data)
      const { tokens: { access_token, refresh_token } } = data.data.data
      if (headlineRef) {
        const formData = new FormData();
        const { files, headline, address: { latitude, longitude, city, country, formattedAddress, postalCode } } = headlineRef()
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
        if (files) {

          for (const file of files) {
            formData.append("files", file);
          }
        }
        // localStorage.setItem('accessToken',access_token)



        if (data.data.data.user.isApproved) {
          if (data.data.data.user.role === ROLES.HOMEOWNER) {
            Cookies.set('accessToken', access_token)
            Cookies.set('refreshToken', refresh_token)
            Cookies.set('userData', JSON.stringify(data.data.data.user))
            createJobMutation.mutate(formData)
            onClose()
            onOpen3()
          }
          else {
            toast.error('Account Is Not A HomeOwner')
          }
          // else if (data.data.data.user.role === ROLES.TRADESPERSON) {
          //   router.push("/tradeperson/dashboard");
          // } else {
          //   router.push("/admin/dashboard");
          // }

          // if(data.data.data.user.role === ROLES.TRADESPERSON){
          //   cardClientSecretMutation.mutate()
          // }
        }
        else {
          localStorage.setItem('accessToken', access_token)
          localStorage.setItem('refreshToken', refresh_token)
          localStorage.setItem('userData', JSON.stringify(data.data.data.user))
          createJobMutation.mutate(formData)
          router.push(`/email-verify/${data.data.data.user._id}?job=1`)
        }
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
  const cardClientSecretMutation = useMutation(() => axiosInstance.put('/payment/card'), {
    onSuccess(data) {
      console.log('data client secret', data.data)
      Cookies.set('clientSecret', data.data.data.clientSecret)
    },
  })
  const { control: control2, handleSubmit: handleSubmit2, watch: watch2 } = useForm<any>();
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

  const onSubmitt = async (data: LoginFormValues) => {
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

  const closeModel = () => {
    onClose3();
    router.push('/homeowner/jobs')
  };
  return (
    <>
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
            // pattern: {
            //   value: /^(?=.[A-Z])(?=.\d)[A-Za-z\d@$!%*?&]{8,30}$/,
            //   message:
            //     "Password must contain at least 8 characters, one uppercase letter and one number",
            // },
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

        <div className="w-full flex  flex-col items-start gap-2.5">
          <BaseButton type="submit"
            isLoading={signUpMutation.isLoading} disabled={signUpMutation.isLoading}
          >
            Sign Up
          </BaseButton>

          <div className="flex flex-col gap-2">
            <p className="text-blue-900">Already have an account?</p>
            <BaseButton onClick={onOpen2} type="button"
            // isLoading={loading} disabled={loading}
            >
              Log In
            </BaseButton>
          </div>

        </div>

      </form>
      <BaseModal isDismissable={true} onClose={onClose} isOpen={isOpen}>
        <div className="pt-4 pb-6 px-5  border border-[#E1E1E1] bg-white shadow-lg rounded-lg w-full md:max-w-[700px] 2xl:max-w-[800px]">
          <h3 className="text-2xl font-bold sm:text-3xl mb-2 text-color-1">
            Login
          </h3>
          <p className="text-color-6 text-base sm:text-xl font-light">
            Access your OneCallFix account.
          </p>
          <form
            className="mt-10 flex flex-col gap-4"
            onSubmit={handleSubmit2(onSubmitt)}
          >
            <BaseInput
              name={"email"}
              type="email"
              control={control2}
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
              control={control2}
              rules={{ required: "Enter Password" }}
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
                disabled={loginMutation.isLoading}
              >
                Login
              </BaseButton>
              {/* <Link
          href={"/forgot-password"}
          className="text-xs text-color-9 transition-all duration-400 hover:opacity-80 text-right w-full"
        >
          Forgotten Password?
        </Link> */}
            </div>
            {/* <div className="mt-4">
        <p className="text-xs md:text-base text-color-10 w-full">
          <Link
            href={"/homeowner/signup"}
            className="text-color-9 transition-all duration-400 hover:opacity-80"
          >
            Create An Account
          </Link>
          <span> {` if you don't have one.`}</span>
        </p>
      </div> */}
          </form>
        </div>

      </BaseModal>

      <BaseModal
        onClose={() => router.push('/homeowner/jobs')}
        isOpen={isOpen3}
        onOpenChange={onOpenChange3}
        size="md"
        header="System Generated Request"
        modalHeaderImage="/images/modal-success.png"
      >
        <div className="flex flex-col items-center mb-7">
          <h5 className="text-color-20 text-sm lg:text-base pb-4">
            Job Created Successfully
          </h5>
          <BaseButton
            type="button"
            onClick={closeModel}
            extraClass="bg-color-9 !max-w-[350px] w-full text-white"
          >
            Go To My Account
          </BaseButton>
        </div>
      </BaseModal>
    </>
  );
}
