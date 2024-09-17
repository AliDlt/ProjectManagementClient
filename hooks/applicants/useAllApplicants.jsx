import { useEffect } from "react";
import { useToast } from "../../Context/ToastContext";
import { getAllApplicants } from "../../services/applicants";
import { useQuery } from "@tanstack/react-query";

function useAllApplicants(page, count, category, search) {
  const toast = useToast();

  const {
    data: allApplicants,
    isLoading: allApplicantsLoading,
    error: allApplicantsError,
  } = useQuery({
    queryKey: ["get-all-applicant", page, count, category, search],
    queryFn: () => getAllApplicants({ page, count, category, search }),
  });

  useEffect(() => {
    if (!allApplicantsLoading && allApplicantsError) {
      if (allApplicantsError?.response?.data?.errors) {
        toast(allApplicantsError?.response?.data?.errors[0], "error");
      } else {
        toast(allApplicantsError?.response?.data?.message, "error");
      }
    }
  }, [allApplicantsError, allApplicantsLoading]);

  return { allApplicants, allApplicantsLoading, allApplicantsError };
}

export default useAllApplicants;
