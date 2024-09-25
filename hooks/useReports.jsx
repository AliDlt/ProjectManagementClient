import { useQuery } from "@tanstack/react-query";
import { getReports } from "../services/reports";
import { useToast } from "../Context/ToastContext";
import { useEffect } from "react";

const useReports = (count, page, value, date) => {
  const toast = useToast();
  const { data, isLoading, error, isPending,refetch,isFetching } = useQuery({
    queryKey: ["reports", page, value, date],
    queryFn: () => getReports(count, page, value, date),
  });
  useEffect(() => {
    if (!isLoading && error) {
      if (error?.response?.data?.errors) {
        toast(error?.response?.data?.errors[0], "error");
      } else {
        toast(error?.response?.data?.message, "error");
      }
    }
  }, [isFetching, error]);

  const reportsData = data?.data;
  return { reportsData, isLoading, error, isPending ,refetch,isFetching};
};

export default useReports;
