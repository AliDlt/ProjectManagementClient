import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../services/messages";

const useGetMessages = ( page ) => {
  return useQuery({
    queryKey: ["get-messages", page],
    queryFn: () => getMessages(page),
    keepPreviousData: true,
  });
};

export default useGetMessages;
