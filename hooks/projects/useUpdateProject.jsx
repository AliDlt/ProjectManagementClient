import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "../../services/projects";
import { useToast } from "../../Context/ToastContext";

function useUpdateProject(projectId) {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutateAsync } = useMutation({
    mutationKey: ["update-product"],
    mutationFn: (projectInfo) => updateProject(projectInfo, projectId),
    onSuccess: () => {
      queryClient.invalidateQueries(["project", projectId]);
    },
    onError: (error) => {
      if (error.response.data.errors?.length > 0)
        return toast(error?.response?.data?.errors[0], "error");

      return toast(error?.response?.data?.message, "error");
    },
  });

  return { mutateAsync };
}

export default useUpdateProject;
