import http from "./http";

export const messagesDashboard = async () => {
  const response = await http.get(`/ticket`);
  return response.data;
};

export const reportDayOfWeek = async (id) => {
  const response = await http.get(
    `/report/getReportCountByDayOfWeek?userId=${id}`,
    {
      id: 8,
    },
  );
  return response.data;
};
