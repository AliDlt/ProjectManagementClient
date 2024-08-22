import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useToast } from "../../Context/ToastContext";
import { getAllProjects } from "../../services/projects";

const useProjects = (count, search, page) => {
  const toast = useToast();
  const abortControllerRef = useRef(null);

  const fetchProjects = async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    return getAllProjects(count, search, signal, page);
  };

  const {
    data: datas,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects", count, search, page],
    queryFn: fetchProjects,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (!isLoading && error) toast(error?.response?.data?.message, "error");
  }, [error, isLoading]);

  const data = datas?.data;
  return { data, isLoading, error };
};

export default useProjects;
