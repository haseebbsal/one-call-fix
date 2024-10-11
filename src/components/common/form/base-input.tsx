import { Input } from "@nextui-org/input";
import { cn } from "@nextui-org/theme";
import React, { forwardRef } from "react";
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
  extraClass?: { inputWrapper?: string; label?: string; input?: string };
  variant?: "underlined" | "flat" | "faded" | "bordered";
  type: "text" | "password" | "number" | "email" | "date" | "time";
  radius?: "none" | "full" | "sm" | "md" | "lg";
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  rules?: UseControllerProps<T>["rules"];
  value?: string;
  onBlur?: () => void;
  onChangee?:any
} & WithRequiredProperty<UseControllerProps<T>, "control">;

const BaseInput = forwardRef<HTMLInputElement, Props<FieldValues>>(
  (
    {
      control,
      name,
      rules = {},
      placeholder,
      extraClass,
      variant = "bordered",
      label,
      type,
      disabled,
      radius = "full",
      icon,
      value: propValue,
      onBlur,
      onChangee
    },
    ref,
  ) => {
    const {
      field: { value: formValue, onChange },
      fieldState: { invalid, error },
    } = useController({
      name,
      control,
      rules,
    });

    const valueToDisplay = propValue !== undefined ? propValue : formValue;

    return (
      <Input
        ref={ref}
        classNames={{
          label: cn(
            `${invalid ? "text-danger" : ""} !pb-1.5 ml-4 text-color-1 ${extraClass?.label || ""}`,
          ),
          input: `${extraClass?.input || ""} ml-4 text-color-1 text-sm 2xl:text-sm placeholder:text-[rgba(82,82,82,0.5)]`,
          inputWrapper: `${extraClass?.inputWrapper || ""} bg-white data-[open]:border-color-3 data-[focus]:border-color-3 text-color-2 border border-color-7 !py-3.5 !min-h-[57px] ${extraClass?.input || ""}`,
        }}
        radius={radius}
        value={valueToDisplay}
        onChange={(e) => {
          if(onChangee){
            onChangee((prev:any)=>{
              return {
                ...prev,
                headline:e.target.value
              }
            })
          }
          console.log('input',e.target.value)
          onChange(e.target.value)}
        }
        placeholder={placeholder}
        type={type}
        label={label} 
        labelPlacement="outside"
        disabled={disabled}
        variant={variant}
        isInvalid={invalid}
        errorMessage={invalid && (error?.message || "Error")}
        endContent={icon}
        onBlur={onBlur}
      />
    );
  },
);
BaseInput.displayName = "BaseInput";

export default BaseInput;








