import React from "react";
import useUser from "../../../hooks/useUser";
import { userRol } from "../../../utils/tools";
const profile = {
  image: "/image/Ellipse 16.png",
  name: "امیر محمد زارعی",
  level: "مدیر پروژه ",
};
const Profile = () => {
  const { user } = useUser();
  return (
    <div className="w-full justify-center flex">
      <div className="flex flex-col gap-3 mt-10  items-center  ">
        <div className="w-11/12 border-custom-primary-color border-4 flex justify-center items-center rounded-full p-3">
          <img src={profile.image} alt="" />
        </div>
        <p className="text-sm lg:text-base font-medium">{user?.name}</p>
        <p className="text-sm lg:text-base font-medium">{userRol(user?.userRole)}</p>
      </div>
    </div>
  );
};

export default Profile;
