import http from "./http";

export const getReports = async (count, page, value) => {
  const res = await http.get(
    `/report/getAllReportsSearchByToken/?count=${count}&page=${page}&search=${value}`,
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

export const deleteReportFile = async (data) => {
  console.log(data);
  const res = await http.delete("/report/deleteFile", data);
  return res.data;
};

// Get All project's Reports
export const getAllProjectsReports = async (projectId, search, count, page) => {
  const res = await http.get(
    `/report/getAllReportsByProjectId?id=${projectId}&search=${search}&count=${count}&page=${page}`,
  );
  return res.data?.data;
};

export const uploadReportFile = async (data) => {
  console.log(data);
  const resp = await http.post("/report/uploadFile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return resp;
};

export const updateReport = async (data) => {
  const response = await http.put("/report/updateReport", data);
  return response.data;
};

export const userReports = async (id) => {
  const resp = await http.get(
    `/report/getAllReportsSearchByUserId?userId=${id}`,
  );
  return resp.data;
};
