import { useQuery } from "@tanstack/react-query";
import { getUserProject } from "../../services/projects";
import useHandleErrors from "../useHandleErrors";

function useUserProjects(userId, page) {
  const {
    data,
    isLoading: userProjectsLoading,
    error: userProjectsError,
  } = useQuery({
    queryKey: ["user-projects", userId, page],
    queryFn: () => getUserProject(userId, page),
  });
  useHandleErrors(userProjectsLoading, userProjectsError);

  const userProjectsData = data?.data;

  return { userProjectsData, userProjectsLoading, userProjectsError };
}

export default useUserProjects;
