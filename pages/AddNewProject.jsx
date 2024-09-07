import dayjs from "dayjs";
import CustomDatePicker from "../components/modules/CustomDatePicker";
import CustomInput from "../components/modules/CustomInput";
import CustomButton from "../components/modules/CustomButton";
import CustomTextAria from "../components/modules/CustomTextAria";
import { useForm } from "react-hook-form";
import { addNewProjectSchema } from "../yup/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomUsersList from "../components/ui/projects/CustomUsersList";
import { useState } from "react";
import useAddProject from "../hooks/projects/useAddProject";
import CustomConfirm from "../components/modules/CustomConfirm";
import { useNavigate } from "react-router-dom";
import MetaTag from "../components/modules/MetaTag";
import { useToast } from "../Context/ToastContext";
import CustomModal from "../components/modules/CustomModal";
import Map from "../components/ui/projects/Map";

function AddNewProject() {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isOpenMapModal, setIsOpenMapModal] = useState(false);
  const [position, setPosition] = useState([
    35.68942549867877, 51.39404296875001,
  ]);
  const { addProject, isPending, data } = useAddProject();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const {
    control,
    watch,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm({
    defaultValues: {
      usersIds: selectedUsers,
      progress: 0,
      latitude: null,
      longitude: null,
    },
    resolver: yupResolver(addNewProjectSchema),
    mode: "onChange",
  });

  // On Submit
  const onSubmit = async (values) => {
    console.log(values)
    try {
      await addProject(values);
      reset();
      setSelectedUsers([]);
      setOpen(true);
    } catch (error) {}
  };

  // On Submit Error
  const onSubmitError = () => {
    toast(
      "لطفا فیلد های خواسته شده رو پر کنید ( تاریخ شروع ، تاریخ پایان ، نام پروژه ، آدرس پروژه ، لوکیشن پروژه ، توضیحات پروژه )",
      "error",
    );
  };

  // Map Handler
  const mapHandler = (position) => {
    setPosition(position);
    setValue("latitude", position?.lat);
    setValue("longitude", position?.lng);
    clearErrors(["latitude", "longitude"]);
    toast("محل پروژه ثبت شد", "success");
    setIsOpenMapModal(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onSubmitError)}
      className="px-5 lg:px-0 lg:col-span-9 2xl:col-span-10 flex flex-col"
    >
      <div className="flex justify-between items-center">
        <h1 className=" text-24 lg:text-32">پروژه جدید</h1>
        <CustomButton type="submit" loading={isPending}>
          ثبت پروژه
        </CustomButton>
      </div>
      <div>
        {/* Project Info */}
        <div className="bg-white p-5 border-2 border-custom-primary-color rounded-custom mt-10 xl:flex xl:gap-10 xl:justify-between">
          <div>
            <div className="flex justify-between items-center md:justify-start xl:order-2 md:gap-5">
              <div className="flex justify-center items-center gap-2">
                <span className="hidden md:block">شروع</span>
                <CustomDatePicker
                  className="px-3 py-1.5"
                  control={control}
                  name="startDate"
                  placeholder="شروع"
                  error={errors.startDate}
                  changeHandler={(date) => {
                    if (dayjs(date) > dayjs(getValues("endDate")))
                      setValue("endDate", null);
                  }}
                />
              </div>
              <span className="mx-2 md:hidden">تا</span>
              <div className="flex justify-center items-center gap-2">
                <span className="hidden md:block">پایان</span>
                <CustomDatePicker
                  className="px-3 py-1.5"
                  control={control}
                  name="endDate"
                  error={errors.endDate}
                  disabledDate={() => {
                    if (!getValues("startDate")) return true;
                  }}
                  placeholder="پایان"
                  minDate={dayjs(watch("startDate"))}
                />
              </div>
            </div>
            <div className="flex items-center mt-7 flex-wrap gap-5 xl:order-1">
              <div className="flex  justify-center items-center flex-wrap gap-2">
                <span>نام پروژه </span>
                <CustomInput
                  control={control}
                  name="name"
                  className="px-3 py-1.5 w-24 md:w-40"
                  noErrorMessage
                  error={errors.name}
                />
              </div>
              <div className="flex justify-center flex-wrap items-center gap-2">
                <span>درصد پیشرفت پروژه</span>
                <CustomInput
                  control={control}
                  name="progress"
                  className="px-2 py-1.5 w-16"
                  placeholder="0"
                  type="number"
                  icon={"%"}
                  error={errors.progress}
                  noErrorMessage
                />
              </div>
            </div>
            <div className="flex justify-center flex-wrap items-center gap-2 mt-7">
              <span>آدرس پروژه</span>
              <CustomInput
                control={control}
                name="address"
                className="px-3 py-1.5 md:max-w-96"
                noErrorMessage
                error={errors.address}
                containerClassName="flex-1"
              />
            </div>
            <div>
              <CustomButton
                onClick={() => setIsOpenMapModal(true)}
                className="mt-7"
              >
                لوکیشن پروژه روی نقشه
              </CustomButton>
              {errors.latitude && errors.longitude && (
                <p className="text-red-500 text-14 mt-2">
                  لطفا مکان پروژه را ، روی نقشه مشخص کنید
                </p>
              )}
              <CustomModal
                open={isOpenMapModal}
                onCancel={() => setIsOpenMapModal(false)}
              >
                <Map position={position} onSetPosition={mapHandler} />
              </CustomModal>
            </div>
          </div>
          <div className="mt-10 xl:mt-0 xl:order-3 flex-1 flex flex-col gap-2 2xl:mr-20">
            <span>توضیحات پروژه</span>
            <CustomTextAria
              className="flex-1"
              control={control}
              name="description"
              error={errors?.description}
              noErrorMessage
            />
          </div>
        </div>
        {/* Project Users */}
        <CustomUsersList
          projectUsers={selectedUsers}
          modalHandler={(usersIds, users) => {
            setValue("usersIds", usersIds);
            setSelectedUsers(users);
          }}
          emptyText="کاربری انتخاب نشده"
        />
      </div>
      <CustomConfirm
        title="بارگزاری عکس ، فیلم و فایل"
        okText="بله"
        cancelText="خیر"
        description="آیا میخواهید به پروژه عکس ، فیلم و یا فایل اضافه کنید ؟"
        open={open}
        onCancel={() => {
          setOpen(false);
          navigate("/projects");
        }}
        okHandler={() => {
          navigate(`/projects/${data?._id}`);
        }}
        okClassName="bg-green-500 hover:bg-white hover:text-green-500 border-green-500"
      />
      {/* Meta Tag */}
      <MetaTag title="ایجاد پروژه" description="ایجاد پروژه جدید" />
    </form>
  );
}

export default AddNewProject;
