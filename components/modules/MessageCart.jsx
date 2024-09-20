import React, { useEffect } from "react";
import CustomButton from "./CustomButton";
import { Link } from "react-router-dom";
import useGetMessages from "../../hooks/useGetMessages";

const SmsCart = ({ title, description, id }) => {
  // data

  return (
    <div className=" rounded-es-none rounded-custom p-3 shadow bg-white">
      <p className="text-12 md:text-14 lg:text-16">{title}</p>
      <div className="flex items-center gap-x-2 justify-between">
        <p className="text-10 truncate md:text-14 lg:text-16">{description}  </p>
        <Link to={`/message/${id}`}>
          <CustomButton className="!text-10 md:text-14 xl:text-16 px-4 md:px-8  py-2 rounded-custom text-white">
            ادامه پیام
          </CustomButton>
        </Link>
      </div>
    </div>
  );
 
};

export default SmsCart;
