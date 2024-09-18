import { useQuery } from "@tanstack/react-query";
import React from "react";
import { reportDayOfWeek } from "../services/dashboard";

const useChartReportDashboard = (id) => {
  return useQuery({
    queryKey: ["chart-report", id],
    queryFn: () => reportDayOfWeek(id),
  });
};

export default useChartReportDashboard;
