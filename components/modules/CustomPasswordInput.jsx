import { Input } from "antd";
import React from "react";
import cn from "../../utils/cn";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

function CustomPasswordInput({ placeholder, className }) {
  return (
    <Input.Password
      classNames={{
        input: "placeholder:text-black/90 font-medium",
        suffix: "cursor-pointer text-custom-primary-color",
      }}
      className={cn([
        "rounded-custom border-2 border-custom-primary-color cursor-pointer",
        className,
      ])}
      iconRender={(visible) =>
        visible ? (
          <IoEye className=" cursor-pointer" size={32} />
        ) : (
          <IoEyeOff className="text-red-600 cursor-pointer" size={32} />
        )
      }
      placeholder={placeholder}
    />
  );
}

export default CustomPasswordInput;
