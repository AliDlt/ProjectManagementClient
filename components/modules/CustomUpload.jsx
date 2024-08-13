import { Upload } from "antd";
import React from "react";

const CustomUpload = ({ children, uploadHandler, ...rest }) => {
  return (
    <Upload
      {...rest}
      action={"/api/project/uploadImage"}
      accept="image/png , image/jpeg , image/jpg"
      onChange={uploadHandler}
      showUploadList={false}
    >
      {children}
    </Upload>
  );
};

export default CustomUpload;
