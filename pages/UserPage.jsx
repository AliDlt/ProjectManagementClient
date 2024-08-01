import React from "react";
import UserInformation from "../components/ui/user/UserInformation";
import Projects from "../components/ui/user/Projects";
import Reports from "../components/ui/user/Reports";

const UserPage = () => {
  return (
    <section className="container p-4  flex flex-col gap-4 grid-cols-1 gap-10 lg:gap-5 lg:p-0   lg:col-span-9 2xl:col-span-10">
      <h3 className="text-24 font-bold mb-3 px-2">اطلاعات کاربر</h3>

      <UserInformation />
      <Projects />
      <Reports />
    </section>
  );
};

export default UserPage;
