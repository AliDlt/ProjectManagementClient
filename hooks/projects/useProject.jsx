import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getProject } from "../../services/projects";
import { useToast } from "../../Context/ToastContext";

const useProject = (projectId) => {
  const toast = useToast();
  const { data, isLoading, error } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProject(projectId),
  });

  useEffect(() => {
    if (!isLoading && error) {
      if (error?.response?.data?.errors) {
        toast(error?.response?.data?.errors[0], "error");
      } else {
        toast(error?.response?.data?.message, "error");
      }
    }
  }, [error, isLoading]);

  const project = data?.data;

  return { project, isLoading };
};

export default useProject;
