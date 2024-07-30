import { Select } from "antd";
import React from "react";
import { HiChevronDown } from "react-icons/hi2";

function MembersFilter() {
  return (
    <div className="flex items-center gap-5">
      <span>فیلتر</span>
      <Select
        placeholder="وضعیت"
        className="flex-1"
        suffixIcon={<HiChevronDown className="text-custom-primary-color" />}
        options={[{ value: "sample", label: <span>sample</span> }]}
      />
      <Select
        placeholder="نام"
        className="flex-1"
        suffixIcon={<HiChevronDown className="text-custom-primary-color" />}
        options={[{ value: "sample", label: <span>sample</span> }]}
      />
    </div>
  );
}

export default MembersFilter;
