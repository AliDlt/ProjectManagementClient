import { Slider } from "antd";
import React, { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import CustomButton from "../../modules/CustomButton";
import CustomModal from "../../modules/CustomModal";
import CustomDatePicker from "../../modules/CustomDatePicker";
import dayjs from "dayjs";
import CustomInput from "../../modules/CustomInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { projectInfoSchema } from "../../../yup/yup";

function ProjectInfo() {
  const [open, setOpen] = useState(false);

  const {
    control,
    watch,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(projectInfoSchema),
    mode: "onChange",
  });

  // On Submit
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="flex flex-wrap bg-white p-5 border-2 border-custom-primary-color rounded-custom mt-10 gap-5 ">
      <div className="grid grid-cols-1 text-14 gap-3 xl:grid-cols-2 xl:gap-x-10 items-center xl:text-16 2xl:gap-x-5 ">
        <div className="flex flex-wrap lg:order-3">
          <span>تاریخ شروع پروژه : </span>
          <span>1400/12/31</span>
        </div>
        <div className="flex flex-wrap lg:order-4">
          <span>تاریخ پایان پروژه :</span>
          <span>1402/12/31</span>
        </div>
        <div className="flex flex-wrap lg:order-1 2xl:order-2">
          <span>محل پروژه : </span>
          <span>تهران</span>
        </div>
        <div className="flex flex-wrap lg:order-2 2xl:order-1">
          <span>مدیر پروژه : </span>
          <span>محمد زمانپور جزی</span>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end gap-8 flex-[1_1_100px] xl:flex-row-reverse xl:justify-start xl:items-center 2xl:gap-28">
        <CustomButton
          className=" flex justify-center items-center ring-2 ring-custom-primary-color bg-white rounded-full size-10 p-0 hover:bg-custom-primary-color group"
          onClick={() => setOpen(true)}
        >
          <MdOutlineEdit
            size={25}
            className="text-custom-primary-color rounded-full group-hover:text-white"
          />
        </CustomButton>
        <div className="w-full flex flex-col gap-2 md:w-72 xl:flex-col-reverse ">
          <Slider
            className="m-0"
            classNames={{
              track: "h-[10px] rounded-tl-full rounded-bl-full",
              rail: "h-[10px] rounded-full",
              handle: "after:bg-custom-secondary-color-300  mt-[3px]",
            }}
            defaultValue={72}
            disabled
            tooltip={{
              className: "ant-slider-tooltip",
              open: true,
              color: "white",
              overlayInnerStyle: {
                color: "rgba(var(--secondary-color))",
                boxShadow: "none",
                border: "1px solid rgba(var(--secondary-color))",
                padding: "4px",
              },
              formatter: (value) => value + "%",
              zIndex: "0",
            }}
          />
          <span className="text-12 mr-auto">درصد پیشرفت پروژه</span>
        </div>
      </div>
      <CustomModal
        title="تغییر اطلاعات پروژه"
        open={open}
        onCancel={() => setOpen(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center mt-5">
            <div className="flex justify-center items-center gap-2">
              <span className="hidden md:block">شروع</span>
              <CustomDatePicker
                control={control}
                name="startDate"
                placeholder="شروع"
              />
            </div>
            <span className="mx-2">تا</span>
            <div className="flex justify-center items-center gap-2">
              <span className="hidden md:block">پایان</span>
              <CustomDatePicker
                control={control}
                name="endDate"
                disabledDate={() => {
                  if (!getValues("startDate")) return true;
                }}
                placeholder="پایان"
                minDate={dayjs(watch("startDate"))}
              />
            </div>
          </div>
          <div className="flex justify-between items-center mt-7">
            <div className="flex justify-center items-center gap-2">
              <span>محل پروژه</span>
              <CustomInput
                control={control}
                name="workPlace"
                className="px-2 py-0.5 w-24 md:w-40"
                placeholder="تهران"
                noErrorMessage
              />
            </div>
            <div className="flex justify-center items-center gap-2">
              <span>درصد پیشرفت پروژه</span>
              <CustomInput
                control={control}
                name="percentage"
                className="px-2 py-0.5 w-16"
                placeholder="100"
                type="number"
                icon={"%"}
                error={errors.percentage}
                noErrorMessage
              />
            </div>
          </div>
          <CustomButton className="mt-7" type="submit">
            ثبت تغییرات
          </CustomButton>
        </form>
      </CustomModal>
    </div>
  );
}

export default ProjectInfo;
