import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useToast } from "../Context/ToastContext";
import useUser from "../hooks/useUser";

function ProtectApplicantsPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && user && user.userRole !== 0 && user.userRole !== 3) {
      navigate("/", { replace: true });
      toast("شما به این صفحه دسترسی ندارید .", "error");
    }
  }, [isLoading, user]);

  return <Outlet />;
}

export default ProtectApplicantsPage;
