import { useQuery } from "@tanstack/react-query";
import React from "react";
import { reportDayOfWeek } from "../services/dashboard";

const useChartReportDashboard = () => {
  return useQuery({
    queryKey: "chart-report",
    queryFn: reportDayOfWeek,
  });
};

export default useChartReportDashboard;
