import { Textarea } from "@nextui-org/input";
import { cn } from "@nextui-org/theme";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property];
};

type Props<T extends FieldValues> = {
  label?: string;
  name: string;
  placeholder?: string;
  rows?: number;
  radius?: "none" | "full" | "sm" | "md" | "lg";
  extraClass?: { inputWrapper?: string; label?: string; input?: string };
  readOnly?: boolean;
} & WithRequiredProperty<UseControllerProps<T>, "control">;
const BaseTextArea = <T extends FieldValues>({
  control,
  name,
  placeholder,
  rows = 2,
  rules = {},
  label,
  radius = "full",
  disabled,
  extraClass,
  readOnly,
}: Props<T>) => {
  const {
    field: { value, onChange },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules,
  });
  return (
    <>
      <Textarea
        classNames={{
          label: cn(
            `${invalid ? "text-danger" : ""} !pb-1.5 ml-4 text-color-1 ${extraClass?.label || ""}`,
          ),
          input: `${extraClass?.input || ""} ml-4 text-color-1 text-sm  2xl:text-sm  placeholder:text-[rgba(82,82,82,0.5)]`,
          inputWrapper: `${extraClass?.inputWrapper || ""} bg-white data-[open]:border-color-3 data-[focus]:border-color-3 text-color-2 border border-color-7 !py-3.5 !min-h-[58px]`,
        }}
        variant="bordered"
        radius={radius}
        label={label}
        disabled={disabled}
        labelPlacement="outside"
        minRows={rows}
        placeholder={placeholder}
        value={value}
        onValueChange={onChange}
        isInvalid={invalid}
        errorMessage={invalid && (error?.message || "Error")}
        readOnly={readOnly}
      />
    </>
  );
};

export default BaseTextArea;
