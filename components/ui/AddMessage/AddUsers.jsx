import React, { useState } from "react";
import useUsers from "../../../hooks/useUsers";
import StatusBadge from "../../modules/StatusBadge";
import { Pagination } from "antd";
import CustomLoading from "../../modules/CustomLoading";

const AddUsers = ({ setUser }) => {
  const [page, setPage] = useState(1);
  const { users, isLoading } = useUsers(0, page, 5);
  console.log(users);
  if (isLoading) {
    return <CustomLoading />;
  }
  return (
    <section>
      {users?.users.map((user, key) => {
        return (
          <div
            key={key}
            onClick={() => {
              setUser(user);
            }}
            className="[&:not(:last-child)]:border-b-2 flex justify-between items-center hover:bg-black/5 transition-all cursor-pointer border-custom-primary-color  py-4 px-2"
          >
            <div className="flex flex-col gap-2">
              <p>{user.name}</p>
              <p>نام کاربری : {user?.username} </p>
            </div>
            <div>
              <StatusBadge status />
            </div>
          </div>
        );
      })}
      {console.log(users?.totalPages)}
      <div>
        <Pagination
          onChange={(page) => setPage(page)}
          align="center"
          pageSize={5}
          total={users?.totalUsers}
          current={page}
          style={{ direction: "ltr" }}
        />
      </div>
    </section>
  );
};

export default AddUsers;