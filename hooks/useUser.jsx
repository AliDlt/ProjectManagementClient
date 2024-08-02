import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/auth";

function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
  });

  return { user, isLoading };
}

export default useUser;
