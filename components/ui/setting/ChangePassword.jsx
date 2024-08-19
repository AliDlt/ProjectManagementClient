import React from "react";
import { changePassword } from "../../../yup/yup";
import useChangePassword from "../../../hooks/useChangePassword";
import CustomPasswordInput from "../../modules/CustomPasswordInput";
import { useToast } from "../../../Context/ToastContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomButton from "../../modules/CustomButton";

const ChangePassword = ({ setShow, title, id, phoneNumber }) => {
  // Create a schema for the specific type

  const toast = useToast();

  const success = (data) => {
    toast(data.data.message, "success");
    setShow(false);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(changePassword),
  });
  const { mutate, isPending } = useChangePassword();

  const updateData = (data) => {
    const newData = { ...data, phoneNumber };
    mutate(
      { ...newData, id },
      {
        onSuccess: success,
        onError: (err) => {
          console.log(err);
        },
      },
    );
  };

  return (
    <div>
      <div className="mt-8">
        <form
          onSubmit={handleSubmit(updateData)}
          className="flex gap-4 flex-col "
        >
          <span className="pr-2">{title}</span>
          <div>
            <CustomPasswordInput
              control={control}
              name="password"
              error={errors["password"]}
              placeholder={"رمز عبور جدید"}
            />
          </div>
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

export default ChangePassword;
