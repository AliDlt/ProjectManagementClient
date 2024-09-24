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

import { AiOutlineInfo } from "react-icons/ai";
import BackButton from "../components/modules/BackButton";
import { Empty } from "antd";
import useUser from "../hooks/useUser";

const ReportPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetReport(id);
  const [modalDelete, showModalDelete] = useState(false);
  const { mutate, isPending } = useDeleteReport();
  const queryClient = useQueryClient();
  const { user } = useUser();
  const toast = useToast();
  const navigate = useNavigate();
  const deleteSuccess = (e) => {
    toast(e.message, "success");
    queryClient.invalidateQueries("reports");
    navigate("/reports");
  };
  const deleteReportFn = () => {
    mutate(id, {
      onSuccess: deleteSuccess,
      onError: (e) => toast(e.response.data.message, "error"),
    });
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
    return (
      <div className="container-grid">
        <div className="flex items-center justify-center flex-col mt-52 col-span-1 lg:col-span-11 gap-3">
          <div>
            <Empty description={error.response.data.errors[0]} />
          </div>
          <CustomButton
            onClick={() => {
              navigate("/reports", { replace: true });
            }}
          >
            بازگشت به صفحه گزارش ها
          </CustomButton>
        </div>
      </div>
    );
  }

  return (
    <div className="container-grid ">
      <div className="col-span-1 lg:col-span-11">
        <BackButton />
        <h3 className=" my-6 flex items-center justify-between px-3 gap-4 break-words ">
          <span className="lg:text-24 text-base font-bold line-clamp-1">
            {data?.name}
          </span>{" "}
          {data?.isEditable && (
            <CustomButton
              onClick={() => showModalDelete(true)}
              className="bg-white hover:text-white ml-1 w-10 h-10   text-custom-primary-color transition-all border-2 border-custom-primary-color border-solid rounded-full"
            >
              <span className="flex items-center justify-center   text-24">
                <MdDelete size={24} />
              </span>
            </CustomButton>
          )}
        </h3>
        {!data?.isEditable && user.userRole !== 0 && (
          <p className="flex items-center gap-2 my-4 bg-custom-primary-color/10 p-2 text-custom-primary-color rounded-lg">
            {" "}
            <span className="border border-custom-primary-color p-1 rounded-full">
              <AiOutlineInfo />
            </span>{" "}
            <span>زمان ویرایش به اتمام رسیده است</span>
          </p>
        )}
        <ReportBox data={data} userRole={user?.userRole} />
        <div className="mt-4  flex items-center  ">
          <CustomButton className="py-5  ">
            <Link to={`/projects/${data?.projectId}`}>نمایش پروژه مرتبط </Link>
          </CustomButton>
        </div>
        <ShowFiles
          isEditable={data?.isEditable}
          userRole={user.userRole}
          action="/api/report/uploadFile"
          data={{ id: data?._id, file: data?.files }}
        />
        <ReportGallery
          isEditable={data?.isEditable}
          id={data?._id}
          data={data?.files}
          userRole={user.userRole}
        />
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
