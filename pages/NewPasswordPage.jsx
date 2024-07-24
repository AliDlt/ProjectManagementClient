import React from "react";
import CustomInput from "../components/modules/CustomInput";

const NewPasswordPage = () => {
  return (
    <section className="flex flex-col w-4/5 justify-center h-[50vh]  items-center">
      <div className="w-full">
        <h3>
          رمز عبور جدید
        </h3>
        <form className="flex flex-col gap-8 ">
          <CustomInput placeholder=' رمز عبور جدید' />
          <CustomInput placeholder='تکرار رمز عبور جدید' />
        </form>
      </div>
    </section>
  );
};

export default NewPasswordPage;
