import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../services/applicants";
import useHandleErrors from "../useHandleErrors";

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
  useHandleErrors(categoriesDataLoading, categoriesDataError);

  return {
    categoriesData,
    categoriesDataLoading,
    categoriesDataError,
    categoriesFetching,
  };
}

export default useCategories;
