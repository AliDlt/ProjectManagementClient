import React from "react";
import { ConfigProvider, DatePicker } from "antd";
import fa_IR from "antd/es/locale/fa_IR";
import cn from "../../utils/cn";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";

function CustomDatePicker({
  placeholder,
  className,
  control,
  name,
  changeHandler,
  ...rest
}) {
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
          <DatePicker
            className={cn([
              "border-2 border-custom-primary-color rounded-custom px-2 py-0.5",
              className,
            ])}
            onChange={(date) => {
              changeHandler && changeHandler(date ? date.valueOf() : null);
              onChange(date ? date.valueOf() : null);
            }}
            ref={ref}
            value={value ? dayjs(value) : null}
            onBlur={onBlur}
            placeholder={placeholder}
            nextIcon=">"
            prevIcon="<"
            superNextIcon=">>"
            superPrevIcon="<<"
            {...rest}
          />
        </ConfigProvider>
      )}
    />
  );
}

export default CustomDatePicker;
