import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "../../services/projects";
import { useToast } from "../../Context/ToastContext";

function useDeleteProject() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutateAsync: deleteProjectFn, isPending } = useMutation({
    mutationKey: ["delete-project"],
    mutationFn: deleteProject,
    onSuccess: () => {
      toast("پروژه حذف شد", "success");
      queryClient.invalidateQueries("projects");
    },
    onError: (error) => {
      toast(error?.response?.data?.message, "error");
    },
  });

  return { deleteProjectFn, isPending };
}

export default useDeleteProject;