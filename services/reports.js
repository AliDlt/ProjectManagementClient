import http from "./http";

export const getReports = async (
  count,
  page = 1,
  value = "",
  date = undefined,
) => {
  console.log(date);
  console.log(value);
  console.log(page);
  const res = await http.post(`/report/getAllReportsSearchByToken/`, {
    count: count,
    page: page,
    search: value,
    reportDate: date,
  });
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
  const res = await http.delete("/report/deleteFile", {
    data,
  });
  return res.data;
};

// Get All project's Reports
export const getAllProjectsReports = async (projectId, search, count, page) => {
  const res = await http.post("/report/getAllReportsByProjectId", {
    projectId,
    search,
    count,
    page,
  });
  return res.data?.data;
};

export const uploadReportFile = async (data) => {
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

export const userReports = async (id, page = 1, value = "") => {
  const resp = await http.post(`/report/getAllReportsSearchByUserId`, {
    userId: id,
    page,
    search: value,
    count: 10,
  });
  return resp.data;
};
