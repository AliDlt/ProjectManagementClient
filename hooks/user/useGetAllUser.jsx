import { useQuery } from "@tanstack/react-query";
import React from "react";
import { allUsers } from "../../services/users";

const getAllUsersNoSort = () => {
  return useQuery({
    queryKey: "get-all-user-no-sort",
    queryFn: allUsers,
  });
};

export default getAllUsersNoSort;
