import React from "react";
import CustomInput from "../components/modules/CustomInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addUserSchema } from "../yup/yup";
import CustomSelectInput from "../components/modules/CustomSelectInput";
import CustomButton from "../components/modules/CustomButton";
import CustomPasswordInput from "../components/modules/CustomPasswordInput";
import useAddUser from "../hooks/useAddUser";
import { useToast } from "../Context/ToastContext";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(addUserSchema) });

  const userRol = [
    { name: "مدیریت کل", id: 0 },
    { name: "سر پرست پروژه", id: 1 },
    { name: "ناظر پروژه", id: 2 },
  ];

  const toast = useToast();
  const { mutate, isPending } = useAddUser();
  const navigate = useNavigate();
  const successAddUser = (res) => {
    toast(res.message, "success");
    navigate(`/users/${res.data._id}`);
  };
  const errorAddUser = (res) => {
    toast(res.response.data.message, "error");
  };

  const submitUser = (e) => {
    mutate(e, {
      onSuccess: successAddUser,
      onError: errorAddUser,
    });
  };
  return (
    <div className="container-grid">
      <div className="col-span-1 flex flex-col gap-5 lg:col-span-11">
        <h4 className="text-24 font-bold">افزودن کاربر</h4>
        <form
          onSubmit={handleSubmit(submitUser)}
          className="flex flex-col gap-5 lg:grid grid-cols-2  "
        >
          <CustomInput
            control={control}
            placeholder={"نام و نام خانوادگی"}
            className="p-3"
            name="name"
            error={errors["name"]}
          />
          <CustomInput
            control={control}
            placeholder={"نام کاربری"}
            className="p-3"
            name="username"
            error={errors["username"]}
          />
          <CustomInput
            control={control}
            placeholder={"کد ملی"}
            className="p-3"
            name="nationalCode"
            error={errors["nationalCode"]}
          />
          <CustomInput
            control={control}
            placeholder={"شماره همراه"}
            className="p-3"
            name="phoneNumber"
            error={errors["phoneNumber"]}
          />
          <CustomPasswordInput
            control={control}
            placeholder={"رمز عبور"}
            className="p-3"
            name="password"
            error={errors["password"]}
          />
          <CustomSelectInput
            options={userRol}
            control={control}
            placeholder={"نقش کاربری"}
            className="py-6"
            name="userRole"
            error={errors["userRole"]}
          />
          <div>
            <CustomButton loading={isPending} type="submit">
              ثبت کاربر
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
