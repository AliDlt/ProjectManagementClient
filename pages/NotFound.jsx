import React from "react";
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";

function NotFound() {
  const { user, isLoading } = useUser();

  return (
    <section className="h-screen flex flex-col items-center">
      <img
        src="/images/404.svg"
        alt="not found image"
        className="size-80 lg:size-[500px]"
      />
      <div className="text-center flex flex-col gap-5">
        <p className="lg:text-20">صفحه مورد نظر یافت نشد</p>
        {!isLoading && user ? (
          <Link
            to="/dashboard"
            replace
            className="px-2 py-1 bg-white border-2 border-custom-primary-color rounded-custom hover:bg-custom-primary-color hover:text-white"
          >
            صفحه داشبورد
          </Link>
        ) : (
          <Link
            to="/login"
            replace
            className="px-2 py-1 bg-white border-2 border-custom-primary-color rounded-custom hover:bg-custom-primary-color hover:text-white"
          >
            صفحه ورود به سمپ
          </Link>
        )}
      </div>
    </section>
  );
}

export default NotFound;
