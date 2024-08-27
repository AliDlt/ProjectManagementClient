import { useQuery } from "@tanstack/react-query";
import { getAllProkectsReports } from "../../services/reports";
import { useEffect } from "react";
import { useToast } from "../../Context/ToastContext";

function useProjectsReports(projectId) {
  const toast = useToast();
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-project-reports", projectId],
    queryFn: () => getAllProkectsReports(projectId),
  });

  useEffect(() => {
    if (!isLoading && error) toast(error?.response?.data?.message, "error");
  }, [error, isLoading]);

  return { data, isLoading, error };
}

export default useProjectsReports;
