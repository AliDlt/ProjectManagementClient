import React from "react";
import useUser from "../../../hooks/useUser";
import { userRol } from "../../../utils/tools";

const Profile = () => {
  const { user } = useUser();
  return (
    <div className="w-full justify-center flex">
      <div className="flex flex-col gap-2 mt-4  items-center">
        <p className="text-sm lg:text-base font-medium">
          <span>{user?.name}</span>
          <span> {user?.surName}</span>
        </p>
        <p className="text-sm lg:text-base font-medium">
          {userRol(user?.userRole)}
        </p>
      </div>
    </div>
  );
};

export default Profile;
