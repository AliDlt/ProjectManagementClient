import React from "react";
import ProjectBanner from "../components/ui/singleProject/ProjectBanner";
import ProjectInfo from "../components/ui/singleProject/ProjectInfo";
import ProjectUsers from "../components/ui/singleProject/ProjectUsers";
import ProjectGallery from "../components/ui/singleProject/ProjectGallery";
import CustomButton from "../components/modules/CustomButton";
import { useParams } from "react-router-dom";
import useProject from "../hooks/projects/useProject";
import CustomLoading from "../components/modules/CustomLoading";

function SingleProjectPage() {
  const { id } = useParams();
  const { project, isLoading } = useProject(id);

  if (isLoading)
    return (
      <div className="container lg:col-span-9 lg:p-0 2xl:col-span-10 h-96">
        <CustomLoading />
      </div>
    );

  const { startDate, endDate, progress, imageUrl } = project;

  const projectInfo = { startDate, endDate, progress, imageUrl };


  // createdAt: "2024-08-08T17:44:53.731Z";
  // description: "پروژه 1 درحال انجام ";
  // docFiles: [];
  // endDate: "1382-12-01T20:34:16.000Z";
  // imageName: null;
  // imageUrl: "https://projectmanagment.liara.run//public/null";
  // name: "پروژه 1";
  // progress: 0;
  // reportsIds: (2)[(7, 8)];
  // situation: "شروع";
  // startDate: "1381-12-01T20:34:16.000Z";
  // usersIds: (2)[(4, 9)];
  // __v: 2;
  // _id: 1;

  return (
    <section className="container lg:col-span-9 lg:p-0 2xl:col-span-10">
      <h1 className="text-32">پروژه ها</h1>
      <ProjectBanner />
      <ProjectInfo projectInfo={projectInfo} />
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
