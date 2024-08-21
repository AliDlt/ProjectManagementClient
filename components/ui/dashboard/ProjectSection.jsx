import React, { Fragment } from "react";
import CustomButton from "../../modules/CustomButton";
import CustomLoading from "../../modules/CustomLoading";
import { Empty, Progress } from "antd";
import useProjects from "../../../hooks/projects/useProjects";
import { useNavigate } from "react-router-dom";

function ProjectSection() {
  const { data, isLoading, error } = useProjects(2);
  const navigate = useNavigate();

  // Handle Error
  if (error)
    return (
      <div className="shadow-custom p-6 flex flex-col gap-3 rounded-custom border-b-4 border-r-4 h-[95%] border-custom-primary-color/50 lg:p-7 bg-white">
        <h3 className="text-lg">پروژه ها</h3>
        <p className="flex justify-center items-center h-64">
          {error?.response?.data?.message}
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
      {!isLoading &&
        !!data?.projects?.length &&
        data?.projects?.map((project, index) => (
          <Fragment key={project._id}>
            <ProjectItems
              projectName={project.name}
              progressColors={
                index % 2 === 0
                  ? ["#15ABFF", "#E5F6FF"]
                  : ["#F1A25B", "#FDECDE"]
              }
              progressValue={project.progress}
              projectStatus={project.situation}
            />
            {index + 1 !== data?.projects?.length && (
              <hr className="my-5 border-0 h-[1px] bg-black/50 lg:my-8" />
            )}
          </Fragment>
        ))}
      {!isLoading && !!data?.projects?.length && (
        <CustomButton
          className="self-start text-sm"
          onClick={() => navigate("/projects")}
        >
          دیگر پروژه ها
        </CustomButton>
      )}
    </div>
  );
}

export default ProjectSection;

// Project Item
const ProjectItems = ({
  projectName,
  projectStatus,
  progressColors,
  progressValue,
}) => {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs sm:text-lg font-bold lg:text-xl xl:text-base 2xl:text-xl">
        {projectName}
      </span>
      <Progress
        className="[&_.ant-progress-inner]:!size-20 [&_.ant-progress-inner]:md:!size-28 [&_.ant-progress-inner]:xl:!size-28"
        showInfo={false}
        strokeLinecap="butt"
        type="circle"
        percent={progressValue}
        strokeWidth={15}
        strokeColor={progressColors[0]}
        trailColor={progressColors[1]}
      />
      <div className="flex flex-col items-center gap-2">
        <span
          className="font-extrabold text-2xl 2xl:text-4xl"
          style={{
            color: progressColors[0],
          }}
        >
          {progressValue}%
        </span>
        <span className="text-xs sm:text-lg lg:text-base">{projectStatus}</span>
      </div>
    </div>
  );
};
