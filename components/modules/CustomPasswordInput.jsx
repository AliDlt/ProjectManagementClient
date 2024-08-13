import InputPassword from "antd/es/input/Password";
import React from "react";
import cn from "../../utils/cn";
import { IoEyeOff, IoEye } from "react-icons/io5";
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
              suffix: cn([
                "cursor-pointer text-custom-primary-color",
                error && "text-red-400",
              ]),
            }}
            className={cn([
              "rounded-custom border-2 border-custom-primary-color cursor-pointer",
              error && "border-red-400",
              className,
            ])}
            iconRender={(visible) =>
              visible ? <IoEye size={32} /> : <IoEyeOff size={32} />
            }
            placeholder={placeholder}
            status={error && "error"}
          />
          {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
      )}
    />
  );
}

export default CustomPasswordInput;
