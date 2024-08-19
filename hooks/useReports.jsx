import { useQuery } from "@tanstack/react-query";
import { getReports } from "../services/reports";
import { useToast } from "../Context/ToastContext";
import { useEffect } from "react";

const useReports = (count, page) => {
  const toast = useToast();
  const { data, isLoading, error, isPending } = useQuery({
    queryKey: ["reports", page],
    queryFn: () => getReports(count, page),
  });

  useEffect(() => {
    if (!isLoading && error) {
      if (error?.response?.data?.errors) {
        toast(error?.response?.data?.errors[0], "error");
      } else {
        toast(error?.response?.data?.message, "error");
      }
    }
  }, [isLoading, error]);

  const reportsData = data?.data;
  return { reportsData, isLoading, error };
};

export default useReports;
