import React from "react";
import Logo from "../components/ui/Logo/Logo";
import CustomInput from "../components/modules/CustomInput";
import CustomButton from "../components/modules/CustomButton";

const LoginPage = () => {
  return (
    <section className="flex font-estedad justify-center items-center w-full min-h-screen h-full">
      <div className="w-4/5 flex flex-col justify-evenly md:justify-center md:gap-10 gap-10 md:p-24 md:shadow-custom md:w-3/4 lg:w-3/4 xl:w-2/4 rounded-custom">
        <div className="flex flex-col gap-8 justify-start md:w-2/3 md:mx-auto">
          <Logo />
          <h3 className="lg:text-2xl">به سمپ خوش آمدید</h3>
          <form className="flex flex-col gap-6">
            {/* Phone number */}
            <CustomInput
              className="md:text-2xl p-4"
              placeholder="شماره موبایل"
            />
            {/* Password */}
            <CustomInput className="md:text-2xl p-4" placeholder="رمز عبور" />
            {/* Remember and reset password */}
            <div className="flex gap-2 justify-between items-center text-10">
              {/* Reset password */}
              <p className="text-base">رمز عبور خود را فراموش کردید؟</p>
              {/* Remember me */}
              <div className="flex gap-1 text-base">
                <label htmlFor="rememberMe">مرا به خاطر بسپار</label>
                <input id="rememberMe" type="checkbox" />
              </div>
            </div>
            {/* Submit button */}
            <div className="flex items-center justify-center">
              <CustomButton className="w-2/5 text-lg">ورود</CustomButton>
            </div>
          </form>
        </div>
        <div className="text-center text-sm md:text-lg lg:text-2xl mt-7">
          <span>حساب کاربری ندارید؟</span>
          <span className="text-custom-primary-color mr-1">ثبت نام</span>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
