import React from "react";
import ProjectBanner from "../components/ui/singleProject/ProjectBanner";
import ProjectInfo from "../components/ui/singleProject/ProjectInfo";
import ProjectUsers from "../components/ui/singleProject/ProjectUsers";
import ProjectGallery from "../components/ui/singleProject/ProjectGallery";
import CustomButton from "../components/modules/CustomButton";
import { useParams } from "react-router-dom";
import useProject from "../hooks/projects/useProject";

function SingleProjectPage() {
  const { id } = useParams();
  const { project, isLoading } = useProject(id);

  console.log(project);

  return (
    <section className="container lg:col-span-9 lg:p-0 2xl:col-span-10">
      <h1 className="text-32">پروژه ها</h1>
      <ProjectBanner />
      <ProjectInfo />
      <ProjectUsers />
      <ProjectGallery />
      <div className="mt-10 lg:mt-5 flex justify-center items-center lg:justify-start">
        <CustomButton className="py-6">
          <span>نمایش گزارش مرتبط</span>
        </CustomButton>
      </div>
    </section>
  );
}

export default SingleProjectPage;
