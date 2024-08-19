import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "../Context/ToastContext";
import useUser from "../hooks/useUser";

export default function ProtectPages({ children }) {
  const { user, isLoading } = useUser();
  const toast = useToast();
  const navigate = useNavigate();

  let isAuthenticated = false;
  if (user) isAuthenticated = true;

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast("لطفا وارد حساب کاربری خود شوید", false, "⚠️");
      navigate("/auth/login", { replace: true });
    }
  }, [isAuthenticated, isLoading]);

  return isAuthenticated && children;
}
