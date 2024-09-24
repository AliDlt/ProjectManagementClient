import { useQuery } from "@tanstack/react-query";
import { getProjectsTotalPages } from "../../services/projects";

function useProjectsTotalPages() {
  const {
    data: totalPages,
    isLoading: totalPagesLoading,
    error,
  } = useQuery({
    queryKey: ["get-projects-total-pages"],
    queryFn: getProjectsTotalPages,
  });

  return { totalPages, totalPagesLoading, error };
}

export default useProjectsTotalPages;
