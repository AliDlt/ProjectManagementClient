import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useToast } from "../../Context/ToastContext";
import { getAllProjects } from "../../services/projects";

const useProjects = (count, search, page) => {
  const toast = useToast();
  const [data, setData] = useState([]);

  const {
    mutateAsync,
    error,
    isPending: isLoading,
  } = useMutation({
    mutationKey: ["projects"],
    mutationFn: getAllProjects,
  });

  const fetchProjects = async () => {
    const res = await mutateAsync({
      count,
      search,
      page,
    });

    return res;
  };

  useEffect(() => {
    fetchProjects().then((data) => setData(data.data));
  }, [count, search, page]);

  return { data, isLoading, error };
};

export default useProjects;
