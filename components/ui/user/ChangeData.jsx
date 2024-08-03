import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import React from "react";
import { useForm } from "react-hook-form";
import { IoCloseSharp } from "react-icons/io5";
import { signupSchema } from "../../../yup/yup";
import CustomInput from "../../modules/CustomInput";
import CustomButton from "../../modules/CustomButton";
import { useParams } from "react-router-dom";
import useUpdateUser from "../../../hooks/useUpdateUser";
import { useToast } from "../../../Context/ToastContext";
import { useQueryClient } from "@tanstack/react-query";

const ChangeData = ({ type, value, setShow, title }) => {
  // Create a schema for the specific type
  const fieldSchema = yup.object({
    [type]: signupSchema.fields[type],
  });
  const toast = useToast();
  const queryClient = useQueryClient();

  const success = (data) => {
    toast(data.message, "success");
    queryClient.invalidateQueries("user", id);
    setShow(false);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { [type]: value },
    resolver: yupResolver(fieldSchema),
  });
  const { id } = useParams();
  const { mutate, isPending } = useUpdateUser();

  const updateData = (data) => {
    mutate({ data, id }, { onSuccess: success });
  };

  return (
    <div>
      <div className="flex justify-between items-center text-xl border-b pb-3 border-black border-opacity-55">
        <h3>ثبت اطلاعات کاربری</h3>
        <span className="text-custom-primary-color text-24" onClick={setShow}>
          <IoCloseSharp />
        </span>
      </div>

      <div className="mt-8">
        <form
          onSubmit={handleSubmit(updateData)}
          className="flex gap-4 flex-col "
        >
          <span className="pr-2">{title}</span>
          <CustomInput
            className="p-2"
            placeholder={title}
            control={control}
            error={errors}
            name={type}
          />
          <div>
            <CustomButton loading={isPending} type="submit">
              ثبت تغیرات
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeData;
