import React from "react";
import MembersFilter from "./MembersFilter";

function MembersList({ members, title }) {
  return (
    <>
      <h3 className="text-24">{title}</h3>
      <div className="flex flex-col gap-5 mt-5">
        <MembersFilter />
      </div>
    </>
  );
}

export default MembersList;
