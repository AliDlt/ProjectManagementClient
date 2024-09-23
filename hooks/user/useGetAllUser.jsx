import { useQuery } from "@tanstack/react-query";
import React from "react";
import { allUsers } from "../../services/users";

const getAllUsersNoSort = (count, page) => {
  return useQuery({
    queryKey: ["get-all-user-no-sort", count, page],
    queryFn: () => allUsers(count, page),
  });
};

export default getAllUsersNoSort;
