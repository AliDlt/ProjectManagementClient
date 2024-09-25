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
import MetaTag from "../components/modules/MetaTag";

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
    const { username, password } = values;
    try {
      const { message } = await mutateAsync({
        username: username.trim(),
        password,
      });
      toast(message, "success");
      navigate("/", { replace: true });
    } catch (err) {
      if (err.response.data.message) {
        toast(err.response.data.message, "error");
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center size-44 mx-auto">
        <Logo />
      </div>
      <h3 className="md:text-20 mt-10">به سمپ خوش آمدید</h3>
      <form
        onSubmit={handleSubmit(submitLogin)}
        className="flex flex-col gap-6 mt-3"
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
        <div className="flex gap-2 justify-between items-center text-10 flex-wrap ">
          {/* Reset password */}
          <Link
            to="/auth/forgot-password"
            className="text-12 md:text-base text-nowrap  "
          >
            رمز عبور خود را فراموش کردید؟
          </Link>
          {/* Remember me */}
          <Checkbox className="text-nowrap text-12 md:text-base">
            من را به خاطر بسپار
          </Checkbox>
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
      {/* Meta Tag */}
      <MetaTag title="ورود / سمپ" description="ورود به برنامه مدیریت پروژه" />
    </>
  );
};

export default LoginPage;
