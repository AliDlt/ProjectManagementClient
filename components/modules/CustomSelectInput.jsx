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
          <div className={cn(["", className])}>
            <Select placeholder={placeholder} {...field} className="w-full">
              {options.map((option, index) => {
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
