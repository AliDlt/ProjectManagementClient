import React, { useState } from "react";
import CustomInput from "../components/modules/CustomInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addReportSchema } from "../yup/yup";
import CustomTextAria from "../components/modules/CustomTextAria";
import CustomButton from "../components/modules/CustomButton";
import CustomSelectInput from "../components/modules/CustomSelectInput";
import CustomModal from "../components/modules/CustomModal";
import SelectProject from "../components/ui/AddReport/SelecetProject";
import { MdAdd } from "react-icons/md";
import Files from "../components/ui/Files";
import useAddReport from "../hooks/Report/useAddReport";
import { useToast } from "../Context/ToastContext";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const AddReport = () => {
  const [show, setShow] = useState(false);
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
  const navigate = useNavigate();
  const toast = useToast();
  const { mutate, isPending } = useAddReport();
  const queryClient = useQueryClient();
  const successAdd = (e) => {
    toast(e.message, "success");
    navigate(`/reports/${e.data._id}`);
    queryClient.invalidateQueries("reports");
  };

  const addReport = (e) => {
    mutate(
      {
        name: e.name,
        description: e.description,
        projectId: e.project.id,
        createdBy: user._id,
      },
      { onSuccess: successAdd, onError: (e) => console.log(e) },
    );
  };
  return (
    <div className="container-grid">
      <h5 className="text-24 col-span-1 lg:col-span-9">گزارش جدید</h5>
      <form
        onSubmit={handleSubmit(addReport)}
        className="col-span-1 lg:col-span-9 flex gap-4 flex-col"
      >
        <div>
          <CustomButton
            className={`bg-transparent border-2  ${errors?.project ? "border-red-500 text-red-500 hover:bg-red-500" : "border-custom-primary-color text-custom-primary-color bg-custom-primary-color text-white "}  hover:text-white transition-all !text-18`}
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
        </div>
        {console.log(errors?.project)}
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
        <div className="">
          <CustomButton loading={isPending} type="submit">
            ثبت گزارش
          </CustomButton>
        </div>
      </form>
      <CustomModal open={show} onCancel={setShow} title={"انتخاب پروژه"}>
        <SelectProject setProject={setProject} error={errors.project} />
      </CustomModal>
    </div>
  );
};

export default AddReport;
