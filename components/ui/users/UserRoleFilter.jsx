import { Radio } from "antd";
import React, { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useUser from "../../../hooks/useUser";

function UserRoleFilter() {
  const [searchParams] = useSearchParams();
  const userRoleParam = searchParams.get("userRole") || "1";
  const [userRole, setUserRole] = useState(userRoleParam);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useUser();

  const radioGroupHandler = ({ target: { value } }) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    setUserRole(value);

    if (!value) {
      current.delete("userRole");
    } else {
      current.set("userRole", value);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    navigate(`${pathname}${query}`);
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
