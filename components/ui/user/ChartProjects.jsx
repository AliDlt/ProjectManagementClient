import React from "react";
import CustomDonutChart from "../charts/CustomDonutChart";

const ChartProjects = () => {
  return (
    <div className="flex flex-col gap-3 items-center overflow-hidden">
      <div className="   flex flex-col justify-center items-center">
        <p className="text-14 font-bold">پروژه 3</p>
        <p className="text-12 font-bold">عنوان پروژه</p>
      </div>
      <div className="flex items-center justify-center overflow-hidden">
        <CustomDonutChart
          colors={["#15ABFF", "#E5F6FF"]}
          data={72}
          innerLabel={true}
          projectStatus="وضعیت پروژه "
        />
      </div>
    </div>
  );
};

export default ChartProjects;
