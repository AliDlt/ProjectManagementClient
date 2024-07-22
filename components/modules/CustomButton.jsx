import { Button } from "antd";
import React from "react";
import cn from "../../utils/cn";

function CustomButton({ children, className, onClick }) {
  return (
    <Button
      className={cn([
        "rounded-custom bg-custom-primary-color text-white border-none hover:bg-custom-primary-color/90 px-4 py-[18px]",
        className,
      ])}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default CustomButton;
