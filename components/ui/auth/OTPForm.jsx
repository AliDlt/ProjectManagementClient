import React, { useEffect, useState } from "react";
import CustomOTPInput from "../../modules/CustomOTPInput";
import CustomButton from "../../modules/CustomButton";
import { sendOtpCode } from "../../../services/auth";
import { useToast } from "../../../Context/ToastContext";
import { convertToInternational, maskPhoneNumber } from "../../../utils/tools";
import MetaTag from "../../modules/MetaTag";

function OTPForm({ phoneNumber, onSubmitOTP, otpCodeRef, loading }) {
  const toast = useToast();
  const [second, setSecond] = useState(60);
  const [minute, setMinute] = useState(1);

  // Send Code Function
  const sendCode = async (messageToast) => {
    try {
      toast(messageToast, "success");
      await sendOtpCode(convertToInternational(phoneNumber));
      setSecond(60);
      setMinute(1);
    } catch (error) {
      toast(error?.response?.data?.message, "error");
    }
  };

  // Timer
  useEffect(() => {
    let timer = setInterval(() => {
      if (second === 0) {
        setMinute((perv) => perv - 1);
        setSecond(60);
      }

      setSecond((prev) => prev - 1);
    }, 1000);
    second === 0 && minute === 0 && clearInterval(timer);
    return () => {
      clearInterval(timer);
    };
  }, [second, minute]);

  // Send Code
  useEffect(() => {
    sendCode("کد ارسال شد");
  }, []);

  return (
    <form
      onSubmit={onSubmitOTP}
      className="flex flex-col text-center h-full md:justify-evenly"
    >
      <h3 className=" text-24 md:text-32">تایید شماره موبایل</h3>
      <h4 className="mt-8 md:text-20">
        لطفا کد 4 رقمی ارسال شده به شماره &nbsp;
        <span dir="ltr">{phoneNumber}</span>
        &nbsp; را وارد کنید .
      </h4>
      <div className="mt-20">
        <CustomOTPInput changeOtp={(code) => (otpCodeRef.current = code)} />
      </div>
      <div className="mt-10 md:text-16">
        {second === 0 && minute === 0 ? (
          <span
            className="mt-10 md:text-16 cursor-pointer"
            onClick={() => sendCode("کد جدید ارسال شد")}
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
      {/* Meta Tag */}
      <MetaTag title="رمز یکبار مصرف" description="وارد کردن رمز یکبار مصرف" />
    </form>
  );
}

export default OTPForm;
