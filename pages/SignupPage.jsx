import React from "react";
import CustomInput from "../components/modules/CustomInput";
import CustomPasswordInput from "../components/modules/CustomPasswordInput";
import CustomButton from "../components/modules/CustomButton";

function SignupPage() {
  return (
    <div className="px-8 w-full mt-10 py-10">
      <h1 className="text-32">ثبت نام </h1>
      <div className="flex flex-col gap-7 px-2 mt-10">
        <CustomInput
          className="h-[60px] px-5"
          placeholder="نام و نام خانوادگی"
        />
        <CustomInput className="h-[60px] px-5" placeholder="نام کاربری " />
        <CustomInput className="h-[60px] px-5" placeholder="شماره موبایل" />
        <CustomPasswordInput className="h-[60px] px-5" placeholder="رمز عبور" />
        <CustomPasswordInput
          className="h-[60px] px-5"
          placeholder="تکرار رمز عبور"
        />
        <CustomButton className="h-[60px] w-48 mx-auto text-24 ">
          <span className="text-white">ثبت نام</span>
        </CustomButton>
      </div>
    </div>
  );
}

export default SignupPage;
