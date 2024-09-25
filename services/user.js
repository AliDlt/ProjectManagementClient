import http from "./http";

export const userInfo = async (id) => {
  const response = await http.post(`/user/getUserById`, {id});
  return response.data;
};

export const updateUser = async (data) => {
  const response = await http.put(`/user/updateUser`, data.data);
  return response.data;
};

export const addUser = async (data) => {
  const resp = await http.post("/user/addUser", data);
  return resp.data;
};
