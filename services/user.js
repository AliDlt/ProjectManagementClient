import http from "./http";

export const userInfo = async () => {
  const response = await http.get("/user/getUserById/");
  console.log(response)
  return response.data;
};
