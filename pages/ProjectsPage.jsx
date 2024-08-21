import CustomLoading from "../components/modules/CustomLoading";
import useProjects from "../hooks/projects/useProjects";
import { Empty, Pagination, Progress } from "antd";
import CustomButton from "../components/modules/CustomButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import cn from "../utils/cn";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Fragment, useState } from "react";
import MetaTag from "../components/modules/MetaTag";
import useProjectsTotalPages from "../hooks/projects/useProjectsTotalPages";

function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get("page"));
  const { totalPages, totalPagesLoading } = useProjectsTotalPages();
  const { data, error, isLoading } = useProjects(10, currentPage);
  const navigate = useNavigate();

  // Error
  if (!isLoading && error)
    return (
      <div className="container lg:col-span-9 lg:p-0 2xl:col-span-10 h-96 flex justify-center items-center">
        {error.response.data.message}
      </div>
    );

  return (
    <section className="container lg:col-span-9 2xl:col-span-10">
      <h1 className=" text-24 lg:text-32">پروژه ها</h1>
      <div className=" grid grid-cols-1 gap-y-[1px] md:grid-cols-2">
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
            <Fragment key={project._id}>
              <div className="bg-custom-body-color flex justify-between flex-wrap items-end gap-2 py-7 md:px-7">
                <div className="flex items-center gap-5">
                  <Progress
                    className={cn([
                      "[&_.ant-progress-inner]:!size-20 [&_.ant-progress-inner]:xl:!size-32",
                      index % 2 === 0
                        ? "[&_.ant-progress-text]:text-custom-primary-color"
                        : "[&_.ant-progress-text]:text-custom-secondary-color",
                    ])}
                    strokeLinecap="butt"
                    type="circle"
                    percent={project.progress}
                    strokeWidth={15}
                    strokeColor={
                      index % 2 === 0
                        ? "rgb(var(--primary-color))"
                        : "rgb(var(--secondary-color))"
                    }
                    trailColor={
                      index % 2 === 0
                        ? "rgb(var(--primary-color) / 0.2)"
                        : "rgb(var(--secondary-color)  / 0.2)"
                    }
                  />
                  <div className="flex flex-col gap-1.5 text-14 lg:text-16">
                    <div className="flex items-center gap-1">
                      <span>پروژه</span>
                      <span>{project._id}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>عنوان پروژه : </span>
                      <span>{project.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>مدیر پروژه : </span>
                      <span>
                        {project.createdBy.name} {project.createdBy.surName}
                      </span>
                    </div>
                  </div>
                </div>
                <CustomButton
                  className="text-14 mr-auto"
                  onClick={() => navigate(`/projects/${project._id}`)}
                >
                  <span className="text-white"> مشاهده</span>
                </CustomButton>
              </div>
              {data.projects.length > 2 &&
                index % 2 !== 0 &&
                data.projects.length !== index + 1 && (
                  <hr className="h-[2px] bg-black w-full col-span-full" />
                )}
            </Fragment>
          ))
        )}
      </div>
      {!totalPagesLoading && totalPages.data !== 0 && (
        <Pagination
          rootClassName="!mt-16"
          align="center"
          current={currentPage}
          onChange={(page) => {
            setSearchParams({
              page,
            });
            setCurrentPage(page);
          }}
          total={totalPages.data}
          prevIcon={() => (
            <FaAngleRight className="mt-2 text-custom-primary-color" />
          )}
          nextIcon={() => (
            <FaAngleLeft className="mt-2 text-custom-primary-color" />
          )}
        />
      )}
      <div className="flex justify-center items-center mt-20">
        <CustomButton onClick={() => navigate("new-project")} className="p-6">
          ایجاد پروژه جدید
        </CustomButton>
      </div>
      {/* Meta Tags */}
      <MetaTag title="پروژه ها" description="لیست پروژه ها" />
    </section>
  );
}

export default ProjectsPage;
