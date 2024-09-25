import React from "react";
import CustomButton from "../../modules/CustomButton";
import { useNavigate } from "react-router-dom";
import { convertToLocalDate } from "../../../utils/tools";

const ReportCard = (props) => {
  const { title, description, id, date, createBy, shadow } = props;
  const navigate = useNavigate();

  return (
    <div
      className={`p-3 flex gap-2 bg-white ${!shadow && "shadow"} ${shadow && "border-2 border-custom-primary-color "} rounded-custom items-center justify-between  `}
    >
      <div className="flex flex-col gap-4  w-full">
        <div className="flex justify-between items-center gap-5">
          <h5 className="text-base truncate font-bold flex-1 max-w-96">
            عنوان : {title}
          </h5>
          <div className="flex items-center text-sm text-nowrap">
            <span className="text-nowrap"> تاریخ : </span>
            <span>{convertToLocalDate(date)}</span>
          </div>
        </div>
        <p>
          <span>نویسنده : </span>
          {createBy ? (
            <span>
              {" "}
              {createBy?.name} {createBy?.surName}{" "}
            </span>
          ) : (
            <span>کاربر حذف شده</span>
          )}
        </p>
        <p className="line-clamp-1 text-12 text-start border-t  pt-3 border-custom-primary-color">
          متن گزارش : {description}
        </p>
        <p className="line-clamp-1 text-start">متن گزارش : {description}</p>
        <CustomButton
          className="text-14 mr-auto"
          onClick={() => navigate(`/reports/${id}`)}
        >
          <span className="text-white"> مشاهده</span>
        </CustomButton>
      </div>
    </div>
  );
};

export default ReportCard;
