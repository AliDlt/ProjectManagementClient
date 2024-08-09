import React, { useEffect } from "react";
import CustomButton from "./CustomButton";
import { Link } from "react-router-dom";

const SmsCart = ({ data }) => {
  // data
  const { authorName, message, id } = data;

  return (
    <div className="border-2 border-custom-primary-color rounded-es-none rounded-custom p-3">
      <p className="text-12">{authorName}</p>
      <div className="flex items-center gap-x-2 justify-between">
        <p className="text-10 truncate">{message}</p>
        <Link to={`/message/${id}`}>
          <CustomButton className="!text-10 px-2 py-4 rounded-custom text-white">
            ادامه پیام
          </CustomButton>
        </Link>
      </div>
    </div>
  );
};

export default SmsCart;
