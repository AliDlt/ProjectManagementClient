import React from "react";
import ReportCard from "../components/ui/Reports/ReportCard";

function ReportsPage() {
  return (
    <div className="container-grid ">
      <div className="lg:col-span-7">
        <h3 className="text-24 mb-6  "> گزارش ها </h3>
        <section className="flex flex-col gap-4">
          <ReportCard title={"پروژه معتد"} />
          <ReportCard title={"پروژه معتد"} />
          <ReportCard title={"پروژه معتد"} />
          <ReportCard title={"پروژه معتد"} />
          <ReportCard title={"پروژه معتد"} />
        </section>
      </div>
    </div>
  );
}

export default ReportsPage;
