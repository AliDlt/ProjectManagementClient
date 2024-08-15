import { useQuery } from "@tanstack/react-query";
import { getReports } from "../services/reports";
import { useToast } from "../Context/ToastContext";
import { useEffect } from "react";

const useReports = (count) => {
  console.log(count)
  const toast = useToast();
  const { data, isLoading, error } = useQuery({
    queryKey: ["reports", count],
    queryFn: () => getReports(count),
  });
  
  useEffect(() => {
    console.log(error)
    if (!isLoading && error) toast(error?.response?.data?.message, "error");
  }, [error, isLoading]);
  const reports = data?.data;
  console.log(reports)
  return { reports, isLoading };
};

export default useReports;
