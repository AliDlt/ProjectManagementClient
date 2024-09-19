import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useToast } from "../Context/ToastContext";
import useUser from "../hooks/useUser";

const userRole3Routes = ["/applicants", "/message", "/setting"];

export default function ProtectPages({ children }) {
  const { user, isLoading } = useUser();
  const toast = useToast();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isUserRole3Access = useRef(false);

  let isAuthenticated = false;
  if (user) isAuthenticated = true;

  useEffect(() => {
    userRole3Routes.map((route) =>
      pathname.startsWith(route) ? (isUserRole3Access.current = true) : null,
    );

    if (!isLoading && !isAuthenticated) {
      toast("لطفا وارد حساب کاربری خود شوید", false, "⚠️");
      navigate("/auth/login", { replace: true });
    }

    if (
      !isLoading &&
      isAuthenticated &&
      user.userRole === 3 &&
      !isUserRole3Access.current
    ) {
      navigate("/applicants", { replace: true });
    }
  }, [isAuthenticated, isLoading, pathname]);

  return isAuthenticated && children;
}
