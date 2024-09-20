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
import CustomModal from "../components/modules/CustomModal";
import ProjectsReportsModal from "../components/ui/projects/singleProject/ProjectsReportsModal";
import ProjectFiles from "../components/ui/projects/singleProject/ProjectFiles";
import BackButton from "../components/modules/BackButton";

function SingleProjectPage() {
  const { user, isLoading: userLoading } = useUser();
  const { id } = useParams();
  const [openDeleteProjectModal, setOpenDeleteProjectModal] = useState(false);
  const [openReportsModal, setOpenReportsModal] = useState(false);
  const { project, isLoading, error } = useProject(id);
  const { deleteProjectFn, isPending } = useDeleteProject(id);
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
      <div className="container lg:col-span-9 lg:p-0 2xl:col-span-10 h-[30rem] flex flex-col justify-center items-center gap-5">
        {error.response.data.errors
          ? error.response.data.errors[0]
          : error.response.data.message}
       <CustomButton onClick={()=>navigate('/projects',{replace:true})}>
        بازگشت به صفحه پروژه ها
       </CustomButton>
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
    address,
    users,
    createdBy,
    description,
    longitude,
    latitude,
  } = project;

  // Separate Sections Datas
  const projectBannerData = { files, _id };
  const projectInfoData = {
    startDate,
    endDate,
    progress,
    files,
    _id,
    address,
    createdBy,
    description,
    longitude,
    latitude,
  };

  return (
    <section className="container lg:col-span-9 lg:p-0 2xl:col-span-10">
      <div className="flex justify-between lg:items-center gap-3 flex-col lg:flex-row">
        <div className="flex flex-wrap items-center gap-5">
          <BackButton />
          <h1 className="text-24">نام پروژه : {name}</h1>
        </div>
        <div className="flex lg:justify-end items-center gap-5 flex-wrap ">
          {!userLoading && user.userRole === 0 && (
            <CustomButton onClick={() => setOpenDeleteProjectModal(true)}>
              <span>حذف پروژه</span>
            </CustomButton>
          )}
          <CustomButton onClick={() => setOpenReportsModal(true)}>
            <span>نمایش گزارش های مرتبط</span>
          </CustomButton>
        </div>
      </div>
      <ProjectBanner projectBannerData={projectBannerData} />
      <ProjectInfo projectInfoData={projectInfoData} />
      <ProjectUsers users={users} projectId={_id} />
      <ProjectFiles files={files} projectId={_id} />
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
      <CustomModal
        open={openReportsModal}
        onCancel={() => setOpenReportsModal(false)}
        title="گزارش ها"
      >
        <ProjectsReportsModal />
      </CustomModal>
      {/* Meta Tag */}
      <MetaTag title={name} description={description} />
    </section>
  );
}

export default SingleProjectPage;
