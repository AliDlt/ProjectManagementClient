import React, { useState, useEffect } from "react";
import CustomButton from "../../modules/CustomButton";
import { MdDelete, MdEdit, MdModeEdit } from "react-icons/md";
import CustomTextAria from "../../modules/CustomTextAria";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useGetReport from "../../../hooks/useGetReport";
import { addReportSchema, messageSchema } from "../../../yup/yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomModal from "../../modules/CustomModal";
import dayjs from "dayjs";
import CustomDatePicker from "../../modules/CustomDatePicker";
import { convertDate, convertToLocalDate } from "../../../utils/tools";
import CustomInput from "../../modules/CustomInput";
import useUpdateReport from "../../../hooks/Report/useUpdateReport";

import { useToast } from "../../../Context/ToastContext";
import { useQueryClient } from "@tanstack/react-query";
import useUser from "../../../hooks/useUser";
import useDeleteReport from "../../../hooks/Report/useDeleteReport";

const ReportBox = ({ data, userRole }) => {
  const [modalDelete, showModalDelete] = useState(false);
  const { user } = useUser();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(addReportSchema),
    defaultValues: {
      createAt: dayjs(data?.date),
      description: data?.description,
      min: data?.startTime.split(":")[0],
      hour: data?.startTime.split(":")[1],
      project: { id: data?.projectId },
      name: data?.name,
    },
  });
  const handelDatePicker = (date) => {
    const newDate = dayjs(date);

    setValue("createAt", newDate);
  };
  const { id } = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutate, isPending } = useUpdateReport();
  const deleteSuccess = (e) => {
    toast(e.message, "success");
    queryClient.invalidateQueries("reports");
    navigate("/reports");
  };
  const { mutate: deleteReport, isPending: deletePending } = useDeleteReport();
  const deleteReportFn = () => {
    deleteReport(id, {
      onSuccess: deleteSuccess,
      onError: (e) => toast(e.response.data.message, "error"),
    });
  };

  const [editor, showEditor] = useState(false);
  const toast = useToast();
  const successUpdate = (e) => {
    toast(e.message, "success");
    showEditor(false);
    queryClient.invalidateQueries(["get-report", data._id]);
  };
  const updateReport = (e) => {
    const startTime = `${e.hour}:${e.min}`;
    const newData = {
      date: e.createAt,
      description: e.description,
      name: e.name,
      project: data?.projectId,
      id: data._id,
      startTime,
    };

    mutate(newData, {
      onSuccess: successUpdate,
      onError: (e) => {
        toast(e.response.data.errors[0], "error");
      },
    });
  };
  return (
    <div>
      <section className="border-2  relative flex justify-between  flex-col bg-white rounded-custom  border-custom-primary-color p-4 md:px-6 md:py-4 ">
        <div className="flex justify-between  overflow-hidden w-full ">

          <div className="flex gap-2 flex-col ">
            {" "}
            <div className="flex  gap-3 flex-wrap mb-3 items-center  ">
              <h4>
                {" "}
                <span className="font-bold">تاریخ بارگذاری:</span>{" "}
                <span>
                  {convertToLocalDate(data?.createdAt && data?.createdAt)}
                </span>
              </h4>
              <h4>
                {" "}
                <span className="font-bold">تاریخ گزارش:</span>{" "}
                <span>{convertToLocalDate(data?.date && data?.date)}</span>
              </h4>
            </div>
            <h4>
              {" "}
              <span className="font-bold">ساعت شروع :</span>{" "}
              {data.startTime && data.startTime}
            </h4>
            <div className=" flex gap-2 items-center">
              <div className="text-14 md:text-16 mt-2 ">
                <span className="font-semibold ">نویسنده : </span>
                {data?.createdBy ? (
                  <span className="font-semibold">
                    {data?.createdBy?.name} {data?.createdBy?.surName}{" "}
                  </span>
                ) : (
                  <span className="font-semibold"> کاربر حذف شده </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
          
          </div>
          <div className="flex gap-2">
          {(data?.isEditable || userRole === 0) && (
            <div>
              <CustomButton
                onClick={() => showEditor(true)}
                className="rounded-full h-10 w-10 p-2 !text-20"
              >
                <MdEdit />
              </CustomButton>
            </div>
          )}
          {data?.isEditable ||
            (user?.userRole === 0 && (
              <CustomButton
                onClick={() => showModalDelete(true)}
                className="bg-white hover:text-white ml-1 w-10 h-10   text-custom-primary-color transition-all border-2 border-custom-primary-color border-solid rounded-full"
              >
                <span className="flex items-center justify-center   text-24">
                  <MdDelete size={24} />
                </span>
              </CustomButton>
            ))}
        </div>
        </div>
        <div className="mt-6 border-t border-custom-primary-color pt-4 text-14 md:text-16 text-wrap w-full  ">
          <p className="break-words ">{data?.description}</p>
        </div>
       
        <CustomModal
          onCancel={() => showEditor(false)}
          className="p-4 min-h-[480px]"
          open={editor}
          title="ویرایش گزارش"
        >
          <form
            onSubmit={handleSubmit(updateReport)}
            className="p-2 flex flex-col gap-4 justify-center h-full mt-5 "
          >
            <div className="flex flex-col gap-2">
              <label> عنوان گزارش : </label>
              <CustomInput
                className="p-1 rounded-lg"
                control={control}
                error={errors.name}
                placeholder={"عنوان گزارش ..."}
                name={"name"}
              />
            </div>
            <div className="flex gap-2  flex-col ">
              <label> تاریخ گزارش : </label>
              <CustomDatePicker
                error={errors.createAt}
                className="px-2 py-1 rounded-lg"
                placeholder={convertToLocalDate(dayjs(data?.date))}
                changeHandler={handelDatePicker}
                control={control}
                name={"createAt"}
              />
              <p className="my-1">ساعت شروع</p>
              <div className="flex gap-2">
                <div>
                  <CustomInput
                    control={control}
                    type={"number"}
                    min={0}
                    error={errors.min}
                    max={23}
                    placeholder={"ساعت"}
                    name={"hour"}
                  />
                </div>{" "}
                <div>
                  <CustomInput
                    control={control}
                    min={0}
                    max={59}
                    type={"number"}
                    name={"min"}
                    placeholder={"دقیقه"}
                    error={errors.hour}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label> متن گزارش : </label>
              <CustomTextAria
                className="rounded-lg resize-y"
                error={errors.description}
                name={"description"}
                placeholder={"متن گزارش ..."}
                control={control}
              />
            </div>

            <div>
              <CustomButton
                loading={isPending}
                type="submit"
                className="rounded-lg"
              >
                ثبت تغییرات
              </CustomButton>
            </div>
          </form>
        </CustomModal>
      </section>
      <CustomModal
        onCancel={showModalDelete}
        open={modalDelete}
        title={"حذف گزارش "}
      >
        <div className="mt-3">
          <h4 className="font-bold">ایا میخواهید گزارش را حذف کنید ؟</h4>
          <div className="flex justify-end gap-4 ">
            <CustomButton
              onClick={deleteReportFn}
              loading={deletePending}
              className="w-14 p-2 bg-red-500 hover:bg-red-400 border-red-500 border-2  transition-all"
            >
              بله
            </CustomButton>
            <CustomButton
              onClick={() => showModalDelete(false)}
              className="w-14 p-2 bg-custom-primary-color hover:bg-white hover:text-custom-primary-color  border-custom-primary-color border-2  transition-all"
            >
              خیر
            </CustomButton>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default ReportBox;
