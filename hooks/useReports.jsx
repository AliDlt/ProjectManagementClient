import { useQuery } from "@tanstack/react-query";
import { getReports } from "../services/reports";
import { useToast } from "../Context/ToastContext";
import { useEffect } from "react";

const useReports = (count) => {
  const toast = useToast();
  const { data, isLoading, error } = useQuery({
    queryKey: ["reports", count],
    queryFn: () => getReports(count),
  });

  useEffect(() => {
    if (!isLoading && error) toast(error?.response?.data?.message, "error");
  }, [error, isLoading]);

  const reports = data?.data;
  return { reports, isLoading };
};

export default useReports;
