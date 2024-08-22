import React from "react";
import ReportBox from "../components/ui/Report/ReportBox";
import CustomButton from "../components/modules/CustomButton";
import { Link, useParams } from "react-router-dom";
import Gallery from "../components/ui/Gallery";
import { Popover } from "antd";
import { BsExclamationLg } from "react-icons/bs";
import CustomUpload from "../components/modules/CustomUpload";
import useGetReport from "../hooks/useGetReport";
import ShowFiles from "../components/ui/Report/ShowFiles";
import { IoAdd, IoAddOutline } from "react-icons/io5";
import ReportGallery from "../components/ui/Report/ReportGallery";

const ReportPage = () => {
  const { id } = useParams();
  const { data, error } = useGetReport(id);
  console.log();
  // Popover Content
  const uploadHandler = (e) => {
    console.log(e.file.response);
    console.log(e.file.status);
  };

  const data2 = { project: "پروژه 1 ", title: "موضوع گزارش" };
  return (
    <div className="container-grid ">
      <div className="col-span-1 lg:col-span-7">
        <h3 className="text-24 my-6">{data?.name}</h3>

        <ReportBox
          description={data?.description}
          title={data2.title}
          project={data2.project}
        />
        <ShowFiles
          action="/api/report/uploadFile"
          data={{ id: data?._id, file: data?.files }}
        />
        <ReportGallery id={data?._id} data = { data?.files} />
        <div className="mt-4 px-4  flex items-center justify-center ">
          <CustomButton className="py-5 lg:p-7 ">
            <Link to={`projects/${2}`}>نمایش پروژه مرتبط </Link>
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
