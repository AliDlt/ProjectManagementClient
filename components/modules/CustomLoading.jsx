import React from "react";
import { PuffLoader } from "react-spinners";

const CustomLoading = () => {

  return (
    <div className="flex p-6 justify-center items-center h-full w-full ">
      <PuffLoader
     
        loading={true}
        color='#f1a25b'
        size={60}
        data-testid="loader"
      />
    </div>
  );
};

export default CustomLoading;
