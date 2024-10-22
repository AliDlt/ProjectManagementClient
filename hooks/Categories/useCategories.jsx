import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/categories";
import useHandleErrors from "../useHandleErrors";

const useCategories = (type) => {
  const {
    data,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryFn: () => getCategories(type),
    queryKey: ["get-categories", type],
    staleTime: 1000 * 60 * 5,
  });
  useHandleErrors(categoriesLoading, categoriesError);

  const categoriesData = data?.data;

  return { categoriesData, categoriesLoading, categoriesError };
};

export default useCategories;
