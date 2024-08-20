import ProjectInfo from "../components/ui/projects/singleProject/ProjectInfo";
import ProjectUsers from "../components/ui/projects/singleProject/ProjectUsers";
import ProjectBanner from "../components/ui/projects/singleProject/ProjectBanner";
import ProjectGallery from "../components/ui/projects/singleProject/ProjectGallery";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../Context/ToastContext";
import { useEffect } from "react";
import CustomButton from "../components/modules/CustomButton";
import CustomLoading from "../components/modules/CustomLoading";
import useProject from "../hooks/projects/useProject";
import useUser from "../hooks/useUser";

function SingleProjectPage() {
  const { user } = useUser();
  const { id } = useParams();
  const { project, isLoading, error } = useProject(id);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (
      !isLoading &&
      user &&
      user.userRole !== 0 &&
      !project?.usersIds?.includes(user._id)
    ) {
      navigate("/projects", { replace: true });
      toast("شما به این پروژه دسترسی ندارید", "error");
    }
  }, [user, isLoading, project]);

  // Error
  if (!isLoading && error)
    return (
      <div className="container lg:col-span-9 lg:p-0 2xl:col-span-10 h-96 flex justify-center items-center">
        {error.response.data.message}
      </div>
    );

  // Loading
  if (isLoading)
    return (
      <div className="container lg:col-span-9 lg:p-0 2xl:col-span-10 h-96">
        <CustomLoading />
      </div>
    );

  // Datas
  const {
    startDate,
    endDate,
    progress,
    name,
    usersIds,
    files,
    _id,
    location,
    users,
  } = project;

  // Separate Sections Datas
  const projectBannerData = { files, name };
  const projectInfoData = {
    startDate,
    endDate,
    progress,
    files,
    _id,
    location,
  };

  return (
    <section className="container lg:col-span-9 lg:p-0 2xl:col-span-10">
      <h1 className="text-32">{name}</h1>
      <ProjectBanner projectBannerData={projectBannerData} />
      <ProjectInfo projectInfoData={projectInfoData} />
      <ProjectUsers users={users} projectId={_id} />
      <ProjectGallery projectGalleryData={files} projectId={_id} />
      <div className="mt-10 lg:mt-5 flex justify-center items-center lg:justify-start">
        <CustomButton className="py-6">
          <span>نمایش گزارش مرتبط</span>
        </CustomButton>
      </div>
    </section>
  );
}

export default SingleProjectPage;
