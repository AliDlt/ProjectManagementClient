import { Select } from "antd";
import React from "react";
import cn from "../../utils/cn";
import { Controller } from "react-hook-form";
import { IoChevronDown } from "react-icons/io5";

const CustomSelectInput = ({
  className,
  options,
  control,
  placeholder,
  name,
  iconSize,
  error = false,
  noErrorMessage = false,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <div className="flex flex-col gap-2">
            <Select
              placeholder={placeholder}
              {...field}
              className={cn([
                "w-full bg-white !rounded-custom placeholder:text-black/50 font-medium [&_.ant-select-selection-placeholder]:!text-16 [&_.ant-select-selection-item]:!text-16 ",
                className,
                error && "!border-red-500",
              ])}
              suffixIcon={
                <IoChevronDown
                  size={iconSize || 15}
                  className={cn([
                    "text-custom-primary-color",
                    error && "text-red-500",
                  ])}
                />
              }
              status={error && "error"}
            >
              {options?.map((option, index) => {
                return (
                  <Select.Option key={index} value={option.id}>
                    {option.name}
                  </Select.Option>
                );
              })}
            </Select>
            {!noErrorMessage && error && (
              <p className="text-red-500 text-sm">{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
};

export default CustomSelectInput;
