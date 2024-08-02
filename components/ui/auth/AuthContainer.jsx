import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useUser from "../../../hooks/useUser";

function AuthContainer() {
  const { isLoading, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) navigate("/", { replace: true });
  }, [isLoading, user]);

  return (
    <section className="min-h-svh relative flex items-center justify-center  ">
      <img
        className="absolute left-0 top-0 w-60 -z-10 xl:w-96"
        src="/images/authImage2.svg"
        alt="auth image"
      />
      <div className="w-full mb-12 md:m-0 md:flex md:items-center md:justify-center md:min-h-[650px] md:py-10">
        <div className=" px-8 py-10 md:w-[30rem] md:mt-0 xl:w-[35rem] md:shadow-custom xl:px-16 xl:py-12 md:rounded-custom h-full">
          <Outlet />
        </div>
      </div>
      <img
        className="absolute right-0 bottom-0 w-44 -z-10 xl:w-80"
        src="/images/authImage.svg"
        alt="auth image"
      />
    </section>
  );
}

export default AuthContainer;
