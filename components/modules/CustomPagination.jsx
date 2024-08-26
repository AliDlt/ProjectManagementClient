import { Pagination } from "antd";
import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

function CustomPagination({ onChange, ...rest }) {
  return (
    <Pagination
      rootClassName="!mt-16"
      align="center"
      onChange={onChange}
      prevIcon={() => (
        <FaAngleRight className="mt-2 text-custom-primary-color" />
      )}
      nextIcon={() => (
        <FaAngleLeft className="mt-2 text-custom-primary-color" />
      )}
      {...rest}
    />
  );
}

export default CustomPagination;
