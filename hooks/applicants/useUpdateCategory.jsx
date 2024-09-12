import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory } from "../../services/applicants";
import { useToast } from "../../Context/ToastContext";

function useUpdateCategory() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    mutateAsync: updateCategoryFn,
    isPending: updateCategoryPending,
    error: updateCategoryError,
  } = useMutation({
    mutationKey: ["update-category"],
    mutationFn: updateCategory,
    onSuccess: (data) => {
      toast(data.message, "success");
      queryClient.invalidateQueries(["get-all-categories"]);
    },
    onError: (error) => {
      if (error.response.data.errors?.length > 0)
        return toast(error?.response?.data?.errors[0], "error");

      return toast(error?.response?.data?.message, "error");
    },
  });

  return {
    updateCategoryFn,
    updateCategoryPending,
    updateCategoryError,
  };
}

export default useUpdateCategory;
