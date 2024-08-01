import React from "react";
import ChartProjects from "./ChartProjects";
import CustomButton from "../../modules/CustomButton";
const repeat = [1, 2, 3, 4];
const Projects = () => {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="pr-4">پروژه ها</h4>
      <div className="shadow-custom bg-white border-b-2 border-l-2 flex flex-col gap-3 border-custom-primary-color rounded-custom p-2">
        <div className="grid grid-cols-4 w-full h-full ">
          {repeat.map((item) => {
            return <ChartProjects />;
          })}
        </div>
        <div>
          <CustomButton>دیگر پروژه ها</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default Projects;
