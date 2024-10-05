"use client";

import { useForm } from "react-hook-form";

import BaseButton from "@/components/common/button/base-button";
import BaseInput from "@/components/common/form/base-input";
import BaseTextArea from "@/components/common/form/base-textarea";

export default function QuoteForm() {
  const { control } = useForm();
  return (
    <form className="mt-10 flex flex-col gap-4">
      <BaseInput
        name={"fullName"}
        type="text"
        control={control}
        placeholder="Full Name"
      />
      <BaseInput
        name={"email"}
        type="text"
        control={control}
        placeholder="Email Address"
      />
      <BaseInput
        name={"phone"}
        type="text"
        control={control}
        placeholder="Phone"
      />
      <BaseTextArea
        name={"message"}
        rows={5}
        control={control}
        placeholder="What would you like to quote?"
      />
      <BaseButton type="button">Send Message</BaseButton>
    </form>
  );
}
