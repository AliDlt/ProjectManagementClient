import React from "react";
import useUser from "../hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";
import InformationBox from "../components/ui/user/InformationBox";
import CustomLoading from "../components/modules/CustomLoading";
import PasswordBox from "../components/ui/setting/PasswordBox";

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
      <div className="w-full col-span-1 flex flex-col gap-4 lg:col-span-7 lg:grid lg:grid-cols-2">
        <div>
          {user?.name && (
            <InformationBox
              userId={user?._id}
              title="نام و نام خانوادگی"
              type="name"
            >
              {user?.name}
            </InformationBox>
          )}
        </div>
        <div>
          {user?.username && (
            <InformationBox
              userId={user?._id}
              title="نام کاربری"
              type="username"
            >
              {user?.username}
            </InformationBox>
          )}
        </div>
        <div>
          <PasswordBox
            title="رمز عبور جدید"
            type="password"
            userId={user?._id}
            placeholder="پسورد جدید"
            phoneNumber={user?.phoneNumber}
          >
            {" "}
          </PasswordBox>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
