import TextArea from "antd/es/input/TextArea";
import React from "react";
import cn from "../../utils/cn";
import { Controller } from "react-hook-form";

const CustomTextAria = ({
  rows,
  className,
  error,
  placeholder,
  control,
  name,
  onBlur,
  onChange,
  noErrorMessage = false,
  ...rest
}) => {
  if (!control) {
    return (
      <div className="flex flex-col gap-2">
        <TextArea
          onBlurCapture={() => {
            onBlur && onBlur();
          }}
          className={cn([
            "rounded-md border-2 border-custom-primary-color p-2.5",
            className,
            error && "border-red-500",
          ])}
          placeholder={placeholder}
          rows={rows}
          onChange={(e) => {
            onChange && onChange(e);
          }}
          status={error && "error"}
          {...rest}
        />
        {!noErrorMessage && error && (
          <p className="text-red-500 text-sm">{error.message}</p>
        )}
      </div>
    );
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <div className="flex flex-col gap-2 h-full">
            <TextArea
              style={{ resize: "none" }}
              onBlurCapture={() => {
                onBlur && onBlur;
              }}
              {...field}
              className={cn([
                className,
                "rounded-custom border-2 border-custom-primary-color p-2.5",
                error && "border-red-500",
              ])}
              placeholder={placeholder}
              rows={rows}
              status={error && "error"}
              {...rest}
            />
            {!noErrorMessage && error && (
              <p className="text-red-500 text-sm">{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
};

export default CustomTextAria;
