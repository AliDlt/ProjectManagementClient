import { useQuery } from "@tanstack/react-query";
import React from "react";
import { userReports } from "../../services/reports";

const useUserReports = (id) => {
  return useQuery({
    queryKey: ["user-reports", id],
    queryFn: () => userReports(id),
  });
};

export default useUserReports;
