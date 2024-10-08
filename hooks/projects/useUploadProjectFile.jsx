import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadProjectFile } from "../../services/projects";
import { useToast } from "../../Context/ToastContext";

function useUploadProjectFile(projectId) {
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    mutateAsync: uploadProjectFileFn,
    error: uploadProjectFileError,
    isPending: uploadProjectFilePending,
  } = useMutation({
    mutationKey: ["upload-project-file"],
    mutationFn: uploadProjectFile,
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

  return {
    uploadProjectFileFn,
    uploadProjectFileError,
    uploadProjectFilePending,
  };
}

export default useUploadProjectFile;
