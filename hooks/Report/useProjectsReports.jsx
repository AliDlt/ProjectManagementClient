import { useQuery } from "@tanstack/react-query";
import { getAllProjectsReports } from "../../services/reports";
import { useEffect } from "react";
import { useToast } from "../../Context/ToastContext";

function useProjectsReports(projectId, search, count, page) {
  const toast = useToast();
  const {
    data: projectsReportsData,
    isLoading: projectsReportsLoading,
    error: projectsReportsError,
  } = useQuery({
    queryKey: ["get-project-reports", projectId, search, count, page],
    queryFn: () => getAllProjectsReports(projectId, search, count, page),
  });

  useEffect(() => {
    if (!projectsReportsLoading && projectsReportsError)
      toast(projectsReportsError?.response?.data?.message, "error");
  }, [projectsReportsError, projectsReportsLoading]);

  return { projectsReportsData, projectsReportsLoading, projectsReportsError };
}

export default useProjectsReports;
