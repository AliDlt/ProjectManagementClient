import http from "./http";

export const getProjects = async (count = "") => {
  const res = await http.get(
    `/project/getAllProjectsSearchByUserId?count=${count}`,
  );

  return res.data;
};
