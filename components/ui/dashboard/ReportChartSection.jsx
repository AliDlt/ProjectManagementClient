import React from "react";
import ReportChart from "../charts/ReportChart";
import useChartReportDashboard from "../../../hooks/useChartReportDashboard";
import CustomLoading from "../../modules/CustomLoading";
import useUser from "../../../hooks/useUser";

const ReportChartSection = () => {
  const {user} = useUser()
  const { data, error, isLoading } = useChartReportDashboard(user?._id);
  return (
    <div className="bg-white shadow-custom p-4 lg:p-7  text-lg rounded-custom border-custom-primary-color/50 border-r-4 border-b-4 ">
      {isLoading ? (
        <>
          {" "}
          <CustomLoading />{" "}
        </>
      ) : (
        <>
          <h3>گزارشات هفتگی</h3>
          <div className="mt-5 lg:px-6">
            <ReportChart data={data?.data} />
          </div>
        </>
      )}
    </div>
  );
};

export default ReportChartSection;
