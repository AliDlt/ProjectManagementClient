import http from "./http";

export const sendMessage = async (data) => {
  const response = await http.post("", data);
  return response;
};

export const getMessages = async () => {
  const response = await http.get("/ticket");
  return response;
};