import { Upload } from "antd";
import React, { useState } from "react";
import CustomLoading from "./CustomLoading";
import cn from "../../utils/cn";
import { useToast } from "../../Context/ToastContext";

const CustomUpload = ({
  onChange,
  accept,
  action,
  icon,
  data,
  className,
  title,
  disabled,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChange = (info) => {
    console.log(info)
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setLoading(false);
      toast(info.file.response.message, "success");
    }
    if (info.file.status === "error") {
      setLoading(false);
      toast(info.file.response.message, "error");
    }
  };

  return (
    <Upload
      onChange={(e) => {
        handleChange(e);
        onChange && onChange(e);
      }}
      data={data}
      action={action}
      accept={accept}
      listType="picture-card"
      showUploadList={false}
      disabled={disabled}
      className={cn([
        "border-2 border-custom-primary-color-300 border-dashed bg-transparent hover:border-custom-primary-color rounded-2xl p-0 [&_.ant-upload-select]:w-full ",
        className,
      ])}
      {...rest}
    >
      <button
        className="flex flex-col justify-center items-center gap-2 w-full pointer-events-none"
        type="button"
      >
        {loading ? <CustomLoading size={30} className="p-0" /> : icon}
        <div>{title}</div>
      </button>
    </Upload>
  );
};

export default CustomUpload;
