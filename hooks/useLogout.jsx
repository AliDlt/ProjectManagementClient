import { useMutation } from "@tanstack/react-query";
import React from "react";
import { logoutAccount } from "../services/auth";

const useLogout = () => {
  return useMutation({ mutationFn: logoutAccount, mutationKey: "logout" });
};

export default useLogout;
