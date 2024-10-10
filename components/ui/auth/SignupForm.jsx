import React, { useState } from "react";
import CustomInput from "../../modules/CustomInput";
import CustomPasswordInput from "../../modules/CustomPasswordInput";
import CustomSelectInput from "../../modules/CustomSelectInput";
import CustomButton from "../../modules/CustomButton";
import { checkSignup } from "../../../services/auth";
import { useToast } from "../../../Context/ToastContext";
import { convertToInternational } from "../../../utils/tools";
import { Link } from "react-router-dom";
import MetaTag from "../../modules/MetaTag";
import { Checkbox } from "antd";
import { Controller } from "react-hook-form";
import { IoChevronDown } from "react-icons/io5";

const userRoleOptions = [
  { label: "مدیر کل", value: 0 },
  { label: "سرپرست پروژه", value: 1 },
  { label: "ناظر پروژه", value: 2 },
  { label: "پذیرش", value: 3 },
];

function SignupForm({ formData, setStep }) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = formData;

  const onSubmitHandler = async (values) => {
    setLoading(true);
    const { phoneNumber, username, nationalCode, isForeign } = values;
    const userData = {
      phoneNumber: convertToInternational(phoneNumber),
      username,
      nationalCode,
      isForeign,
    };
    try {
      await checkSignup(userData);
      setStep(2);
    } catch (error) {
      toast(error.response.data.message, "error");
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
          error={errors.name}
          name="name"
          control={control}
          className="h-[60px] text-16 px-5 bg-transparent md:text-18"
          placeholder="نام"
        />
        <CustomInput
          error={errors.surName}
          name="surName"
          control={control}
          className="h-[60px] text-16 px-5 bg-transparent md:text-18"
          placeholder="نام خانوادگی"
        />
        <CustomInput
          error={errors.username}
          name="username"
          control={control}
          className="h-[60px] text-16 px-5 bg-transparent md:text-18"
          placeholder="نام کاربری "
        />
        <CustomInput
          type="tel"
          error={errors.phoneNumber}
          name="phoneNumber"
          control={control}
          className="h-[60px] text-16 px-5 bg-transparent md:text-18"
          placeholder="شماره موبایل"
        />
        {!watch("isForeign") && (
          <CustomInput
            type="tel"
            error={errors.nationalCode}
            name="nationalCode"
            control={control}
            className="h-[60px] text-16 px-5 bg-transparent md:text-18"
            placeholder="کد ملی"
          />
        )}
        <CustomSelectInput
          placeholder="نقش کاربری"
          className="h-[60px] text-16 px-2 bg-custom-body-color md:text-18 placeholder:text-black/50 [&_.ant-select-selection-item]:!text-16 [&_.ant-select-selection-placeholder]:!text-16  [&_.ant-select-selection-placeholder]:text-black/50 [&_.ant-select-selection-placeholder]:md:!text-18 [&_.ant-select-selection-item]:md:!text-18 [&_.ant-select-selection-item]:text-black/50 "
          control={control}
          name="userRole"
          options={userRoleOptions}
          iconSize={20}
          error={errors.userRole}
          suffixIcon={
            <IoChevronDown size={20} className="text-custom-primary-color" />
          }
          popupClassName="!pt-14"
        />
        <CustomPasswordInput
          error={errors.password}
          name="password"
          control={control}
          className="h-[60px] text-16 px-5 bg-transparent md:text-18"
          placeholder="رمز عبور"
        />
        <CustomPasswordInput
          error={errors.passwordConfirmation}
          name="passwordConfirmation"
          control={control}
          className="h-[60px] text-16 px-5 bg-transparent md:text-18"
          placeholder="تکرار رمز عبور"
        />
        <div>
          <Controller
            control={control}
            name="isForeign"
            render={({ field: { value, ...rest } }) => (
              <Checkbox
                className="text-nowrap text-12 md:text-base"
                onChange={(e) => onChange(e.target.checked)}
                checked={value}
                {...rest}
              >
                اتباع خارجی هستم
              </Checkbox>
            )}
          />
        </div>
        <CustomButton
          loading={loading}
          className="h-[60px] w-48 mx-auto text-20 md:w-56  md:mt-5"
          type="submit"
        >
          <span className="text-white">ثبت نام</span>
        </CustomButton>
      </form>
      <div className="flex items-center gap-2 justify-center my-10 text-16  md:text-20">
        <span>حساب کاربری دارید؟</span>
        <Link className="text-custom-primary-color" to="/auth/login">
          وارد شوید
        </Link>
      </div>
      {/* Meta Tag */}
      <MetaTag
        description="ثبت نام در برنامه مدیریت پروژه"
        title="ثبت نام / سمپ"
      />
    </>
  );
}

export default SignupForm;
