import React from "react";
import { Link, useParams } from "react-router-dom";
import CustomButton from "../../modules/CustomButton";

const ReportItem = ({ title, report, id }) => {
  console.log(report);
  return (
    <div className=" flex justify-between items-center	  rounded-custom  p-3 border-2  border-custom-primary-color ">
      <div className="flex flex-col gap-2">
        <h5 className="font-bold">{title}</h5>
        <p className="line-clamp-2  text text-12 text-wrap">{report}</p>
      </div>
      <div>
        <Link to={`/reports/${id}`}>
          <CustomButton>مشاهده</CustomButton>
        </Link>
      </div>
    </div>
  );
};

export default ReportItem;
