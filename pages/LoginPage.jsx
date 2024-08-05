import { useState } from "react";
import Logo from "../components/ui/dashboard/Logo";
import CustomInput from "../components/modules/CustomInput";
import CustomButton from "../components/modules/CustomButton";
import CustomPasswordInput from "../components/modules/CustomPasswordInput";
import { Checkbox } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../yup/yup";
import { login } from "../services/auth";
import { useToast } from "../Context/ToastContext";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

const LoginPage = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: login,
  });
  const toast = useToast();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const submitLogin = async (values) => {
    try {
      const { message } = await mutateAsync(values);
      toast(message, "success");
      navigate("/", { replace: true });
    } catch (err) {
      toast(err.response.data.message, "error");
    }
  };

  return (
    <>
      <Logo />
      <h3 className="md:text-20 mt-16">به سمپ خوش آمدید</h3>
      <form
        onSubmit={handleSubmit(submitLogin)}
        className="flex flex-col gap-6 mt-8"
      >
        {/* Phone number */}
        <CustomInput
          control={control}
          error={errors.username}
          name="username"
          className="h-[60px] text-16 px-5 bg-transparent md:text-18"
          placeholder="نام کاربری"
        />
        {/* Password */}
        <CustomPasswordInput
          name="password"
          control={control}
          error={errors.password}
          className="h-[60px] text-16 px-5 bg-transparent md:text-18"
          placeholder="رمز عبور"
        />
        {/* Remember and reset password */}
        <div className="flex gap-2 justify-between items-center text-10">
          {/* Reset password */}
          <Link to="/auth/forgot-password" className="text-base md:text-16">
            رمز عبور خود را فراموش کردید؟
          </Link>
          {/* Remember me */}
          <Checkbox>به خاطر بسپر </Checkbox>
        </div>
        {/* Submit button */}
        <CustomButton
          loading={isPending}
          className="h-[60px] w-48 mx-auto text-20 md:w-56 mt-7"
          type="submit"
        >
          <span className="text-white"> ورود</span>
        </CustomButton>
      </form>
      <div className="text-center text-16 mt-16 md:text-20">
        <span>حساب کاربری ندارید؟</span>
        <Link to="/auth/signup" className="text-custom-primary-color mr-1">
          ثبت نام
        </Link>
      </div>
    </>
  );
};

export default LoginPage;
