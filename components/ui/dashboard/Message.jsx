import React from "react";
import CustomButton from "../../modules/CustomButton";

const Message = ({ name, message }) => {
  return (
    <div className="border-custom-primary-color border-2 rounded-custom p-2  text-sm ">
      <h5 className=""> {name} </h5>
      <div className="flex gap-1 items-center justify-between ">
        <p className="text-nowrap w-1/2 text-ellipsis overflow-hidden text-[10px]">{message}</p>
        <CustomButton className='text-[8px] py-1'>ادامه پیام</CustomButton>
      </div>
    </div>
  );
};

export default Message;
