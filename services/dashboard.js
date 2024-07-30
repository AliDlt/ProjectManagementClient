import http from "./http";

export const messagesDashboard = async (userId) => {
  const response = await http.get(`/ticket/user/${userId}`);
  return response.data;
};

export const chartReports = async (user) => {
  const response = await http.get(
    `/api/report/getReportCountByDayOfWeek/?userId=${user}`,
  );
  return response.data;
};
