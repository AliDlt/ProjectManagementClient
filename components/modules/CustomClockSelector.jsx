import React, { useState } from "react";
import { TimePicker } from "antd";
import { Controller } from "react-hook-form";

export const CustomHourSelector = ({ control, nameHour, onChange }) => {

  return (
    <Controller
      control={control}
      name={nameHour}
      render={({ field: { onChange, value } }) => (
        <div className="flex gap-2 items-center">
          <span>ساعت</span>

          <TimePicker
            needConfirm={false}
            value={value}
            onChange={(time) => {
              console.log("first");
              console.log(value);
              onChange(time);
            }}
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

  return (
    <Controller
      control={control}
      name={nameMin}
      
      render={({ field: { onChange, value } }) => (
        <div className="flex gap-2 items-center">
          <span>دقیقه</span>
          <TimePicker
            
            value={value}
            onChange={(time) => {
              console.log(time);
              onChange(time);
            }}
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
