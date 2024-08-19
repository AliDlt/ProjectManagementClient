import { useQuery } from "@tanstack/react-query";
import { getTicket } from "../../services/messages";

const useGetTicket = (id) => {
  return useQuery({
    queryKey: ["single-ticket", id],
    queryFn: () => getTicket(id),
  });
};

export default useGetTicket;
