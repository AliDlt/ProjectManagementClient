import React from "react";
import InformationBox from "./InformationBox";
import StatusBadge from "../../modules/StatusBadge";
import useUserName from "../../../hooks/useUserName";
import { useParams } from "react-router-dom";

const UserInformation = () => {
  const { id } = useParams();
  const { data, isPending, error } = useUserName(id);

  // Handle loading and error states
  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Assuming data structure
  const data2 = [
    { title: "نام و نام خانوادگی", children: data?.data.name, type: "name" },
    { title: "شماره موبایل", children: data?.data.phoneNumber, type: "phoneNumber" },
    { title: "کد ملی", children: data?.data.nationalCode, type: "nationalCode" },
  ];

  return (
    <div className="p-1 gap-1 rounded-lg bg-custom-primary-color grid grid-cols-1">
      {data2.map(({ title, children, type }, index) => (
        <InformationBox key={index} title={title} type={type}>
          {children || "N/A"}
        </InformationBox>
      ))}
    </div>
  );
};

export default UserInformation;
