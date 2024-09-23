import http from "./http";

// Get All Users
export const getAllUsers = async (userRole, page, count, search, sort) => {
  const res = await http.get("/user/getAllUsers", {
    params: {
      filterRole: userRole,
      page,
      count,
      search,
      sort,
    },
  });
  return res.data.data;
};

// Delete User
export const deleteUser = async (userId) => {
  const res = await http.delete("/user/deleteUser", { data: userId });
  return res.data.data;
};

export const allUsers = async (count  = 10 , page =  1 ) => {
  const res = await http.get(`/user/getAllUsers?count=${count}&page=${page}`);
  return res.data;
};
