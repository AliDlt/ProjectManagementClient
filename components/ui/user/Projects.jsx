import React from "react";
import ChartProjects from "./ChartProjects";
import CustomButton from "../../modules/CustomButton";
import { useParams } from "react-router-dom";
import CustomLoading from "../../modules/CustomLoading";

const Projects = ({ projects, error, isPending }) => {
  return (
    <div className="flex flex-col gap-4 order-1">
      <h4 className="pr-4">پروژه ها</h4>

      <div className="shadow-custom bg-white border-b-2 border-l-2 flex flex-col gap-3 border-custom-primary-color rounded-custom py-3 px-2">
        {isPending ? (
          <CustomLoading />
        ) : (
          <>
            <div className="grid gap-y-4 grid-cols-2 w-full h-full md:gap-4 lg:gap-2 ">
              {projects.length ? (
                <>
                  {projects.map(({ name, description, progress }, index) => {
                    return (
                      <>
                        <ChartProjects
                          key={index} // افزودن کلید منحصر به فرد برای هر پروژه
                          data={progress}
                          name={name}
                          description={description}
                        />

                      </>
                    );
                  })}
                  <div>
                    <CustomButton>همه پروژه ها</CustomButton>
                  </div>
                </>
              ) : (
                <div className="flex justify-center items-center col-span-2 ">
                  پروژه ای وجود ندارد
                </div>
              )}
              <div>
                <CustomButton>دیگر پروژه ها</CustomButton>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Projects;
