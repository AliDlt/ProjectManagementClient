import http from "./http";

// Get All Projects
export const getAllProjects = async (count = "", page = 1, search = "") => {
  const res = await http.get(
    `/project/getAllProjectsSearchByToken?count=${count}&search=${search}&page=${page}`,
  );

  return res.data;
};

// Get A Project
export const getProject = async (projectId = "", search = "") => {
  const res = await http.get(
    `/project/getProjectById?id=${projectId}&search=${search}`,
  );

  return res.data;
};

// Delete Project File
export const deleteProjectFile = async (fileInfo) => {
  console.log(fileInfo);
  const res = await http.delete("/project/deleteFile", {
    data: fileInfo,
  });

  return res.data;
};

// Update Project
export const updateProject = async (projectInfo, id) => {
  const res = await http.put(`/project/updateProject?id=${id}`, projectInfo);

  return res.data;
};
