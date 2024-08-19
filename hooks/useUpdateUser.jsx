import { useMutation } from "@tanstack/react-query";
import React from "react";
import { updateUser } from "../services/user";

const useUpdateUser = () => {
  return useMutation({ mutationKey: ["update-user"], mutationFn: updateUser });
};

export default useUpdateUser;
