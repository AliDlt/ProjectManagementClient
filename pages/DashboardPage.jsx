import React from "react";
import ReportsSection from "../components/ui/dashboard/ReportsSection";
import ProjectSection from "../components/ui/dashboard/ProjectSection";
import ReportChartSection from "../components/ui/dashboard/ReportChartSection";
import Messages from "../components/ui/dashboard/Messages";
import { Badge } from "antd";
import StatusBadge from "../components/modules/StatusBadge";

function DashboardPage() {
  return (
    <div className="container grid grid-cols-1 gap-10 lg:gap-5 lg:p-0 lg:grid-cols-7 2xl:grid-cols-11 lg:col-span-9 2xl:col-span-10">
      <h3 className="lg:hidden">کاربر عزیز، به داشبورد خوش آمدید.</h3>
      <div className="lg:col-span-7 xl:col-span-4 2xl:col-span-7 ">
        <ReportsSection />
      </div>
      <div className="lg:col-span-7 xl:col-span-3 2xl:col-span-4 ">
        <ProjectSection />
      </div>
      <div className="lg:col-span-7 xl:col-span-4 2xl:col-span-7 ">
        <ReportChartSection />
      </div>
      <div className="lg:col-span-7 xl:col-span-3 2xl:col-span-4  ">
        <Messages />
      </div>
    </div>
  );
}

export default DashboardPage;
