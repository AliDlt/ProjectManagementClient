import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProjectFile } from "../../services/projects";
import { useToast } from "../../Context/ToastContext";

function useDeleteProjectFile(projectId) {
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteFile,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ["delete-project-file"],
    mutationFn: deleteProjectFile,
    onSuccess: () => {
      queryClient.invalidateQueries("project", projectId);
    },
    onError: (error) => {
      toast(error?.response?.data?.message, "error");
    },
  });

  return { deleteFile, isPending, isSuccess };
}

export default useDeleteProjectFile;
