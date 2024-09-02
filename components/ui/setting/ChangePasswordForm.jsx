import React from "react";
import CustomPasswordInput from "../../modules/CustomPasswordInput";
import { useForm } from "react-hook-form";
import { changePassword } from "../../../yup/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomOtpRequest from "../../modules/CustomOtpRequest";
import CustomButton from "../../modules/CustomButton";
import useChangePassword from "../../../hooks/useChangePassword";
import useUser from "../../../hooks/useUser";
import { useToast } from "../../../Context/ToastContext";

const ChangePasswordForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(changePassword),
  });
  const toast = useToast();
  const successChangePassword = (e) => {
    toast(e.data.message, "success");
    reset();
  };
  const errorChangePassword = (e) => {
    toast(e.response.data.message, "error");
  };
  const { user } = useUser();
  const { mutate, isPending } = useChangePassword();
  const changePasswordConfirm = (e) => {
    mutate(
      {
        password: e.password,
        confirmPassword: e.passwordConfirmation,
        otpCode: e.otpCode,
        phoneNumber: user.phoneNumber,
      },
      {
        onSuccess: successChangePassword,

        onError: errorChangePassword,
      },
    );
  };
  return (
    <form
      onSubmit={handleSubmit(changePasswordConfirm)}
      className="mt-5 flex flex-col gap-4"
    >
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
        <CustomPasswordInput
          control={control}
          error={errors.password}
          name={"password"}
          placeholder={"رمز عبور جدید"}
        />
        <CustomPasswordInput
          control={control}
          error={errors.passwordConfirmation}
          name={"passwordConfirmation"}
          placeholder={"تکرار رمز عبور جدید "}
        />
        <CustomOtpRequest
          control={control}
          error={errors.otpCode}
          name={"otpCode"}
          placeholder={"ارسال کد اعتبار سنجی "}
        />
      </div>
      <div>
        <CustomButton loading={isPending} type={"submit"}>
          تغییر رمز عبور
        </CustomButton>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
