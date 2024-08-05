import http from "./http";

export const getAllUsers = async (userRole = "") => {
  const res = await http.get(
    `/user/getAllUsers?userRole=${userRole}&page=1&count=10`,
  );

  return res.data.data;
};
