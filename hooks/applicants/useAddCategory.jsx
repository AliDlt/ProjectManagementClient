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
      onError: (error) => {
        if (error.response.data.errors?.length > 0)
          return toast(error?.response?.data?.errors[0], "error");
        if (error.response.data.message)
          return toast(error?.response?.data?.message, "error");
      },
    });

  return { addCategoryFn, addCategoryPending };
}

export default useAddCategory;
