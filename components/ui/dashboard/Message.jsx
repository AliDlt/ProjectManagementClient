import React from "react";
import CustomButton from "../../modules/CustomButton";
import { Link } from "react-router-dom";

const Message = ({ title, description,  id }) => {
  return (
    <div className="border-custom-primary-color border-2 rounded-custom p-2  text-sm ">
      <h5 className=""> {title} </h5>
      <div className="flex gap-2 items-center justify-between ">
        <p className=" line-clamp-1 text-[10px] w-full ">
          {description}
        </p>
        <CustomButton className="text-10 py-0 h-[25px]">
          <Link to={`/message/${id}`} className="text-white">
            ادامه پیام
          </Link>
        </CustomButton>
      </div>
    </div>
  );
};

export default Message;
