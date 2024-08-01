import React, { useState } from "react";
import CustomButton from "../components/modules/CustomButton";
import CustomPasswordInput from "../components/modules/CustomPasswordInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "../yup/yup";
import { resetPassword } from "../services/auth";
import { useToast } from "../Context/ToastContext";

const NewPasswordPage = ({ phoneNumber }) => {
  const [loading , setLoading] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(resetPasswordSchema),
  });
  const toast = useToast();
  const confirmResetPassword = async ({ password }) => {
    setLoading(true)
    try {
      const response = await resetPassword({ phoneNumber, password });
      toast(response.message, "success");
    } catch (error) {
      console.log(error);
      toast(error.response.data.message, "error");
    }finally{
      setLoading(false)
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
          error={errors}
          placeholder=" رمز عبور جدید"
          className="md:text-2xl p-3"
        />
        <CustomPasswordInput
          placeholder="تکرار رمز عبور جدید"
          className="md:text-2xl p-3"
          name="passwordConfirmation"
          control={control}
          error={errors}
        />
        <CustomButton
          type="submit"
          className=" p-6 mx-auto rounded-lg text-2xl  "
        >
          ثبت تغیرات
        </CustomButton>
      </form>
    </>
  );
};

export default NewPasswordPage;
