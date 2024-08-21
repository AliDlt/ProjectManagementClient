import useUpdateProject from "../../../../hooks/projects/useUpdateProject";
import { useToast } from "../../../../Context/ToastContext";
import CustomUsersList from "../CustomUsersList";

function ProjectUsers({ users, projectId }) {
  const { mutateAsync } = useUpdateProject(projectId);
  const toast = useToast();

  // Add User To Product Handler
  const addUserHandler = async (selectedRowKeys) => {
    try {
      await mutateAsync({
        id: projectId,
        usersIds: selectedRowKeys,
      });
      toast("لیست کاربران آپدیت شد", "success");
    } catch (error) {
      toast(error?.response?.data?.message, "error");
    }
  };

  return <CustomUsersList projectUsers={users} modalHandler={addUserHandler} />;
}

export default ProjectUsers;
