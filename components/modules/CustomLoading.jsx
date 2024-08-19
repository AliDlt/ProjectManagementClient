import React from "react";
import { PuffLoader } from "react-spinners";
import cn from "../../utils/cn";

const CustomLoading = ({ size, className }) => {
  return (
    <div
      className={cn([
        "flex p-6 justify-center items-center h-full w-full",
        className,
      ])}
    >
      <PuffLoader
        loading={true}
        color="#f1a25b"
        size={size || 60}
        data-testid="loader"
      />
    </div>
  );
};

export default CustomLoading;
