import { useQuery } from "@tanstack/react-query";
import { getUserProject } from "../../services/projects";

function useUserProjects(userId, page) {
  const {
    data,
    isLoading: userProjectsLoading,
    error: userProjectsError,
  } = useQuery({
    queryKey: ["user-projects", userId, page],
    queryFn: () => getUserProject(userId, page),
  });

  const userProjectsData = data?.data;

  return { userProjectsData, userProjectsLoading, userProjectsError };
}

export default useUserProjects;
