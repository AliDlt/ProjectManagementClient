import http from "./http";

// Get All Projects
export const getAllProjects = async (
  count = "",
  page = undefined,
  search = "",
) => {
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

// Get Projects Total Pages
export const getProjectsTotalPages = async () => {
  const res = await http.get("/project/getProjectTotalPages");

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

// Add New Project
export const addNewProject = async (project) => {
  const res = await http.post("/project/addProject", project);

  return res.data;
};

// Delete Project
export const deleteProject = async (projectId) => {
  const res = await http.delete("/project/deleteProject", {
    params: projectId,
  });

  return res.data;
};
