import useUserName from "../hooks/useUserName";
import CustomLoading from "../components/modules/CustomLoading";
import ProjectItem from "../components/ui/projects/ProjectItem";
import useUser from "../hooks/useUser";
import { useToast } from "../Context/ToastContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Empty } from "antd";
import BackButton from "../components/modules/BackButton";
import useUserProjects from "../hooks/projects/useUserProjects";
import CustomPagination from "../components/modules/CustomPagination";
import CustomButton from "../components/modules/CustomButton";
import MetaTag from "../components/modules/MetaTag";

function UserProjectsPage() {
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, isLoading: userLoading } = useUser();
  const { userId } = useParams();
  const { data } = useUserName(userId);
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") || undefined,
  );
  const { userProjectsData, userProjectsLoading, userProjectsError } =
    useUserProjects(userId, currentPage);
  const userData = data?.data;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading && user && user.userRole === 2) {
      navigate("/", { replace: true });
      toast("شما به این صفحه دسترسی ندارید .", "error");
    }
  }, [userLoading, user]);

  if (!userProjectsLoading && userProjectsError)
    return (
      <div className="container-grid flex flex-col justify-center items-center h-[30rem]">
        <Empty
          description={
            userProjectsError?.response?.data?.errors
              ? userProjectsError?.response?.data?.errors[0]
              : userProjectsError?.response?.data?.message
          }
        />
        <BackButton />
      </div>
    );

  if (userProjectsLoading)
    return (
      <div className="container-grid flex justify-center items-center h-96">
        <CustomLoading />
      </div>
    );

  return (
    <section className="px-5 lg:px-0 lg:col-span-9 2xl:col-span-10 mb-5">
      <div className="flex flex-wrap items-center gap-5 mt-4">
        <BackButton />
        <h3 className="text-24">
          پروژه های {userData?.user?.name} {userData?.user?.surName}
        </h3>
      </div>
      {!userProjectsData?.projects ? (
        <div className="flex flex-col justify-center items-center h-[30rem] gap-5">
          <Empty
            className="w-full col-span-full flex flex-col justify-center items-center"
            description="پروژه ای برای این کاربر وجود ندارد"
          />
          <CustomButton onClick={() => navigate(`/users/${userId}`)}>
            صفحه اطلاعات کاربر
          </CustomButton>
        </div>
      ) : (
        <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-10 gap-6">
          {userProjectsData?.projects.map((project) => (
            <ProjectItem
              address={project.address}
              bannerImage={project.bannerImage}
              key={project._id}
              id={project._id}
              progress={project.progress}
              projectName={project.name}
              name={project?.createdBy?.name}
              surName={project?.createdBy?.surName}
              description={project?.description}
            />
          ))}
        </div>
      )}
      {!userProjectsLoading && userProjectsData && (
        <CustomPagination
          align="center"
          current={userProjectsData?.currentPage}
          onChange={(page) => {
            setSearchParams({
              page,
            });
            setCurrentPage(page);
          }}
          total={userProjectsData?.totalProjects}
          pageSize={10}
        />
      )}
      <MetaTag
        title={` پروژه های ${userData?.user?.name} ${userData?.user?.surName}`}
        description={` پروژه های ${userData?.user?.name} ${userData?.user?.surName}`}
      />
    </section>
  );
}

export default UserProjectsPage;
