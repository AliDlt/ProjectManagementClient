import { useQuery } from "@tanstack/react-query";
import { getCategoryById } from "../../services/applicants";
import { useToast } from "../../Context/ToastContext";
import { useEffect } from "react";

function useCategory(applicantId) {
  const toast = useToast();

  const {
    data: categoryData,
    isLoading: categoryLoading,
    error: categoryError,
  } = useQuery({
    queryKey: ["get-category", applicantId],
    queryFn: () => getCategoryById(applicantId),
  });

  useEffect(() => {
    if (!categoryLoading && categoryError) {
      if (categoryError?.response?.data?.errors) {
        toast(categoryError?.response?.data?.errors[0], "error");
      } else {
        toast(categoryError?.response?.data?.message, "error");
      }
    }
  }, [categoryError, categoryLoading]);

  return {
    categoryData,
    categoryLoading,
    categoryError,
  };
}

export default useCategory;
