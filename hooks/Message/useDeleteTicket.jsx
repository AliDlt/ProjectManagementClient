import { useMutation } from "@tanstack/react-query";
import React from "react";
import { deleteTicket } from "../../services/messages";

const useDeleteTicket = () => {
  return useMutation({
    mutationFn: deleteTicket,
    mutationKey: "delete-ticket",
  });
};

export default useDeleteTicket;
