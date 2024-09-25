import React from "react";
import useUser from "../hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";
import InformationBox from "../components/ui/user/InformationBox";
import CustomLoading from "../components/modules/CustomLoading";
import { userRol } from "../utils/tools";
import ChangePasswordForm from "../components/ui/setting/ChangePasswordForm";

const SettingPage = () => {
  const queryClient = useQueryClient();

  const cachedUser = queryClient.getQueryData(["user"]);

  const { user, isLoading, error } = useUser({ initialData: cachedUser });
  if (isLoading)
    return (
      <div>
        <CustomLoading />
      </div>
    );
  if (error) return <div>Error loading user data</div>;

  return (
    <div className="container-grid">
      <div className="col-span-1 lg:col-span-11">
        <h3 className=" text-32 pr-4 font-bold mb-5">تنظیمات</h3>
        <div className="w-full  flex flex-col gap-4  lg:grid lg:grid-cols-2">
          <div>
            {user?.name && (
              <InformationBox
                userRole={user?.userRole}
                userId={user?._id}
                title="نام "
                type="name"
              >
                {user?.name}
              </InformationBox>
            )}
          </div>
          <div>
            {user?.surName && (
              <InformationBox
                userRole={user?.userRole}
                userId={user?._id}
                title="نام خانوادگی"
                type="surName"
              >
                {user?.surName}
              </InformationBox>
            )}
          </div>
          <div>
            {user?.phoneNumber && (
              <InformationBox
                userRole={user?.userRole}
                userId={user?._id}
                title="شماره موبایل"
                type="surName"
              >
                {user?.phoneNumber}
              </InformationBox>
            )}
          </div>

          <div>
            {!user?.userRol && (
              <InformationBox
                userId={user?._id}
                title="نقش کاربری "
                type="name"
              >
                {userRol(user?.userRole)}
              </InformationBox>
            )}
          </div>
          <div>
            {user?.username && (
              <InformationBox
                userRole={user?.userRole}
                userId={user?._id}
                title="نام کاربری"
                type="username"
              >
                {user?.username}
              </InformationBox>
            )}
          </div>
          <div>
            {user?.nationalCode && (
              <InformationBox
                userRole={user?.userRole}
                userId={user?._id}
                title="کد ملی"
                type="nationalCode"
              >
                {user?.nationalCode}
              </InformationBox>
            )}
          </div>
        </div>
        <div>
          <h5 className="text-20">تعیر رمز عبور</h5>
          <div>
            <ChangePasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
