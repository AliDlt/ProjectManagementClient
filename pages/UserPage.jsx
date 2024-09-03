import React, { useEffect } from "react";
import UserInformation from "../components/ui/user/UserInformation";
import Projects from "../components/ui/user/Projects";
import Reports from "../components/ui/user/Reports";
import { Navigate, useParams } from "react-router-dom";
import useUserName from "../hooks/useUserName";
import StatusBadge from "../components/modules/StatusBadge";
import { convertToLocalDate } from "../utils/tools";
import { useToast } from "../Context/ToastContext";
import { IoRepeatOutline } from "react-icons/io5";
import CustomButton from "../components/modules/CustomButton";
import useUpdateUser from "../hooks/useUpdateUser";
import { useQueryClient } from "@tanstack/react-query";
import useUser from "../hooks/useUser";
import dayjs from "dayjs";

const UserPage = () => {
  const { id } = useParams();
  const toast = useToast();
  const { data, isPending, error } = useUserName(id);
  console.log(data);

  const { user, isLoading } = useUser(id);
  console.log(user);
  const { mutate, isPending: loading } = useUpdateUser();

  if (error) {
    toast(error.response.data.message, "error");
    console.log(error);
    return <Navigate to="/users" />;
  }
  const queryClient = useQueryClient();
  const changedStatus = (e) => {
    toast(e.message, "success");
    queryClient.invalidateQueries("username", id);
  };
  const changeStatus = () => {
    mutate(
      {
        id,
        data: { id: id, active: !data.data.user.active },
      },
      { onError: (e) => console.log(e), onSuccess: changedStatus },
    );
  };
  console.log();
  return (
    <section className="container p-4  flex flex-col  grid-cols-1 gap-10 lg:gap-5 lg:p-0   lg:col-span-9 2xl:col-span-10">
      <div className="flex justify-between ">
        <div>
          <h3 className="text-24 font-bold mb-3 px-2">اطلاعات کاربر</h3>
          <div className="flex items-center gap-2">
            <StatusBadge
              status={data?.data.user.active}
              className="p-1 text-12 "
            />
            {user?.userRole === 0 && (
              <CustomButton
                loading={loading}
                onClick={changeStatus}
                className="text-12 font-bold flex  items-center gap-2  text-white bg-custom-primary-color px-3 py-1 rounded-xl"
              >
                <IoRepeatOutline className="text-16" />
                تغیر وضعیت
              </CustomButton>
            )}
          </div>
        </div>
        {data?.data.user.lastLogin && (
          <div className="flex items-center flex-col gap-2   text-12">
            <p>آخرین بازدید : </p>
            {console.log(data?.data.user.lastLogin)}
            <span>{convertToLocalDate(dayjs(data?.data.user.lastLogin))}</span>
          </div>
        )}
      </div>
      <UserInformation
        userRole={user?.userRole}
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
