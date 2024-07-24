import React from "react";
import CustomInput from "../components/modules/CustomInput";
import CustomButton from "../components/modules/CustomButton";

const ForgetPasswordPage = () => {
  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div
        className="w-4/5 lg:w-1/2 font-estedad rounded-custom  flex gap-8  justify-center md:gap-12  items-center flex-col text-center
        md:shadow-custom md:h-4/6 
      "
      >
        <h3 className=" text-2xl md:text-3xl ">
          رمز عبور خود را فراموش کردید؟{" "}
        </h3>
        <p className="w-4/5 md:text-2xl">
          شماره موبایل خود را برای بازیابی رمز عبور در کادر زیر وارد کنید.{" "}
        </p>
        <form className="w-4/5 flex flex-col gap-8">
          <CustomInput className="md:text-2xl md:px-5" placeholder="شماره موبایل" />
          <CustomButton className="w-3/5 rounded-lg m-auto md:p-6 md:text-xl ">
            <span className="font-bold md:text-lg">ارسال کد بازیابی </span>
          </CustomButton>
        </form>
      </div>
    </section>
  );
};

export default ForgetPasswordPage;
