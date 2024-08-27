import { useMutation } from "@tanstack/react-query";
import React from "react";
import { uploadReportFile } from "../../services/reports";

const useUploadReportFile = () => {
  return useMutation({
    mutationKey: "upload-report-file",
    mutationFn: uploadReportFile,
  });
};

export default useUploadReportFile;
