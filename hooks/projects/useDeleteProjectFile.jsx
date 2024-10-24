import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../../Context/ToastContext";
import { deleteFile } from "../../services/files";

function useDeleteProjectFile(projectId) {
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteFileFn,
    isPending: deleteFileLoading,
    isSuccess: deleteFileError,
  } = useMutation({
    mutationKey: ["delete-file"],
    mutationFn: deleteFile,
    onSuccess: () => {
      queryClient.invalidateQueries("project", projectId);
    },
    onError: (error) => {
      if (error.response.data.errors?.length > 0)
        return toast(error?.response?.data?.errors[0], "error");
      if (error.response.data.message)
        return toast(error?.response?.data?.message, "error");
    },
  });

  return { deleteFileFn, deleteFileLoading, deleteFileError };
}

export default useDeleteProjectFile;
