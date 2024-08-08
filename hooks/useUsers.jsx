import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/users";
import { useToast } from "../Context/ToastContext";

function useUsers(userRole) {
  const toast = useToast();
  const {
    data: users,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["get-all-users", userRole],
    queryFn: () => getAllUsers(userRole),
    throwOnError: (error) => {
      toast(error.message, "error");
    },
  });

  return {
    users,
    isLoading,
    refetch,
    error,
  };
}

export default useUsers;
