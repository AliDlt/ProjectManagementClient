import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadProjectFile } from "../../services/projects";

function useUploadProjectFile(projectId) {
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
  });

  return {
    uploadProjectFileFn,
    uploadProjectFileError,
    uploadProjectFilePending,
  };
}

export default useUploadProjectFile;
