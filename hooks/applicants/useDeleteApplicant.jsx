import { useToast } from "../../Context/ToastContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteApplicant } from "../../services/applicants";

function useDeleteApplicant(categoryId) {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutateAsync: deleteApplicantFn, isPending: deleteApplicantPending } =
    useMutation({
      mutationKey: ["delete-applicant"],
      mutationFn: deleteApplicant,
      onSuccess: (data) => {
        toast(data?.message, "success");
        queryClient.invalidateQueries(["get-all-applicant", categoryId]);
      },
    });

  return { deleteApplicantFn, deleteApplicantPending };
}

export default useDeleteApplicant;
