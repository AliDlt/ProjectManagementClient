import React from "react";
import CustomTextAria from "../../modules/CustomTextAria";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { messageSchema } from "../../../yup/yup";
import CustomButton from "../../modules/CustomButton";
import { VscSend } from "react-icons/vsc";
import useSendMessage from "../../../hooks/Message/useSendMessage";
import { useParams } from "react-router-dom";
import { useToast } from "../../../Context/ToastContext";
import { useQueryClient } from "@tanstack/react-query";

const NewMessage = ({ addMessage }) => {
  const { id } = useParams();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(messageSchema) });
  const { mutate, error, isPending } = useSendMessage();
  const toast = useToast();
  const successMessage = (e) => {
    toast("پیام با موفقیت ارسال شد", "success");
    setValue("messageText", "");
    addMessage(e);
  };
  const errorSendMessage = (e)=>{
    toast(e.response.data.message)
  }
  const submitMessage = (e) => {
    mutate(
      { id: id, content: { content: e.messageText } },
      { onError:  errorSendMessage, onSuccess: successMessage },
    );
  };
  return (
    <div className="  flex flex-col gap-3 mt-4 sticky bottom-0 w-full  left-0 justify-self-end   ">
      <form
        onSubmit={handleSubmit(submitMessage)}
        className="flex w-full gap-2 border-t-2 px-2  border-b-2 bg-white border-custom-primary-color lg:border-4 lg:rounded-custom"
      >
        <div className="flex items-center justify-center">
          <CustomButton
            loading={isPending}
            type="submit"
          >
            <VscSend />
          </CustomButton>
        </div>
        <div className="w-full">
          <CustomTextAria
            placeholder="پیام خود را بنوسید ..."
            className="border-none outline-none mt-6"
            control={control}
            rows={2}
            name="messageText"
            error={errors["messageText"]}
          />
        </div>
        
      </form>
    </div>
  );
};

export default NewMessage;
