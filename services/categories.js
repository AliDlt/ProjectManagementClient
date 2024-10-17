import http from "./http";

export const getCategories = async (type) => {
  console.log(type);
  const resp = await http.get(`/category/?type=${type}`);
  return resp;
};

export const addCategory = async (data) => {
  const res = await http.post(`/category`, data);
  return res.data
};
