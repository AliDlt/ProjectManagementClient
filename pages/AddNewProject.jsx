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

function AddNewProject() {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { addProject, isPending, data } = useAddProject();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    watch,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      usersIds: selectedUsers,
      progress: 0,
    },
    resolver: yupResolver(addNewProjectSchema),
    mode: "onChange",
  });

  // On Submit
  const onSubmit = async (values) => {
    try {
      await addProject(values);
      reset();
      setSelectedUsers([]);
      setOpen(true);
    } catch (error) {}
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
            <div className="flex justify-center flex-wrap items-center gap-2 mt-7">
              <span>محل پروژه</span>
              <CustomInput
                control={control}
                name="location"
                className="px-2 py-0.5 md:max-w-96"
                noErrorMessage
                error={errors.location}
                containerClassName="flex-1"
              />
            </div>
            <div className="flex  items-center mt-7 flex-wrap gap-5 xl:order-1">
              <div className="flex  justify-center items-center flex-wrap gap-2">
                <span>نام پروژه </span>
                <CustomInput
                  control={control}
                  name="name"
                  className="px-2 py-0.5 w-24 md:w-40"
                  noErrorMessage
                  error={errors.name}
                />
              </div>
              <div className="flex justify-center flex-wrap items-center gap-2">
                <span>درصد پیشرفت پروژه</span>
                <CustomInput
                  control={control}
                  name="progress"
                  className="px-2 py-0.5 w-16"
                  placeholder="0"
                  type="number"
                  icon={"%"}
                  noErrorMessage
                />
              </div>
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
        title="بارگزاری عکس و فیلم"
        okText="بله"
        cancelText="خیر"
        description="آیا میخواهید به پروژه عکس یا فیلم اضافه کنید ؟"
        open={open}
        onCancel={() => {
          setOpen(false);
          navigate("/projects");
        }}
        okHandler={() => {
          navigate(`/projects/${data?._id}`);
        }}
        okClassName="bg-green-500 border-green-600 hover:bg-green-400 "
      />
      {/* Meta Tag */}
      <MetaTag title="ایجاد پروژه" description="ایجاد پروژه جدید" />
    </form>
  );
}

export default AddNewProject;
