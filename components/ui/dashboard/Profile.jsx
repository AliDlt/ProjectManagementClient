import React from "react";
import useUser from "../../../hooks/useUser";
import { showUserRole } from "../../../utils/tools";
const profile = {
  image: "/image/Ellipse 16.png",
  name: "امیر محمد زارعی",
  level: "مدیر پروژه ",
};
const Profile = () => {
  const { user } = useUser();
  return (
    <div className="w-full justify-center flex">
      <div className="flex flex-col gap-3 mt-4  items-center  ">
        <p className="text-sm lg:text-base font-medium">
          <span>{user?.name}</span>
          <span> {user?.surName}</span>
        </p>
        <p className="text-sm lg:text-base font-medium">
          {showUserRole(user?.userRole)}
        </p>
      </div>
    </div>
  );
};

export default Profile;
