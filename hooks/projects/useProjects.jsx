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
    onError: (error) => {
      if (error.response.data.errors?.length > 0)
        return toast(error?.response?.data?.errors[0], "error");
      if (error.response.data.message)
        return toast(error?.response?.data?.message, "error");
    },
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
