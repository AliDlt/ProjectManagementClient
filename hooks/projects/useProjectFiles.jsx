import { useMutation } from "@tanstack/react-query";
import { getProjectFiles } from "../../services/projects";
import { useEffect, useState } from "react";

function useProjectFiles(data, refetchRef) {
  const [projectFile, setProjectFile] = useState(false);

  const { mutateAsync, isPending, error } = useMutation({
    mutationKey: ["get-project-files"],
    mutationFn: getProjectFiles,
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
