import React from "react";
import ChartProjects from "./ChartProjects";
import CustomButton from "../../modules/CustomButton";
import { Link, useParams } from "react-router-dom";
import CustomLoading from "../../modules/CustomLoading";
import { Empty } from "antd";

const Projects = ({ projects, error, isPending }) => {
  const { id } = useParams();
  return (
    <div className="flex flex-col gap-4 order-1 h-full">
      <h4 className="pr-4 text-20">پروژه ها</h4>
      <div className="shadow-custom bg-white border-b-2 border-l-2 flex flex-col gap-3 border-custom-primary-color rounded-custom h-full p-7">
        {isPending ? (
          <CustomLoading />
        ) : (
          <>
            <div className="grid gap pl-4  justify-center grid-cols-1  h-full md:gap-4 lg:gap-2 ">
              {projects.length ? (
                <>
                  {projects.map(
                    (
                      {
                        name,
                        description,
                        progress,
                        _id,
                        createdBy,
                        startDate,
                      },
                      index,
                    ) => {
                      if (index < 2)
                        return (
                          <Link to={`/projects/${_id}`}>
                            <ChartProjects
                              key={index}
                              data={progress}
                              name={name}
                              id={_id}
                              createdBy={createdBy}
                              startDate={startDate}
                              description={description}
                            />
                          </Link>
                        );
                    },
                  )}
                </>
              ) : (
                <div className="flex justify-center items-center col-span-2 ">
                  <Empty description="پروژه ای برای کاربر وجود ندارد" />
                </div>
              )}
            </div>
            {projects.length !== 0 && (
              <div className="flex justify-end">
                <Link to={`/users/project/${id}`}>
                  <CustomButton>همه پروژه ها</CustomButton>
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
