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
      onError: (error) => {
        if (error.response.data.errors?.length > 0)
          return toast(error?.response?.data?.errors[0], "error");
        if (error.response.data.message)
          return toast(error?.response?.data?.message, "error");
      },
    });

  return { deleteCategoryFn, deleteCategoryPending };
}

export default useDeleteCategory;
