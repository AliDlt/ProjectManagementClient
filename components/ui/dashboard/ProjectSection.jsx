import React, { Fragment } from "react";
import CustomButton from "../../modules/CustomButton";
import CustomDonutChart from "../charts/CustomDonutChart";
import CustomLoading from "../../modules/CustomLoading";
import { Empty } from "antd";
import useProjects from "../../../hooks/projects/useProjects";

const optionChart = [
  {
    breakpoint: 768,
    options: {
      chart: {
        width: "150px",
        height: "150px",
      },
    },
  },
];
function ProjectSection() {
  const { data, isLoading, error } = useProjects(2);

  // Handle Error
  if (error)
    return (
      <div className="shadow-custom p-6 flex flex-col gap-3 rounded-custom border-b-4 border-r-4 h-[95%] border-custom-primary-color/50 lg:p-7 bg-white">
        <h3 className="text-lg">گزارش ها</h3>
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
              option={optionChart}
              projectName={project.name}
              chartColors={["#15ABFF", "#E5F6FF"]}
              chartData={project.progress}
              projectStatus={project.situation}
            />
            {index + 1 !== data?.projects?.length && (
              <hr className="my-5 border-0 h-[1px] bg-black/50 lg:my-8" />
            )}
          </Fragment>
        ))}
      {!isLoading && !!data?.projects?.length && (
        <CustomButton className="self-start text-sm">
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
  chartColors,
  chartData,
}) => {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs sm:text-lg font-bold lg:text-xl xl:text-base 2xl:text-xl">
        {projectName}
      </span>
      <div className=" sm:w-52 xl:w-44 2xl:w-48">
        <CustomDonutChart
          option={optionChart}
          colors={chartColors}
          data={chartData}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span
          className="font-extrabold text-2xl 2xl:text-4xl"
          style={{
            color: chartColors[0],
          }}
        >
          {chartData}%
        </span>
        <span className="text-xs sm:text-lg lg:text-base">{projectStatus}</span>
      </div>
    </div>
  );
};
