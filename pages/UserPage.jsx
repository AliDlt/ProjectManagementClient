import React, { useState } from "react";
import UserInformation from "../components/ui/user/UserInformation";
import Projects from "../components/ui/user/Projects";
import Reports from "../components/ui/user/Reports";
import { useNavigate, useParams } from "react-router-dom";
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
import BackButton from "../components/modules/BackButton";
import { Empty } from "antd";
import CustomLoading from "../components/modules/CustomLoading";
import CustomConfirm from "../components/modules/CustomConfirm";
import useDeleteUser from "../hooks/user/useDeleteUser";

const UserPage = () => {
  const { id } = useParams();
  const [userDelete, showDeleteUser] = useState(false);
  const toast = useToast();
  const { data, isPending, error } = useUserName(id);
  const navigate = useNavigate("/users");
  const { user, isLoading } = useUser(id);
  const { deleteUserFn, isPending: deleteUserPending } = useDeleteUser();
  const { mutate, isPending: loading } = useUpdateUser();

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
      { onError: (e) => toast(e.response.data.message,'error'), onSuccess: changedStatus },
    );
  };
  const deleteUser = () => {
    deleteUserFn(
      { id },
      {
        onSuccess: () => {
          navigate("/users");
        },
      },
    );
  };
  if (error) {
    return (
      <section className="container p-4  flex flex-col  grid-cols-1 gap-10 lg:gap-5 lg:p-0   lg:col-span-9 2xl:col-span-10">
        <div className="flex items-center justify-center flex-col gap-3  mt-36">
          <Empty description={error.response.data.message} />
          <CustomButton
            onClick={() => {
              navigate("/users");
            }}
          >
            بازگشت به صفحه کاربران
          </CustomButton>
        </div>
      </section>
    );
  }
  if (isPending) {
    return (
      <section className="container p-4  flex flex-col  grid-cols-1 gap-10 lg:gap-5 lg:p-0   lg:col-span-9 2xl:col-span-10">
        <div className="flex items-center justify-center flex-col gap-3  mt-36">
          <CustomLoading />
        </div>
      </section>
    );
  }
  return (
    <section className="container p-4  flex flex-col  grid-cols-1 gap-10 lg:gap-5 lg:p-0   lg:col-span-9 2xl:col-span-10">
      <div>
        <BackButton />
      </div>

      <div className="flex justify-between px-2 lg:items-center ">
        <div>
          <h3 className="text-24 font-bold mb-3 px-2">اطلاعات کاربر</h3>
          <div className="flex lg:items-center gap-2 lg:flex-row flex-col">
            <StatusBadge
              status={data?.data.user.active}
              className="p-1 text-12 "
            />
            {user?.userRole === 0 && (
              <>
                <CustomButton
                  loading={loading || isLoading}
                  onClick={changeStatus}
                  className="text-12 font-bold flex  items-center gap-2  text-white bg-custom-primary-color px-3 py-1 rounded-xl"
                >
                  <IoRepeatOutline className="text-16" />
                  تغییر وضعیت
                </CustomButton>
                <div>
                  <CustomButton
                    onClick={() => showDeleteUser(true)}
                    className="bg-red-500 hover:bg-red-400 transition-all"
                  >
                    حذف کاربر
                  </CustomButton>
                </div>
              </>
            )}
          </div>
        </div>
        {data?.data.user.lastLogin && (
          <div className="flex items-center flex-col gap-2   text-12">
            <p>آخرین بازدید : </p>
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

      {user?.userRole !== (2 || 3) && data?.data.user.userRole !== 3 && (
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
      )}

      <CustomConfirm
        cancelText={"خیر"}
        description={"آیا از حذف کاربر مطمئن هستید ؟ "}
        okText={"بله"}
        open={userDelete}
        onCancel={() => showDeleteUser(false)}
        loading={deleteUserPending}
        okHandler={deleteUser}
        title={"حذف کاربر "}
      />
    </section>
  );
};

export default UserPage;
