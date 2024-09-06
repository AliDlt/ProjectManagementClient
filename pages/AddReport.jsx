import React, { Children, useState } from "react";
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
import CustomDatePicker from "../components/modules/CustomDatePicker";
import dayjs from "dayjs";
import {
  CustomHourSelector,
  CustomMinSelector,
} from "../components/modules/CustomClockSelector";

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
  const queryClient = useQueryClient();
  const successAdd = (e) => {
    toast(e.message, "success");
    navigate(`/reports/${e.data._id}`);
    queryClient.invalidateQueries("reports");
  };

  const { mutate, isPending } = useAddReport();

  const addReport = (e) => {
    console.log(e);
    console.log(e.createAt);
    mutate(
      {
        name: e.name,
        description: e.description,
        projectId: e.project.id,
        createdBy: user._id,
        date: e.createAt,
      },
      { onSuccess: successAdd, onError: (e) => console.log(e) },
    );
  };

  const setDateReport = (e) => {
    console.log(dayjs(e));
    setValue("createAt", e);
  };
  return (
    <div className="container-grid">
      <h5 className="text-24 col-span-1 lg:col-span-9">گزارش جدید</h5>
      <form
        onSubmit={handleSubmit(addReport)}
        className="col-span-1 lg:col-span-9 flex gap-4 flex-col"
      >
        <div className="flex items-center gap-3">
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

          <CustomDatePicker
            className="  px-4 py-2 "
            control={control}
            name={"createAt"}
            changeHandler={setDateReport}
            error={errors.createAt}
            placeholder={"تاریخ گزارش "}
          />
        </div>
        <div className="flex items-center gap-3 ">
          <p>ساعت شروع کار :</p>
          <CustomHourSelector control={control} nameHour="hour" />
          <CustomMinSelector control={control} nameMin="min" />
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
