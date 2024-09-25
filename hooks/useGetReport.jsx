import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getReport } from "../services/reports";

const useGetReport = (id) => {
  return useQuery({
    queryKey: ["get-report", id],
    queryFn: () => getReport(id),
  });
};

export default useGetReport;
