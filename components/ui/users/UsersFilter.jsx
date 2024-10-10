import { Empty, Radio, Select } from "antd";
import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import CustomInput from "../../modules/CustomInput";
import { GrSearch } from "react-icons/gr";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import CustomSelectInput from "../../modules/CustomSelectInput";

const sortItems = [
  { value: "surName", label: <span>نام و نام خانوادگی </span> },
  { value: "active", label: <span> وضعیت </span> },
  { value: "lastLogin", label: <span> ورود کاربر </span> },
  { value: "", label: <span>هیچکدام</span> },
];

function UsersFilter() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Seach Handler
  const searchHandler = useDebouncedCallback((event) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    const value = event.target.value.trim();

    if (!value) {
      current.delete("search");
    } else {
      current.set("search", event.target.value);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    navigate(`${pathname}${query}`);
  }, 1000);

  // Sort Handler
  const sortHandler = (value) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    setSort(value);

    if (!value) {
      current.delete("sort");
    } else {
      current.set("sort", value);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    navigate(`${pathname}${query}`);
  };

  return (
    <div className="flex flex-col items-center gap-8 mb-5 lg:bg-white lg:shadow-custom lg:rounded-custom lg:border-b-4 lg:border-custom-primary-color-300 lg:p-5 lg:h-[30rem]">
      <CustomInput
        className="lg:py-2.5 rounded-custom w-52 ml-auto"
        placeholder="جستجو"
        onChange={(event) => {
          setSearch(event.target.value.trim());
          searchHandler(event);
        }}
        value={search}
        icon={
          <GrSearch className="-scale-x-100 text-custom-primary-color w-5 h-5 ml-2" />
        }
        type="search"
      />
      <div className="flex justify-between flex-wrap items-center gap-5 w-full lg:hidden">
        <span className="text-16">مرتب سازی بر اساس :</span>
        <CustomSelectInput
          defaultValue={sort}
          placeholder="بر اساس"
          containerClassName="w-40 ml-auto"
          options={sortItems}
          notFoundContent={
            <Empty
              description="داده ای وجود ندارد"
              className="flex flex-col justify-center items-center gap-0  text-12 "
              imageStyle={{
                width: "60px",
                height: "60px",
              }}
            />
          }
          onChange={sortHandler}
        />
      </div>
      <Radio.Group
        className="hidden lg:flex lg:flex-col lg:w-full sort-users"
        name="sort"
        defaultValue={sort}
        onChange={(e) => sortHandler(e.target.value)}
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
