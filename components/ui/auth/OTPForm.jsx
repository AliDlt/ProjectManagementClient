import React, { useContext, useState } from "react";
import CustomOTPInput from "../../modules/CustomOTPInput";
import CustomButton from "../../modules/CustomButton";
import { maskPhoneNumber } from "../../../utils/tools";
import { sendCode, verify } from "../../../services/auth";
import { ToastMessageContext } from "../../../Context/toast";
import { useNavigate } from "react-router-dom";

function OTPForm({ otpData, loading, setLoading }) {
  // state for handel otp input
  const [otp, setOtp] = useState();
  const navigate = useNavigate();
  // context alert
  const { showToast } = useContext(ToastMessageContext);

  // Handle OTP input change
  const handleOtpInput = (e) => {
    setOtp(e);
  };

  // Verify OTP code
  const verifyOtpCode = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      phonenumber: otpData.phonenumber,
      otpCode: otp,
    };

    try {
      // verify otp code
      const response = await verify(data);
      // show success
      showToast(response.data.message, "success");
    } catch (error) {
      // show error
      showToast(error.response.data.message, "error");
    } finally {
      // stop loading
      setLoading(false);
      // navigate Login
      navigate("/auth/login");
    }
  };

  return (
    <form
      onSubmit={verifyOtpCode}
      className="flex flex-col text-center h-full md:justify-evenly"
    >
      <h3 className="text-24 md:text-32">تایید شماره موبایل</h3>
      <h4 className="mt-8 md:text-20">
        {/* Set phone number and mask phone number */}
        لطفا کد 4 رقمی ارسال شده به شماره{" "}
        {otpData.phonenumber && maskPhoneNumber(otpData.phonenumber)} را وارد
        کنید .
      </h4>
      <div className="mt-20">
        <CustomOTPInput changeOtp={handleOtpInput} />
      </div>
      {/* send again code  */}
      <span
        onClick={() => {
          sendCode(otpData.phonenumber);
        }}
        className="mt-10 md:text-16"
      >
        ارسال دوباره کد
      </span>
      <CustomButton
        loading={loading}
        className="h-[60px] w-48 mx-auto mt-16 text-20 md:w-56 md:h-[50px] md:mt-5"
        type="submit"
      >
        <span className="text-white">ثبت نام</span>
      </CustomButton>
    </form>
  );
}

export default OTPForm;
