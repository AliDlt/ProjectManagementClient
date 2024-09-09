import useUserName from "../hooks/useUserName";
import CustomLoading from "../components/modules/CustomLoading";
import ProjectItem from "../components/ui/projects/ProjectItem";
import useUser from "../hooks/useUser";
import { useToast } from "../Context/ToastContext";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Empty } from "antd";

function UserProjectsPage() {
  const toast = useToast();
  const { user, isLoading: userLoading } = useUser();
  const { userId } = useParams();
  const { data, isLoading, error } = useUserName(userId);
  const userData = data?.data;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading && user && user.userRole === 2) {
      navigate("/", { replace: true });
      toast("شما به این صفحه دسترسی ندارید .", "error");
    }
  }, [userLoading, user]);

  if (!isLoading && error)
    return (
      <div className="container-grid flex justify-center items-center h-96">
        <p>
          {error?.response?.data?.errors
            ? error?.response?.data?.errors[0]
            : error?.response?.data?.message}
        </p>
      </div>
    );

  if (isLoading)
    return (
      <div className="container-grid flex justify-center items-center h-96">
        <CustomLoading />
      </div>
    );

  return (
    <section className="px-5 lg:px-0 lg:col-span-9 2xl:col-span-10 mb-5">
      <h3 className="text-20">
        نام کاربر : {userData?.user?.name} {userData?.user?.surName}
      </h3>
      {userData?.projects?.length === 0 ? (
        <div className="flex justify-center items-center h-96">
          <Empty
            className="w-full col-span-full h-80 flex flex-col justify-center items-center"
            description="پروژه ای برای این کاربر وجود ندارد"
          />
        </div>
      ) : (
        <div className=" grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
          {userData?.projects.map((project, index) => (
            <ProjectItem
              key={project._id}
              id={project._id}
              projectIndex={index}
              progress={project.progress}
              projectName={project.name}
              name={project.createdBy.name}
              surName={project.createdBy.surName}
              description={project.description}
              seeProjectBtn
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default UserProjectsPage;
