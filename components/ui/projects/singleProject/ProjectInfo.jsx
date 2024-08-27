import { Progress, Slider } from "antd";
import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import useUser from "../../../../hooks/useUser";
import { useToast } from "../../../../Context/ToastContext";
import { projectInfoSchema } from "../../../../yup/yup";
import CustomButton from "../../../modules/CustomButton";
import CustomModal from "../../../modules/CustomModal";
import CustomInput from "../../../modules/CustomInput";
import useUpdateProject from "../../../../hooks/projects/useUpdateProject";
import CustomDatePicker from "../../../modules/CustomDatePicker";
import cn from "../../../../utils/cn";
import CustomTextAria from "../../../modules/CustomTextAria";

function ProjectInfo({ projectInfoData }) {
  const { user, isLoading } = useUser();
  const {
    startDate,
    endDate,
    progress,
    _id,
    location,
    createdBy,
    description,
  } = projectInfoData;
  const [open, setOpen] = useState(false);
  const { mutateAsync } = useUpdateProject(_id);
  const toast = useToast();

  const {
    control,
    watch,
    getValues,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      startDate,
      endDate,
      progress,
      location,
      description,
    },
    resolver: yupResolver(projectInfoSchema),
    mode: "onChange",
  });

  // On Submit
  const onSubmit = async (values) => {
    try {
      await mutateAsync({ ...values, id: _id });
      toast("اطلاعات پروژه آپدیت شد", "success");
      setOpen();
    } catch (error) {
      toast(error?.response?.data?.message, "error");
    }
  };

  return (
    <div className="flex flex-col bg-white p-5 border-2 border-custom-primary-color rounded-custom mt-10 relative gap-2 lg:gap-5">
      <div className="flex flex-col sm:flex-row w-full gap-5">
        <Progress
          className={cn([
            "[&_.ant-progress-inner]:!size-20 [&_.ant-progress-inner]:xl:!size-32 [&_.ant-progress-text]:text-custom-primary-color",
          ])}
          strokeLinecap="butt"
          type="circle"
          percent={progress}
          strokeWidth={15}
          strokeColor={"rgb(var(--primary-color))"}
          trailColor={"rgb(var(--primary-color) / 0.2)"}
        />
        <div className=" grid grid-cols-1 min-[470px]:grid-cols-2 text-14 gap-3 sm:grid-cols-2 xl:grid-cols-3 items-center xl:text-16 2xl:gap-x-5 sm:ml-14">
          <div className="flex text-nowrap ">
            <span>تاریخ شروع پروژه : </span>&nbsp;
            <span>{dayjs(startDate).format("YYYY/MM/DD")}</span>
          </div>
          <div className="flex text-nowrap ">
            <span>تاریخ پایان پروژه :</span>&nbsp;
            <span>{dayjs(endDate).format("YYYY/MM/DD")}</span>
          </div>
          <div className="flex flex-1 text-nowrap">
            <span>مدیر پروژه : </span>&nbsp;
            <span>
              {createdBy.name} {createdBy.surName}
            </span>
          </div>
          <div className="flex flex-wrap  flex-1 col-span-full">
            <span>محل پروژه : </span>&nbsp;
            <span>{location}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 lg:order-2 2xl:order-1">
        <span> توضیحات پروژه : </span>&nbsp;
        <span>{description}</span>
      </div>
      {!isLoading && user.userRole !== 2 && (
        <CustomButton
          className=" flex justify-center items-center ring-2 ring-custom-primary-color bg-white rounded-full size-10 p-0 hover:bg-custom-primary-color group absolute top-4 left-4 z-10"
          onClick={() => setOpen(true)}
        >
          <MdModeEdit
            size={25}
            className="text-custom-primary-color rounded-full group-hover:text-white"
          />
        </CustomButton>
      )}
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
                className="px-3 py-1.5"
                control={control}
                name="startDate"
                placeholder="شروع"
                changeHandler={(date) => {
                  if (dayjs(date) > dayjs(getValues("endDate")))
                    setValue("endDate", null);
                }}
              />
            </div>
            <span className="mx-2">تا</span>
            <div className="flex justify-center items-center gap-2">
              <span className="hidden md:block">پایان</span>
              <CustomDatePicker
                className="px-3 py-1.5"
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
          <div className="flex justify-center flex-wrap items-center gap-2 mt-5">
            <span>محل پروژه</span>
            <CustomInput
              containerClassName="flex-1"
              control={control}
              name="location"
              className="px-3 py-1.5"
              placeholder="تهران"
              noErrorMessage
            />
          </div>
          <div className="flex justify-center flex-wrap items-center gap-2 mt-5">
            <span>درصد پیشرفت پروژه</span>
            <CustomInput
              containerClassName="flex-1"
              control={control}
              name="progress"
              className="px-2 py-1.5 w-16"
              placeholder="100"
              type="number"
              icon={"%"}
              error={errors.progress}
              noErrorMessage
            />
          </div>
          <div className="flex flex-col justify-center flex-wrap gap-2 mt-5 ">
            <span>توضیحات پروژه</span>
            <CustomTextAria
              className="flex-1"
              control={control}
              name="description"
              error={errors.description}
              noErrorMessage
            />
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
