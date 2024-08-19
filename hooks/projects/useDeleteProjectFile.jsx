import { useMutation } from "@tanstack/react-query";
import { deleteProjectFile } from "../../services/projects";
import { useToast } from "../../Context/ToastContext";

function useDeleteProjectFile() {
  const toast = useToast();

  const { mutateAsync: deleteFile, isPending } = useMutation({
    mutationKey: ["delete-project-file"],
    mutationFn: deleteProjectFile,
    onSuccess: () => {
      toast("فایل حذف شد", "success");
    },
    onError: (error) => {
      toast(error?.response?.data?.message, "error");
    },
  });

  return { deleteFile, isPending };
}

export default useDeleteProjectFile;
