import { useQuery } from "@tanstack/react-query";
import { getApplicantById } from "../../services/applicants";
import { useToast } from "../../Context/ToastContext";
import useHandleErrors from "../useHandleErrors";

function useGetApplicant(categoryId) {
  const {
    data: applicants,
    isLoading: applicantsLoading,
    error: applicantsError,
  } = useQuery({
    queryKey: ["get-category-applicant", categoryId],
    queryFn: () => getApplicantById(categoryId),
  });
  useHandleErrors(applicantsLoading, applicantsError);

  return { applicants, applicantsLoading, applicantsError };
}

export default useGetApplicant;
