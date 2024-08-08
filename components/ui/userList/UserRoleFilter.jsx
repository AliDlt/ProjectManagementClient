import { Radio } from "antd";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useUser from "../../../hooks/useUser";

function UserRoleFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const userRoleParam = searchParams.get("userRole");
  const [userRole, setUserRole] = useState(userRoleParam || "2");
  const { user } = useUser();

  const radioGroupHandler = ({ target: { value } }) => {
    setSearchParams({
      userRole: value,
    });
    setUserRole(value);
  };

  return (
    <Radio.Group
      className="flex gap-1.5 items-center user-role-filter-radio mr-auto"
      onChange={radioGroupHandler}
      value={userRole}
      optionType="button"
      buttonStyle="solid"
    >
      {user && user.userRole === 0 && (
        <>
          <Radio.Button value="0">مدیران</Radio.Button>
        </>
      )}
      <Radio.Button value="1">پیمان کاران</Radio.Button>
      <Radio.Button value="2">ناظران</Radio.Button>
    </Radio.Group>
  );
}

export default UserRoleFilter;
