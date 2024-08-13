import http from "./http";

export const getAllProjects = async (count = "") => {
  const res = await http.get(
    `/project/getAllProjectsSearchByToken?count=${count}`,
  );

  return res.data;
};

export const getProject = async (projectId = "") => {
  const res = await http.get(`/project/getProjectById?id=${projectId}`);

  return res.data;
};
