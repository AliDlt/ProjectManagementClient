import React from "react";
import ReportChart from "../charts/ReportChart";

const ReportChartSection = () => {
  return (
    <div className="bg-white shadow-custom p-4 lg:p-7  text-lg rounded-custom border-custom-primary-color/50 border-r-4 border-b-4 ">
      <h3>گزارشات هفتگی</h3>
      <div className="mt-5 lg:px-6">
        <ReportChart />
      </div>
    </div>
  );
};

export default ReportChartSection;
