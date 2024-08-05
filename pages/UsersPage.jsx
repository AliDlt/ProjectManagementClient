import React from "react";
import useUsers from "../hooks/useUsers";
import UsersFilter from "../components/ui/userList/UsersFilter";
import UsersTable from "../components/ui/userList/UsersTable";
import { useSearchParams } from "react-router-dom";
import UserRoleFilter from "../components/ui/userList/UserRoleFilter";

export default function UsersPage() {
  const [searchParams] = useSearchParams();
  const { users, isLoading } = useUsers(searchParams.get("userRole") || "0");

  return (
    <div className="container flex flex-col gap-10 col-span-1 lg:col-span-9 2xl:col-span-10 lg:flex-row-reverse">
      <div className="flex items-center gap-3 flex-wrap lg:hidden">
        <h3 className="text-24">لیست کاربران</h3>
        <UserRoleFilter />
      </div>
      {/* Filter */}
      <div className="flex flex-col gap-5">
        <h3 className="text-16 lg:col-span-3 hidden lg:block  ">
          مرتب سازی بر اساس
        </h3>
        <UsersFilter />
      </div>
      {/* Table */}
      <div className="flex-1 flex flex-col gap-5">
        <div className="lg:flex lg:items-center lg:gap-3 hidden">
          <h3 className="text-16">لیست کاربران</h3>
          <UserRoleFilter />
        </div>
        <UsersTable users={users} loading={isLoading} />
      </div>
    </div>
  );
}
