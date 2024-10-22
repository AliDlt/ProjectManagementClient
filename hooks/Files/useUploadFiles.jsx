import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadFile } from "../../services/files";
import { useToast } from "../../Context/ToastContext";

const useUploadFiles = (sectionType, sectionId) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    mutateAsync: uploadFileFn,
    isPending: uploadFileLoading,
    error: uploadFileError,
  } = useMutation({
    mutationFn: uploadFile,
    mutationKey: ["upload-file"],
    onSuccess: (res) => {
      toast(res.data, "success");
      queryClient.invalidateQueries(["files", sectionType, sectionId]);
    },
    onError: (error) => {
      if (error.response.data.errors?.length > 0)
        return toast(error?.response?.data?.errors[0], "error");
      if (error.response.data.message)
        return toast(error?.response?.data?.message, "error");
    },
  });
  return {
    uploadFileFn,
    uploadFileLoading,
    uploadFileError,
  };
};

export default useUploadFiles;
