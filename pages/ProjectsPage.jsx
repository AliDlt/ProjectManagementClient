import CustomLoading from "../components/modules/CustomLoading";
import useProjects from "../hooks/projects/useProjects";
import { Empty } from "antd";
import CustomButton from "../components/modules/CustomButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProjectItem from "../components/ui/projects/ProjectItem";
import { Fragment, useState } from "react";
import MetaTag from "../components/modules/MetaTag";
import useProjectsTotalPages from "../hooks/projects/useProjectsTotalPages";
import CustomPagination from "../components/modules/CustomPagination";

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
    <section className="px-5 lg:px-0 lg:col-span-9 2xl:col-span-10 ">
      <div className="flex justify-between items-center">
        <h1 className=" text-24 lg:text-32">پروژه ها</h1>
        <CustomButton onClick={() => navigate("new-project")}>
          ایجاد پروژه جدید
        </CustomButton>
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
            <Fragment key={project._id}>
              <ProjectItem
                id={project._id}
                projectIndex={index}
                progress={project.progress}
                projectName={project.name}
                name={project.createdBy.name}
                surName={project.createdBy.surName}
                description={project.description}
                seeProjectBtn
              />
            </Fragment>
          ))
        )}
      </div>
      {!totalPagesLoading && totalPages.data !== 0 && (
        <CustomPagination
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
        />
      )}
      {/* Meta Tags */}
      <MetaTag title="پروژه ها" description="لیست پروژه ها" />
    </section>
  );
}

export default ProjectsPage;
