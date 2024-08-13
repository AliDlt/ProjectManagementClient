import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getReport } from "../services/reports";

const useGetReport = () => {
  return useQuery({
    queryKey: ["get-report"],
    queryFn: getReport,
  });
};

export default useGetReport;
