import React from "react";
import CustomButton from "../../modules/CustomButton";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { convertToLocalDate } from "../../../utils/tools";

const ReportCard = (props) => {
  const { title, description, id, date, createBy } = props
  return (
    <div className="p-3 flex gap-2 bg-white shadow rounded-custom items-center justify-between  ">
      <div className="flex flex-col gap-4  w-full">
        <div className="flex justify-between items-center">
          <h5 className="text-14 line-clamp-1 w-11/12"> عنوان : {title} </h5>
          <div className="flex items-center text-10 text-nowrap">
            <span className="text-nowrap"> تاریخ : </span>
            <span>{convertToLocalDate(date)}</span>
          </div>
        </div>
        <p className="text-12">
          <span>نویسنده : </span>
          {createBy ?
          <span> {createBy?.name} {createBy?.surName} </span>
         : <span>
            کاربر حذف شده
          </span>}
        </p>
        <p className="line-clamp-1 text-12 text-start">
          {" "}
          متن گزارش : {description}
        </p>
        <Link to={`/reports/${id}`} className="text-10 flex justify-end ">
          <CustomButton className="p-1 text-white md:px-3 rounded-lg !justify-center ">
            مشاهده
          </CustomButton>
        </Link>{" "}
      </div>
    </div>
  );
};

export default ReportCard;
