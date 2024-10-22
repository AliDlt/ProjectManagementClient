import { useMutation } from "@tanstack/react-query";
import { addCategory } from "../../services/categories";
import { useToast } from "../../Context/ToastContext";

const useAddCategory = () => {
  const toast = useToast();

  const {
    mutateAsync: addCategoryFn,
    isPending: addCategorLoading,
    error: addCategorError,
  } = useMutation({
    mutationFn: addCategory,
    mutationKey: "add-category",
    onSuccess: (res) => {
      toast(res.data, "success");
    },
    onError: (error) => {
      if (error.response.data.errors?.length > 0)
        return toast(error?.response?.data?.errors[0], "error");
      if (error.response.data.message)
        return toast(error?.response?.data?.message, "error");
    },
  });

  return { addCategoryFn, addCategorLoading, addCategorError };
};

export default useAddCategory;
