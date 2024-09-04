import React, { useState } from "react";
import { TimePicker } from "antd";
import { Controller } from "react-hook-form";

export const CustomHourSelector = ({ control, nameHour }) => {

  return (
    <Controller
      control={control}
      name={nameHour}
      render={({ field }) => {
        return (
          <div >
            <div className="flex gap-2 items-center">
              <TimePicker
                {...field}
                className="custom-time-picker rounded-full border-2   "
                format="HH"
                placeholder="ساعت"
                type="hour"
                showNow={false}
                needConfirm={false}
              />
            </div>
          </div>
        );
      }}
    />
  );
};

export const CustomMinSelector = ({ control, nameMin }) => {

  return (
    <Controller
      control={control}
      name={nameMin}
      render={({ field }) => {
        return (
          <div >
            <div className="flex gap-2 items-center">
              <TimePicker
                {...field}
                className="custom-time-picker rounded-full border-2   "
                format="mm"
                placeholder="دقیقه"
                type="hour"
                showNow={false}
                needConfirm={false}
              />
            </div>
          </div>
        );
      }}
    />
  );
};
