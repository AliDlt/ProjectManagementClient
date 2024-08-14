import React from "react";
import CustomDonutChart from "../charts/CustomDonutChart";

const ChartProjects = ({ name, description, data }) => {
  const optionsChart = [
    {
      breakpoint: 768,
      options: {
        chart: {
          width: "98px",
          height: "98px",
        },
      },
    },
    {
      breakpoint: 1080,
      options: {
        chart: {
          width: "140",
          height: "140",
        },
      },
    },
    {
      breakpoint: 2000, 
      options: {
        chart: {
          width: "140px",
          height: "140px",
        },
      },
    },
    {
      breakpoint: 1080, 
      options: {
        chart: {
          width: "130px",
          height: "130px",
        },
      },
    },
  ];
  return (
    <div className="flex  items-center justify-center">
      <div className="flex items-center  overflow-hidden  ">
        <CustomDonutChart
          colors={["#15ABFF", "#E5F6FF"]}
          data={data ? data : 0}
          innerLabel={true}
          option={optionsChart}
          projectStatus="وضعیت پروژه "
        />
      </div>
      <div className="   flex flex-col w-1/2 gap-2 justify-center items-center flex-nowrap ">
        <p className="text-14 lg:text-16 text-center font-bold">{name}</p>
        <p className="text-8 md:text-12   font-bold text-ellipsis text-nowrap">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ChartProjects;
