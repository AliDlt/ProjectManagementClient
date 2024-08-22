import { Select } from "antd";
import React from "react";
import cn from "../../utils/cn";
import { Controller } from "react-hook-form";

const CustomSelectInput = ({
  className,
  options,
  control,
  placeholder,
  name,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <div>
            <Select
              placeholder={placeholder}
              {...field}
              className={cn([
                "w-full bg-white rounded-custom placeholder:text-black/50 font-medium",
                className,
              ])}
            >
              {options?.map((option, index) => {
                return (
                  <Select.Option key={index} value={option.id}>
                    {option.name}
                  </Select.Option>
                );
              })}
            </Select>
          </div>
        );
      }}
    />
  );
};

export default CustomSelectInput;
