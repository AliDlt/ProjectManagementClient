import { useMutation } from "@tanstack/react-query";
import React from "react";
import { addReport } from "../../services/reports";

const useAddReport = () => {
  return useMutation({
    mutationKey: "add-report",
    mutationFn: addReport,
  });
};

export default useAddReport;