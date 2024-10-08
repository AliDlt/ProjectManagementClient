import InputOTP from "antd/es/input/OTP";
import React, { useEffect, useRef } from "react";

function CustomOTPInput({ changeOtp }) {
  const inputs = useRef();

  useEffect(() => {
    Array.from(inputs.current?.nativeElement?.children).map((input) => {
      input.setAttribute("type", "number");
      input.setAttribute('inputMode','numeric')
    });
  }, []);

  return (
    <InputOTP
      ref={inputs}
      length={4}
      onChange={(e) => changeOtp(e)}
      autoFocus
      type = 'number'
      dir="ltr"
    />
  );
}

export default CustomOTPInput;
