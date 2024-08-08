import React from "react";
import { MdOutlineEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { Empty } from "antd";
import { CiImageOff } from "react-icons/ci";
import ProjectInfo from "../components/ui/sigleProject/ProjectInfo";

function ProjectsPage() {
  return (
    <section className="container">
      <h1 className="text-32">پروژه ها</h1>
      <div className="relative rounded-custom mt-5 h-24 overflow-hidden">
        <Empty
          className="bg-gray-200 rounded-custom h-full w-full m-0"
          image={<CiImageOff className="size-12 text-gray-400" />}
          imageStyle={{
            display: "flex",
          }}
          description={false}
          style={{
            display: "none",
          }}
        />
        <img
          className="object-cover w-full h-full rounded-custom"
          src="/images/5.png"
          alt="project image"
        />
        <span className="absolute flex justify-center items-center ring-2 ring-custom-primary-color bg-white rounded-full size-10 left-5 top-1/2 -translate-y-1/2">
          <MdOutlineEdit size={25} className="text-custom-primary-color" />
        </span>
        <span className="absolute flex justify-center items-center ring-2 ring-custom-primary-color bg-white rounded-full size-10 left-20 top-1/2 -translate-y-1/2">
          <FaTrash size={20} className="text-custom-primary-color" />
        </span>
        <span className="absolute bg-white flex rounded-lg top-4 right-4 px-3 py-1 border-2 border-custom-primary-color text-12">
          پروژه 1
        </span>
      </div>
      <ProjectInfo />
    </section>
  );
}

export default ProjectsPage;
