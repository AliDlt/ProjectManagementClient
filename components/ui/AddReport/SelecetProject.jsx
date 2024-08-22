import React, { useState } from "react";
import CustomInput from "../../modules/CustomInput";
import { GrSearch } from "react-icons/gr";
import useProjects from "../../../hooks/projects/useProjects";
import { Card, Empty, Pagination } from "antd";
import { convertToLocalDate } from "../../../utils/tools";
import CustomLoading from "../../modules/CustomLoading";

const SelectProject = ({ setProject }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useProjects(10, search, page);
  console.log(data?.projects[0]);

  const changePage = (e) => {
    setPage(e);
    console.log(e);
  };
  return (
    <div>
      <div className="pt-3">
        <CustomInput
          placeholder="جستجو پروژه"
          className="p-2"
          icon={
            <GrSearch className="-scale-x-100 text-custom-primary-color w-5 h-5 ml-2" />
          }
          onChange={searchValue}
          value={search}
        />
      </div>
      {isLoading ? (
        <CustomLoading />
      ) : (
        <>
          {data?.projects ? (
            <>
              <div className=" mt-4 flex flex-col ">
                {data?.projects.map(({ name, startDate, _id }, index) => {
                  return (
                    <div
                      onClick={() => {
                        setProject({ id: _id, name });
                      }}
                      key={index}
                      className="flex justify-between hover:bg-black/5 transition-all gap-2 border-b py-4 px-2 border-b-custom-primary-color "
                    >
                      <h6> {name} </h6>
                      <p>{convertToLocalDate(startDate)}</p>
                    </div>
                  );
                })}
              </div>
              <Pagination
                style={{ direction: "ltr" }}
                align="center"
                defaultCurrent={page}
                onChange={changePage}
                total={data?.totalProjects}
              />
            </>
          ) : (
            <div className="mt-4">
              <Empty description={"پروژه ای نیست"} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SelectProject;
