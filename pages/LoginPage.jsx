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

const LoginPage = () => {
  const toast  = useToast();
  const [loading, setLoading] = useState(false);

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
    // const { username, password } = values;
    setLoading(true);
    try {
      const response = await login(values);
      toast(response.message, "success");
      console.log(response);
    } catch (err) {
      console.log(err);
      toast(err.response.data.message, "error");
    } finally {
      setLoading(false);
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
          error={errors}
          // error={errors}
          name="username"
          // control={control}
          className="h-[60px] text-16 px-5 bg-transparent md:text-18"
          placeholder="نام کاربری"
        />
        {/* Password */}
        <CustomPasswordInput
          name="password"
          control={control}
          error={errors}
          // control={control}
          className="h-[60px] text-16 px-5 bg-transparent md:text-18"
          placeholder="رمز عبور"
        />
        {/* Remember and reset password */}
        <div className="flex gap-2 justify-between items-center text-10">
          {/* Reset password */}
          <p className="text-base md:text-16">رمز عبور خود را فراموش کردید؟</p>
          {/* Remember me */}
          <Checkbox>به خاطر بسپر </Checkbox>
        </div>
        {/* Submit button */}
        <CustomButton
          loading={loading}
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
