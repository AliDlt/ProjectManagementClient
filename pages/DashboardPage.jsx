import React from "react";
import ReportsSection from "../components/ui/dashboard/ReportsSection";
import ProjectSection from "../components/ui/dashboard/ProjectSection";
import DashboardHeader from "../components/ui/dashboard/DashboardHeader";
import DashboardSideBar from "../components/ui/dashboard/DashboardSideBar";
import SideBarContextProvider from "../Context/SideBarContext";
import ReportChartSection from "../components/ui/dashboard/ReportChartSection";

function DashboardPage() {
  return (
    <SideBarContextProvider>
      <section className="lg:container grid grid-cols-1 gap-5 lg:grid-cols-12">
        <header className="lg:col-span-9 2xl:col-span-10 rounded-br-custom rounded-bl-custom lg:rounded-custom shadow-custom border-b-4 border-custom-primary-color/50 sticky top-0 bg-white z-10">
          <DashboardHeader />
        </header>
        <DashboardSideBar />
        <div className="container  grid grid-cols-1 gap-10 lg:gap-5 lg:p-0 lg:grid-cols-7 2xl:grid-cols-11 lg:col-span-9 2xl:col-span-10">
          <h3 className="lg:hidden">کاربر عزیز، به داشبورد خوش آمدید.</h3>
          <div className="lg:col-span-7 xl:col-span-4 2xl:col-span-7 ">
            <ReportsSection />
          </div>
          <div className="lg:col-span-7 xl:col-span-3 2xl:col-span-4 ">
            <ProjectSection />
          </div>
          <div className="lg:col-span-7 xl:col-span-4 2xl:col-span-7 "><ReportChartSection /></div>
          <div className="lg:col-span-7 xl:col-span-3 2xl:col-span-4 "></div>
        </div>
      </section>
    </SideBarContextProvider>
  );
}

export default DashboardPage;
