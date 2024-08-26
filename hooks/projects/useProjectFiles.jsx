import { useMutation } from "@tanstack/react-query";
import { getProjectFiles } from "../../services/projects";
import { useEffect, useState } from "react";
import { useToast } from "../../Context/ToastContext";

function useProjectFiles(data) {
  const toast = useToast();
  const [projectFile, setProjectFile] = useState(false);

  const { mutateAsync, isPending, error } = useMutation({
    mutationKey: ["get-project-files"],
    mutationFn: getProjectFiles,
    onError: (error) => {
      toast(error?.response?.data?.message, "error");
    },
  });

  const fetchProjectFiles = async () => {
    const res = await mutateAsync(data);
    setProjectFile(res.data);
  };

  useEffect(() => {
    fetchProjectFiles();
  }, [data?.page]);

  return { projectFile, isPending, error };
}

export default useProjectFiles;
