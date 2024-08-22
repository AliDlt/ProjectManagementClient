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
  const setProject = (dataProject) => {
    setValue("project", dataProject);
    setShow(false);
    console.log(errors);
  };
  return (
    <div className="container-grid">
      <h5 className="text-24 col-span-1 lg:col-span-9">گزارش جدید</h5>
      <form className="col-span-1 lg:col-span-9 flex gap-4 flex-col">
        <div>
          <CustomButton
            className={
              "bg-transparent border-2 border-custom-primary-color  text-custom-primary-color hover:text-white transition-all !text-18"
            }
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
        <div>
          <CustomInput
            className="p-2"
            name="title"
            control={control}
            error={errors.title}
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
        <CustomModal open={show} onCancel={setShow} title={"انتخاب پروژه"}>
          <SelectProject setProject={setProject} error={errors.project} />
        </CustomModal>
      </form>
      <div className="w-full">
        <Files />
      </div>
    </div>
  );
};

export default AddReport;
