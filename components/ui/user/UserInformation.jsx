import React from "react";
import InformationBox from "./InformationBox";
import CustomLoading from "../../modules/CustomLoading";
import { convertFromInternational, userRol } from "../../../utils/tools";

const UserInformation = ({ error, isPending, user, userRole }) => {
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Assuming data structure
  const customData = [
    {
      title: "نام و نام خانوادگی",
      children: user?.name,
      type: "name",
    },
    {
      title: "شماره موبایل",
      children:
        user?.phoneNumber[0] === "+"
          ? convertFromInternational(user?.phoneNumber)
          : user?.phoneNumber,
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
      {console.log(user?.phoneNumber)}
      {isPending ? (
        <CustomLoading />
      ) : (
        <div className="p-1 gap-1 rounded-lg  grid grid-cols-1 lg:grid-cols-2 ">
          {customData.map(({ title, children, type }, index) => (
            <InformationBox
              key={index}
              title={title}
              userRole={userRole}
              type={type}
            >
              {children || "N/A"}
            </InformationBox>
          ))}
        </div>
      )}
    </>
  );
};

export default UserInformation;
