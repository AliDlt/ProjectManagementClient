import React from "react";
import ReportBox from "../components/ui/Report/ReportBox";
import CustomButton from "../components/modules/CustomButton";
import { Link } from "react-router-dom";

const ReportPage = () => {
  const data = { project: "پروژه 1 ", title: "موضوع گزارش" };
  return (
    <div className="container-grid ">
      <div className="col-span-1 lg:col-span-7">
        <h3 className="text-24 my-6">گزارش ها</h3>
        <ReportBox title={data.title} project={data.project} />
        <div className="mt-4 grid grid-cols-2 px-4 items-center justify-center gap-4 lg:flex  ">
          <CustomButton className="py-5 lg:p-7 ">ثبت تغیرات</CustomButton>

          <CustomButton className="py-5 lg:p-7">
            <Link to={`projects/${2}`}>نمایش پروژه مرتبط </Link>
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
