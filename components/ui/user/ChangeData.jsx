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
import CustomSelectInput from "../../modules/CustomSelectInput";

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
  const role = [
    { name: "ادمین", id: "2" },
    { name: "پیمان کار", id: "1" },
    { name: "ناظر", id: "0" },
  ];
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
      <div className="mt-8">
        <form
          onSubmit={handleSubmit(updateData)}
          className="flex gap-4 flex-col "
        >
          <span className="pr-2">{title}</span>
          {type !== "userRole" ? (
            <>
              <CustomInput
                className="p-2"
                placeholder={title}
                control={control}
                error={errors}
                name={type}
              />
            </>
          ) : (
            <CustomSelectInput
              control={control}
              placeholder={title}
              name={type}
              options={role}
            />
          )}
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