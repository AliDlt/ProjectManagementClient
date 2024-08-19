import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/users";
import { useToast } from "../Context/ToastContext";
import { useEffect } from "react";

function useUsers(userRole, page, count, search, sort) {
  const toast = useToast();

  const {
    data: users,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["get-all-users", userRole, page, count, search, sort],
    queryFn: () => getAllUsers(userRole, page, count, search, sort),
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
