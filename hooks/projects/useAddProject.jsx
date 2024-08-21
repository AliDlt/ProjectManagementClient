import { useMutation } from "@tanstack/react-query";
import { addNewProject } from "../../services/projects";
import { useToast } from "../../Context/ToastContext";

function useAddProject() {
  const toast = useToast();

  const {
    mutateAsync: addProject,
    isPending,
    data,
  } = useMutation({
    mutationKey: ["add-project"],
    mutationFn: addNewProject,
    onSuccess: () => {
      toast("پروژه اضافه شد", "success");
    },
    onError: (error) => {
      toast(error?.response?.data?.message, "error");
    },
  });

  return { addProject, isPending, data: data?.data };
}

export default useAddProject;
