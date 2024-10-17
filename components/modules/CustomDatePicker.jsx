import React from "react";
import { ConfigProvider } from "antd";
import fa_IR from "antd/es/locale/fa_IR";
import cn from "../../utils/cn";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import {
  DatePicker as DatePickerJalali,
  JalaliLocaleListener,
} from "antd-jalali";

function CustomDatePicker({
  placeholder,
  className,
  control,
  name,
  changeHandler,
  error = false,
  ...rest
}) {
  if (!control)
    return (
      <ConfigProvider
        locale={{
          locale: fa_IR.locale,
          DatePicker: fa_IR.DatePicker,
        }}
      >
        <div className="flex flex-col gap-2 w-full">
          <DatePickerJalali
            className={cn([
              "border-2 border-custom-primary-color rounded-custom px-2 py-0.5 [&_input]:text-black",
              className,
              error && "border-red-500",
            ])}
            onChange={(date) => {
              changeHandler && changeHandler(date ? date.valueOf() : null);
            }}
            id={name}
            placeholder={placeholder}
            nextIcon=">"
            prevIcon="<"
            superNextIcon=">>"
            superPrevIcon="<<"
            status={error && "error"}
            {...rest}
          />
          {error && <p className="text-red-500 text-sm">{error.message}</p>}
          <JalaliLocaleListener />
        </div>
      </ConfigProvider>
    );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <ConfigProvider
          locale={{
            locale: fa_IR.locale,
            DatePicker: fa_IR.DatePicker,
          }}
        >
          <div className="flex flex-col gap-2 w-full">
            <DatePickerJalali
              className={cn([
                "border-2 border-custom-primary-color rounded-custom px-2 py-0.5 [&_input]:text-black",
                className,
                error && "border-red-500",
              ])}
              onChange={(date) => {
                changeHandler && changeHandler(date ? date.valueOf() : null);
                onChange(date ? date.valueOf() : null);
              }}
              id={name}
              ref={ref}
              value={value ? dayjs(value) : null}
              onBlur={onBlur}
              placeholder={placeholder}
              nextIcon=">"
              prevIcon="<"
              superNextIcon=">>"
              superPrevIcon="<<"
              status={error && "error"}
              {...rest}
            />
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
            <JalaliLocaleListener />
          </div>
        </ConfigProvider>
      )}
    />
  );
}

export default CustomDatePicker;
