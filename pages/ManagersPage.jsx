import React from "react";
import MembersList from "../components/ui/memberList/MembersList";

const managers = [
  {
    name: "لاله شیرپور",
    phone: "09347612980",
  },
  {
    name: "مهراد احمدی",
    phone: "09347612980",
  },
  {
    name: "زهرا کریمی ",
    phone: "09347612980",
  },
  {
    name: "سمیرا امیری",
    phone: "09347612980",
  },
  {
    name: "علی باقری ",
    phone: "09347612980",
  },
];

function ManagersPage() {
  return (
    <div className="container grid grid-cols-1 gap-10 lg:gap-5 lg:p-0 lg:grid-cols-7 2xl:grid-cols-11 lg:col-span-9 2xl:col-span-10">
      <MembersList members={managers} title="لیست مدیران" />
    </div>
  );
}

export default ManagersPage;
