import { useQuery } from "@tanstack/react-query";
import { messagesDashboard } from "../services/dashboard";
const queryKey = ["dashboard-message"];

const queryFn = messagesDashboard('userId');

const useDashboardReports = () => {
  return useQuery({ queryKey, queryFn });
};

export default useDashboardReports;
