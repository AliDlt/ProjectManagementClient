import { useQuery } from "@tanstack/react-query";
import { getMessagesById } from "../../services/messages";

const useGetMessages = (id, page) => {
  return useQuery({
    queryKey: ["messages-ticket", id, page],
    queryFn: () => getMessagesById(id, page),
    keepPreviousData: true,
  });
};

export default useGetMessages;
