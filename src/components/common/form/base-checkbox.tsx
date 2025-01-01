import { Checkbox, CheckboxProps } from "@nextui-org/checkbox";
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

type BaseCheckboxProps<T extends FieldValues> = {
  name: string;
  label: string;
  extraClass?: string;
  readOnly?: boolean;
} & WithRequiredProperty<UseControllerProps<T>, "control"> &
  Omit<CheckboxProps, "value" | "onChange">;

const BaseCheckbox = <T extends FieldValues>({
  control,
  name,
  rules,
  label,
  extraClass = "",
  readOnly = false,
  ...props
}: BaseCheckboxProps<T>) => {
  const {
    field: { value, onChange },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <Checkbox
      {...props}
      isSelected={value}
      onChange={(selected) => onChange(selected)}
      isDisabled={readOnly}
      classNames={{
        label: cn(
          "select-none",
          readOnly ? "text-blue-400" : "text-blue-900",
          "cursor-pointer",
        ),
        base: cn(
          "flex items-center space-x-2",
          readOnly ? "cursor-not-allowed" : "cursor-pointer",
          extraClass,
          "data-[selected=false]:border-primary",
        ),
        icon: cn(
          "w-15 h-5",
          "border border-solid border-color-8",
          "rounded-lg",
          "text-primary",
          "opacity-1",
          "data-[selected=false]:border-primary",
          "focus:ring-primary",
        ),
      }}
      error={invalid}
      errorMessage={invalid && (error?.message || "Error")}
    >
      {label}
    </Checkbox>
  );
};

export default BaseCheckbox;
