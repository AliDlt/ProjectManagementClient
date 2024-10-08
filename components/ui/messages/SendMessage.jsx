import React from "react";
import CustomButton from "../../modules/CustomButton";
import CustomTextAria from "../../modules/CustomTextAria";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { messageSchema } from "../../../yup/yup";

const SendMessage = () => {
  const {
    formState: { errors },
    getValues,
    control,
    handleSubmit,
  } = useForm({ mode: "onChange", resolver: yupResolver(messageSchema) });



  return (
    <form className="mt-5" onSubmit={handleSubmit(sendMessage)}>
      <CustomTextAria
        className="border-2 w-full  text-12 p-2 placeholder:text-black"
        placeholder="پیام خود را بنویسید ..."
        rows={7}
        error={errors.messageText}
        name="text"
        control={control}
      />
      <CustomButton className="text-14 mt-2 text-white" type="submit">
        ارسال پیام
      </CustomButton>
    </form>
  );
};

export default SendMessage;
