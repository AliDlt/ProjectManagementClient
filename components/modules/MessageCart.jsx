import React, { useEffect } from "react";
import CustomButton from "./CustomButton";
import { Link } from "react-router-dom";
import useGetMessages from "../../hooks/useGetMessages";
import { convertToLocalDate } from "../../utils/tools";

const SmsCart = ({
  title,
  description,
  id,
  assignedTo,
  createdBy,
  createdAt,
}) => {
  console.log(assignedTo);
  return (
    <div className=" rounded-es-none rounded-custom p-3 shadow bg-white">
      <div className="my-2 flex flex-col gap-2 ">
        <p className="font-bold flex justify-between items-center">
          فرستنده : {createdBy.name} {createdBy.surName}
          <p className="flex gap-2 items-center text-14">
            <span>تاریخ :</span>
            <span>{convertToLocalDate(createdAt)}</span>
          </p>
        </p>
        <p className="font-bold">
          گیرنده : {assignedTo.name} {assignedTo.surName}
        </p>
      </div>
      <p className="text-12  md:text-14 lg:text-16">
        <span>عنوان :</span>
        <span>{title}</span>
      </p>

      <div className="flex items-center gap-x-2 justify-between border-t border-custom-primary-color pt-3">
        <p className="text-10 truncate md:text-14 lg:text-16">{description} </p>
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
