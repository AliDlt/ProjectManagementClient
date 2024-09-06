import { useMutation } from "@tanstack/react-query";
import { getAllProjectsReports } from "../../services/reports";
import { useToast } from "../../Context/ToastContext";
import { useEffect, useState } from "react";

function useProjectsReports(projectId, search, count, page) {
  const toast = useToast();
  const [projectsReports, setProjectsReports] = useState(false);

  const {
    mutateAsync: getProjectReports,
    isPending: projectsReportsLoading,
    error: projectsReportsError,
  } = useMutation({
    mutationKey: ["get-project-reports"],
    mutationFn: () => getAllProjectsReports(projectId, search, count, page),
    onError: () => {
      toast(projectsReportsError?.response?.data?.message, "error");
    },
  });

  // Fetch Projects Reports
  const fetchProjectsReports = async () => {
    const res = await getProjectReports(projectId, search, count, page);
    return res;
  };

  useEffect(() => {
    fetchProjectsReports().then((data) => setProjectsReports(data));
  }, [setProjectsReports, projectId, search, count, page]);

  return { projectsReports, projectsReportsLoading, projectsReportsError };
}

export default useProjectsReports;
