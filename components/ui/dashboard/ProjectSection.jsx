import React, { Fragment } from "react";
import CustomButton from "../../modules/CustomButton";
import CustomLoading from "../../modules/CustomLoading";
import { Empty } from "antd";
import useProjects from "../../../hooks/projects/useProjects";
import { Link, useNavigate } from "react-router-dom";
import ProjectProgress from "../projects/ProjectProgress";

function ProjectSection() {
  const { data, isLoading, error } = useProjects(2);
  const navigate = useNavigate();

  // Handle Error
  if (error)
    return (
      <div className="shadow-custom p-6 flex flex-col gap-3 rounded-custom border-b-4 border-r-4 h-[95%] border-custom-primary-color/50 lg:p-7 bg-white">
        <h3 className="text-lg">پروژه ها</h3>
        <p className="flex justify-center items-center h-64">
          {error?.response?.data?.message ||
            "خطایی در ارتباط با سرور به وجود آمد."}
        </p>
      </div>
    );

  return (
    <div className="shadow-custom bg-white p-6 flex flex-col gap-5 rounded-custom border-b-4 border-l-4 border-custom-primary-color/50 lg:p-7 ">
      <h3 className="text-lg">پروژه ها</h3>
      {isLoading && (
        <div className="flex justify-center items-center h-[302px]">
          <CustomLoading />
        </div>
      )}
      {!isLoading && !data?.projects?.length && (
        <Empty
          description=" پروژه ای وجود ندارد"
          className="flex flex-col justify-center items-center h-[302px]"
        />
      )}
      <div className="flex flex-col lg:flex-row justify-between my-5 xl:flex-col">
        {!isLoading &&
          !!data?.projects?.length &&
          data?.projects?.map((project, index) => (
            <Fragment key={project._id}>
              <Link
                to={`/projects/${project._id}`}
                className="flex flex-col sm:flex-row gap-5 justify-start items-center lg:flex-row"
              >
                <ProjectProgress
                  projectIndex={index}
                  progress={project.progress}
                  className="[&_.ant-progress-inner]:!size-20 [&_.ant-progress-inner]:xl:!size-28 [&_.ant-progress-inner]:sm:!size-32"
                />
                <div className="flex flex-col gap-1.5 text-14 lg:text-16 w-full">
                  <div className="flex items-center gap-1">
                    <span className="font-bold">پروژه</span>
                    <span>{project._id}</span>
                  </div>
                  <div className="flex items-center gap-1 text-nowrap">
                    <span className="font-bold">عنوان پروژه : </span>
                    <span className="truncate max-w-16">{project.name}</span>
                  </div>
                  <div className="flex items-center gap-1 text-nowrap lg:w-[228px] truncate">
                    <span className="font-bold">مدیر پروژه : </span>
                    <span className="truncate max-w-28">
                      {project?.createdBy?.name} {project?.createdBy?.surName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-nowrap">
                    <span className="font-bold">توضیحات پروژه : </span>
                    <span className="truncate max-w-28">
                      {project.description}
                    </span>
                  </div>
                </div>
              </Link>
              {index + 1 !== data?.projects?.length && (
                <hr className="my-5 border-0 h-[1px] bg-black/50 lg:my-8" />
              )}
            </Fragment>
          ))}
      </div>
      {!isLoading && !!data?.projects?.length && (
        <CustomButton
          className="self-end text-sm"
          onClick={() => navigate("/projects")}
        >
          همه پروژه ها
        </CustomButton>
      )}
    </div>
  );
}

export default ProjectSection;
