import React from "react";
import CustomDonutChart from "../charts/CustomDonutChart";

const ChartProjects = ({ name, startDate, data, id }) => {
  const optionsChart = [
    {
      breakpoint: 768,
      options: {
        chart: {
          width: "150px",
          height: "150px",
        },
      },
    },
    {
      breakpoint: 1080,
      options: {
        chart: {
          width: "140px",
          height: "140px",
        },
      },
    },
    {
      breakpoint: 2000,
      options: {
        chart: {
          width: "170px",
          height: "170px",
        },
      },
    },
    {
      breakpoint: 1280,
      options: {
        chart: {
          width: "130px",
          height: "130px",
        },
      },
    },
  ];
  return (
    <div className="flex  items-center justify-evenly lg:justify-evenly  mt-4 ">
      <div className="flex items-center justify-center  overflow-hidden h-full ">
        <CustomDonutChart
          colors={["#15ABFF", "#E5F6FF"]}
          data={data ? data : 0}
          innerLabel={true}
          option={optionsChart}
          projectStatus="وضعیت پروژه "
        />
      </div>
      <div className="   flex  w-1/3   items-center flex-nowrap ">
        <div className="flex flex-col gap-3">
          <p>
            <span className="font-bold">پروژه :</span>
            <span>{id}</span>
          </p>
          <p className="text-14 lg:text-16  font-bold line-clamp-1">
            <span className="font-bold">عنوان پروژه :</span>
            <span>{name}</span>
          </p>
     
     
        </div>
      </div>
    </div>
  );
};

export default ChartProjects;
