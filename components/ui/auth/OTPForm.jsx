import React, { useContext, useEffect, useState } from "react";
import CustomOTPInput from "../../modules/CustomOTPInput";
import CustomButton from "../../modules/CustomButton";
import { maskPhoneNumber } from "../../../utils/tools";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { sendOtpCode, verify } from "../../../services/OTP";
import toast from "react-hot-toast";
import { ToastMessageContext } from "../../../Context/toast";

function OTPForm() {

  const location = useLocation();
  // get phone number

  const query = new URLSearchParams(location.search);
  const phoneNumberQuery = query.get("phoneNumber");
  const { showToast } = useContext(ToastMessageContext);
  const [otp, setOtp] = useState();

  async function sendCode() {
    try {
      const response = await sendOtpCode({ phonenumber: phoneNumberQuery });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  
  const handelOtpInput = (e) => {
    setOtp(e);
  };
  const verifyOtpCode = async (e) => {
    e.preventDefault();
    const data = {
      phonenumber: phoneNumberQuery,
      otpCode: otp,
    };

    try {
      const response = await verify(data);
      console.log(response);
      showToast(response.data.message, "success");
    } catch (error) {
      showToast(error.response.data.message, "error");
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={verifyOtpCode}
      className="flex flex-col text-center h-full md:justify-evenly"
    >
      <h3 className=" text-24 md:text-32">تایید شماره موبایل</h3>
      <h4 className="mt-8 md:text-20">
        {/* set phone number and maskPhone number */}
        لطفا کد 4 رقمی ارسال شده به شماره{" "}
        {phoneNumberQuery && maskPhoneNumber(phoneNumberQuery)} را وارد کنید .
      </h4>
      <div className="mt-20">
        <CustomOTPInput changeOtp={handelOtpInput} />
      </div>
      <span onClick={sendCode} className="mt-10 md:text-16">ارسال دوباره کد</span>
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
