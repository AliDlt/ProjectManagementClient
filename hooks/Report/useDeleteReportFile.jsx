import { useMutation } from "@tanstack/react-query";
import { deleteReportFile } from "../../services/reports";

const useDeleteReportFile = () => {
  return useMutation({
    mutationFn: deleteReportFile,
    mutationKey:'delete-report-file'
  });
};

export default useDeleteReportFile;
