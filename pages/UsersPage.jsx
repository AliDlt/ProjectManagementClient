import { useEffect } from "react";
import useUsers from "../hooks/useUsers";
import UsersFilter from "../components/ui/users/UsersFilter";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserRoleFilter from "../components/ui/users/UserRoleFilter";
import useUser from "../hooks/useUser";
import { useToast } from "../Context/ToastContext";

import UsersPageTable from "../components/ui/users/UsersPageTable";
import MetaTag from "../components/modules/MetaTag";

export default function UsersPage() {
  const [searchParams] = useSearchParams();
  const userRole = searchParams.get("userRole") || "1";
  const userSeach = searchParams.get("search") || "";
  const userSort = searchParams.get("sort") || "";
  const { users, isLoading } = useUsers(userRole, "", "", userSeach, userSort);
  const { user, isLoading: userLoading } = useUser();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (!userLoading && user && user.userRole === 2) {
      navigate("/", { replace: true });
      toast("شما به این صفحه دسترسی ندارید .", "error");
    }
  }, [userLoading, user]);

  return (
    <div className="container flex flex-col gap-10 col-span-1 lg:col-span-9 2xl:col-span-10 lg:flex-row-reverse">
      <div className="flex items-center gap-3 flex-wrap lg:hidden">
        <h3 className="text-24">لیست کاربران</h3>
        <UserRoleFilter />
      </div>
      {/* Filter */}
      <div className="flex flex-col gap-5 ">
        <h3 className="text-16 lg:col-span-3 hidden lg:block py-1">
          مرتب سازی بر اساس
        </h3>
        <UsersFilter />
      </div>
      {/* Table */}
      <div className="flex-1 flex flex-col gap-5 ">
        <div className="lg:flex lg:items-center lg:gap-3 hidden">
          <h3 className="text-16">لیست کاربران</h3>
          <UserRoleFilter />
        </div>
        <div className="lg:bg-white lg:rounded-custom lg:py-8 lg:shadow-custom lg:border-b-4 lg:border-custom-primary-color-300 lg:w-[25rem] xl:w-auto ">
          <UsersPageTable users={users} loading={isLoading} />
        </div>
      </div>
      {/* Meta Tag */}
      <MetaTag
        title="لیست کاربران"
        description="لیست همه کاربران ( مدیر ، پیمانکار ، ناظر )"
      />
    </div>
  );
}
