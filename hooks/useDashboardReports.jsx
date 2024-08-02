import { useQuery } from "@tanstack/react-query";
import { messagesDashboard } from "../services/dashboard";
const queryKey = ["dashboard-reports"];

// const queryFn = ;

const useDashboardReports = () => {
  return useQuery({ queryKey, queryFn: messagesDashboard });
};

export default useDashboardReports;
