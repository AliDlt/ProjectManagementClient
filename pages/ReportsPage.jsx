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
import { get, useForm } from "react-hook-form";
import CustomDatePicker from "../components/modules/CustomDatePicker";
import dayjs from "dayjs";
import { convertMillisecondsToDate, convertToLocalDate } from "../utils/tools";

function ReportsPage() {
  const { pathname } = useLocation();
  const [params, setParams] = useSearchParams();
  const { control, setValue, getValues } = useForm({
    mode: "onChange",
  });
  const [page, setPage] = useState(params.get("page") || 1);
  const [searchParams, setSearchParams] = useState(params.get("search") || "");

  const [value] = useDebounce(searchParams, 500);

  const navigate = useNavigate();

  const changePage = (e) => {
    searchHandler(e, "page");
    setPage(e);
  };

  const searchHandler = useDebouncedCallback((e, type) => {
    const current = new URLSearchParams(Array.from(params.entries()));
    const value = e?.trim();
    console.log(!!value)

    value ? current.set(type, e) : current.delete(type);
    const search = current.toString();
    const query = search ? `?${search}` : "";
    navigate(`${pathname}${query}`);
  }, 1000);

  const changeDate = (e) => {
    setValue("date", e);
    e ? searchHandler(convertToLocalDate(dayjs(e)), "date") : searchHandler('','date');
  };
  console.log(convertMillisecondsToDate(getValues("date")));
  console.log(getValues("date"));
  const { reportsData, isPending, error } = useReports(
    10,
    page,
    value,
    getValues("date")
      ? convertMillisecondsToDate(getValues("date"))
      : undefined,
  );
  console.log(getValues("date"));

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

        <div className="my-4 flex gap-2 lg:gap-0 justify-between">
          <div className="w-1/2">
            <CustomInput
              className=" px-3 py-2 lg:w-1/2"
              placeholder="جستجو"
              name="search"
              value={searchParams}
              onChange={(e) => {
                setSearchParams(e.target.value);
                searchHandler(e.target.value, "search");
              }}
            />
          </div>
          <div className="w-1/2 flex items-center ">
            <CustomDatePicker
              className=" px-3 py-2 lg:w-1/2"
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
      {reportsData?.reports.length !== 0 && error?.response.status !== 404 && (
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
