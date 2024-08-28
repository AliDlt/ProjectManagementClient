import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProjectFile } from "../../services/projects";
import { useToast } from "../../Context/ToastContext";

function useDeleteProjectFile(projectId) {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutateAsync: deleteFile, isPending } = useMutation({
    mutationKey: ["delete-project-file"],
    mutationFn: deleteProjectFile,
    onSuccess: () => {
      toast("فایل حذف شد", "success");
      queryClient.invalidateQueries("project", projectId);
    },
    onError: (error) => {
      toast(error?.response?.data?.message, "error");
    },
  });

  return { deleteFile, isPending };
}

export default useDeleteProjectFile;
