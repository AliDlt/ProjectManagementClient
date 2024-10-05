import React from "react";
import CustomButton from "../../modules/CustomButton";
import useReports from "../../../hooks/useReports";
import CustomLoading from "../../modules/CustomLoading";
import { useNavigate } from "react-router-dom";
import { Empty } from "antd";
import { convertToLocalDate } from "../../../utils/tools";

function ReportsSection() {
  const { reportsData, isLoading, error } = useReports(2, 1);
  const navigate = useNavigate();

  // Handle Error
  if (error)
    return (
      <div className="shadow-custom p-6 flex flex-col gap-3 rounded-custom border-b-4 border-r-4 h-[95%] border-custom-primary-color/50 lg:p-7 bg-white">
        <h3 className="text-lg">گزارش ها</h3>
        <p className="flex justify-center items-center h-64">
          {error?.response?.data?.message ||
            "خطایی در ارتباط با سرور به وجود آمد."}
        </p>
      </div>
    );

  return (
    <div className="shadow-custom p-6 flex flex-col gap-3 rounded-custom border-b-4 border-r-4 border-custom-primary-color/50 lg:p-7 bg-white">
      <h3 className="text-lg">گزارش ها</h3>
      {!isLoading && !reportsData?.reports?.length && (
        <Empty
          className=" h-64 flex flex-col justify-center items-center"
          description="گزارشی وجود ندارد"
        />
      )}
      <div className="flex flex-col gap-3">
        {isLoading ? (
          <div className="h-96">
            <CustomLoading />
          </div>
        ) : (
          reportsData?.reports?.map((report) => (
            <ReportItem key={report._id} report={report} />
          ))
        )}
      </div>
      {!isLoading && !!reportsData?.reports?.length && (
        <CustomButton
          className="self-end text-sm mt-[2.6rem] "
          onClick={() => navigate("/reports")}
        >
          همه گزارش ها
        </CustomButton>
      )}
    </div>
  );
}

export default ReportsSection;

// Reports Item
const ReportItem = ({ report }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center px-2.5 py-3 border-2 border-custom-primary-color rounded-custom gap-3 lg:px-3 lg:py-4 xl:gap-10">
      <div className="flex  truncate flex-col gap-2">
        <div className="flex flex-col gap-2">
          <span className="font-bold ml-2 xl:ml-10">گزارش {report.name}</span>

          <p>
            <span>تاریخ : </span>
            <span>{convertToLocalDate(report.createdAt)}</span>
          </p>
        </div>
        <p className="text-sm truncate text-gray-600 font-bold mb-2 ">
          نویسنده : {report.createdBy.name} {report.createdBy.surName}
        </p>
        <p className="text-sm truncate "> {report.description}</p>
      </div>
      <CustomButton
        className="px-2 py-1 text-xs  mr-auto mt-auto"
        onClick={() => navigate(`/reports/${report._id}`)}
      >
        مشاهده
      </CustomButton>
    </div>
  );
};
