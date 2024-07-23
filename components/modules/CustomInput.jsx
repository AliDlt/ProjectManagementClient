import { Input } from "antd";
import React from "react";
import cn from "../../utils/cn";

export default function CustomInput({ icon, placeholder, className }) {
  return (
    <Input
      classNames={{
        input: "placeholder:text-black/90 font-medium p-2",
      }}
      className={cn([
        "rounded-lg border-2 border-custom-primary-color",
        className,
      ])}
      prefix={icon}
      placeholder={placeholder}
    />
  );
}
