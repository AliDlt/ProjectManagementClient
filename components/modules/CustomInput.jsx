import Input from "antd/es/input/Input";
import React from "react";
import cn from "../../utils/cn";
import { Controller } from "react-hook-form";

export default function CustomInput({
  icon,
  placeholder,
  className,
  name,
  control,
  error,
  type,
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col gap-2">
          <Input
            dir="rtl"
            type={type}
            {...field}
            classNames={{
              input: "placeholder:text-black/50 font-medium",
            }}
            className={cn([
              "rounded-custom border-2 border-custom-primary-color",
              className,
            ])}
            prefix={icon}
            placeholder={placeholder}
            status={error[name] && "error"}
          />
          {error[name] && (
            <p className="text-red-500 text-sm">{error[name].message}</p>
          )}
        </div>
      )}
    />
  );
}
