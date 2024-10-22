import http from "./http";

// Upload Files
export const uploadFile = async (data) => {
  const res = await http.post("/files/uploadFile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

// Get Files By Category
export const getFilesByCategory = async (categoryId, page, count) => {
  const res = await http.get("/files", {
    params: {
      page,
      count,
    },
  });
  return res;
};

// Get Files
export const getFiles = async (
  sectionType,
  sectionId,
  fileFormat,
  page,
  count,
) => {
  const res = await http.get(`/files/${sectionType}/${sectionId}`, {
    params: {
      fileFormat,
      page,
      count,
    },
  });
  return res;
};

// Delete Files
export const deleteFile = async (sectionId) => {
  const res = await http.delete(`/files/${sectionId}`);
  return res;
};
