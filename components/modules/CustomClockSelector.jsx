import React, { useState } from "react";
import { TimePicker } from "antd";
import { Controller } from "react-hook-form";

export const CustomHourSelector = ({ control, nameHour }) => {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      control={control}
      name={nameHour}
      render={({ field: { onChange, value } }) => (
        <div className="flex gap-2 items-center">
          <TimePicker
            needConfirm={false}
            value={value}
            onChange={(time) => {
              console.log('first')
              onChange(time); // به‌روزرسانی مقدار زمان
              setOpen(false); // بستن پنجره پس از انتخاب
            }}
            open={open}
            onOpenChange={setOpen} // کنترل وضعیت باز یا بسته بودن پنجره
            className="custom-time-picker rounded-full border-2"
            format="HH"
            placeholder="ساعت"
            showNow={false}
            minuteStep={1}
          />
        </div>
      )}
    />
  );
};

export const CustomMinSelector = ({ control, nameMin }) => {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      control={control}
      name={nameMin}
      render={({ field: { onChange, value } }) => (
        <div className="flex gap-2 items-center">
          <TimePicker
            value={value}
            onChange={(time) => {
              onChange(time); // به‌روزرسانی مقدار دقیقه
              setOpen(false); // بستن پنجره پس از انتخاب
            }}
            open={open}
            onOpenChange={setOpen}
            className="custom-time-picker rounded-full border-2"
            format="mm"
            needConfirm={false}
            placeholder="دقیقه"
            showNow={false}
            hourStep={1}
          />
        </div>
      )}
    />
  );
};
