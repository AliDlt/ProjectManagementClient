import React from "react";
import InformationBox from "./InformationBox";
import CustomLoading from "../../modules/CustomLoading";
import { convertFromInternational, showUserRole } from "../../../utils/tools";

const UserInformation = ({ error, isPending, user, userRole }) => {
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Assuming data structure
  const customData = [
    {
      title: "نام ",
      children: user?.name,
      type: "name",
    },
    {
      title: "نام خانوادگی ",
      children: user?.surName,
      type: "name",
    },
    {
      title: "نام کاربری",
      children: user?.username,
      type: "username",
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
      title: "نقش کاربری",
      children: showUserRole(user?.userRole),
      type: "userRole",
    },
  ];
  if (user?.nationalCode) {
    customData.push({
      title: "کد ملی",
      children: user?.nationalCode,
      type: "nationalCode",
    });
  }

  return (
    <>
      {isPending ? (
        <CustomLoading />
      ) : (
        <div className="p-1 gap-1 rounded-lg gap-y-4  grid grid-cols-1 lg:grid-cols-2 ">
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
