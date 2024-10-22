import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "../../Context/ToastContext";

function useDeleteFile() {
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
      if (error.response.data.errors?.length > 0)
        return toast(error?.response?.data?.errors[0], "error");
      if (error.response.data.message)
        return toast(error?.response?.data?.message, "error");
    },
  });

  return { deleteFile, isPending, isSuccess };
}

export default useDeleteFile;
