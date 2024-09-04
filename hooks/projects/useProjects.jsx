import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useToast } from "../../Context/ToastContext";
import { getAllProjects } from "../../services/projects";

const useProjects = (count, search, page) => {
  const toast = useToast();

  const {
    data: datas,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects", count, search, page],
    queryFn: () => getAllProjects(count, search, page),
  });

  useEffect(() => {
    if (!isLoading && error) {
      if (error?.response?.data?.errors) {
        toast(error?.response?.data?.errors[0], "error");
      } else {
        toast(error?.response?.data?.message, "error");
      }
    }
  }, [error, isLoading]);

  const data = datas?.data;
  return { data, isLoading, error };
};

export default useProjects;
