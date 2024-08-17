import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import cn from "../../utils/cn";
import { Input } from "antd";

export default function CustomDatePicker({
  name,
  control,
  placeholder,
  className,
  error = false,
  calendarPosition = "bottom-right",
  format = "YYYY/MM/DD",
  locale = persian_fa,
  calendar = persian,
}) {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <div className="relative flex flex-col gap-2">
          <Input
            type="text"
            placeholder={placeholder}
            onClick={() => setIsCalendarVisible(!isCalendarVisible)}
            value={value ? value.format(format) : ""}
            className={cn([
              "rounded-custom border-2 border-custom-primary-color",
              className,
            ])}
            readOnly
          />
          {isCalendarVisible && (
            <div className={`absolute ${calendarPosition} mt-2 z-10`}>
              <Calendar
                value={value || null}
                onChange={(date) => {
                  setIsCalendarVisible(false);
                  onChange(date || null);
                }}
                calendar={calendar}
                locale={locale}
                format={format}
              />
            </div>
          )}
          {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
      )}
    />
  );
}
