import { useMutation } from "@tanstack/react-query";
import React from "react";
import { sendMessage } from "../services/messages";

const useSendMessage = () => {
  useMutation({
    mutationKey: "send-message",
    mutationFn: sendMessage,
  });
};

export default useSendMessage;
