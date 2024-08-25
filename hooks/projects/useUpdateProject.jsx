import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "../../services/projects";

function useUpdateProject(projectId) {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationKey: ["update-product"],
    mutationFn: (projectInfo) => updateProject(projectInfo, projectId),
    onSuccess: () => {
      queryClient.invalidateQueries(["project", projectId]);
    },
    onError: (error) => {
      toast(error?.response?.data?.message, "error");
    },
  });

  return { mutateAsync };
}

export default useUpdateProject;
