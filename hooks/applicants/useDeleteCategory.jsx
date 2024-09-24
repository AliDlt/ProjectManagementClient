import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../../services/applicants";
import { useToast } from "../../Context/ToastContext";

function useDeleteCategory() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutateAsync: deleteCategoryFn, isPending: deleteCategoryPending } =
    useMutation({
      mutationKey: ["delete-category"],
      mutationFn: deleteCategory,
      onSuccess: (data) => {
        toast(data?.message, "success");
        queryClient.invalidateQueries(["get-all-categories"]);
      },
    });

  return { deleteCategoryFn, deleteCategoryPending };
}

export default useDeleteCategory;
