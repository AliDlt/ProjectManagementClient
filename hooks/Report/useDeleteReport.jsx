import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { deleteReport } from "../../services/reports";

const useDeleteReport = (id) => {
  return useMutation({
    mutationKey: ["delete-report"],
    onMutate: () => deleteReport(id),
  });
};

export default useDeleteReport;
