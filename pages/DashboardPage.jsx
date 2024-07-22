import React from "react";
import ReportsSection from "../components/ui/dashboard/ReportsSection";
import ProjectSection from "../components/ui/dashboard/ProjectSection";
import DashboardHeader from "../components/ui/dashboard/DashboardHeader";

function DashboardPage() {
  return (
    <section className="lg:container grid grid-cols-1 gap-5 lg:grid-cols-12">
      <header className="lg:col-span-9 2xl:col-span-10 rounded-br-custom rounded-bl-custom lg:rounded-custom shadow-custom border-b-4 border-custom-primary-color/50 sticky top-0 bg-white z-10 lg:top-5">
        <DashboardHeader />
      </header>
      <aside className="lg:col-span-3 2xl:col-span-2 lg:row-start-1 lg:-row-end-9 hidden lg:block bg-emerald-600"></aside>
      <div className="container grid grid-cols-1 gap-10 lg:gap-5 lg:p-0 lg:grid-cols-7 2xl:grid-cols-11 lg:col-span-9 2xl:col-span-10">
        <h3 className="lg:hidden">کاربر عزیز، به داشبورد خوش آمدید.</h3>
        <div className="lg:col-span-7 xl:col-span-4 2xl:col-span-7 ">
          <ReportsSection />
        </div>
        <div className="lg:col-span-7 xl:col-span-3 2xl:col-span-4 ">
          <ProjectSection />
        </div>
        <div className="lg:col-span-7 xl:col-span-4 2xl:col-span-7 "></div>
        <div className="lg:col-span-7 xl:col-span-3 2xl:col-span-4 "></div>
      </div>
    </section>
  );
}

export default DashboardPage;
