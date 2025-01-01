import { RadioGroup, Radio, RadioProps } from "@nextui-org/radio";
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

type RadioOption = {
  value: string | number | boolean;
  label: string;
};

type Props<T extends FieldValues> = {
  name: string;
  options: RadioOption[];
  extraClass?: { radioGroup?: string; radio?: string };
  label?: string;
  orientation?: "horizontal" | "vertical";
} & WithRequiredProperty<UseControllerProps<T>, "control">;

function BaseRadio<T extends FieldValues>({
  value,
  label,
  readOnly,
  extraClass,
  ...props
}: RadioProps & { label: string; readOnly?: boolean; extraClass?: string }) {
  return (
    <Radio
      {...props}
      value={value}
      className={cn(
        "inline-flex items-center justify-center",
        // "cursor-pointer rounded-lg p-4 border border-color-8",
        extraClass,
        { "cursor-not-allowed": readOnly },
      )}
    >
      {label}
    </Radio>
  );
}

function BaseRadioGroupSimple<T extends FieldValues>({
  control,
  name,
  rules = {},
  extraClass,
  label,
  options,
  orientation = "horizontal",
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
    <div className="flex flex-col mb-6">
      {label && (
        <label className="text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <RadioGroup
        className={cn(
          "flex",
          orientation === "horizontal"
            ? "flex-row space-x-4"
            : "flex-col space-y-2",
          extraClass?.radioGroup,
        )}
        value={value}
        onChange={onChange}
        isInvalid={invalid}
        orientation={orientation}
      >
        {options.map((option) => (
          <BaseRadio
            key={option.value?.toString()}
            value={option.value?.toString()}
            label={option.label}
            readOnly={false}
            extraClass={extraClass?.radio}
          />
        ))}
      </RadioGroup>
      {invalid && (
        <p className="text-red-600 text-xs mt-1">{error?.message || "Error"}</p>
      )}
    </div>
  );
}

export default BaseRadioGroupSimple;
