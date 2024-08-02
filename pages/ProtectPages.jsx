import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { useEffect } from "react";

export default function ProtectPages({ children }) {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  let isAuthenticated = false;
  if (user) isAuthenticated = true;

  useEffect(() => {
    if (!isLoading && !isAuthenticated)
      navigate("/auth/login", { replace: true });
  }, [isAuthenticated, isLoading]);

  return children;
}
