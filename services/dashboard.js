import http from "./http";

export const messagesDashboard = async () => {
  const response = await http.get(`/ticket`);
  return response.data;
};

export const reportDayOfWeek = async () => {
  const response = await http.get("/report/getReportCountByDayOfWeek");
  console.log(response)
  return response.data;
};
