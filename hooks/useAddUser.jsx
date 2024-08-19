import { useMutation } from "@tanstack/react-query";
import React from "react";
import { addUser } from "../services/user";

const useAddUser = () => {
  return useMutation({
    mutationKey: ["add-user"],
    mutationFn: addUser,
  });
};

export default useAddUser;
