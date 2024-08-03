import http from "./http";

export const userInfo = async (id) => {
  const response = await http.get(`/user/getUserById/?Id=${id}`);
  console.log(response);
  return response.data;
};

export const updateUser = async (data) => {
  console.log(data);
  const response = await http.put(`/user/updateUser?Id=${data.id}`, data.data);
  console.log(response);
  return response.data;
};
