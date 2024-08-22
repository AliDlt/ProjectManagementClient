import http from "./http";

export const userInfo = async (id) => {
  console.log(id);
  const response = await http.get(`/user/getUserById?id=${8}`, { id: id });
  return response.data;
};

export const updateUser = async (data) => {
  console.log(data);
  const response = await http.put(`/user/updateUser`, data.data);
  return response.data;
};

export const addUser = async (data) => {
  const resp = await http.post("/user/addUser", data);
  return resp.data;
};
