import React from "react";
import Logo from "../components/ui/Logo/Logo";
import CustomInput from "../components/modules/CustomInput";
import CustomButton from "../components/modules/CustomButton";
import CustomPasswordInput from "../components/modules/CustomPasswordInput";
import { Checkbox } from "antd";

const LoginPage = () => {
  return (
    <>
      <Logo />
      <h3 className="md:text-20 mt-16">به سمپ خوش آمدید</h3>
      <form className="flex flex-col gap-6 mt-8">
        {/* Phone number */}
        <CustomInput
          // error={errors}
          name="phonenumber"
          // control={control}
          className="h-[60px] text-16 px-5 bg-transparent md:text-18"
          placeholder="شماره موبایل"
        />
        {/* Password */}
        <CustomPasswordInput
          name="password"
          // control={control}
          className="h-[60px] text-16 px-5 bg-transparent md:text-18"
          placeholder="رمز عبور"
        />
        {/* Remember and reset password */}
        <div className="flex gap-2 justify-between items-center text-10">
          {/* Reset password */}
          <p className="text-base md:text-16">رمز عبور خود را فراموش کردید؟</p>
          {/* Remember me */}
          <Checkbox>به خاطر بسپر </Checkbox>
        </div>
        {/* Submit button */}
        <CustomButton
          className="h-[60px] w-48 mx-auto text-20 md:w-56 mt-7"
          type="submit"
        >
          <span className="text-white"> ورود</span>
        </CustomButton>
      </form>
      <div className="text-center text-16 mt-16 md:text-20">
        <span>حساب کاربری ندارید؟</span>
        <span className="text-custom-primary-color mr-1">ثبت نام</span>
      </div>
    </>
  );
};

export default LoginPage;
