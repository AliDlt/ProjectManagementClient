import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../services/applicants";

function useCategories(search, count, page) {
  const {
    data: categoriesData,
    isLoading: categoriesDataLoading,
    error: categoriesDataError,
    isFetching: categoriesFetching,
  } = useQuery({
    queryKey: ["get-all-categories", search, count, page],
    queryFn: () => getAllCategories(search, count, page),
  });

  return {
    categoriesData,
    categoriesDataLoading,
    categoriesDataError,
    categoriesFetching,
  };
}

export default useCategories;
