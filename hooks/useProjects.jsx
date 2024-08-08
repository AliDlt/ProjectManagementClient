import { useQuery } from "@tanstack/react-query";
import { useToast } from "../Context/ToastContext";
import { useEffect } from "react";
import { getProjects } from "../services/projects";

const useProjects = (count) => {
  const toast = useToast();
  const { data, isLoading, error } = useQuery({
    queryKey: ["projects", count],
    queryFn: () => getProjects(count),
  });

  useEffect(() => {
    if (!isLoading && error) toast(error?.response?.data?.message, "error");
  }, [error, isLoading]);

  const projects = data?.data;
  return { projects, isLoading };
};

export default useProjects;
