import { useQuery } from "@tanstack/react-query";
import { getUserProject } from "../../services/projects";
import { useToast } from ".././../Context/ToastContext";
import { useEffect } from "react";

function useUserProjects(userId, page) {
  const toast = useToast();
  const {
    data,
    isLoading: userProjectsLoading,
    error: userProjectsError,
  } = useQuery({
    queryKey: ["user-projects", userId, page],
    queryFn: () => getUserProject(userId, page),
  });

  useEffect(() => {
    if (!userProjectsLoading && userProjectsError) {
      if (userProjectsError?.response?.data?.errors) {
        toast(userProjectsError?.response?.data?.errors[0], "error");
      } else {
        toast(userProjectsError?.response?.data?.message, "error");
      }
    }
  }, [userProjectsError, userProjectsLoading]);

  const userProjectsData = data?.data;

  return { userProjectsData, userProjectsLoading, userProjectsError };
}

export default useUserProjects;
