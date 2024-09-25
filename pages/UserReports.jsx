import React, { useEffect, useState } from "react";
import useUserReports from "../hooks/Report/useUserReports";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import CustomLoading from "../components/modules/CustomLoading";
import ReportCard from "../components/ui/Reports/ReportCard";
import { Empty } from "antd";
import useUserName from "../hooks/useUserName";
import CustomInput from "../components/modules/CustomInput";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import BackButton from "../components/modules/BackButton";
import { GrSearch } from "react-icons/gr";
import CustomPagination from "../components/modules/CustomPagination";
import useUser from "../hooks/useUser";

const UserReports = () => {
  const { id } = useParams();
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState(params.get("search") || "");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [value] = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const { data, error, isPending } = useUserReports(id, page, value);

  const { data: user, isLoading } = useUserName(id);
  const { user: userInfo, isLoading: userLoading } = useUser();
  if (error && !isPending) {
    return (
      <div className="container-grid">
        <div className="flex items-center justify-center flex-col mt-52 col-span-1 lg:col-span-11 gap-3">
          <div>
            <Empty
              description={error.response.data.errors[0]}
              style={{ fontSize: "24px" }}
            />
          </div>
          <CustomButton
            onClick={() => {
              navigate("/dashboard", { replace: true });
            }}
          >
            بازگشت به داشبورد
          </CustomButton>
        </div>
      </div>
    );
  }
  useEffect(() => {
    if (!userLoading && userInfo && userInfo.userRole === 2) {
      navigate("/", { replace: true });
      toast("شما به این صفحه دسترسی ندارید .", "error");
    }
  }, [userLoading, user]);

  // Search Param
  const handelSearch = useDebouncedCallback((e) => {
    const current = new URLSearchParams(Array.from(params.entries()));

    if (!value) {
      current.delete("search");
    } else {
      current.set("search", event.target.value);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    navigate(`${pathname}${query}`);
  }, 500);

  if (!isPending && error) {
    return (
      <div className="container-grid flex flex-col justify-center items-center h-[30rem]">
        <Empty
          description={
            error?.response?.data?.errors
              ? error?.response?.data?.errors[0]
              : error?.response?.data?.message
          }
        />
        <BackButton />
      </div>
    );
  }

  return (
    <div className="container-grid">
      <div className="flex flex-wrap items-center gap-5 col-span-1 lg:col-span-11">
        <BackButton />
        <h3 className="text-24">گزارش های {user?.data.user.name}</h3>
      </div>
      <div className="col-span-1 lg:col-span-11">
        <div className="mb-4">
          <div>
            <CustomInput
              icon={
                <GrSearch className="-scale-x-100 text-custom-primary-color w-5 h-5 ml-2" />
              }
              onChange={(e) => {
                setSearch(e.target.value.trim());
                handelSearch(e);
              }}
              className=" py-2 lg:py-2.5 rounded-custom w-full lg:w-1/3 md:w-80 ml-auto"
              value={search}
              placeholder={"جستجو"}
              name="search"
              type="search"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {!isPending && !data?.data && (
            <div className="col-span-full h-80 flex justify-center items-center">
              <Empty description="گزارشی وجود ندارد" />
            </div>
          )}
          {isPending ? (
            <div className="col-span-full h-80">
              <CustomLoading />
            </div>
          ) : (
            data?.data?.reports.map((report, key) => {
              return (
                <ReportCard
                  createBy={user.data.user}
                  description={report.description}
                  id={report._id}
                  date={report.date}
                  title={report.name}
                  key={key}
                />
              );
            })
          )}
        </div>
        {!isPending && data?.data && (
          <CustomPagination
            current={data?.data?.currentPage}
            onChange={(e) => {
              setPage(e);
              setParams({ page: e });
            }}
            align="center"
            total={data?.data?.totalReports}
          />
        )}
      </div>
    </div>
  );
};

export default UserReports;
