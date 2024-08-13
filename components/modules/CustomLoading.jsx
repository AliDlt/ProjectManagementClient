import React from "react";
import { PuffLoader } from "react-spinners";

const CustomLoading = ({ size }) => {
  return (
    <div className="flex p-6 justify-center items-center h-full w-full ">
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
