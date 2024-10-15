import http from "./http";

export const getCategories = async (type) => {
    console.log(type)
  const resp = await http.get(`/category/?type=${type}`);
  return resp
};
