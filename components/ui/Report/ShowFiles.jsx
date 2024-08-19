import React from "react";
import Gallery from "../Gallery";
import CustomButton from "../../modules/CustomButton";
import { MdDelete } from "react-icons/md";
import { Popover } from "antd";
import { BsExclamationLg } from "react-icons/bs";
import CustomUpload from "../../modules/CustomUpload";
import Files from "../Files";
const popoverContent = (
  <div className="flex flex-col gap-2 text-12">
    <p>اسناد با حجم حد اکثر 5 مگابایت</p>
  </div>
);

const ShowFiles = () => {
  return (
    <div className="my-6">
      <div className="my-6 flex justify-between px-4">
        <div className="flex w-full gap-2 text-20 items-center">
          <h4 className="text-base">اسناد</h4>
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
            // uploadHandler={uploadHandler}
            action={`https://projectmanagment.liara.run/api/report/uploadImage/${8}`}
          />
        </div>
      </div>
      <Files />
    </div>
  );
};

export default ShowFiles;
