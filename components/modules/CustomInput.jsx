import Input from "antd/es/input/Input";
import React from "react";
import cn from "../../utils/cn";
import { Controller } from "react-hook-form";
import { InputNumber } from "antd";

export default function CustomInput({
  icon,
  placeholder,
  className,
  onChange = () => {},
  name,
  value,
  min,
  max,
  control,
  error = false,
  type,
  noErrorMessage = false,
  containerClassName,
  ...rest
}) {
  if (!control) {
    return (
      <Input
        onChange={(e) => onChange(e)}
        value={value}
        id={name}
        dir="rtl"
        type={type}
        classNames={{
          input: "placeholder:text-black/50 font-medium ",
        }}
        className={cn([
          "rounded-custom border-2 border-custom-primary-color",
          className,
        ])}
        prefix={icon}
        placeholder={placeholder}
        {...rest}
      />
    );
  }

  if (type === "number") {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className={cn(["flex flex-col gap-2", containerClassName])}>
            <InputNumber
              {...field}
              type="number"
              className={`border px-2 py-1  ${error ? "border-red-500" : "border-custom-primary-color"} ltr`}
              min={min}
              max={max}
              placeholder={placeholder}
            />
          </div>
        )}
      />
    );
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className={cn(["flex flex-col gap-2", containerClassName])}>
          <Input
            id={name}
            {...field}
            classNames={{
              input: "placeholder:text-black/50 font-medium ",
            }}
            className={cn([
              "rounded-custom border-2 border-custom-primary-color",
              error && "border-red-500",
              className,
            ])}
            dir="rtl"
            type={type}
            prefix={icon}
            placeholder={placeholder}
            status={error && "error"}
            {...rest}
          />
          {!noErrorMessage && error && (
            <p className="text-red-500 text-sm">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}
