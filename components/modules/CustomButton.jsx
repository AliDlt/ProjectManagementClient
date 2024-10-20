import { Button } from "antd";
import React from "react";
import cn from "../../utils/cn";

function CustomButton({
  children,
  className,
  onClick,
  type,
  disabled,
  style,
  loading,
  ...rest
}) {
  return (
    <Button
      style={style}
      htmlType={type}
      className={cn([
        "rounded-custom bg-custom-primary-color text-white hover:bg-custom-primary-color/90 px-4 py-[18px] disabled:hover:bg-gray-200 transition-none disabled:cursor-not-allowed disabled:bg-gray-200",
        className,
      ])}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
      {...rest}
    >
      {loading || children}
    </Button>
  );
}

export default CustomButton;
