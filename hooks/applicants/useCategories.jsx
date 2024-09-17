import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../services/applicants";
import { useEffect } from "react";
import { useToast } from "../../Context/ToastContext";

function useCategories(search, count, page) {
  const toast = useToast();
  const {
    data: categoriesData,
    isLoading: categoriesDataLoading,
    error: categoriesDataError,
    isFetching: categoriesFetching,
  } = useQuery({
    queryKey: ["get-all-categories", search, count, page],
    queryFn: () => getAllCategories(search, count, page),
  });

  useEffect(() => {
    if (!categoriesDataLoading && categoriesDataError) {
      if (categoriesDataError?.response?.data?.errors) {
        toast(categoriesDataError?.response?.data?.errors[0], "error");
      } else {
        toast(categoriesDataError?.response?.data?.message, "error");
      }
    }
  }, [categoriesDataError, categoriesDataLoading]);

  return {
    categoriesData,
    categoriesDataLoading,
    categoriesDataError,
    categoriesFetching,
  };
}

export default useCategories;
