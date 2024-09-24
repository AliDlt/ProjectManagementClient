import { Radio } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useUser from "../../../hooks/useUser";

function UserRoleFilter() {
  const { user } = useUser();
  const [searchParams] = useSearchParams();
  const [userRole, setUserRole] = useState(
    searchParams.get("userRole") || String(user?.userRole),
  );
  const navigate = useNavigate();
  const { pathname } = useLocation();

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

  useEffect(() => {
    setUserRole(searchParams.get("userRole") || String(user?.userRole));
  }, [searchParams]);

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
      <Radio.Button value="1">سرپرست ها</Radio.Button>
      <Radio.Button value="2">ناظران</Radio.Button>
      {user && user.userRole === 0 && (
        <Radio.Button value="3">پذیرش</Radio.Button>
      )}
    </Radio.Group>
  );
}

export default UserRoleFilter;
