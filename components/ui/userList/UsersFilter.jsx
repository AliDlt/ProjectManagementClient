import { ConfigProvider, Radio, Select } from "antd";
import React from "react";
import { IoChevronDown } from "react-icons/io5";
import CustomInput from "../../modules/CustomInput";
import { GrSearch } from "react-icons/gr";

const sortItems = [
  { value: "1", label: <span>نام و نام خانوادگی </span> },
  { value: "2", label: <span> وضعیت </span> },
  { value: "3", label: <span> ورود کاربر </span> },
];

function UsersFilter() {
  return (
    <div className="flex flex-col items-center gap-8 mb-5 lg:bg-white lg:shadow-custom lg:rounded-custom lg:border-b-4 lg:border-custom-primary-color-300 lg:p-5 lg:h-[30rem]">
      <CustomInput
        className="py-2.5 rounded-custom w-52 ml-auto"
        placeholder="جستجو"
        icon={
          <GrSearch className="-scale-x-100 text-custom-primary-color w-5 h-5 ml-2" />
        }
      />
      <div className="flex justify-between items-center gap-5 w-full lg:hidden">
        <span className="text-16">مرتب سازی بر اساس </span>
        <Select
          placeholder="نام خانوادگی"
          className="flex-1 h-9"
          suffixIcon={
            <IoChevronDown size={15} className="text-custom-primary-color" />
          }
          options={status}
        />
      </div>

      <Radio.Group
        className="hidden lg:flex lg:flex-col lg:w-full sort-users "
        name="sort"
        defaultValue={"1"}
      >
        {sortItems.map(({ label, value }, index) => (
          <Radio key={index} value={value} className="py-3">
            {label}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );
}

export default UsersFilter;
