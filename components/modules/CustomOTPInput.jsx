import InputOTP from "antd/es/input/OTP";
import React, { useEffect, useRef } from "react";

function CustomOTPInput({ changeOtp }) {
  const inputs = useRef();

  useEffect(() => {
    Array.from(inputs.current?.nativeElement?.children).map((input) =>
      input.setAttribute("type", "number"),
    );
  }, []);

  return (
    <InputOTP
      ref={inputs}
      length={4}
      onChange={(e) => changeOtp(e)}
      autoFocus
      dir="ltr"
    />
  );
}

export default CustomOTPInput;
