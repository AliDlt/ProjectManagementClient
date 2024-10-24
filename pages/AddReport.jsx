import React, { useState } from "react";
import CustomInput from "../components/modules/CustomInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addReportSchema } from "../yup/yup";
import CustomTextAria from "../components/modules/CustomTextAria";
import CustomButton from "../components/modules/CustomButton";
import CustomModal from "../components/modules/CustomModal";
import SelectProject from "../components/ui/AddReport/SelecetProject";
import { MdAdd } from "react-icons/md";
import useAddReport from "../hooks/Report/useAddReport";
import { useToast } from "../Context/ToastContext";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import CustomDatePicker from "../components/modules/CustomDatePicker";
import { convertMillisecondsToDate } from "../utils/tools";
import BackButton from "../components/modules/BackButton";
import CustomVoiceUploader from "../components/modules/CustomVoiceUploader";
import Categories from "../components/ui/category/Categories";
import useCategories from "../hooks/Categories/useCategories";
import CustomLoading from "../components/modules/CustomLoading";
import useUploadFiles from "../hooks/Files/useUploadFiles";

const AddReport = () => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [blobVoice, setBlobVoice] = useState(null);
  // show project
  const [show, setShow] = useState(false);
  // show categories
  const [category, selectCategory] = useState(null);
  const [categories, showCategories] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(addReportSchema),
  });
  const { user } = useUser();
  const setProject = (dataProject) => {
    setValue("project", dataProject);
    setShow(false);
    delete errors.project;
  };
  const { uploadFileFn } = useUploadFiles();
  const navigate = useNavigate();
  const toast = useToast();
  const successAdd = (e) => {
    toast(e.message, "success");
    // navigate(`/reports/${e.data._id}`);
    uploadFileFn({
      file: blobVoice,
      sectionId: e.data._id,
      fileFormat: "voice",
      sectionType: "report",
    });
  };

  const { mutate, isPending } = useAddReport();

  const addReport = (e) => {
    mutate(
      {
        name: e.name,
        description: e.description,
        categoryId: category && category._id,
        projectId: e.project.id,
        createdBy: user._id,
        status: "ongoing",
        _id: 3,
        date: convertMillisecondsToDate(Number(e.createAt)),
      },
      {
        onSuccess: successAdd,
        onError: (e) => {
          console.log(e);
          toast(e.response.data.message, "error");
        },
      },
    );
  };
  const setDateReport = (e) => {
    setValue("createAt", e);
  };
  const { data, isPending: loading } = useCategories("report");

  const setCategory = (item) => {
    selectCategory(item);
    showCategories(false);
  };

  return (
    <div className="container-grid gap-6">
      <div className="block col-span-1 lg:col-span-11">
        <BackButton />
      </div>
      <h5 className="text-24 col-span-1 lg:col-span-9 font-semibold">
        گزارش جدید
      </h5>
      <form
        onSubmit={handleSubmit(addReport)}
        className="col-span-1 lg:col-span-9 flex gap-4 flex-col"
      >
        <div className="flex lg:items-center gap-3 lg:flex-row flex-col">
          <CustomButton
            className={`bg-transparent border-2  ${errors?.project ? "border-red-500 text-red-500 hover:bg-red-500" : "border-custom-primary-color  bg-custom-primary-color text-white "}  hover:text-white transition-all !text-18`}
            onClick={() => setShow(true)}
          >
            {getValues().project ? (
              <span> {getValues().project.name} </span>
            ) : (
              <span>انتخاب پروژه مربوطه</span>
            )}
            <span>
              <MdAdd />
            </span>
          </CustomButton>
          {console.log(category)}
          <CustomButton
            className="!text-18"
            onClick={() => showCategories(true)}
          >
            {category ? category.name : "انتخاب دسته بندی"}
          </CustomButton>
        </div>
        <div>
          <CustomDatePicker
            className="  px-4 py-2 w-full  lg:w-1/2"
            control={control}
            name={"createAt"}
            changeHandler={setDateReport}
            error={errors.createAt}
            placeholder={"تاریخ گزارش "}
          />
        </div>
        {errors?.project && (
          <p className="py-2 text-red-500">{errors?.project.message}</p>
        )}

        <div>
          <CustomInput
            className="p-2"
            name="name"
            control={control}
            error={errors.name}
            placeholder="عنوان گزارش"
          />
        </div>
        <div>
          <CustomTextAria
            className="py-2 px-4"
            control={control}
            error={errors.description}
            name={"description"}
            placeholder="متن گزارش"
            rows={3}
          />
        </div>
        <CustomVoiceUploader
          audioUrl={audioUrl}
          setAudioUrl={setAudioUrl}
          setBlobVoice={setBlobVoice}
        />

        <div className="">
          <CustomButton loading={isPending} type="submit">
            ثبت گزارش
          </CustomButton>
        </div>
      </form>
      {/* modals */}

      {/* select project */}
      <CustomModal open={show} onCancel={setShow} title={"انتخاب پروژه"}>
        <SelectProject setProject={setProject} error={errors.project} />
      </CustomModal>

      {/* select categories */}
      <CustomModal
        open={categories}
        onCancel={showCategories}
        title={"انتخاب دسته بندی"}
      >
        {loading ? (
          <CustomLoading />
        ) : (
          <Categories
            selectHandler={setCategory}
            categories={data?.data?.data.categories}
          />
        )}{" "}
      </CustomModal>
    </div>
  );
};

export default AddReport;
