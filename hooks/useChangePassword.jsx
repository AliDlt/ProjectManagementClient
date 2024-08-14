import { useMutation } from "@tanstack/react-query";
import React from "react";
import { resetPassword } from "../services/auth";

const useChangePassword = () => {
 return useMutation({
    mutationKey: "change-password",
    mutationFn: resetPassword,
  });
};

export default useChangePassword;
