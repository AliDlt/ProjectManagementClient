import React from "react";
import { Select } from "antd";
import { Controller } from "react-hook-form";
import cn from "../../utils/cn";

const { Option } = Select;

export default function CustomSelectInput({
  icon,
  placeholder,
  className,
  name,
  control,
  error = false,
  options,
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col gap-2">
          <Select
            {...field}
            className={cn([
              "rounded-custom border-2 border-custom-primary-color",
              className,
            ])}
            placeholder={placeholder}
            suffixIcon={icon}
            status={error && "error"}
          >
            {options.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
          {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
      )}
    />
  );
}
