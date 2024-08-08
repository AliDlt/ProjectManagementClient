import { Radio } from "antd";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const optionsWithDisabled = [
  { label: "مدیران ", value: "0" },
  { label: "پیمان کاران", value: "1" },
  { label: "ناظران ", value: "2" },
];

function UserRoleFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userRole, setUserRole] = useState(searchParams.get("userRole") || "0");

  const radioGroupHandler = ({ target: { value } }) => {
    setSearchParams({
      userRole: value,
    });
    setUserRole(value);
  };

  return (
    <Radio.Group
      className="flex gap-1.5 items-center user-role-filter-radio mr-auto"
      options={optionsWithDisabled}
      onChange={radioGroupHandler}
      value={userRole}
      optionType="button"
      buttonStyle="solid"
    />
  );
}

export default UserRoleFilter;
