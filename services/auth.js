import http from "./http";

// Sign Up
export const signup = async (userData) => {
  const res = await http.post("/auth/register", userData, {
    withCredentials: false,
  });
  return res.data;
};

export const login = async (data) => {
  const response = await http.post("/auth/login", data, {
    withCredentials: false,
  });
  return response.data
};
