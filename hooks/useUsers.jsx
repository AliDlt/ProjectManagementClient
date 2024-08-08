import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/users";
import { useToast } from "../Context/ToastContext";
import { useEffect } from "react";

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
  });

  useEffect(() => {
    if (!isLoading && error) toast(error?.response?.data?.message, "error");
  }, [error, isLoading]);

  return {
    users,
    isLoading,
    refetch,
    error,
  };
}

export default useUsers;
