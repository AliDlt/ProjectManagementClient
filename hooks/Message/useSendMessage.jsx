import { useMutation } from "@tanstack/react-query";
import React from "react";
import { sendMessage } from "../../services/messages";

const useSendMessage = (id) => {
  return useMutation({
    mutationKey: ["send-message", id],
    mutationFn: sendMessage,
  });
};

export default useSendMessage;
