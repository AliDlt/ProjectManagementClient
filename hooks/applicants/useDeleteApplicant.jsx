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
      onError: (error) => {
        if (error.response.data.errors?.length > 0)
          return toast(error?.response?.data?.errors[0], "error");
        if (error.response.data.message)
          return toast(error?.response?.data?.message, "error");
      },
    });

  return { deleteApplicantFn, deleteApplicantPending };
}

export default useDeleteApplicant;
