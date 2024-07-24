import React from "react";
import CustomOTPInput from "../../modules/CustomOTPInput";
import CustomButton from "../../modules/CustomButton";

function OTPForm() {
  return (
    <form className="flex flex-col text-center h-full md:justify-evenly">
      <h3 className=" text-24 md:text-32">تایید شماره موبایل</h3>
      <h4 className="mt-8 md:text-20">
        لطفا کد 4 رقمی ارسال شده به شماره 73***** 0936 را وارد کنید .
      </h4>
      <div className="mt-20">
        <CustomOTPInput />
      </div>
      <span className="mt-10 md:text-16">ارسال دوباره کد</span>
      <CustomButton
        className="h-[60px] w-48 mx-auto mt-16 text-20 md:w-56 md:h-[50px] md:mt-5"
        type="submit"
      >
        <span className="text-white ">ثبت نام</span>
      </CustomButton>
    </form>
  );
}

export default OTPForm;
