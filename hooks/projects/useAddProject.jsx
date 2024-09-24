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
      toast("پروژه افزودن شد", "success");
    },
  });

  return { addProject, isPending, data: data?.data };
}

export default useAddProject;
