import React, { useState, useEffect } from "react";
import CustomButton from "../../modules/CustomButton";
import { MdDelete, MdEdit, MdModeEdit } from "react-icons/md";
import CustomTextAria from "../../modules/CustomTextAria";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useGetReport from "../../../hooks/useGetReport";
import { addReportSchema, messageSchema } from "../../../yup/yup";
import { Link } from "react-router-dom";
import CustomModal from "../../modules/CustomModal";
import dayjs from "dayjs";
import CustomDatePicker from "../../modules/CustomDatePicker";
import { convertDate, convertToLocalDate } from "../../../utils/tools";
import CustomInput from "../../modules/CustomInput";
import useUpdateReport from "../../../hooks/Report/useUpdateReport";

const ReportBox = ({ data }) => {
  console.log(data);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(addReportSchema),
    defaultValues: {
      description: data?.description,
      project: { id: data?.projectId },
      name: data?.name,
    },
  });
  const handelDatePicker = (date) => {
    console.log(date);
    const newDate = dayjs(date);

    setValue("createAt", newDate);
  };
  const { mutate, isPending } = useUpdateReport();
  console.log(errors);
  const updateReport = (e) => {
    const newData = {
      data: e.createAt,
      description: e.description,
      name: e.name,
      project: data?.projectId,
      id: data?._id,
    };
    console.log(newData);
    mutate(newData, {
      onSuccess: (e) => console.log(e),
      onError: (e) => console.log(e),
    });
    console.log(e);
  };
  const [editor, showEditor] = useState(false);
  return (
    <div>
      <section className="border-2 flex justify-between  bg-white rounded-custom  border-custom-primary-color p-4 md:px-6 md:py-4 ">
        <div>
          <h3>
            {" "}
            <h4> تاریخ : {convertToLocalDate(data?.date)}</h4>
          </h3>
          <div className="flex justify-between">
            <div className=" flex gap-2 items-center">
              <div className="text-10 md:text-16 mt-2 ">
                <span className="font-semibold ">نویسنده : </span>
                <span className="font-semibold"> {data?.createdBy?.name} </span>
              </div>
            </div>
            <div className=" flex gap-2 "></div>
          </div>

          <div className="mt-2 text-10 md:text-16">
            <p>{data?.description}</p>
          </div>
        </div>
        <div>
          <CustomButton
            onClick={() => showEditor(true)}
            className="rounded-full h-10 w-10 p-2 !text-20"
          >
            <MdEdit />
          </CustomButton>
        </div>
        <CustomModal
          onCancel={() => showEditor(false)}
          className="p-4"
          open={editor}
          title="ویرایش گزارش"
        >
          <form
            onSubmit={handleSubmit(updateReport)}
            className="p-2 flex flex-col gap-4 "
          >
            <div>
              <label> عنوان گزارش : </label>
              <CustomInput
                className="p-1 rounded-lg"
                control={control}
                error={errors.name}
                placeholder={"عنوان گزارش ..."}
                name={"name"}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label> متن گزارش : </label>
              <CustomTextAria
                className="rounded-lg resize-y"
                error={errors.description}
                name={"description"}
                placeholder={"متن گزارش ..."}
                control={control}
              />
            </div>
            <div className="flex gap-2 md:items-center flex-col md:flex-row">
              <label> تاریخ گزارش : </label>
              <CustomDatePicker
                error={errors.createAt}
                className="px-2 py-1 rounded-lg"
                placeholder={convertToLocalDate(dayjs(data?.date))}
                changeHandler={handelDatePicker}
                control={control}
                name={"createAt"}
              />
            </div>
            <div>
              <CustomButton type="submit" className="rounded-lg">
                ثبت تغیرات
              </CustomButton>
            </div>
          </form>
        </CustomModal>
      </section>
    </div>
  );
};

export default ReportBox;
