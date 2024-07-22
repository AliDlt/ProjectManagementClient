import React from "react";
const profile = {
  image: "/image/Ellipse 16.png",
  name: "امیر محمد زارعی",
  level: 'مدیر پروژه '
};
const Profile = () => {
  return (
    <div className="w-full justify-center flex">
      <div className="flex flex-col gap-3 mt-10  items-center  ">
        <div className="w-11/12 border-custom-primary-color border-4 flex justify-center items-center rounded-full p-3">
          <img src={profile.image} alt="" />
        </div>
        <p className="font-estedad text-sm font-medium">{profile.name}</p>
        <p className="font-estedad text-sm font-medium">{profile.level}</p>
      </div>
    </div>
  );
};

export default Profile;
