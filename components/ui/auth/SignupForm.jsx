import React, { useState } from "react";
import CustomInput from "../../modules/CustomInput";
import CustomPasswordInput from "../../modules/CustomPasswordInput";
import CustomButton from "../../modules/CustomButton";
import { signup } from "../../../services/auth";
import toast from "react-hot-toast";

function SignupForm({ formData, setStep }) {
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = formData;

  const onSubmitHandler = async (values) => {
    setLoading(true);
    const { name, phonenumber, username, password, nationalCode } = values;
    const userData = {
      name,
      phonenumber,
      username,
      password,
      nationalCode,
      userRole: 2,
    };
    try {
      const data = await signup(userData);
      toast.success(data.message);
      setStep(2);
      console.log(data);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3 className=" text-24 md:text-36 md:text-center">ثبت نام </h3>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col gap-7 px-2 mt-10"
      >
        <CustomInput
          error={errors}
          name="name"
          control={control}
          className="h-[60px] text-16 px-5 bg-transparent md:text-18"
          placeholder="نام و نام خانوادگی"
        />
        <CustomInput
          error={errors}
          name="username"
          control={control}
          className="h-[60px] text-16 px-5 bg-transparent md:text-18"
          placeholder="نام کاربری "
        />
        <CustomInput
          type="tel"
          error={errors}
          name="phonenumber"
          control={control}
          className="h-[60px] text-16 px-5 bg-transparent md:text-18"
          placeholder="شماره موبایل"
        />
        <CustomInput
          type="tel"
          error={errors}
          name="nationalCode"
          control={control}
          className="h-[60px] text-16 px-5 bg-transparent md:text-18"
          placeholder="کد ملی"
        />
        <CustomPasswordInput
          error={errors}
          name="password"
          control={control}
          className="h-[60px] text-16 px-5 bg-transparent md:text-18"
          placeholder="رمز عبور"
        />
        <CustomPasswordInput
          error={errors}
          name="passwordConfirmation"
          control={control}
          className="h-[60px] text-16 px-5 bg-transparent md:text-18"
          placeholder="تکرار رمز عبور"
        />
        <CustomButton
          loading={loading}
          className="h-[60px] w-48 mx-auto text-20 md:w-56  md:mt-5"
          type="submit"
        >
          <span className="text-white">ثبت نام</span>
        </CustomButton>
      </form>
    </>
  );
}

export default SignupForm;