import React, { useState } from "react";

import CustomButton from "../../modules/CustomButton";

import { Popover } from "antd";
import { BsExclamationLg } from "react-icons/bs";
import CustomUpload from "../../modules/CustomUpload";
import Files from "../Files";
import { IoAddOutline } from "react-icons/io5";
import { FaFile } from "react-icons/fa6";

import CustomModal from "../../modules/CustomModal";
import CustomTextAria from "../../modules/CustomTextAria";
import CustomInput from "../../modules/CustomInput";
const popoverContent = (
  <div className="flex flex-col gap-2 text-12">
    <p>اسناد با حجم حد اکثر 5 مگابایت</p>
  </div>
);

const ShowFiles = ({ data, action }) => {
  const [description, setDescription] = useState();
  const [show, setShow] = useState();
  const changeValue = (e) => {
    setDescription(e.target.value);
  };
  console.log(data);
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
        <div className="flex justify-center items-center ">
          <CustomButton
            onClick={() => setShow(true)}
            className="hover:bg-custom-primary-color w-10 rounded-full  h-10 p-1 text-custom-primary-color bg-transparent hover:text-white transition border-2 border-custom-primary-color "
          >
            <IoAddOutline className="text-24" />
          </CustomButton>
        </div>
      </div>

      <Files items={data?.file} />

      <CustomModal onCancel={setShow} open={show} title="بارگزاری فایل">
        <div className="flex gap-4 flex-col">
          <CustomUpload
            action={action}
            disabled={!description}
            data={{
              ...data,
              fileFormat: "application/pdf",
              description: description,
            }}
            className="mt-4  text-black/50 !text-20 "
            accept="application/pdf,text/plain,application/zip,application/msword,application/vnd.rar"
            title="بارگزاری فایل"
            onChange={(e) => console.log(e)}
            icon={<FaFile />}
          />
          <div>
            <CustomTextAria
              placeholder={"توضیحات (الزامی)"}
              onChange={changeValue}
            />
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default ShowFiles;
