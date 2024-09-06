import React from "react";
import CustomButton from "../../modules/CustomButton";
import { Link } from "react-router-dom";

const ReportCard = ({ title, description, id }) => {
  return (
    <div className="p-3 flex gap-2 border-2 border-custom-primary-color rounded-custom items-center justify-between  ">
      <div className="flex gap-4 line-clamp-1 items-center">
        <h5 className="text-14 text-nowrap">{title} :</h5>
        <p className="line-clamp-1 text-12 text-start">{description}</p>
      </div>
      <Link to={`/reports/${id}`} className="text-10  ">
        <CustomButton className="p-1 text-white md:px-3   !justify-center ">
          مشاهده
        </CustomButton>
      </Link>{" "}
    </div>
  );
};

export default ReportCard;
