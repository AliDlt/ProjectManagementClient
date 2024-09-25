import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "../../services/projects";
import { useToast } from "../../Context/ToastContext";

function useUpdateProject(projectId) {
  const toast = useToast()
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: updateProjectLoading } = useMutation({
    mutationKey: ["update-product"],
    mutationFn: (projectInfo) => updateProject(projectInfo, projectId),
    onSuccess: () => {
      queryClient.invalidateQueries(["project", projectId]);
    },
    onError: (error) => {
      if (error.response.data.errors?.length > 0)
        return toast(error?.response?.data?.errors[0], "error");
      if (error.response.data.message)
        return toast(error?.response?.data?.message, "error");
    },
  });

  return { mutateAsync, updateProjectLoading };
}

export default useUpdateProject;
