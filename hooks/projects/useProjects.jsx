import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useToast } from "../../Context/ToastContext";
import { getAllProjects } from "../../services/projects";

const useProjects = (count, search) => {
  const toast = useToast();
  const {
    data: datas,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects", count, search],
    queryFn: () => getAllProjects(count, search),
  });

  useEffect(() => {
    if (!isLoading && error) toast(error?.response?.data?.message, "error");
  }, [error, isLoading]);

  const data = datas?.data;
  return { data, isLoading, error };
};

export default useProjects;
