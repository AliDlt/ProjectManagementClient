import { useQuery } from "@tanstack/react-query";
import { getApplicantById } from "../../services/applicants";
import { useEffect } from "react";
import { useToast } from "../../Context/ToastContext";

function useGetApplicant(categoryId) {
  const toast = useToast();

  const {
    data: applicants,
    isLoading: applicantsLoading,
    error: applicantsError,
  } = useQuery({
    queryKey: ["get-category-applicant", categoryId],
    queryFn: () => getApplicantById(categoryId),
  });

  useEffect(() => {
    if (!applicantsLoading && applicantsError) {
      if (applicantsError?.response?.data?.errors) {
        toast(applicantsError?.response?.data?.errors[0], "error");
      } else {
        toast(applicantsError?.response?.data?.message, "error");
      }
    }
  }, [applicantsError, applicantsLoading]);

  return { applicants, applicantsLoading, applicantsError };
}

export default useGetApplicant;
