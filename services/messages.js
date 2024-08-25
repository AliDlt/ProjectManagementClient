import http from "./http";

export const sendMessage = async (data) => {
  const response = await http.patch(`/ticket/reply/${data.id}`, data.content);
  return response;
};

export const getMessages = async (page = 1) => {
  const response = await http.get(`/ticket/?page=${page}&limit=10`);
  return response;
};

export const getTicket = async (id) => {
  const response = await http.get(`/ticket/${id}`);
  return response.data;
};

export const getMessagesById = async (id, page) => {
  console.log(page);
  const resp = await http.get(`/ticket/messages/${id}/?page=${page}&limit=10`);
  return resp.data;
};

export const addTicket = async (data) => {
  const res = await http.post("/ticket", data);
  return res.data;
};

export const deleteTicket = async (id) => {
  const res = await http.delete(`/ticket/${id}`);
  return res.data;
};
