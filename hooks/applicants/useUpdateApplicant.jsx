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
      onError: (error) => {
        if (error.response.data.errors?.length > 0)
          return toast(error?.response?.data?.errors[0], "error");

        return toast(error?.response?.data?.message, "error");
      },
    });

  return { updateApplicantFn, updateApplicantPending };
}

export default useUpdateApplicant;
