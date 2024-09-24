import http from "./http";

export const getAllProjects = async ({ count, search, page = undefined }) => {
  const res = await http.post("/project/getAllProjectsSearchByToken", {
    count: search ? undefined : count,
    search,
    page: search ? undefined : page,
  });

  return res.data;
};

// Get A Project
export const getProject = async (projectId, search) => {
  const res = await http.get("/project/getProjectById", {
    params: {
      id: projectId,
      search,
    },
  });
  return res?.data;
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

// Upload Project File
export const uploadProjectFile = async (file) => {
  const res = await http.post("/project/uploadFile", file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

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

// Get Project Files
export const getProjectFiles = async (data) => {
  const res = await http.post("/project/downloadFile", data);

  return res.data;
};

// Get User Projects
export const getUserProject = async (userId, page) => {
  const res = await http.get("/project/getAllProjectsByUserId", {
    params: {
      userId,
      page,
    },
  });

  return res.data;
};
