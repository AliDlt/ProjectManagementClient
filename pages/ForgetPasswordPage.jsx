import React from "react";
import CustomInput from "../components/modules/CustomInput";
import CustomButton from "../components/modules/CustomButton";

const ForgetPasswordPage = () => {
  return (
    <section className=" font-estedad flex gap-8  justify-center items-center flex-col w-4/5 h-screen text-center ">
      <h3 className=" text-2xl ">رمز عبور خود را فراموش کردید؟ </h3>
      <p className="w-4/5">
        شماره موبایل خود را برای بازیابی رمز عبور در کادر زیر وارد کنید.{" "}
      </p>
      <form className="w-4/5 flex flex-col gap-8">
        <CustomInput placeholder="شماره موبایل" />
        <CustomButton className="w-3/5 rounded-lg m-auto p-6 ">
          <span className="font-bold text-lg">ارسال کد بازیابی{" "}</span>
        </CustomButton>
      </form>
    </section>
  );
};

export default ForgetPasswordPage;
