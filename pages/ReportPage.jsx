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
import { IoAdd } from "react-icons/io5";

const ReportPage = () => {
  const { id } = useParams();
  const { data, error } = useGetReport(id);
  console.log(data);
  // Popover Content
  const uploadHandler = (e) => {
    console.log(e.file.response);
    console.log(e.file.status);
  };
  const popoverContent = (
    <div className="flex flex-col gap-2 text-12">
      <p>ویدئو ها با حجم 10 مگابایت</p>
      <p>عکس ها با حجم 2 مگابایت</p>
    </div>
  );
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
        <ShowFiles />
        <div className="mt-6 flex justify-between px-4">
          <div className="flex w-full gap-2 text-20 items-center">
            <h4 className="text-base">گالری عکس ها</h4>
            <Popover
              content={popoverContent}
              arrow={false}
              overlayInnerStyle={{
                borderRadius: "8px",
                border: "2px solid rgb(var(--primary-color))",
              }}
            >
              <span className="flex justify-center items-center ring-2   ring-custom-primary-color rounded-full cursor-pointer">
                <BsExclamationLg className="text-custom-primary-color  group-hover:text-white" />
              </span>
            </Popover>
          </div>
          <div>
            <CustomUpload
              uploadHandler={uploadHandler}
              action={`https://projectmanagment.liara.run/api/report/uploadImage/${8}`}
            />
          </div>
        </div>
        <Gallery />
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
