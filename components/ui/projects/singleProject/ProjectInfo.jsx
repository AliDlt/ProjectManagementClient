import { Progress } from "antd";
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
import Map from "../Map";

function ProjectInfo({ projectInfoData }) {
  const { user, isLoading } = useUser();
  const {
    startDate,
    endDate,
    progress,
    _id,
    address,
    createdBy,
    description,
    longitude,
    latitude,
  } = projectInfoData;
  const [open, setOpen] = useState(false);
  const [openDescriptionModal, setOpenDescriptionModal] = useState(false);
  const [isOpenMapModal, setIsOpenMapModal] = useState(false);
  const { mutateAsync, updateProjectLoading } = useUpdateProject(_id);
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
      address,
      description,
      longitude,
      latitude,
    },
    resolver: yupResolver(projectInfoSchema),
    mode: "onChange",
  });

  // On Submit
  const onSubmit = async (values) => {
    try {
      await mutateAsync({
        ...values,
        id: _id,
      });
      toast("اطلاعات پروژه آپدیت شد", "success");
      setOpen();
    } catch {}
  };

  // Map Handler
  const mapHandler = (position) => {
    setValue("latitude", position?.lat);
    setValue("longitude", position?.lng);
    toast("محل پروژه ثبت شد", "success");
    setIsOpenMapModal(false);
  };

  return (
    <div className="flex flex-col bg-white p-5 border-2 border-custom-primary-color rounded-custom mt-10 relative gap-2 lg:gap-5">
      <div className="flex flex-col justify-between md:justify-normal sm:flex-row w-full gap-5">
        <Progress
          className={cn([
            "[&_.ant-progress-inner]:!size-28 [&_.ant-progress-inner]:xl:!size-32 [&_.ant-progress-text]:text-custom-primary-color self-start",
          ])}
          strokeLinecap="butt"
          type="circle"
          percent={progress}
          strokeWidth={15}
          strokeColor={"rgb(var(--primary-color))"}
          trailColor={"rgb(var(--primary-color) / 0.2)"}
        />

        <div className="grid grid-cols-1 text-14 gap-3 lg:gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:text-16 2xl:gap-x-5 sm:ml-14 w-full items-baseline">
          <div className="flex text-nowrap">
            <span>تاریخ شروع پروژه : </span>&nbsp;
            <span>{dayjs(startDate).format("YYYY/MM/DD")}</span>
          </div>
          <div className="flex text-nowrap">
            <span>تاریخ پایان پروژه :</span>&nbsp;
            <span>{dayjs(endDate).format("YYYY/MM/DD")}</span>
          </div>
          <div className="flex flex-1 text-nowrap">
            <span>مدیر پروژه : </span>&nbsp;
            <span>
              {createdBy?.name} {createdBy?.surName}
            </span>
          </div>
          <div className="col-span-full">
            <span>آدرس پروژه : </span>&nbsp;
            <span>{address}</span>
          </div>
          <div className="flex flex-wrap flex-1 col-span-full">
            <CustomButton
              onClick={() => setIsOpenMapModal(true)}
              className="rounded-lg"
            >
              لوکیشن پروژه روی نقشه
            </CustomButton>
            <CustomModal
              open={!open && isOpenMapModal}
              onCancel={() => setIsOpenMapModal(false)}
            >
              <Map position={[latitude, longitude]} showPosition />
              <a
                href={`https://www.google.com/maps?q=${latitude},${longitude}`}
                target="_blank"
                className="flex justify-center items-center rounded-custom bg-custom-primary-color text-white hover:bg-custom-primary-color/90  disabled:hover:bg-gray-200 transition-none disabled:cursor-not-allowed disabled:bg-gray-200 w-max px-5 py-2 mt-5"
              >
                لوکیشن پروژه روی Google Map
              </a>
            </CustomModal>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 lg:order-2 2xl:order-1 mt-5">
        <div>
          <span> توضیحات پروژه : </span>&nbsp;
          <CustomButton
            className="text-xs px-5 py-0 h-7"
            onClick={() => setOpenDescriptionModal(true)}
          >
            توضیحات بیشتر
          </CustomButton>
        </div>
        <p className="line-clamp-5">{description}</p>
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
          <div className="flex justify-between items-center gap-5">
            <div className="flex flex-col sm:flex-row  sm:justify-center sm:items-center gap-2">
              <span>شروع</span>
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
            {/* <span className="mx-2">تا</span> */}
            <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-2">
              <span>پایان</span>
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
          <div className="flex flex-col sm:flex-row justify-center flex-wrap gap-2 mt-5">
            <div className="flex justify-center flex-wrap items-center gap-2 flex-1">
              <span>آدرس پروژه</span>
              <CustomInput
                containerClassName="flex-1"
                control={control}
                name="address"
                className="px-3 py-1.5"
                placeholder="تهران"
                noErrorMessage
              />
            </div>
            <CustomButton
              onClick={() => setIsOpenMapModal(true)}
              className="mr-auto"
            >
              لوکیشن پروژه روی نقشه
            </CustomButton>
          </div>
          <div className="flex justify-center flex-wrap items-center gap-2 mt-5">
            <span>درصد پیشرفت پروژه</span>
            <CustomInput
              control={control}
              name="progress"
              containerClassName="flex-1"
              className="px-2 py-1.5 w-16"
              placeholder="0"
              icon={"%"}
              error={errors.progress}
              type="number"
              max={100}
              min={0}
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
              rows={7}
            />
          </div>
          <CustomModal
            open={open && isOpenMapModal}
            onCancel={() => setIsOpenMapModal(false)}
          >
            <div className="flex flex-wrap items-center gap-2 mb-3 sm:flex-row sm:gap-5 ">
              <div className="flex justify-center items-center gap-1">
                <img
                  className="size-[25px]"
                  src="https://cdn-icons-png.flaticon.com/512/7987/7987463.png"
                  alt="map-icon"
                />
                موقعیت فعلی پروژه
              </div>
              <div className="flex justify-center items-center gap-1">
                <img
                  className="size-[30px]"
                  src="https://cdn-icons-png.flaticon.com/512/2776/2776000.png"
                  alt="map-icon"
                />
                موقعیت جدید پروژه
              </div>
            </div>
            <Map
              position={[watch("latitude"), watch("longitude")]}
              showPosition
              onSetPosition={mapHandler}
              markerPosition={[latitude, longitude]}
              setPosition={(userGeo) => {
                setValue("latitude", userGeo[0]);
                setValue("longitude", userGeo[1]);
              }}
            />
          </CustomModal>
          <CustomButton
            className="mt-7"
            type="submit"
            loading={updateProjectLoading}
          >
            ثبت تغییرات
          </CustomButton>
        </form>
      </CustomModal>
      <CustomModal
        open={openDescriptionModal}
        onCancel={() => setOpenDescriptionModal(false)}
        title="توضیحات پروژه"
        width={1000}
        headerClassName="sticky top-0"
      >
        <p className="lg:text-base text-justify">{description}</p>
      </CustomModal>
    </div>
  );
}

export default ProjectInfo;
