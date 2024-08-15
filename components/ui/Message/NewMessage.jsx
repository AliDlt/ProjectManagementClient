import React from "react";
import CustomTextAria from "../../modules/CustomTextAria";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { textAria } from "../../../yup/yup";
import CustomButton from "../../modules/CustomButton";

const NewMessage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(textAria) });
  return (
    <div className="  flex flex-col gap-3">
      <h5 className="font-bold text-20 pr-2">پیام جدید</h5>
      <form className="flex flex-col gap-2">
        <CustomTextAria
          placeholder="پیام خود را بنوسید"
          className="p-3"
          control={control}
          rows={6}
          name="text"
          error={errors["text"]}
        />
        <div>
          <CustomButton className="p-6 ">
            <span className="text-20 text-white font-bold">ارسال پیام</span>
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default NewMessage;
