import { useQuery } from "@tanstack/react-query";
import { getProjectsTotalPages } from "../../services/projects";
import { useEffect } from "react";
import { useToast } from "../../Context/ToastContext";

function useProjectsTotalPages() {
  const toast = useToast();
  const {
    data: totalPages,
    isLoading: totalPagesLoading,
    error,
  } = useQuery({
    queryKey: ["get-projects-total-pages"],
    queryFn: getProjectsTotalPages,
  });

  useEffect(() => {
    if (!totalPagesLoading && error)
      toast(error?.response?.data?.message, "error");
  }, [error, totalPagesLoading]);

  return { totalPages, totalPagesLoading, error };
}

export default useProjectsTotalPages;
