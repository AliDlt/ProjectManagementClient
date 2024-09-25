import { useQuery } from "@tanstack/react-query";
import { getProject } from "../../services/projects";
import useHandleErrors from "../useHandleErrors";

const useProject = (projectId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProject(projectId),
  });
  useHandleErrors(isLoading, error);

  const project = data?.data;

  return { project, isLoading, error };
};

export default useProject;
