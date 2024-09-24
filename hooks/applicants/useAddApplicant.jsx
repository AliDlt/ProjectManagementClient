import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addApplicant } from "../../services/applicants";
import { useToast } from "../../Context/ToastContext";

function useAddApplicant(applicantId) {
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    mutateAsync: addApplicantFn,
    isPending: addApplicantLoading,
    error: addApplicantError,
  } = useMutation({
    mutationKey: ["add-applicant"],
    mutationFn: addApplicant,
    onSuccess: (data) => {
      toast(data?.message, "success");
      queryClient.invalidateQueries(["get-category", applicantId]);
    },
  });

  return { addApplicantFn, addApplicantLoading, addApplicantError };
}

export default useAddApplicant;
