import React from "react";
import { Outlet } from "react-router-dom";

function AuthContainer() {
  return (
    <section className="min-h-screen relative flex items-start justify-center">
      <img
        className="absolute left-0 top-0 w-72 -z-10"
        src="/images/authImage2.svg"
        alt="auth image"
      />
      <Outlet />
      <img
        className="absolute right-0 bottom-0 w-48 -z-10"
        src="/images/authImage.svg"
        alt="auth image"
      />
    </section>
  );
}

export default AuthContainer;
