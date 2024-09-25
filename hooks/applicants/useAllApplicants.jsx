import { getAllApplicants } from "../../services/applicants";
import { useQuery } from "@tanstack/react-query";
import useHandleErrors from "../useHandleErrors";

function useAllApplicants(page, count, category, search) {
  const {
    data: allApplicants,
    isLoading: allApplicantsLoading,
    error: allApplicantsError,
  } = useQuery({
    queryKey: ["get-all-applicant", page, count, category, search],
    queryFn: () => getAllApplicants({ page, count, category, search }),
  });
  useHandleErrors(allApplicantsLoading, allApplicantsError);

  return { allApplicants, allApplicantsLoading, allApplicantsError };
}

export default useAllApplicants;
