import React from "react";
import ReportItem from "./ReportItem";
import CustomButton from "../../modules/CustomButton";
import CustomLoading from "../../modules/CustomLoading";
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

const Reports = ({ reports, isPending, error }) => {
  return (
    <section className="h-full flex flex-col gap-4">
      <h3 className=" px-3">گزارش ها</h3>
      <div className="bg-white h-full p-4  rounded-custom border-l-2 border-b-2 border-custom-primary-color flex flex-col gap-5">
        {isPending ? (
          <CustomLoading />
        ) : (
          <>
            {reports?.length ? (
              <>
                {reports.map(({ description, name,key }) => {
                  return <ReportItem title={name} report={description} key={key} />;
                })}
                <div className="">
                  <CustomButton>همه گزارش ها</CustomButton>
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center">
                {" "}
                گزارشی وجود ندارد{" "}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Reports;
