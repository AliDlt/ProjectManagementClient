import React from "react";
import useUsers from "../hooks/useUsers";
import UsersList from "../components/ui/memberList/UsersList";

function ContractorsPage() {
  const { users: managers, isLoading } = useUsers(2);

  return (
    <div className="container grid grid-cols-1 gap-10 lg:gap-5 lg:p-0 lg:grid-cols-7 2xl:grid-cols-11 lg:col-span-9 2xl:col-span-10">
      <UsersList users={managers} loading={isLoading} title="لیست مدیران" />
    </div>
  );
}

export default ContractorsPage;
