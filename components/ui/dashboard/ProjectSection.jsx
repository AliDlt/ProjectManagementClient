import React from "react";
import CustomButton from "../../modules/CustomButton";
import CustomDonutChart from "../charts/CustomDonutChart";

function ProjectSection() {
  return (
    <div className="shadow-custom bg-white  p-6 flex flex-col gap-5 rounded-custom border-b-4 border-l-4 border-custom-primary-color/50 lg:p-7 ">
      <h3 className="text-lg">پروژه ها</h3>
      <div>
        <div className="flex justify-between items-center">
          <span className="font-bold lg:text-xl xl:text-base 2xl:text-xl">
            پروژه 1
          </span>
          <div className="w-40 sm:w-52 xl:w-44 2xl:w-48">
            <CustomDonutChart colors={["#15ABFF", "#E5F6FF"]} data={72} />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-custom-secondary-color font-extrabold text-2xl 2xl:text-4xl">
              72%
            </span>
            <span className="text-sm">10 میلیارد تومان</span>
          </div>
        </div>
        <hr className="my-5 border-0 h-[1px] bg-black/50 lg:my-8" />
        <div className="flex justify-between items-center">
          <span className="font-bold lg:text-xl xl:text-base 2xl:text-xl">
            پروژه 2
          </span>
          <div className="w-40 sm:w-52 xl:w-44 2xl:w-48">
            <CustomDonutChart colors={["#F1A25B", "#FFEBD9"]} data={60} />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-custom-primary-color font-extrabold text-2xl 2xl:text-4xl">
              60%
            </span>
            <span className="text-sm">10 میلیارد تومان</span>
          </div>
        </div>
      </div>
      <CustomButton className="self-start text-sm">دیگر پروژه ها</CustomButton>
    </div>
  );
}

export default ProjectSection;
