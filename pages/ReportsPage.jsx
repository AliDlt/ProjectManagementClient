import React, { useState } from "react";
import ReportCard from "../components/ui/Reports/ReportCard";
import useReports from "../hooks/useReports";
import CustomLoading from "../components/modules/CustomLoading";
import { Empty, Pagination } from "antd";
import CustomButton from "../components/modules/CustomButton";
import { IoAdd } from "react-icons/io5";
import MetaTag from "../components/modules/MetaTag";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import CustomInput from "../components/modules/CustomInput";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import { useForm } from "react-hook-form";
import CustomDatePicker from "../components/modules/CustomDatePicker";

function ReportsPage() {
  const { pathname } = useLocation();
  const [params, setParams] = useSearchParams();
  const changeDate = (e) => {
    setParams({
      date: "sss",
    });
  };
  const { control, watch } = useForm({
    mode: "onChange",
    defaultValues: { search: params.get("search") || "" },
  });

  const [page, setPage] = useState(params.get("page") || 1);
  const [value] = useDebounce(watch("search"), 500);
  const navigate = useNavigate();
  const { reportsData, isPending, error } = useReports(10, page, value);
  console.log(error);
  const changePage = (e) => {
    setPage(e);
  };
  const searchHandler = useDebouncedCallback((e) => {
    const current = new URLSearchParams(Array.from(params.entries()));
    const value = e.target.value.trim();
    value ? current.set("search", e.target.value) : current.delete("search");
    const search = current.toString();
    console.log(search);
    const query = search ? `?${search}` : "";
    console.log(query);
    navigate(`${pathname}${query}`);
  }, 1000);

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

  return (
    <div className="container-grid ">
      <div className="lg:col-span-11">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-24 flex itec  "> گزارش ها </h3>
          <CustomButton className=" rounded-xl border-2 text-14 border-solid border-custom-primary-color !p-4 text-white ">
            <Link to="/add-report">اضافه کردن گزارش</Link>
          </CustomButton>
        </div>

        <div className="my-4 flex justify-between">
          <div>
            <CustomInput
              className=" px-3 py-2"
              placeholder="جستجو"
              control={control}
              name="search"
              onChange={(e) => {
                searchHandler(e);
              }}
            />
          </div>
          <div className="w-1/2 flex items-center ">
            <CustomDatePicker
              className=" px-3 py-2 w-1/2"
              control={control}
              name="date"
              changeHandler={changeDate}
            />
          </div>
        </div>
        {!reportsData?.reports.length && (
          <div className="container-grid">
            <div className="col-span-1 lg:col-span-11 flex min-h-[500px] justify-center items-center flex-col gap-7">
              <Empty description="گزارشی وجود ندارد" />
            </div>
          </div>
        )}
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
      {reportsData?.reports.length !== 0 && (
        <div className="col-span-1 lg:col-span-11" style={{ direction: "ltr" }}>
          <Pagination
            align="center"
            defaultCurrent={1}
            onChange={changePage}
            total={reportsData?.totalReports}
          />
        </div>
      )}
      <MetaTag title="گزارش های شما" description="گزارش شما" />
    </div>
  );
}

export default ReportsPage;
