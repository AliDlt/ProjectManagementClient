import React from "react";
import CustomButton from "../../modules/CustomButton";


const Message = ({ name, message }) => {

  return (
    <div className="border-custom-primary-color border-2 rounded-custom p-2  text-sm ">
      <h5 className=""> {name} </h5>
      <div className="flex gap-3 items-center justify-between ">
        <p className="text-nowrap text-ellipsis overflow-hidden text-[10px]">
          {message}
        </p>
        <CustomButton className="text-10 py-0 h-[25px]">
          <span className="text-white">ادامه پیام</span>
        </CustomButton>
      </div>
    </div>
  );
};

export default Message;
