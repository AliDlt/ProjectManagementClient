import { Pagination } from "antd";
import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

function CustomPagination({ onChange, current, ...rest }) {
  return (
    <Pagination
      current={current === "undefined" ? 1 : current}
      rootClassName="!mt-10"
      align="center"
      onChange={onChange}
      prevIcon={() => <FaAngleRight className="text-custom-primary-color" />}
      nextIcon={() => <FaAngleLeft className="text-custom-primary-color" />}
      showLessItems
      {...rest}
    />
  );
}

export default CustomPagination;
