import { useQuery } from "@tanstack/react-query";
import { getFiles } from "../../services/files";
import useHandleErrors from "../useHandleErrors";

function useFiles(sectionType, sectionId, fileFormat, page, count) {
  const {
    data,
    isLoading: filesLoading,
    error: filesError,
  } = useQuery({
    queryKey: ["files", sectionType, sectionId, fileFormat, page, count],
    queryFn: () => getFiles(sectionType, sectionId, fileFormat, page, count),
  });
  useHandleErrors(filesLoading, filesError);

  const files = data?.data;

  return { files, filesLoading, filesError };
}

export default useFiles;
