import { useQuery } from "@tanstack/react-query";
import React from "react";
import { userReports } from "../../services/reports";

const useUserReports = (id, page, value) => {
  return useQuery({
    queryKey: ["user-reports", id, value, page],
    queryFn: () => userReports(id, page, value),
  });
};

export default useUserReports;
