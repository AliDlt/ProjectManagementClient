import InputOTP from "antd/es/input/OTP";
import React from "react";

function CustomOTPInput({ changeOtp }) {
  return (
    <InputOTP length={4} onChange={(e) => changeOtp(e)} autoFocus dir="ltr" />
  );
}

export default CustomOTPInput;
