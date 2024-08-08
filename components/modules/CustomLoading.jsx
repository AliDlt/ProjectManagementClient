import React from "react";
import { MetroSpinner } from "react-spinners-kit";

const CustomLoading = () => {
  return (
    <div className="flex p-6 justify-center items-center h-full w-full ">
      <MetroSpinner size={36} color="#F1A25B" loading={true} />
    </div>
  );
};

export default CustomLoading;
