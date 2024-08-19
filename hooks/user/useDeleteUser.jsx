import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../services/users";
import { useToast } from "../../Context/ToastContext";

function useDeleteUser() {
  const toast = useToast();
  const { mutateAsync: deleteUserFn, isPending } = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: deleteUser,
    onSuccess: () => {
      toast("کاربر حذف شد", "success");
    },
    onError: (error) => {
      toast(error?.response?.data?.message, "error");
    },
  });

  return { deleteUserFn, isPending };
}

export default useDeleteUser;
