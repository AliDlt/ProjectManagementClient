import React from "react";
import Logo from "../components/ui/Logo/Logo";
import CustomInput from "../components/modules/CustomInput";
import CustomButton from "../components/modules/CustomButton";

const LoginPage = () => {
  return (
    <section className="flex font-estedad justify-center  items-center w-full h-screen">
      <div className="w-4/5 flex flex-col justify-evenly h-full">
        <div className=" flex flex-col gap-8 justify-start">
          <Logo />
          <h3>به سمپ خوش آمدید</h3>
          <form className="flex flex-col gap-6">
            {/* phone number */}
            <CustomInput className="" placeholder="شماره موبایل" />
            {/* password */}
            <CustomInput placeholder="رمز عبور" />
            {/* remember and reset password */}
            <div className="flex gap-2 justify-between items-center text-10">
              {/* reset password */}
              <p>رمز عبور خود را فراموش کردید؟</p>
              {/* remember me */}
              <div className="flex gap-1">
                <label htmlFor="rememberMe">مرا به خاطر بسپار</label>
                <input id="rememberMe" type="checkbox" />
              </div>
            </div>
            {/* submit btn */}
            <div className="flex items-center justify-center">
              <CustomButton className="w-2/5 text-lg">ورود</CustomButton>
            </div>
          </form>
        </div>

        <div className="text-center text-sm">
            <span>حساب کاربری ندارید؟</span>
            <span className="text-custom-primary-color mr-1">ثبت نام </span>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
