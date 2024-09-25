import React from "react";
import ReportItem from "./ReportItem";
import CustomButton from "../../modules/CustomButton";
import CustomLoading from "../../modules/CustomLoading";
import { Empty } from "antd";
import { Link, useParams } from "react-router-dom";
import ReportCard from "../Reports/ReportCard";

const Reports = ({ reports, isPending, error,user }) => {
  const { id } = useParams();
  return (
    <section className="h-full flex flex-col gap-4">
      <h3 className=" px-3">گزارش ها</h3>
      <div className="bg-white h-full p-4  rounded-custom border-l-2 border-b-2 border-custom-primary-color flex flex-col justify-between gap-5">
        {isPending ? (
          <CustomLoading />
        ) : (
          <>
            {reports?.length !== 0 ? (
              <>
                {reports.map((report, key) => {
                  return (
                    key < 2 && (
                      <ReportCard
                        createBy={user}
                        shadow={true}
                        title={report.name}
                        description={report.description}
                        id={report._id}
                        date={report.createdAt}
                        key={key}
                      />
                    )
                  );
                })}
                <div className="justify-end">
                  <Link to={`/userReports/${id}`}>
                    <CustomButton>همه گزارش ها</CustomButton>
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center h-full">
                {" "}
                <Empty description="گزارشی برای کاربر وجود ندارد" />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Reports;
