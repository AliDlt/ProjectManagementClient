import React, { useState } from "react";
import useUserReports from "../hooks/Report/useUserReports";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import CustomLoading from "../components/modules/CustomLoading";
import ReportCard from "../components/ui/Reports/ReportCard";
import { Pagination } from "antd";
import useUserName from "../hooks/useUserName";
import { useForm } from "react-hook-form";
import CustomInput from "../components/modules/CustomInput";
import { useDebounce, useDebouncedCallback } from "use-debounce";

const UserReports = () => {
  const { id } = useParams();
  const [params, setParams] = useSearchParams();
  const { control, watch, setValue } = useForm({
    mode: "onChange",
    defaultValues: { search: params.get("search") || "" },
  });
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [value] = useDebounce(watch("search"), 300);

  const handelSearch = useDebouncedCallback((e) => {
    const url = new URLSearchParams(Array.from(params.entries()));
    url.delete('page')
    setPage(1)
    e.target.value.trim()
      ? url.set("search", e.target.value)
      : url.delete("search");
    const search = url.toString();
    const query = search ? `?${search}` : "";
    navigate(`${pathname}${query}`);
  });

  const [page, setPage] = useState(1);
  const { data, error, isPending } = useUserReports(id, page, value);
  const { data: user, isLoading } = useUserName(id);
  if (isPending) {
    return (
      <div className="container-grid">
        <div className="col-span-1 lg:col-span-11">
          <CustomLoading />
        </div>
      </div>
    );
  }
  return (
    <div className="container-grid">
      <h3 className="text-24 col-span-11">گزارش های {user?.data.user.name} </h3>
      <div className="col-span-1 lg:col-span-11">
        <div className="mb-4">
          <div>
            <CustomInput
              onChange={(e) => {
                setValue("search", e.target.value);
                handelSearch(e);
              }}
              className="w-1/3 p-2"
              placeholder={"جستجو"}
              control={control}
              name="search"
            />
          </div>
          <div></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {data?.data.reports.map((report, key) => {
            return (
              <ReportCard
                description={report.description}
                id={report._id}
                title={report.name}
                key={key}
              />
            );
          })}
        </div>
        <Pagination
          current={data?.data.currentPage}
          onChange={(e) => {
            setPage(e);
            setParams({ page: e });
          }}
          align="center"
          style={{ direction: "ltr" }}
          total={data?.data.totalReports}
        />
      </div>
    </div>
  );
};

export default UserReports;