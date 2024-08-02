import React from "react";
import MembersFilter from "./MembersFilter";
import MembersTable from "./MembersTable";

function MembersList({ members, title }) {
  return (
    <>
      <h3 className="text-24">{title}</h3>
      <div className="flex flex-col gap-5 mt-5">
        <MembersFilter />
        <MembersTable />
      </div>
    </>
  );
}

export default MembersList;
