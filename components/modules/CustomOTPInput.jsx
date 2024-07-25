import InputOTP from "antd/es/input/OTP";
import React from "react";

function CustomOTPInput({ onChange }) {
  return <InputOTP length={4} autoFocus dir="ltr" onChange={onChange} />;
}

export default CustomOTPInput;
