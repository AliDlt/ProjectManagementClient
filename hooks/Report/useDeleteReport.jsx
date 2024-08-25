import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { deleteReport } from "../../services/reports";

const useDeleteReport = () => {
  return useMutation({
    mutationKey: ["delete-report"],
    mutationFn: deleteReport,
  });
};

export default useDeleteReport;
