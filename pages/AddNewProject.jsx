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
import { useNavigate } from "react-router-dom";
import MetaTag from "../components/modules/MetaTag";
import { useToast } from "../Context/ToastContext";
import CustomModal from "../components/modules/CustomModal";
import CustomSelectInput from "../components/modules/CustomSelectInput";
import Map from "../components/ui/projects/Map";
import BackButton from "../components/modules/BackButton";
import cn from "../utils/cn";
import Categories from "../components/ui/category/Categories";

const projectStatus = [
  { label: "در حال انجام ", value: 0 },
  { label: "فعال ", value: 1 },
  { label: "نیمه فعال", value: 2 },
  { label: "غیر فعال", value: 3 },
  { label: "به اتمام رسیده", value: 4 },
];

function AddNewProject() {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
  const [position, setPosition] = useState([
    35.68942549867877, 51.39404296875001,
  ]);
  const { addProject, isPending } = useAddProject();
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
    try {
      const res = await addProject(values);
      reset();
      setSelectedUsers([]);
      navigate(`/projects/${res?.data?._id}`);
    } catch (error) {}
  };

  // Map Handler
  const mapHandler = (position) => {
    setPosition(position);
    setValue("latitude", position?.lat);
    setValue("longitude", position?.lng);
    clearErrors(["latitude", "longitude"]);
    toast("محل پروژه ثبت شد", "success");
    setIsMapModalOpen(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, () =>
        scrollTo({
          top: 0,
        }),
      )}
      className="px-5 lg:px-0 lg:col-span-9 2xl:col-span-10 flex flex-col"
    >
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className=" flex items-center gap-5">
          <BackButton />
          <h1 className="text-24">پروژه جدید</h1>
        </div>
        <div className="flex w-full justify-between items-center gap-5 sm:w-auto">
          <CustomButton
            className="text-sm"
            onClick={() => setIsCategoriesModalOpen(true)}
          >
            دسته بندی پروژه
          </CustomButton>
          <CustomSelectInput
            placeholder="وضعیت پروژه "
            options={projectStatus}
            containerClassName="w-32 mr-auto"
            className="h-9"
          />
        </div>
      </div>
      <div>
        {/* Project Info */}
        <div className="bg-white p-5 border-2 border-custom-primary-color rounded-custom mt-5 xl:flex xl:gap-10 xl:justify-between">
          <div>
            <div
              className={cn([
                "flex gap-5 items-center md:justify-start xl:order-2 md:gap-5",
                (errors.startDate || errors.endDate) && "items-start",
              ])}
            >
              <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-2">
                <span
                  className={cn([errors.startDate && " sm:mb-[30px] 30px"])}
                >
                  شروع
                </span>
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
              <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-2">
                <span className={cn([errors.endDate && " sm:mb-[30px] 30px"])}>
                  پایان
                </span>
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
            <div
              className={cn([
                "flex items-center mt-7 flex-wrap gap-5 xl:order-1",
                errors.name && "items-start",
              ])}
            >
              <div className="flex justify-center items-center gap-2">
                <span
                  className="text-nowrap"
                  style={{
                    marginBottom: errors.name && "30px",
                  }}
                >
                  نام پروژه
                </span>
                <CustomInput
                  control={control}
                  name="name"
                  className="px-3 py-1.5"
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
                  icon={"%"}
                  error={errors.progress}
                  type="number"
                  max={100}
                  min={0}
                />
              </div>
            </div>
            <div className="flex justify-center flex-wrap items-center gap-2 mt-7">
              <span
                style={{
                  marginBottom: errors.address && "30px",
                }}
              >
                آدرس پروژه
              </span>
              <CustomInput
                control={control}
                name="address"
                className="px-3 py-1.5 md:max-w-96"
                error={errors.address}
                containerClassName="flex-1"
              />
            </div>
            <div>
              <CustomButton
                onClick={() => setIsMapModalOpen(true)}
                className="mt-7 text-sm"
              >
                لوکیشن پروژه روی نقشه
              </CustomButton>
              {errors.latitude && errors.longitude && (
                <p className="text-red-500 text-14 mt-2">
                  لطفا مکان پروژه را ، روی نقشه مشخص کنید
                </p>
              )}
              <CustomModal
                open={isMapModalOpen}
                onCancel={() => setIsMapModalOpen(false)}
              >
                <Map
                  position={position}
                  onSetPosition={mapHandler}
                  setPosition={setPosition}
                />
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
      <CustomButton
        className="w-40 py-5 my-10 mx-auto lg:ml-auto lg:mr-0"
        type="submit"
        loading={isPending}
      >
        ثبت پروژه
      </CustomButton>
      <CustomModal
        open={isCategoriesModalOpen}
        onCancel={() => setIsCategoriesModalOpen(false)}
        title="انتخاب دسته بندی"
      >
        <Categories />
      </CustomModal>
      {/* Meta Tag */}
      <MetaTag title="ایجاد پروژه" description="ایجاد پروژه جدید" />
    </form>
  );
}

export default AddNewProject;
