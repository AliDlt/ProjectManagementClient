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
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <div className="flex flex-col gap-2">
            <TextArea
              onBlurCapture={() => {onBlur()} }
              {...field}
              className={cn([
                className,
                "rounded-md border-custom-primary-color",
              ])}
              placeholder={placeholder}
              rows={rows}
              status={error && "error"}
            />
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
          </div>
        );
      }}
    />
  );
};

export default CustomTextAria;
