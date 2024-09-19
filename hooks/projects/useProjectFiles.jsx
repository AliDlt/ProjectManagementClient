import { useMutation } from "@tanstack/react-query";
import { getProjectFiles } from "../../services/projects";
import { useEffect, useState } from "react";
import { useToast } from "../../Context/ToastContext";

function useProjectFiles(data, refetchRef) {
  const toast = useToast();
  const [projectFile, setProjectFile] = useState(false);

  const { mutateAsync, isPending, error } = useMutation({
    mutationKey: ["get-project-files"],
    mutationFn: getProjectFiles,
    onError: (error) => {
      if (error.response.data.errors?.length > 0)
        return toast(error?.response?.data?.errors[0], "error");

      return toast(error?.response?.data?.message, "error");
    },
  });

  const fetchProjectFiles = async () => {
    const res = await mutateAsync(data);
    setProjectFile(res.data);
  };

  useEffect(() => {
    fetchProjectFiles();
  }, [data?.page, refetchRef]);

  return { projectFile, isPending, error };
}

export default useProjectFiles;
