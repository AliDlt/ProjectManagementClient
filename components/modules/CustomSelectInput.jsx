import { Empty, Select } from "antd";
import React from "react";
import cn from "../../utils/cn";
import { Controller } from "react-hook-form";
import { IoChevronDown } from "react-icons/io5";

const CustomSelectInput = ({
  className,
  containerClassName,
  options,
  control,
  placeholder,
  name,
  iconSize,
  error = false,
  noErrorMessage = false,
  ...rest
}) => {
  if (!control)
    return (
      <div className={cn(["relative", containerClassName])}>
        <Select
          placeholder={placeholder}
          className={cn([
            "w-full bg-custom-primary-color text-white !rounded-custom placeholder:text-black/50 font-medium z-40 relative",
            className,
            error && "!border-red-500",
          ])}
          suffixIcon={
            <IoChevronDown
              size={iconSize || 15}
              className={cn(["text-white", error && "text-red-500"])}
            />
          }
          status={error && "error"}
          getPopupContainer={(triggerNode) =>
            triggerNode.parentElement.parentElement
          }
          notFoundContent={
            <Empty
              description="داده ای وجود ندارد"
              className="flex flex-col justify-center items-center gap-0 text-12"
              imageStyle={{
                width: "60px",
                height: "60px",
              }}
            />
          }
          dropdownAlign={{
            overflow: {
              adjustX: false,
              adjustY: false,
            },
          }}
          {...rest}
        >
          {options?.map((option, index) => {
            return (
              <Select.Option
                className="hover:bg-custom-primary-color hover:text-white transition-none aria-[selected=true]:bg-custom-primary-color rounded-none mt-0.5"
                key={index}
                value={option.value}
              >
                {option.label}
              </Select.Option>
            );
          })}
        </Select>
        {!noErrorMessage && error && (
          <p className="text-red-500 text-sm">{error.message}</p>
        )}
      </div>
    );

  // With Control
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <div className={cn(["relative", containerClassName])}>
            <Select
              {...field}
              placeholder={placeholder}
              className={cn([
                "w-full bg-custom-primary-color text-white !rounded-custom placeholder:text-black/50 font-medium z-40 relative",
                className,
                error && "!border-red-500",
              ])}
              suffixIcon={
                <IoChevronDown
                  size={iconSize || 15}
                  className={cn(["text-white", error && "text-red-500"])}
                />
              }
              status={error && "error"}
              getPopupContainer={(triggerNode) =>
                triggerNode.parentElement.parentElement
              }
              notFoundContent={
                <Empty
                  description="داده ای وجود ندارد"
                  className="flex flex-col justify-center items-center gap-0 text-12"
                  imageStyle={{
                    width: "60px",
                    height: "60px",
                  }}
                />
              }
              dropdownAlign={{
                overflow: {
                  adjustX: false,
                  adjustY: false,
                },
              }}
              {...rest}
            >
              {options?.map((option, index) => {
                return (
                  <Select.Option
                    className="hover:bg-custom-primary-color hover:text-white transition-none aria-[selected=true]:bg-custom-primary-color rounded-none mt-0.5"
                    key={index}
                    value={option.value}
                  >
                    {option.label}
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
