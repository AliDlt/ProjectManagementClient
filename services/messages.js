import http from "./http";

export const sendMessage = async (data) => {
  const response = await http.post("", data);
  return response;
};

export const getMessages = async (page) => {
  console.log(page)
  const response = await http.get(`/ticket?page=${page}`);
  console.log(response);
  return response;
};
