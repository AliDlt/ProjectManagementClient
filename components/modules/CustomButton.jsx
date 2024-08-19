import { Button } from "antd";
import React from "react";
import cn from "../../utils/cn";

function CustomButton({ children, className, onClick, type, loading }) {
  return (
    <Button
      htmlType={type}
      className={cn([
        "rounded-custom bg-custom-primary-color text-white border-none hover:bg-custom-primary-color/90 px-4 py-[18px] disabled:hover:bg-gray-200 ",
        className,
      ])}
      onClick={onClick}
      loading={loading}
    >
      {loading || children}
    </Button>
  );
}

export default CustomButton;
