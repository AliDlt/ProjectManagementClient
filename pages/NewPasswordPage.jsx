import React from "react";
import CustomButton from "../components/modules/CustomButton";
import CustomPasswordInput from "../components/modules/CustomPasswordInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgetPasswordSchema } from "../yup/yup";

const NewPasswordPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(forgetPasswordSchema),
  });

  const confirmResetPassword = (e) => {};

  return (
    <section className="flex  flex-col w-4/5 justify-center h-screen   items-center">
      <div className="w-full md:shadow-custom p-8 rounded-custom md:w-2/3 lg:w1/2 ">
        <h3 className="mb-10 text-2xl md:text-center md:text-4xl">
          رمز عبور جدید
        </h3>
        <form onSubmit={handleSubmit()} className="flex flex-col gap-8 ">
          <CustomPasswordInput
            control={control}
            name="password"
            placeholder=" رمز عبور جدید"
            className="md:text-2xl p-3"
          />
          <CustomPasswordInput
            placeholder="تکرار رمز عبور جدید"
            className="md:text-2xl p-3"
            name="confirmPassword"
          control={control}
          error={errors}
          />
          <CustomButton className=" p-6 mx-auto rounded-lg text-2xl  ">
            ثبت تغیرات
          </CustomButton>
        </form>
      </div>
    </section>
  );
};

export default NewPasswordPage;
