import { useMutation } from "@tanstack/react-query";
import React from "react";
import { sendOtpCode } from "../services/auth";

const useSendOtpCode = () => {
  return useMutation({
    mutationFn: sendOtpCode,
    mutationKey:'send-otp-code'
  });
};

export default useSendOtpCode;
