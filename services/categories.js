import http from "./http";

export const getCategories = async (type) => {
  const res = await http.get(`/category/?type=${type}`);
  return res.data;
};

export const addCategory = async (data) => {
  const res = await http.post(`/category`, data);
  return res.data;
};
