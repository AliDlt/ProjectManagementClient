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
  });

  return {
    updateCategoryFn,
    updateCategoryPending,
    updateCategoryError,
  };
}

export default useUpdateCategory;
