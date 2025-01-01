"use client";

import {
  Radio,
  RadioGroup,
  RadioGroupProps,
  RadioProps,
} from "@nextui-org/radio";
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
  radioList: {
    value: string;
    description: string;
    text: string;
    inline?: boolean; // Add this line
  }[];
  readonly?: boolean;
} & RadioGroupProps &
  WithRequiredProperty<UseControllerProps<T>, "control">;

function BaseRadio(props: RadioProps) {
  const { children, readOnly, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0  bg-white hover:bg-content2 items-center justify-between",
          "flex-row-reverse w-full max-w-full cursor-pointer rounded-lg gap-4 p-4 border border-color-8",
          "data-[selected=true]:border-primary",
        ),
      }}
    >
      {children}
    </Radio>
  );
}

export default function BaseRadioGroup<T extends FieldValues>(props: Props<T>) {
  const {
    children: _,
    name,
    radioList,
    control,
    rules,
    readonly,
    ...otherProps
  } = props;
  const {
    field: { value, onChange },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules,
  });

  // console.log('inside ',radioList)

  return (
    <RadioGroup
      {...otherProps}
      value={value}
      // onValueChange={(selected) => onChange(selected)}
      isInvalid={invalid}
      errorMessage={invalid && (error?.message || "Error")}
      isReadOnly={readonly}
    >
      <div className="flex flex-wrap -mx-1">
        {radioList.map((el,index) => (
          <div
            key={el.value}
            className={`px-1 mb-2 ${el.inline ? "w-1/2" : "w-full"}`}
          >
            <BaseRadio description={el.description} value={el.value}>
              {/* {el.text} */}
            </BaseRadio>
          </div>
        ))}
      </div>
    </RadioGroup>
  );
}
