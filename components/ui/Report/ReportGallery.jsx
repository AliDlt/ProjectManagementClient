import React from "react";
import Gallery from "../Gallery";
import { IoAddOutline } from "react-icons/io5";
import CustomUpload from "../../modules/CustomUpload";
import { BsExclamationLg } from "react-icons/bs";
import { Popover } from "antd";
const popoverContent = (
  <div className="flex flex-col gap-2 text-12">
    <p>ویدئو ها با حجم 10 مگابایت</p>
    <p>عکس ها با حجم 2 مگابایت</p>
  </div>
);
const ReportGallery = () => {
  return (
    <div>
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
        <div className="flex items-center justify-center">
          <CustomUpload
            icon={
              <IoAddOutline
                size={25}
                className="text-custom-primary-color rounded-full group-hover:text-white"
              />
            }
            action={`https://projectmanagment.liara.run/api/report/uploadImage/${8}`}
          />
        </div>
      </div>
      <Gallery />
    </div>
  );
};

export default ReportGallery;
