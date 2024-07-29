import React, { useRef, useState } from "react";
import CustomInput from "../components/modules/CustomInput";
import CustomButton from "../components/modules/CustomButton";
import { get, useForm } from "react-hook-form";
import { forgetPasswordSchema } from "../yup/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ForgetPasswordForm from "../components/ui/auth/ForgetPasswordForm";
import OTPForm from "../components/ui/auth/OTPForm";

const ForgetPasswordPage = () => {
  const [step, setStep] = useState(1);
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

  const otpVerify = async () => {

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
          onSubmitOTP={otpVerify}
        />
      );
      break;

    default:
      break;
  }
};

export default ForgetPasswordPage;
