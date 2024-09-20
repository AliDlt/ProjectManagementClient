import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { addTicket } from "../yup/yup";
import CustomInput from "../components/modules/CustomInput";
import CustomTextAria from "../components/modules/CustomTextAria";
import CustomButton from "../components/modules/CustomButton";
import { MdAdd } from "react-icons/md";
import CustomModal from "../components/modules/CustomModal";
import AddUsers from "../components/ui/AddMessage/AddUsers";
import useAddTicket from "../hooks/Message/useAddTicket";
import { useToast } from "../Context/ToastContext";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/modules/BackButton";

const AddMessage = () => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(addTicket),
  });
  const { mutate, isPending } = useAddTicket();
  const toast = useToast();
  const navigate = useNavigate();
  const setUser = (e) => {
    setValue("assignedTo", e);
    delete errors.assignedTo;
    showAddUser(false);
  };

  const successAdd = (e) => {
    toast(e.message, "success");
    navigate(`/message/${e.data._id}`);
  };
  const addMessage = (e) => {
    mutate(
      { title: e.name, content: e.content, assignedTo: e.assignedTo._id },
      {
        onSuccess: successAdd,
        onError: (e) => {
          console.log(e);
        },
      },
    );
  };
  const [addUser, showAddUser] = useState(false);
  return (
    <div className="container-grid ">
      <div className="col-span-1 lg:col-span-8">
        <div className="my-3">
          <BackButton />
        </div>
        <h3 className="mb-4 text-24 font-bold">ارسال پیام جدید</h3>
        <div className="my-4">
          <CustomButton onClick={() => showAddUser(true)}>
            <span>
              {getValues()?.assignedTo
                ? getValues()?.assignedTo.name
                : "افزودن کاربر"}
            </span>
            <span>
              <MdAdd />
            </span>
          </CustomButton>
          {errors.assignedTo && (
            <p className="my-4 text-red-500">
              {" "}
              یک کاربر را برای ارسال پیام انخاب کنید{" "}
            </p>
          )}
        </div>
        <form
          onSubmit={handleSubmit(addMessage)}
          className=" flex flex-col gap-3"
        >
          <div className="flex flex-col gap-3">
            <label className="pr-2"> عنوان پیام </label>
            <CustomInput
              className="p-2"
              error={errors.name}
              control={control}
              name={"name"}
              placeholder={"عنوان پیام"}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="pr-2">متن پیام</label>
            <CustomTextAria
              error={errors.content}
              control={control}
              name={"content"}
              rows={5}
              placeholder={"متن پیام را وارد کنید"}
              className="p-2"
            />
          </div>
          <div>
            <CustomButton loading={isPending} type="submit">
              {" "}
              ارسال پیام{" "}
            </CustomButton>
          </div>
        </form>
      </div>
      <CustomModal
        onCancel={showAddUser}
        title="کاربر مد نظر را انتخاب کنید"
        open={addUser}
      >
        <AddUsers setUser={setUser} />
      </CustomModal>
    </div>
  );
};

export default AddMessage;
