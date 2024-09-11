import React from "react";
import ChartProjects from "./ChartProjects";
import CustomButton from "../../modules/CustomButton";
import { Link, useParams } from "react-router-dom";
import CustomLoading from "../../modules/CustomLoading";
import { Empty } from "antd";

const Projects = ({ projects, error, isPending }) => {
  const {id} = useParams()
  console.log(id)
  return (
    <div className="flex flex-col gap-4 order-1 h-full">
      <h4 className="pr-4">پروژه ها</h4>

      <div className="shadow-custom bg-white border-b-2 border-l-2 flex flex-col gap-3 border-custom-primary-color rounded-custom h-full py-3 px-2">
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
                          key={index}
                          data={progress}
                          name={name}
                          description={description}
                        />
                      </>
                    );
                  })}
                </>
              ) : (
                <div className="flex justify-center items-center col-span-2 ">
                  <Empty description="پروژه ای برای کاربر وجود ندارد" />
                </div>
              )}
            </div>
            {projects.length && (
              <div>
                <Link to={`/users/project/${id}`}>
                  <CustomButton>دیگر پروژه ها</CustomButton>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Projects;
