import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../services/users";
import { useToast } from "../../Context/ToastContext";

function useDeleteUser() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutateAsync: deleteUserFn, isPending } = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: deleteUser,
    onSuccess: () => {
      toast("کاربر حذف شد", "success");
      queryClient.invalidateQueries("get-all-users");
    },
    onError: (error) => {
      toast(error?.response?.data?.message, "error");
    },
  });

  return { deleteUserFn, isPending };
}

export default useDeleteUser;
