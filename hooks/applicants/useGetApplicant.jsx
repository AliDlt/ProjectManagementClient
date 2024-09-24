import { useQuery } from "@tanstack/react-query";
import { getApplicantById } from "../../services/applicants";
import { useToast } from "../../Context/ToastContext";

function useGetApplicant(categoryId) {
  const {
    data: applicants,
    isLoading: applicantsLoading,
    error: applicantsError,
  } = useQuery({
    queryKey: ["get-category-applicant", categoryId],
    queryFn: () => getApplicantById(categoryId),
  });

  return { applicants, applicantsLoading, applicantsError };
}

export default useGetApplicant;
