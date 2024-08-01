import React from "react";
import CustomButton from "../../modules/CustomButton";
import { MdOutlineEdit } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";

const InformationBox = ({ title, children }) => {
  return (
    <div className="bg-background rounded-lg p-3 flex flex-col gap-4 ">
      <p className="text-base"> {title} </p>
      <div className="flex justify-between px-2 items-center gap-2">
        <span className="text-14 text-nowrap text-ellipsis overflow-hidden rounded-md ">
          {children}
        </span>
        <CustomButton className="bg-white text-xl text-custom-primary-color border-custom-primary-color border-2 border-solid py-1 px-5 ">
          {children ? <MdOutlineEdit /> : <IoAddOutline />}
        </CustomButton>
      </div>
    </div>
  );
};

export default InformationBox;
