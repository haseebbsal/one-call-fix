"use client";

import { FieldValues, useForm } from "react-hook-form";

import BaseButton from "@/components/common/button/base-button";
import BaseInput from "@/components/common/form/base-input";
import BaseTextArea from "@/components/common/form/base-textarea";
import { useMutation } from "react-query";
import axiosInstance from "@/_utils/helpers/axiosInstance";
import toast from "react-hot-toast";
import { Button } from "@nextui-org/button";
import axios from "axios";
import { useEffect, useRef } from "react";

export default function ContactForm() {

  const formRef=useRef()

  const { control,handleSubmit ,reset,setValue,formState:{isSubmitSuccessful}} = useForm();
  const contactMutationn=useMutation((data:any)=>axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/platform/contact-us`,data),{
    onSuccess(data, variables, context) {
      console.log('data',data)
      toast.success('Contact Form Submitted Successfully')
      reset({
        name:"",
        message:'',
        subject:'',
        email:''
      })
      // const form=formRef.current as any as HTMLFormElement
      // form.reset()

      // resizeTo()
    },
  })




  const submit=(e:FieldValues)=>{
    console.log('values',e)
    contactMutationn.mutate(e)
  }
  return (
    <form ref={formRef as any} onSubmit={handleSubmit(submit)} className="mt-10 flex flex-col gap-4">
      <BaseInput
        name={"name"}
        type="text"
        control={control}
        rules={{required:"Enter Full Name"}}
        placeholder="Full Name"
      />
      <BaseInput
        name={"email"}
        type="email"
        control={control}
        rules={
          {required:"Enter Email Address"}}
        placeholder="Email Address"
      />
      <BaseInput
        name={"subject"}
        type="text"
        control={control}
        rules={{required:"Enter Subject Line"}}
        placeholder="Subject Line"
      />
      <BaseTextArea
        name={"message"}
        rows={5}
        control={control}
        rules={{required:"Enter Message"}}

        placeholder="Type Your Message"
      />
      <BaseButton type="submit" isLoading={contactMutationn.isLoading} disabled={contactMutationn.isLoading}>Send Message</BaseButton>
    </form>
  );
}
