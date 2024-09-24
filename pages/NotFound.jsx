import React from "react";
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import NotFoundSvg from "../public/images/404";
import CustomLoading from "../components/modules/CustomLoading";

function NotFound() {
  const { user, isLoading } = useUser();

  return (
    <section className="h-screen flex flex-col items-center justify-center gap-10 sm:p-10">
      <NotFoundSvg />
      <div className="text-center flex flex-col gap-5">
        <p className="lg:text-20">صفحه مورد نظر یافت نشد</p>
        {isLoading && (
          <div className="px-2 py-1">
            <CustomLoading size={26} className=" p-0" />
          </div>
        )}
        {!isLoading && !user && (
          <Link
            to="/auth/login"
            replace
            className="px-2 py-1 bg-white border-2 border-custom-primary-color rounded-custom hover:bg-custom-primary-color hover:text-white"
          >
            صفحه ورود به سمپ
          </Link>
        )}
        {!isLoading && user && user.userRole !== 3 && (
          <Link
            to="/dashboard"
            replace
            className="px-2 py-1 bg-white border-2 border-custom-primary-color rounded-custom hover:bg-custom-primary-color hover:text-white"
          >
            صفحه داشبورد
          </Link>
        )}
        {!isLoading && user && user.userRole === 3 && (
          <Link
            to="/applicants"
            replace
            className="px-2 py-1 bg-white border-2 border-custom-primary-color rounded-custom hover:bg-custom-primary-color hover:text-white"
          >
            صفحه متقاضیان
          </Link>
        )}
      </div>
    </section>
  );
}

export default NotFound;
