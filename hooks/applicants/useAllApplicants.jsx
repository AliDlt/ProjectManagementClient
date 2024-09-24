import { getAllApplicants } from "../../services/applicants";
import { useQuery } from "@tanstack/react-query";

function useAllApplicants(page, count, category, search) {
  const {
    data: allApplicants,
    isLoading: allApplicantsLoading,
    error: allApplicantsError,
  } = useQuery({
    queryKey: ["get-all-applicant", page, count, category, search],
    queryFn: () => getAllApplicants({ page, count, category, search }),
  });

  return { allApplicants, allApplicantsLoading, allApplicantsError };
}

export default useAllApplicants;
