import React from "react";
import CustomButton from "../../modules/CustomButton";
import { Link } from "react-router-dom";

const ReportCard = ({ title, description, id }) => {
  return (
    <div className="p-3 flex gap-2 border-2 border-custom-primary-color rounded-custom items-center justify-between  ">
      <h5 className="text-14 text-nowrap">{title} :</h5>
      <p className="line-clamp-1 text-12 ">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
        از طراحان گرافیک است
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
        از طراحان گرافیک است
      </p>
      <CustomButton className="p-1 text-white md:px-3   ">
        {" "}
        <Link className="text-10"> مشاهده </Link>{" "}
      </CustomButton>
    </div>
  );
};

export default ReportCard;
