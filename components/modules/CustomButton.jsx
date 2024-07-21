import { Button } from "antd";
import React from "react";
import cn from "../../utils/cn";

function CustomButton({ children, className, onClick }) {
  return (
    <Button
      className={cn([
        "rounded-3xl bg-custom-primary-color text-white border-none hover:bg-custom-primary-color/80 px-4 py-[18px] ",
        className,
      ])}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default CustomButton;
