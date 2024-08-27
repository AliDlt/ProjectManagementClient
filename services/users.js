import http from "./http";

// Get All Users
export const getAllUsers = async (
  userRole = "",
  page = "",
  count = "",
  search = "",
  sort = "",
) => {
  const res = await http.get(
    `/user/getAllUsers?filterRole=${userRole}&page=${page}&count=${count}&search=${search}&sort=${sort}`,
  );
  console.log(res);
  return res.data.data;
};

// Delete User
export const deleteUser = async (userId) => {
  const res = await http.delete("/user/deleteUser", { data: userId });
  return res.data.data;
};

export const allUsers = async () => {
  const res = await http.get(`/user/getAllUsers`);
  return res.data;
};
