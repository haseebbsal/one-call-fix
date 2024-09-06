import { Input } from "@nextui-org/input";
import { cn } from "@nextui-org/theme";
import React from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property];
};

type Props<T extends FieldValues> = {
  name: string;
  placeholder?: string;
  extraClass?: string;
  variant?: "underlined" | "flat" | "faded" | "bordered";
  type: "text" | "password" | "number" | "email" | "date" | "time";
  radius?: "none" | "full" | "sm" | "md" | "lg";
  size?: "sm" | "md" | "lg";
  label?: string;
} & WithRequiredProperty<UseControllerProps<T>, "control">;

function TradepersonCustomInput<T extends FieldValues>({
  control,
  name,
  rules = {},
  placeholder,
  extraClass,
  variant = "bordered",
  type = "text",
  radius = "full",
  size = "lg",
  label,
}: Props<T>) {
  const {
    field: { value, onChange },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <Input
      className={extraClass}
      classNames={{
        input: cn(
          "ml-4 text-color-1 text-xs md:text-sm 2xl:text-sm font-light placeholder:text-color-14",
        ),
        inputWrapper: cn(
          "bg-white data-[open]:border-color-3 data-[focus]:border-color-3 text-color-2 border border-color-7 !py-3.5 flex-shrink-0",
        ),
      }}
      radius={radius}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type={type}
      size={size}
      variant={variant}
      isInvalid={invalid}
      errorMessage={invalid && (error?.message || "Error")}
      label={label}
    />
  );
}

export default TradepersonCustomInput;
