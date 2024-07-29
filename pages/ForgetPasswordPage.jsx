import React, { useRef, useState } from "react";
import CustomInput from "../components/modules/CustomInput";
import CustomButton from "../components/modules/CustomButton";
import { get, useForm } from "react-hook-form";
import { forgetPasswordSchema } from "../yup/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ForgetPasswordForm from "../components/ui/auth/ForgetPasswordForm";
import OTPForm from "../components/ui/auth/OTPForm";
import { otpVerify } from "../services/auth";
import { useToast } from "../Context/ToastContext";
import NewPasswordPage from "./NewPasswordPage";

const ForgetPasswordPage = () => {
  const [step, setStep] = useState(3);
  const [loading, setLoading] = useState(false);
  const otpCode = useRef("");

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(forgetPasswordSchema),
  });
  const toast = useToast();

  const verifyOtpCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await otpVerify(otpCode);
      toast(response.message, "success");
    } catch (error) {
      toast(error.response.data.message, "error");
    }
  };

  const { phoneNumber } = getValues();

  switch (step) {
    case 1:
      return (
        <ForgetPasswordForm
          step={step}
          loading={loading}
          setLoading={setLoading}
          setStep={setStep}
          formData={{ control, handleSubmit, errors }}
        />
      );
    case 2:
      return (
        <OTPForm
          otpCodeRef={otpCode}
          loading={loading}
          phonenumber={phoneNumber}
          onSubmitOTP={verifyOtpCode}
        />
      );
    case 3:
      return (
        <NewPasswordPage phoneNumber = {phoneNumber}  />
      );

    default:
      break;
  }
};

export default ForgetPasswordPage;
