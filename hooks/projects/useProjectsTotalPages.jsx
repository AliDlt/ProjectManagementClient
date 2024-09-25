import { useQuery } from "@tanstack/react-query";
import { getProjectsTotalPages } from "../../services/projects";
import useHandleErrors from "../useHandleErrors";

function useProjectsTotalPages() {
  const {
    data: totalPages,
    isLoading: totalPagesLoading,
    error,
  } = useQuery({
    queryKey: ["get-projects-total-pages"],
    queryFn: getProjectsTotalPages,
  });
  useHandleErrors(totalPagesLoading, error);

  return { totalPages, totalPagesLoading, error };
}

export default useProjectsTotalPages;
