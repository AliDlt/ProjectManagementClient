import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/users";
import { useToast } from "../Context/ToastContext";
import { useEffect } from "react";
import useUser from "./useUser";

function useUsers(userRole, page, count, search, sort) {
  const { isLoading: userLoading, user } = useUser();
  const toast = useToast();

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["get-all-users", userRole, page, count, search, sort],
    queryFn: () => getAllUsers(userRole, page, count, search, sort),
    enabled: !userLoading && user.userRole !== 2,
  });

  useEffect(() => {
    if (!isLoading && error) toast(error?.response?.data?.message, "error");
  }, [error, isLoading]);

  const users = data?.users;

  return {
    users,
    isLoading,
    refetch,
    error,
  };
}

export default useUsers;
