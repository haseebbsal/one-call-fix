import { Select, SelectItem } from "@nextui-org/select";
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

type SelectOption = {
  value: string | number;
  label: string;
};

type Props<T extends FieldValues> = {
  name: string;
  options: SelectOption[];
  placeholder?: string;
  extraClass?: { selectWrapper?: string; label?: string; select?: string };
  variant?: "underlined" | "flat" | "faded" | "bordered";
  radius?: "none" | "full" | "sm" | "md" | "lg";
  label?: string;
  defaultSelectedKeys?: string[];
} & WithRequiredProperty<UseControllerProps<T>, "control">;

function BaseSelect<T extends FieldValues>({
  control,
  name,
  rules = {},
  placeholder,
  extraClass,
  variant = "bordered",
  label,
  options,
  radius = "full",
  defaultSelectedKeys,
  disabled,
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
    <Select
      classNames={{
        label: cn(
          `${invalid ? "text-danger" : ""} !pb-5.5 ml-4 text-color-1 ${extraClass?.label || ""}`,
        ),
        trigger: cn("py-[1.8rem]"),
      }}
      radius={radius}
      value={value}
      onChange={(selected: any) => onChange(selected)}
      placeholder={placeholder}
      label={label}
      labelPlacement="outside"
      disabled={disabled}
      variant={variant}
      isInvalid={invalid}
      defaultSelectedKeys={defaultSelectedKeys}
      errorMessage={invalid && (error?.message || "Error")}
    >
      {options.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
}

export default BaseSelect;
