import React, { useState } from "react";
import ReportCard from "../components/ui/Reports/ReportCard";
import useReports from "../hooks/useReports";
import CustomLoading from "../components/modules/CustomLoading";
import { Pagination } from "antd";
import CustomButton from "../components/modules/CustomButton";
import { IoAdd } from "react-icons/io5";

function ReportsPage() {
  const [page, setPage] = useState(1);

  const changePage = (e) => {
    setPage(e);
  };
  const { reportsData, isPending } = useReports(10, page);
  console.log(reportsData);
  if (isPending) {
    return (
      <div className="col-span-1 lg:col-span-9">
        {" "}
        <CustomLoading />{" "}
      </div>
    );
  }
  return (
    <div className="container-grid ">
      <div className="lg:col-span-7">
        <div className="flex justify-between items-center">
          <h3 className="text-24 mb-6  "> گزارش ها </h3>
          <CustomButton className="bg-transparent text-custom-primary-color border-2 border-solid border-custom-primary-color !p-2 hover:text-white">
            <IoAdd />
          </CustomButton>
        </div>
        <section className="flex flex-col gap-4">
          {reportsData?.reports.map(({ name, description, _id }, index) => {
            return (
              <ReportCard
                key={index}
                id={_id}
                title={name}
                description={description}
              />
            );
          })}
        </section>
      </div>
      <div className="col-span-1 lg:col-span-9" style={{ direction: "ltr" }}>
        <Pagination
          align="center"
          defaultCurrent={1}
          onChange={changePage}
          total={reportsData?.totalReports}
        />
      </div>{" "}
    </div>
  );
}

export default ReportsPage;
