import { useQuery } from "@tanstack/react-query";
import { getProject } from "../../services/projects";

const useProject = (projectId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProject(projectId),
  });

  const project = data?.data;

  return { project, isLoading, error };
};

export default useProject;
