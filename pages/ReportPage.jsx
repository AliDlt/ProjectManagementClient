import React, { useState } from "react";
import ReportBox from "../components/ui/Report/ReportBox";
import CustomButton from "../components/modules/CustomButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGetReport from "../hooks/useGetReport";
import ShowFiles from "../components/ui/Report/ShowFiles";
import ReportGallery from "../components/ui/Report/ReportGallery";
import MetaTag from "../components/modules/MetaTag";
import { MdDelete } from "react-icons/md";
import CustomModal from "../components/modules/CustomModal";
import useDeleteReport from "../hooks/Report/useDeleteReport";
import { useToast } from "../Context/ToastContext";
import CustomLoading from "../components/modules/CustomLoading";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { date } from "yup";

const ReportPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetReport(id);
  const [modalDelete, showModalDelete] = useState(false);
  const { mutate, isPending } = useDeleteReport();
  const queryClient = useQueryClient();
  const toast = useToast();
  const navigate = useNavigate();
  const deleteSuccess = (e) => {
    toast(e.message, "success");
    queryClient.invalidateQueries("reports");
    navigate("/reports");
  };
  const deleteReportFn = () => {
    mutate(id, { onSuccess: deleteSuccess, onError: (e) => console.log(e) });
  };
  if (isLoading) {
    return (
      <div className="container-grid">
        <div className="col-span-1 lg:col-span-11">
          <CustomLoading />
        </div>
      </div>
    );
  }
  if (error) {
    toast(error.response.data.message, "error");
    navigate("/reports");
  }
  const checkDate = () => {
    console.log(dayjs(data.date))
    const now = dayjs(new Date());
    const createAt = dayjs(data.date);
    return now.diff(createAt,'hour')
  };
  console.log(checkDate())
  return (
    <div className="container-grid ">
      <div className="col-span-1 lg:col-span-11">
        <h3 className=" my-6 flex items-center justify-between px-5">
          <span className="text-24 font-bold">{data?.name}</span>{" "}
          <CustomButton
            onClick={() => showModalDelete(true)}
            className="bg-white hover:text-white  w-9 h-9  p-2 text-custom-primary-color transition-all border-2 border-custom-primary-color border-solid rounded-full"
          >
            <span className="flex items-center justify-center   text-24">
              <MdDelete />
            </span>
          </CustomButton>
        </h3>
        <ReportBox data={data} />
        <div className="mt-4  flex items-center  ">
          <CustomButton className="py-5  ">
            <Link to={`/projects/${data?.projectId}`}>نمایش پروژه مرتبط </Link>
          </CustomButton>
        </div>
        <ShowFiles
          action="/api/report/uploadFile"
          data={{ id: data?._id, file: data?.files }}
        />
        {console.log()}
        <ReportGallery id={data?._id} data={data?.files} />
      </div>
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
              loading={isPending}
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

      <MetaTag title={` گزارش : ${data?.name}`} description="گزارش شما" />
    </div>
  );
};

export default ReportPage;
