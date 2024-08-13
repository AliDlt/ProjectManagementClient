import React from "react";
import { DatePicker, ConfigProvider } from "antd";
import fa_IR from "antd/es/locale/fa_IR";
import cn from "../../utils/cn";
import { JalaliLocaleListener } from "antd-jalali";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";

function CustomDatePicker({ placeholder, className, control, name, ...rest }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <ConfigProvider locale={fa_IR}>
          <JalaliLocaleListener />
          <DatePicker
            ref={ref}
            value={value ? dayjs(value) : null}
            onBlur={onBlur}
            onChange={(date) => {
              onChange(date ? date?.valueOf() : null);
            }}
            nextIcon=">"
            prevIcon="<"
            superNextIcon=">>"
            superPrevIcon="<<"
            className={cn([
              "border-2 border-custom-primary-color rounded-custom px-2 py-0.5",
              className,
            ])}
            placeholder={placeholder}
            {...rest}
          />
        </ConfigProvider>
      )}
    />
  );
}

export default CustomDatePicker;
