import React, { useEffect, useState } from "react";
import CustomOTPInput from "../../modules/CustomOTPInput";
import CustomButton from "../../modules/CustomButton";
import { resendOtpCode } from "../../../services/auth";
import toast from "react-hot-toast";

function OTPForm({ phonenumber, onSubmitOTP, otpCodeRef, loading }) {
  const [second, setSecond] = useState(60);
  const [minute, setMinute] = useState(1);

  // Timer For Resend OTP Code
  useEffect(() => {
    let timer = setInterval(() => {
      if (second === 0) {
        setMinute((perv) => perv - 1);
        setSecond(RESEND_SECOND_TIME);
      }

      setSecond((prev) => prev - 1);
    }, 1000);
    second === 0 && minute === 0 && clearInterval(timer);
    return () => {
      clearInterval(timer);
    };
  }, [second, minute]);

  // Resend OnClick
  const resendCodeOnClick = async () => {
    try {
      await resendOtpCode(phonenumber);
      toast.success("کد جدید ارسال شد");
      setSecond(60);
      setMinute(1);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitOTP}
      className="flex flex-col text-center h-full md:justify-evenly"
    >
      <h3 className=" text-24 md:text-32">تایید شماره موبایل</h3>
      <h4 className="mt-8 md:text-20">
        لطفا کد 4 رقمی ارسال شده به شماره &nbsp;
        <span dir="ltr">
          {phonenumber.replace(/(\d{4})(\d{5})(\d*)/, `$1*****$3`)}
        </span>
        &nbsp; را وارد کنید .
      </h4>
      <div className="mt-20">
        <CustomOTPInput onChange={(code) => (otpCodeRef.current = code)} />
      </div>
      <div className="mt-10 md:text-16">
        {second === 0 && minute === 0 ? (
          <span
            className="mt-10 md:text-16 cursor-pointer"
            onClick={resendCodeOnClick}
          >
            ارسال دوباره کد
          </span>
        ) : (
          <>
            <span>
              {second.toString().padStart(2, "0")} : 0{minute}
            </span>
            <span className="text-pack-studio-gray-30 mr-2 ">
              ثانیه تا ارسال مجدد کد تایید
            </span>
          </>
        )}
      </div>
      <CustomButton
        className="h-[60px] w-48 mx-auto mt-16 text-20 md:w-56 md:h-[50px] md:mt-10"
        type="submit"
        loading={loading}
      >
        <span className="text-white ">ثبت نام</span>
      </CustomButton>
    </form>
  );
}

export default OTPForm;
