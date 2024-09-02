import CustomLoading from "../components/modules/CustomLoading";
import useProjects from "../hooks/projects/useProjects";
import { Empty } from "antd";
import CustomButton from "../components/modules/CustomButton";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ProjectItem from "../components/ui/projects/ProjectItem";
import { Fragment, useCallback, useMemo, useState } from "react";
import MetaTag from "../components/modules/MetaTag";
import CustomPagination from "../components/modules/CustomPagination";
import CustomInput from "../components/modules/CustomInput";
import useUser from "../hooks/useUser";
import { GrSearch } from "react-icons/gr";
import { useDebounce, useDebouncedCallback } from "use-debounce";

function ProjectsPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading: userLoading, user } = useUser();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [value] = useDebounce(search, 500);
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") || undefined,
  );
  const { data, error, isLoading } = useProjects(10, value, currentPage);

  // // Seach Handler
  const searchHandler = useDebouncedCallback((event) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    const value = event.target.value.trim();

    if (!value) {
      current.delete("search");
    } else {
      current.set("search", event.target.value);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    navigate(`${pathname}${query}`);
  }, 1000);

  // Error
  if (!isLoading && error)
    return (
      <div className="container lg:col-span-9 lg:p-0 2xl:col-span-10 h-96 flex justify-center items-center">
        {error.response.data.errors
          ? error.response.data.errors[0]
          : error.response.data.message}
      </div>
    );

  return (
    <section className="px-5 lg:px-0 lg:col-span-9 2xl:col-span-10 ">
      <div className="flex justify-between items-center">
        <h1 className=" text-24 lg:text-32">پروژه ها</h1>
        {!userLoading && user.userRole === 0 && (
          <CustomButton onClick={() => navigate("new-project")}>
            ایجاد پروژه جدید
          </CustomButton>
        )}
      </div>
      <div className="mt-10">
        <CustomInput
          className="lg:py-2.5 rounded-custom w-52 md:w-80 ml-auto"
          placeholder="جستجو"
          onChange={(event) => {
            setSearch(event.target.value.trim());
            searchHandler(event);
          }}
          value={search}
          icon={
            <GrSearch className="-scale-x-100 text-custom-primary-color w-5 h-5 ml-2" />
          }
          type="search"
        />
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 mt-10 gap-2">
        {data?.projects.length === 0 && (
          <Empty
            className="w-full col-span-full h-80 flex flex-col justify-center items-center"
            description=" پروژه ای وجود ندارد"
          />
        )}
        {isLoading ? (
          <div className="container lg:col-span-9 lg:p-0 2xl:col-span-10 h-96">
            <CustomLoading />
          </div>
        ) : (
          data?.projects?.map((project, index) => (
            <ProjectItem
              key={project._id}
              id={project._id}
              projectIndex={index}
              progress={project.progress}
              projectName={project.name}
              name={project.createdBy.name}
              surName={project.createdBy.surName}
              description={project.description}
              seeProjectBtn
            />
          ))
        )}
      </div>
      {!isLoading && data?.projects.length !== 0 && (
        <CustomPagination
          rootClassName="!my-16"
          align="center"
          current={data?.currentPage}
          onChange={(page) => {
            setSearchParams({
              page,
            });
            setCurrentPage(page);
          }}
          total={data?.totalProjects}
          pageSize={10}
        />
      )}
      {/* Meta Tags */}
      <MetaTag title="پروژه ها" description="لیست پروژه ها" />
    </section>
  );
}

export default ProjectsPage;
