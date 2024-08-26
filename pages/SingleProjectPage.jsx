import ProjectInfo from "../components/ui/projects/singleProject/ProjectInfo";
import ProjectUsers from "../components/ui/projects/singleProject/ProjectUsers";
import ProjectBanner from "../components/ui/projects/singleProject/ProjectBanner";
import ProjectGallery from "../components/ui/projects/singleProject/ProjectGallery";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../Context/ToastContext";
import { useEffect, useState } from "react";
import CustomButton from "../components/modules/CustomButton";
import CustomLoading from "../components/modules/CustomLoading";
import useProject from "../hooks/projects/useProject";
import useUser from "../hooks/useUser";
import useDeleteProject from "../hooks/projects/useDeleteProject";
import CustomConfirm from "../components/modules/CustomConfirm";
import MetaTag from "../components/modules/MetaTag";

function SingleProjectPage() {
  const { user } = useUser();
  const { id } = useParams();
  const { project, isLoading, error } = useProject(id);
  const { deleteProjectFn, isPending } = useDeleteProject(id);
  const [openDeleteProjectModal, setOpenDeleteProjectModal] = useState(false);
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
        {error.response.data.errors
          ? error.response.data.errors[0]
          : error.response.data.message}
      </div>
    );

  // Loading
  if (isLoading)
    return (
      <div className="container lg:col-span-9 lg:p-0 2xl:col-span-10 h-96">
        <CustomLoading />
      </div>
    );

  // Delete Project Handler
  const deleteProjectHandler = async () => {
    try {
      await deleteProjectFn({ id: _id });
      navigate("/projects", { replace: true });
    } catch (error) {}
  };

  // Datas
  const {
    startDate,
    endDate,
    progress,
    name,
    files,
    _id,
    location,
    users,
    createdBy,
    description,
  } = project;

  // Separate Sections Datas
  const projectBannerData = { files, _id };
  const projectInfoData = {
    startDate,
    endDate,
    progress,
    files,
    _id,
    location,
    createdBy,
    description,
  };

  return (
    <section className="container lg:col-span-9 lg:p-0 2xl:col-span-10">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <h1 className="text-32">نام پروژه : {name}</h1>
        <div className="flex justify-center items-center gap-5">
          <CustomButton onClick={() => setOpenDeleteProjectModal(true)}>
            <span>حذف پروژه</span>
          </CustomButton>
          <CustomButton>
            <span>نمایش گزارش مرتبط</span>
          </CustomButton>
        </div>
      </div>
      <ProjectBanner projectBannerData={projectBannerData} />
      <ProjectInfo projectInfoData={projectInfoData} />
      <ProjectUsers users={users} projectId={_id} />
      <ProjectGallery projectGalleryData={files} projectId={_id} />
      <CustomConfirm
        cancelText="لغو"
        okText="حذف"
        open={openDeleteProjectModal}
        onCancel={() => setOpenDeleteProjectModal(false)}
        okHandler={deleteProjectHandler}
        title="حذف پروژه"
        description="آیا از حذف این پروژه اطمینان دارید ؟"
        loading={isPending}
      />
      {/* Meta Tag */}
      <MetaTag title={name} description={description} />
    </section>
  );
}

export default SingleProjectPage;
