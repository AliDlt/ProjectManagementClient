import React, { useState } from "react";
import ReportCard from "../components/ui/Reports/ReportCard";
import useReports from "../hooks/useReports";
import CustomLoading from "../components/modules/CustomLoading";
import { Empty, Pagination } from "antd";
import CustomButton from "../components/modules/CustomButton";
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
import dayjs from "dayjs";
import { convertMillisecondsToDate, convertToLocalDate } from "../utils/tools";

function ReportsPage() {
  const { pathname } = useLocation();
  const [params, setParams] = useSearchParams();
  const { control, setValue, getValues } = useForm({
    mode: "onChange",
    defaultValues: {
      date: undefined,
    },
  });
  const [page, setPage] = useState(params.get("page") || 1);
  const [searchParams, setSearchParams] = useState(params.get("search") || "");

  const [value] = useDebounce(searchParams, 200);

  const navigate = useNavigate();

  const changePage = (e) => {
    searchHandler(e, "page");
    setPage(e);
  };

  const searchHandler = useDebouncedCallback((e, type) => {
    const current = new URLSearchParams(Array.from(params.entries()));
    const value = e?.trim();

    value ? current.set(type, e) : current.delete(type);
    const search = current.toString();
    const query = search ? `?${search}` : "";
    navigate(`${pathname}${query}`);
  }, 1000);

  const changeDate = (e) => {
    setValue("date", e);
    e
      ? searchHandler(convertToLocalDate(dayjs(e)), "date")
      : searchHandler("", "date");
  };
  const { reportsData, isPending, error } = useReports(
    10,
    page,
    value,
    getValues("date")
      ? convertMillisecondsToDate(getValues("date"))
      : undefined,
  );

  return (
    <div className="container-grid ">
      <div className="lg:col-span-11">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-24 flex itec  "> گزارش ها </h3>
          <CustomButton className=" rounded-xl border-2 text-14 border-solid border-custom-primary-color !p-4 text-white ">
            <Link to="/add-report">افزودن گزارش</Link>
          </CustomButton>
        </div>

        <div className="my-4 flex gap-6 flex-col lg:flex-row lg:gap-4 justify-between">
          <div className=" w-full lg:w-1/2">
            <CustomInput
              className=" px-3 py-2 w-full "
              placeholder="جستجو"
              name="search"
              value={searchParams}
              onChange={(e) => {
                setSearchParams(e.target.value);
                searchHandler(e.target.value, "search");
              }}
            />
          </div>

          <div className="w-full flex gap-2 items-center ">
            <CustomDatePicker
              className=" px-3 py-2 w-full lg:w-1/2"
              control={control}
              name="date"
              changeHandler={changeDate}
            />
          </div>
          <div className="flex gap-4 items-center justify-center">
            {console.log(convertToLocalDate(dayjs(new Date()).add(-1, "day")))}
            {console.log(convertToLocalDate(dayjs(getValues("date"))))}

            <CustomButton
              onClick={() => changeDate(dayjs(new Date()).add(-1, "day"))}
              className={`w-1/3 px-8 
                border-custom-primary-color
                ${
                  convertToLocalDate(dayjs(new Date()).add(-1, "day")) ===
                    convertToLocalDate(dayjs(getValues("date"))) &&
                  "bg-transparent border  text-custom-primary-color hover:text-white transition-all"
                }`}
            >
              دیروز
            </CustomButton>
            <CustomButton
              onClick={() => changeDate(dayjs(new Date()))}
              className={`w-1/3 px-8   
                border-custom-primary-color
                ${
                  convertToLocalDate(dayjs(new Date())) ===
                    convertToLocalDate(dayjs(getValues("date"))) &&
                  params.get("date") &&
                  "bg-transparent border  text-custom-primary-color hover:text-white transition-all"
                }`}
            >
              امروز
            </CustomButton>
            <CustomButton
              onClick={() => {
                setValue("date", "");
                changeDate(undefined);
              }}
              className={`w-1/3  px-8 
                border-custom-primary-color
                ${
                  !params.get("date") &&
                  "bg-transparent border  text-custom-primary-color hover:text-white transition-all "
                }`}
            >
              کل گزارشات
            </CustomButton>
          </div>
        </div>

        {!reportsData?.reports.length && !isPending && (
          <div className="container-grid">
            <div className="col-span-1 lg:col-span-11 flex min-h-[500px] justify-center items-center flex-col gap-7">
              <Empty description="گزارشی وجود ندارد" />
            </div>
          </div>
        )}

        {isPending ? (
          <div className="container-grid">
            <div className="col-span-1 lg:col-span-11">
              <CustomLoading />
            </div>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportsData?.reports.map(
              ({ name, description, _id, createdBy, date }, index) => {
                return (
                  <>
                    {console.log(reportsData.reports[index])}
                    <ReportCard
                      date={date}
                      createBy={createdBy}
                      key={index}
                      id={_id}
                      title={name}
                      description={description}
                    />
                  </>
                );
              },
            )}
          </section>
        )}
      </div>
        {console.log(reportsData)}
      {reportsData?.reports.length !== 0 && error?.response.status !== 404 && (
        <div className="col-span-1 lg:col-span-11" style={{ direction: "ltr" }}>
          <Pagination
            align="center"
            defaultCurrent={1}
            onChange={changePage}
            total={reportsData?.totalReports}
            showLessItems={false}
            defaultPageSize={reportsData?.totalPage}
          />
        </div>
      )}
      <MetaTag title="گزارش های شما" description="گزارش شما" />
    </div>
  );
}

export default ReportsPage;
