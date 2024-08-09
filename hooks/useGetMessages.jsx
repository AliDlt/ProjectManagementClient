import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getMessages } from "../services/messages";

const useGetMessages = () => {
  useQuery({
    queryKey: "get-messages",
    queryFn: getMessages,
  });
};

export default useGetMessages;
