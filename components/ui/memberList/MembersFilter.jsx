import { Select } from "antd";
import React from "react";
import { IoChevronDown } from "react-icons/io5";

const status = [
  { value: "true", label: <span>فعال</span> },
  { value: "false", label: <span>غیر فعال</span> },
];

function MembersFilter() {
  return (
    <div className="flex items-center gap-5 mb-5">
      <span className="text-20">فیلتر</span>
      <Select
        placeholder="وضعیت"
        className="flex-1 h-9"
        suffixIcon={
          <IoChevronDown size={15} className="text-custom-primary-color" />
        }
        options={status}
      />
      <Select
        placeholder="نام"
        className="flex-1 h-9"
        suffixIcon={
          <IoChevronDown size={15} className="text-custom-primary-color" />
        }
        options={[{ value: "sample", label: <span>sample</span> }]}
      />
    </div>
  );
}

export default MembersFilter;
