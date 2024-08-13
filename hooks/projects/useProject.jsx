import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getProject } from "../../services/projects";
import { useToast } from "../../Context/ToastContext";

const useProject = (projectId) => {
  const toast = useToast();
  const {
    data: project,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProject(projectId),
  });

  useEffect(() => {
    if (!isLoading && error) toast(error?.response?.data?.message, "error");
  }, [error, isLoading]);

  return { project, isLoading };
};

export default useProject;
