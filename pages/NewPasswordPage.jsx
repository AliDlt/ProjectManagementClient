import React, { useState } from "react";
import CustomButton from "../components/modules/CustomButton";
import CustomPasswordInput from "../components/modules/CustomPasswordInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "../yup/yup";
import { resetPassword } from "../services/auth";
import { useToast } from "../Context/ToastContext";
import { useNavigate } from "react-router-dom";

const NewPasswordPage = ({ phoneNumber, otpCode }) => {
  const [loading, setLoading] = useState(false);
  console.log(otpCode);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(resetPasswordSchema),
  });
  const navigate = useNavigate()
  const toast = useToast();
  const confirmResetPassword = async ({ password, passwordConfirmation }) => {
    console.log(otpCode.current);
    try {
      const response = await resetPassword({
        phoneNumber,
        password,
        confirmPassword: passwordConfirmation,
        otpCode: otpCode.current,
      })
      toast(response.data.message, "success");
      navigate('/auth/login')
    } catch (error) {

      toast(error.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3 className="mb-10 text-2xl md:text-center md:text-4xl">
        رمز عبور جدید
      </h3>
      <form
        onSubmit={handleSubmit(confirmResetPassword)}
        className="flex flex-col gap-8 "
      >
        <CustomPasswordInput
          control={control}
          name="password"
          error={errors.password}
          placeholder=" رمز عبور جدید"
          className="md:text-2xl p-3"
        />
        <CustomPasswordInput
          placeholder="تکرار رمز عبور جدید"
          className="md:text-2xl p-3"
          name="passwordConfirmation"
          control={control}
          error={errors.passwordConfirmation}
        />
        <CustomButton
          loading={loading}
          type="submit"
          className=" p-6 mx-auto rounded-lg text-2xl  "
        >
          ثبت تغییرات
        </CustomButton>
      </form>
    </>
  );
};

export default NewPasswordPage;
