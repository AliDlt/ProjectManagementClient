import { Upload } from "antd";
import React from "react";
import { IoAdd } from "react-icons/io5";
import cn from "../../utils/cn";
const CustomUpload = ({
  children,
  uploadHandler,
  className,
  action,
  ...rest
}) => {
  return (
    <Upload
      className={cn([
        "!text-custom-primary-color flex items-center  justify-center p-1 rounded-full text-20 border-2 border-custom-primary-color border-solid transition hover:bg-custom-primary-color hover:!text-white hover:cursor-pointer",
        className,
      ])}
      {...rest}
      action={`${action}`}
      accept="image/png , image/jpeg , image/jpg"
      onChange={uploadHandler}
      showUploadList={false}
    >
      <span>
        <IoAdd />
      </span>
    </Upload>
  );
};

export default CustomUpload;
