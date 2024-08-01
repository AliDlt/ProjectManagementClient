import React from "react";
import InformationBox from "./InformationBox";
import StatusBadge from "../../modules/StatusBadge";

const UserInformation = () => {
  const data = [
    { title: "نام و نام خانوادگی", children: "لاله شیریپور" },
    { title: "شماره موبایل", children: "09936757472" },
    { title: "نقش کاربری", children: "ناظر پروژه" },
    { title: "کد ملی", children: "4480165581" },
    { title: "ایمیل", children: "" },
    { title: "وضعیت پروژه", children: <StatusBadge status className='px-2' /> },
  ];

  return (
    <div className=" p-1 gap-1 rounded-lg bg-custom-primary-color grid grid-cols-2">
      {data.map(({ title, children }) => {
        return <InformationBox title={title}>{children}</InformationBox>;
      })}
    </div>
  );
};

export default UserInformation;
