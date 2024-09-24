import { useToast } from "../../Context/ToastContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateApplicant } from "../../services/applicants";

function useUpdateApplicant(categoryId) {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutateAsync: updateApplicantFn, isPending: updateApplicantPending } =
    useMutation({
      mutationKey: ["delete-applicant"],
      mutationFn: updateApplicant,
      onSuccess: (data) => {
        toast(data?.message, "success");
        queryClient.invalidateQueries(["get-all-applicant", categoryId]);
      },
    });

  return { updateApplicantFn, updateApplicantPending };
}

export default useUpdateApplicant;
