import { useQuery } from "@tanstack/react-query";
import { getCategoryById } from "../../services/applicants";
import useHandleErrors from "../useHandleErrors";

function useCategory(applicantId) {
  const {
    data: categoryData,
    isLoading: categoryLoading,
    error: categoryError,
  } = useQuery({
    queryKey: ["get-category", applicantId],
    queryFn: () => getCategoryById(applicantId),
  });
  useHandleErrors(categoryLoading, categoryError);

  return {
    categoryData,
    categoryLoading,
    categoryError,
  };
}

export default useCategory;
