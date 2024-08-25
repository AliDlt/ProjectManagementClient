import http from "./http";

export const getReports = async (count, page) => {
  const res = await http.get(
    `/report/getAllReportsSearchByToken/?count=${count}&page=${page}`,
  );
  return res.data;
};

export const getReport = async (id) => {
  const res = await http.get(`/report/getReportById/?id=${id}`);
  return res.data.data;
};

export const deleteReport = async (id) => {
  const resp = await http.delete(`/report/deleteReport/?id=${id}`);
  return resp.data;
};

export const addReport = async (data) => {
  const response = await http.post("/report/addReport", data);
  return response.data;
};
