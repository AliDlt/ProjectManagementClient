import React, { useState } from "react";
import ReportCard from "../components/ui/Reports/ReportCard";
import useReports from "../hooks/useReports";
import CustomLoading from "../components/modules/CustomLoading";
import { Empty, Pagination } from "antd";
import CustomButton from "../components/modules/CustomButton";
import { IoAdd } from "react-icons/io5";
import MetaTag from "../components/modules/MetaTag";
import { Link } from "react-router-dom";

function ReportsPage() {
  const [page, setPage] = useState(1);

  const changePage = (e) => {
    setPage(e);
  };
  const { reportsData, isPending } = useReports(10, page);

  if (isPending) {
    return (
      <div className="container-grid">
        {" "}
        <div className="col-span-1 lg:col-span-11">
          <CustomLoading />{" "}
        </div>
      </div>
    );
  }
  if (!isPending && !reportsData?.reports) {
    return (
      <div className="container-grid">
        <div className="col-span-1 lg:col-span-11 flex min-h-[500px] justify-center items-center flex-col gap-7">
          <Empty description="گزارشی وجود ندارد" />
          <Link to={"/add-report"}>
            <CustomButton>گزارش جدید</CustomButton>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="container-grid ">
      <div className="lg:col-span-11">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-24 flex itec  "> گزارش ها </h3>
          <CustomButton className=" rounded-xl border-2 text-14 border-solid border-custom-primary-color !p-4 text-white ">
            <Link to="/add-report">افزودن گزارش</Link>
          </CustomButton>
        </div>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportsData?.reports.map(({ name, description, _id }, index) => {
            return (
              <>
                <ReportCard
                  key={index}
                  id={_id}
                  title={name}
                  description={description}
                />
              </>
            );
          })}
        </section>
      </div>
      <div className="col-span-1 lg:col-span-11" style={{ direction: "ltr" }}>
        <Pagination
          align="center"
          defaultCurrent={1}
          onChange={changePage}
          total={reportsData?.totalReports}
        />
      </div>{" "}
      <MetaTag title="گزارش های شما" description="گزارش شما" />
    </div>
  );
}

export default ReportsPage;
