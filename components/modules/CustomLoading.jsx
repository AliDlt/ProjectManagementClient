import React from "react";
import { PuffLoader } from "react-spinners";
import cn from "../../utils/cn";

const CustomLoading = ({ size, className }) => {
  return (
    <div
      className={cn([
        "flex p-6 justify-center items-center h-full w-full [&_span_span]:!border-custom-primary-color",
        className,
      ])}
    >
      <PuffLoader loading={true} size={size || 60} data-testid="loader" />
    </div>
  );
};

export default CustomLoading;
