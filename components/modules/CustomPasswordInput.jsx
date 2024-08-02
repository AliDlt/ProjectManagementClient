import InputPassword from "antd/es/input/Password";
import React from "react";
import cn from "../../utils/cn";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { Controller } from "react-hook-form";

function CustomPasswordInput({ placeholder, className, name, control, error }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col gap-2">
          <InputPassword
            {...field}
            classNames={{
              input: "placeholder:text-black/50 font-medium",
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
                <IoEyeOff className="cursor-pointer" size={32} />
              )
            }
            placeholder={placeholder}
            status={error[name] && "error"}
          />
          {error[name] && (
            <p className="text-red-500 text-sm">{error[name].message}</p>
          )}
        </div>
      )}
    />
  );
}

export default CustomPasswordInput;
