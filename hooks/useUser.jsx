import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "../services/auth";

function useUser() {
  const queryClient = useQueryClient();

  const userFromCache = queryClient.getQueryData(["user"]);

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    initialData: userFromCache,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  return { user, isLoading, error };
}

export default useUser;
