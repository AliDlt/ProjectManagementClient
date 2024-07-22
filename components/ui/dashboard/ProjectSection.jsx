import React from "react";
import CustomButton from "../../modules/CustomButton";
import CustomDonutChart from "../charts/CustomDonutChart";

function ProjectSection() {
  return (
    <div className="shadow-custom p-6 flex flex-col gap-5 rounded-custom border-b-4 border-l-4 border-custom-primary-color-300 lg:p-7 ">
      <h3 className="text-lg">پروژه ها</h3>
      <div>
        <ProjectItems
          projectNum={1}
          chartColors={["#15ABFF", "#E5F6FF"]}
          chartData={72}
          projectStatus="وضعیت پروژه "
        />
        <hr className="my-5 border-0 h-[1px] bg-black/50 lg:my-8" />
        <ProjectItems
          projectNum={2}
          chartColors={["#F1A25B", "#FFEBD9"]}
          chartData={69}
          projectStatus="وضعیت پروژه "
        />
      </div>
      <CustomButton className="self-start text-sm">دیگر پروژه ها</CustomButton>
    </div>
  );
}

export default ProjectSection;

// Project Item
const ProjectItems = ({
  projectNum,
  projectStatus,
  chartColors,
  chartData,
}) => {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs sm:text-lg font-bold lg:text-xl xl:text-base 2xl:text-xl">
        پروژه {projectNum}
      </span>
      <div className="w-40 sm:w-52 xl:w-44 2xl:w-48">
        <CustomDonutChart colors={chartColors} data={chartData} />
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
