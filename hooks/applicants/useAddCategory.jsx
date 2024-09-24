import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory } from "../../services/applicants";
import { useToast } from "../../Context/ToastContext";

function useAddCategory() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutateAsync: addCategoryFn, isPending: addCategoryPending } =
    useMutation({
      mutationKey: ["add-category"],
      mutationFn: addCategory,
      onSuccess: (data) => {
        toast(data.message, "success");
        queryClient.invalidateQueries(["get-all-categories"]);
      },
    });

  return { addCategoryFn, addCategoryPending };
}

export default useAddCategory;
