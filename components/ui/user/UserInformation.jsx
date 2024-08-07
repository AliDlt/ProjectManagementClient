import React from "react";
import InformationBox from "./InformationBox";
import StatusBadge from "../../modules/StatusBadge";
import useUserName from "../../../hooks/useUserName";
import { useParams } from "react-router-dom";
import CustomLoading from "../../modules/CustomLoading";
import { userRol } from "../../../utils/tools";

const UserInformation = ({ error, isPending, user }) => {
  console.log(user);
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Assuming data structure
  const data2 = [
    {
      title: "نام و نام خانوادگی",
      children: user?.name,
      type: "name",
    },
    {
      title: "شماره موبایل",
      children: user?.phoneNumber,
      type: "phoneNumber",
    },
    {
      title: "کد ملی",
      children: user?.nationalCode,
      type: "nationalCode",
    },
    {
      title: "نقش کاربری",
      children: userRol(user?.userRole),
      type: "userRole",
    },
  ];

  return (
    <>
      {isPending ? (
        <CustomLoading />
      ) : (
        <div className="p-1 gap-1 rounded-lg  grid grid-cols-1 lg:grid-cols-2">
          {data2.map(({ title, children, type }, index) => (
            <InformationBox key={index} title={title} type={type}>
              {children || "N/A"}
            </InformationBox>
          ))}
        </div>
      )}
    </>
  );
};

export default UserInformation;
