import React, { useContext } from "react";
import CustomButton from "../../modules/CustomButton";
import CustomInput from "../../modules/CustomInput";
import { sendOtpCode } from "../../../services/auth";
import { useToast } from "../../../Context/ToastContext";
import { convertToInternational } from "../../../utils/tools";

const ForgetPasswordForm = ({ formData, setStep, step }) => {
  const { control, handleSubmit, errors } = formData;
  const toast = useToast();
  const submitForgetPassword = async ({ phoneNumber }) => {
    setStep(2);
  };

  return (
    <div className="flex justify-center flex-col items-center gap-8 py-20">
      <h3 className=" text-2xl md:text-3xl  text-center ">
        رمز عبور خود را فراموش کردید؟{" "}
      </h3>
      <p className="w-4/5 md:text-2xl  text-center">
        شماره موبایل خود را برای بازیابی رمز عبور در کادر زیر وارد کنید.{" "}
      </p>
      <form
        onSubmit={handleSubmit(submitForgetPassword)}
        className="w-4/5 flex flex-col gap-8"
      >
        <CustomInput
          control={control}
          error={errors.phoneNumber}
          name="phoneNumber"
          className="md:text-2xl px-3 md:px-5 py-3"
          placeholder="شماره موبایل"
        />
        <CustomButton
          type={"submit"}
          className="w-3/5 rounded-lg m-auto md:p-6 md:text-xl "
        >
          <span className="font-bold md:text-lg">ارسال کد بازیابی </span>
        </CustomButton>
      </form>
    </div>
  );
};

export default ForgetPasswordForm;
