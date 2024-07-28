import React, { useState } from "react";
import CustomInput from "../components/modules/CustomInput";
import CustomButton from "../components/modules/CustomButton";
import { useForm } from "react-hook-form";
import { forgetPasswordSchema } from "../yup/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ForgetPasswordForm from "../components/ui/auth/ForgetPasswordForm";

const ForgetPasswordPage = () => {
  const [step, setStep] = useState();
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(forgetPasswordSchema),
  });

  return (
    <ForgetPasswordForm
      step={step}
      setStep={setStep}
      formData={{ control, handleSubmit, errors }}
    />
  );
};

export default ForgetPasswordPage;
