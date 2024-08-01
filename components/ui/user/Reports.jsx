import React from "react";
import ReportItem from "./ReportItem";
import CustomButton from "../../modules/CustomButton";
const reports = [
  {
    title: "پروژه 1 ",
    report:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است",
  },
  {
    title: "پروژه 1 ",
    report:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است",
  },
  {
    title: "پروژه 1 ",
    report:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است",
  },
];

const Reports = () => {
  return (
    <section>
      <h3 className="my-5 px-3">گزارش ها</h3>
      <div className="bg-white p-4 rounded-custom flex flex-col gap-5">
        {reports.map(({ title, report }) => {
          return <ReportItem title={title} report={report} />;
        })}
        <div className="">
          <CustomButton>همه گزارش ها</CustomButton>
        </div>
      </div>
    </section>
  );
};

export default Reports;
