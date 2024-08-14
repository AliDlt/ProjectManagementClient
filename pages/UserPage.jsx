import React, { useEffect } from "react";
import UserInformation from "../components/ui/user/UserInformation";
import Projects from "../components/ui/user/Projects";
import Reports from "../components/ui/user/Reports";
import { Navigate, useParams } from "react-router-dom";
import useUserName from "../hooks/useUserName";
import StatusBadge from "../components/modules/StatusBadge";
import { convertDate } from "../utils/tools";
import { useToast } from "../Context/ToastContext";

const UserPage = () => {
  const { id } = useParams();
  const toast = useToast()
  const { data, isPending, error } = useUserName(id);
  if (error) {
    toast(error.response.data.message,'error')
    return (
    
    <Navigate to="/users" />
  
  )
  }
  return (
    <section className="container p-4  flex flex-col  grid-cols-1 gap-10 lg:gap-5 lg:p-0   lg:col-span-9 2xl:col-span-10">
      <div className="flex justify-between ">
        <div>
          <h3 className="text-24 font-bold mb-3 px-2">اطلاعات کاربر</h3>
          <StatusBadge
            status={data?.data.user.active}
            className="p-1 text-12 "
          />
        </div>
        {data?.data.user.lastLogin && (
          <div className="flex items-center flex-col gap-2   text-12">
            <p>آخرین بازدید : </p>
            <span>{convertDate(data?.data.user.lastLogin)}</span>
          </div>
        )}
      </div>
      <UserInformation
        user={data?.data.user}
        isPending={isPending}
        error={error}
      />
      <div className="gap-2 grid grid-cols-1 lg:grid-cols-2  items-start">
        <Projects
          projects={data?.data.projects}
          isPending={isPending}
          error={error}
        />
        <Reports
          reports={data?.data.reports}
          isPending={isPending}
          error={error}
        />
      </div>
    </section>
  );
};

export default UserPage;
