import React from "react";
import CustomInput from "../components/modules/CustomInput";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addUserSchema } from "../yup/yup";
import CustomSelectInput from "../components/modules/CustomSelectInput";
import CustomButton from "../components/modules/CustomButton";
import CustomPasswordInput from "../components/modules/CustomPasswordInput";
import useAddUser from "../hooks/useAddUser";
import { useToast } from "../Context/ToastContext";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/modules/BackButton";
import { Checkbox } from "antd";
import { convertToInternational } from "../utils/tools";

const AddUser = () => {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(addUserSchema) });

  const userRol = [
    { name: "مدیریت کل", id: 0 },
    { name: "سر پرست پروژه", id: 1 },
    { name: "ناظر پروژه", id: 2 },
    { name: "پذیرش", id: 3 },
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

    let copy = { ...e, phoneNumber: convertToInternational(e.phoneNumber) };
    if (!e.isForeign) {
      copy.isForeign = false;
    }
    mutate(copy, {
      onSuccess: successAddUser,
      onError: errorAddUser,
    });
  };
  return (
    <div className="container-grid">
      <div className="col-span-1 flex flex-col gap-5 lg:col-span-11">
        <div>
          <BackButton />
        </div>
        <h4 className="text-24 font-bold">افزودن کاربر</h4>
        <form onSubmit={handleSubmit(submitUser)} className="  ">
          <div className="flex flex-col gap-5 lg:grid grid-cols-2 ">
            <CustomInput
              control={control}
              placeholder={"نام "}
              className="p-3"
              name="name"
              error={errors["name"]}
            />
            <CustomInput
              control={control}
              placeholder={" نام خانوادگی"}
              className="p-3"
              name="surName"
              error={errors["surName"]}
            />
            <CustomInput
              control={control}
              placeholder={"نام کاربری"}
              className="p-3"
              name="username"
              error={errors["username"]}
            />
            {!watch("isForeign") && (
              <CustomInput
                control={control}
                placeholder={"کد ملی"}
                className="p-3"
                name="nationalCode"
                error={errors["nationalCode"]}
              />
            )}
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
          </div>
          <div>
            <Controller
              control={control}
              name="isForeign"
              render={({ field: { value, ...rest } }) => (
                <Checkbox
                  className="text-nowrap text-12 mt-4 md:text-base"
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value}
                  {...rest}
                >
                  اتباع خارجی هستم
                </Checkbox>
              )}
            />
          </div>
          <div className="mt-4">
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
