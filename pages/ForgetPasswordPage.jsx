import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { forgetPasswordSchema } from "../yup/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ForgetPasswordForm from "../components/ui/auth/ForgetPasswordForm";
import OTPForm from "../components/ui/auth/OTPForm";
import { otpVerify } from "../services/auth";
import { useToast } from "../Context/ToastContext";
import NewPasswordPage from "./NewPasswordPage";
import { convertToInternational } from "../utils/tools";
import { Link } from "react-router-dom";

const ForgetPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const otpCode = useRef("");
  const toast = useToast();

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(forgetPasswordSchema),
  });
  const { phoneNumber } = getValues();

  const verifyOtpCode = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await otpVerify({
        otpCode: otpCode.current,
        phoneNumber: convertToInternational(phoneNumber),
      });
      toast(response.message, "success");
      setStep(3);
    } catch (error) {
      console.log(error);
      toast(error.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="flex justify-center items-center flex-col gap-8">
      {step === 1 && (
        <ForgetPasswordForm
          step={step}
          loading={loading}
          setLoading={setLoading}
          setStep={setStep}
          formData={{ control, handleSubmit, errors }}
        />
      )}
      {step === 2 && (
        <OTPForm
          otpCodeRef={otpCode}
          loading={loading}
          phoneNumber={phoneNumber}
          onSubmitOTP={verifyOtpCode}
        />
      )}
      {step === 3 && (
        <NewPasswordPage phoneNumber={convertToInternational(phoneNumber)} />
      )}

      <div className="flex flex-col gap-3 items-center text-18">
        {step > 1 && <span onClick={handleBack}> مرحله قبل </span>}
        <Link to="/auth/login"> بازگشت به صفحه ورود </Link>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
