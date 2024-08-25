import { useMutation } from "@tanstack/react-query";
import React from "react";
import { addTicket } from "../../services/messages";

const useAddTicket = () => {
  return useMutation({
    mutationFn: addTicket,
    mutationKey: "add-ticket",
  });
};

export default useAddTicket;
